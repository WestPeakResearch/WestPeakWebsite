import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'
import Layout from './components/Layout'
import { loadTeamMembers, loadAlumniData } from './utils/content'

import Home from './pages/index'
import About from './pages/about'
import Contact from './pages/contact'
import Events from './pages/events'
import Hiring from './pages/hiring'
import Legal from './pages/legal'
import Placements from './pages/placements'
import Research from './pages/research'
import Team from './pages/team'
import NotFound from './pages/404'

const RootLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
)

const teamLoader = async () => {
  const [teamMembers, alumniData] = await Promise.all([
    loadTeamMembers(),
    loadAlumniData()
  ])
  return { teamMembers, alumniData }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "events", element: <Events /> },
      { path: "hiring", element: <Hiring /> },
      { path: "legal", element: <Legal /> },
      { path: "placements", element: <Placements /> },
      { path: "research", element: <Research /> },
      { 
        path: "team", 
        element: <Team />,
        loader: teamLoader
      },
      { path: "*", element: <NotFound /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App