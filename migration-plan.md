# Gatsby to Vite + React Router + SSG Migration Plan

## 🎯 Migration Strategy

### Current Architecture
- **Build System**: Gatsby 5.14.1
- **Routing**: File-based routing with dynamic page generation
- **Content**: Markdown files with frontmatter + Excel/JSON data
- **Images**: Gatsby Image with optimization
- **Styling**: CSS Modules + Typography.js
- **SSG**: Built-in with GraphQL data layer

### Target Architecture
- **Build System**: Vite 5.x
- **Routing**: React Router 6.x
- **SSG**: Vite Plugin SSG or custom solution
- **Content**: Direct file imports + content processing
- **Images**: Vite-optimized images
- **Styling**: CSS Modules (preserved)

## 📋 Phase 1: Project Setup

### 1.1 Install New Dependencies

```bash
# Core dependencies
npm install --save-dev vite @vitejs/plugin-react
npm install react-router-dom

# SSG capabilities
npm install --save-dev vite-ssg vite-plugin-pwa

# Content processing
npm install gray-matter marked
npm install --save-dev @types/marked

# Image optimization
npm install --save-dev vite-plugin-imagemin imagemin-mozjpeg imagemin-pngquant

# Utilities for data processing
npm install papaparse
npm install --save-dev @types/papaparse
```

### 1.2 Vite Configuration

Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './src/content'),
      '@data': path.resolve(__dirname, './src/data'),
      '@images': path.resolve(__dirname, './src/images')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['marked', 'gray-matter', 'papaparse']
        }
      }
    }
  }
})
```

## 📋 Phase 2: Content Processing System

### 2.1 Content Utilities

Create `src/utils/content.ts`:

```typescript
import matter from 'gray-matter'
import { marked } from 'marked'

export interface TeamMember {
  slug: string
  name: string
  degree: string
  position: string
  management: boolean
  research: string[]
  headshot: string
  content: string
}

export interface ContentFile {
  frontmatter: Record<string, any>
  content: string
  slug: string
}

// Process markdown files
export const processMarkdown = (markdownContent: string, filePath: string): ContentFile => {
  const { data: frontmatter, content } = matter(markdownContent)
  const slug = filePath.replace(/^.*\/([^/]+)\/index\.md$/, '$1').toLowerCase()
  
  return {
    frontmatter,
    content: marked(content),
    slug
  }
}

// Load team members
export const loadTeamMembers = async (): Promise<TeamMember[]> => {
  // Dynamic imports for all team member markdown files
  const teamModules = import.meta.glob('@content/Team/*/index.md', { as: 'raw' })
  const members: TeamMember[] = []
  
  for (const [path, loadContent] of Object.entries(teamModules)) {
    const content = await loadContent()
    const processed = processMarkdown(content, path)
    
    if (processed.frontmatter.type === 'team') {
      members.push({
        slug: processed.slug,
        name: processed.frontmatter.name,
        degree: processed.frontmatter.degree,
        position: processed.frontmatter.position,
        management: processed.frontmatter.management === 'True',
        research: processed.frontmatter.research || [],
        headshot: processed.frontmatter.headshot,
        content: processed.content
      })
    }
  }
  
  return members
}
```

### 2.2 Data Processing

Create `src/utils/data.ts`:

```typescript
import Papa from 'papaparse'

export const loadExcelData = async (fileName: string) => {
  try {
    const response = await fetch(`/src/data/${fileName}`)
    const csvText = await response.text()
    
    return Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    }).data
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error)
    return []
  }
}

export const loadJSONData = async (filePath: string) => {
  try {
    const response = await fetch(filePath)
    return await response.json()
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error)
    return {}
  }
}
```

## 📋 Phase 3: Routing Setup

### 3.1 Router Configuration

Create `src/App.tsx`:

```typescript
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Hiring from './pages/Hiring'
import Legal from './pages/Legal'
import Placements from './pages/Placements'
import Research from './pages/Research'
import Team from './pages/Team'
import TeamMember from './pages/TeamMember'
import NotFound from './pages/404'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/research" element={<Research />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<TeamMember />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
```

### 3.2 Dynamic Team Member Pages

Create `src/pages/TeamMember.tsx`:

```typescript
import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { loadTeamMembers, TeamMember as TeamMemberType } from '../utils/content'
import SEO from '../components/SEO'

const TeamMember: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [member, setMember] = useState<TeamMemberType | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadMember = async () => {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        const members = await loadTeamMembers()
        const foundMember = members.find(m => m.slug === slug)
        
        if (foundMember) {
          setMember(foundMember)
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Error loading team member:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadMember()
  }, [slug])

  if (loading) {
    return <div>Loading...</div>
  }

  if (notFound || !member) {
    return <Navigate to="/404" replace />
  }

  return (
    <div>
      <SEO title={`${member.name} - Team`} />
      <div className="container">
        <div className="member">
          <div className="memberImage">
            <img 
              src={`/src/content/Team/${member.name.replace(' ', '-')}/${member.headshot}`}
              alt={member.name}
            />
          </div>
          <div>
            <h1>{member.name}</h1>
            <p>{member.position}</p>
            <p>{member.degree}</p>
            <div dangerouslySetInnerHTML={{ __html: member.content }} />
            
            <div>
              <h3>Research</h3>
              {member.research.length > 0 ? (
                member.research.map((paper, index) => (
                  <a
                    key={index}
                    href={`/${paper}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {paper.split('_')[0]}
                  </a>
                ))
              ) : (
                <p>Coming Soon!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamMember
```

## 📋 Phase 4: SSG Implementation

### 4.1 Static Generation Setup

Create `scripts/generate-static.ts`:

```typescript
import fs from 'fs'
import path from 'path'
import { loadTeamMembers } from '../src/utils/content'

const generateStaticRoutes = async () => {
  const members = await loadTeamMembers()
  
  const routes = [
    '/',
    '/about',
    '/contact',
    '/events',
    '/hiring',
    '/legal',
    '/placements',
    '/research',
    '/team',
    ...members.map(member => `/team/${member.slug}`)
  ]

  // Write routes to a file for the build process
  fs.writeFileSync(
    path.join(__dirname, '../static-routes.json'),
    JSON.stringify(routes, null, 2)
  )

  console.log(`Generated ${routes.length} static routes`)
}

generateStaticRoutes().catch(console.error)
```

### 4.2 Build Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run generate:routes && vite build",
    "generate:routes": "tsx scripts/generate-static.ts",
    "preview": "vite preview",
    "serve": "npm run preview"
  }
}
```

## 📋 Phase 5: Component Migration

### 5.1 SEO Component

Create `src/components/SEO/seo.tsx`:

```typescript
import React from 'react'
import { Helmet } from 'react-helmet'

interface SEOProps {
  title: string
  description?: string
  meta?: Array<{ name: string; content: string }>
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "WestPeak Research Association",
  meta = []
}) => {
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | WestPeak Research Association`}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        ...meta,
      ]}
    />
  )
}

export default SEO
```

## 📋 Phase 6: Migration Steps

### Step-by-Step Migration Process:

1. **Backup your current project**
2. **Create new branch**: `git checkout -b vite-migration`
3. **Install dependencies** (Phase 1.1)
4. **Create Vite config** (Phase 1.2)
5. **Set up content processing** (Phase 2)
6. **Implement routing** (Phase 3)
7. **Migrate components one by one**
8. **Set up SSG** (Phase 4)
9. **Test thoroughly**
10. **Deploy and compare**

### Key Migration Considerations:

- **Images**: Replace `GatsbyImage` with optimized `<img>` tags or a Vite image processing solution
- **Links**: Replace `gatsby-link` with React Router's `Link` component
- **GraphQL**: Replace with direct file imports and processing
- **Static files**: Move from `static/` to `public/`
- **Environment variables**: Update `.env` handling for Vite

## 🚀 Benefits of Migration

- **Faster development server** (Vite's HMR)
- **Smaller bundle sizes**
- **More flexible routing**
- **Better TypeScript integration**
- **Easier testing setup**
- **More control over build process**

## ⚠️ Potential Challenges

- **SEO**: Ensure proper meta tag generation
- **Image optimization**: May need additional tooling
- **Content pipeline**: More manual setup required
- **Build complexity**: Need to handle SSG manually

Would you like me to start implementing any specific phase of this migration? 