import React from "react"

import Layout from "../components/Layout"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import Research from "../components/Research"

const ResearchPage = () => (
  <Layout>
    <PageCover title="Research" image="research" />
    <Research />
  </Layout>
)

export default ResearchPage

export function Head() {
  return <SEO title="Research" />
}
