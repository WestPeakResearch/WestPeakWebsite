import React from "react"

import Layout from "../components/Layout"
import Hiring from "../components/Hiring"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const HiringPage = () => (
  <Layout>
    <Hiring />
  </Layout>
)

export default HiringPage

export function Head() {
  return <SEO title="Hiring" />
} 
