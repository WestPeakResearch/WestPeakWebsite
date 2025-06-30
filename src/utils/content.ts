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
  html: string
}

export interface AboutContent {
  name: string
  html: string
  order: number
}

export interface AboutStrategy {
  name: string
  html: string
  order: number
  images: string[]
}

export interface AlumniMember {
  name: string
  linkedin: string
}

export interface AlumniYear {
  order: number
  year: string
  management: AlumniMember[]
  gh: AlumniMember[]
}

export interface AlumniData {
  alumni: {
    edges: {
      node: AlumniYear
    }[]
  }
}

// Process markdown files
export const processMarkdown = async (markdownContent: string, filePath: string): Promise<ContentFile> => {
  const { data: frontmatter, content } = matter(markdownContent)
  const slug = filePath.replace(/^.*\/([^/]+)\/index\.md$/, '$1').toLowerCase()
  
  return {
    frontmatter,
    content,
    html: await marked(content),
    slug
  }
}

// Load and filter markdown content by type
export const loadMarkdownByType = async (type: string): Promise<AboutContent[]> => {
  const contentModules = import.meta.glob('/src/content/**/*.md', { as: 'raw' })
  const items: AboutContent[] = []
  
  for (const [path, loadContent] of Object.entries(contentModules)) {
    const content = await loadContent()
    const processed = await processMarkdown(content, path)
    
    if (processed.frontmatter.type === type) {
      items.push({
        name: processed.frontmatter.name || '',
        html: processed.html,
        order: processed.frontmatter.order || 0
      })
    }
  }
  
  // Sort by order
  return items.sort((a, b) => a.order - b.order)
}

// Load about strategies with images
export const loadAboutStrategies = async (): Promise<AboutStrategy[]> => {
  const contentModules = import.meta.glob('/src/content/**/*.md', { as: 'raw' })
  const strategies: AboutStrategy[] = []
  
  for (const [path, loadContent] of Object.entries(contentModules)) {
    const content = await loadContent()
    const processed = await processMarkdown(content, path)
    
    if (processed.frontmatter.type === 'about-strategies') {
      strategies.push({
        name: processed.frontmatter.name || '',
        html: processed.html,
        order: processed.frontmatter.order || 0,
        images: processed.frontmatter.images || []
      })
    }
  }
  
  return strategies.sort((a, b) => a.order - b.order)
}

// Load team members
export const loadTeamMembers = async (): Promise<TeamMember[]> => {
  const teamModules = import.meta.glob('/src/content/Team/*/index.md', { as: 'raw' })
  const members: TeamMember[] = []
  
  for (const [path, loadContent] of Object.entries(teamModules)) {
    const content = await loadContent()
    const processed = await  processMarkdown(content, path)
    
    if (processed.frontmatter.type === 'team') {
      members.push({
        slug: processed.slug,
        name: processed.frontmatter.name,
        degree: processed.frontmatter.degree,
        position: processed.frontmatter.position,
        management: processed.frontmatter.management === 'True',
        research: processed.frontmatter.research || [],
        headshot: processed.frontmatter.headshot,
        content: processed.html
      })
    }
  }
  
  return members
}

// Load images from a directory (simplified approach)
export const loadImages = async (directory: string): Promise<string[]> => {
  // For now, return a simple array - this will need to be implemented based on your image structure
  // This is a placeholder that works with TypeScript
  const imageModules = import.meta.glob('/src/images/**/*.{jpg,jpeg,png,webp,gif}', { eager: true, as: 'url' })
  const images: string[] = []
  
  Object.entries(imageModules).forEach(([path, url]) => {
    if (path.includes(directory)) {
      images.push(url as string)
    }
  })
  
  return images.sort()
}

// Load placement company images specifically
export const loadPlacementImages = async (): Promise<string[]> => {
  return loadImages('placements')
}

// Load alumni data
export const loadAlumniData = async (): Promise<AlumniData> => {
  const alumniModules = import.meta.glob('/src/data/alumniJson/*.json', { as: 'json' })
  const alumniYears: AlumniYear[] = []
  
  for (const [path, loadAlumni] of Object.entries(alumniModules)) {
    const alumniData = await loadAlumni() as AlumniYear
    alumniYears.push(alumniData)
  }
  
  return {
    alumni: {
      edges: alumniYears.map(year => ({
        node: year
      }))
    }
  }
}