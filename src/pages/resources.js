import React from "react"

import Layout from "../components/Layout"
import Resources from "../components/Resources"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const ResourcesPage = () => (
  <Layout>
    <SEO title="Resources" />
    <PageCover  title = "Resources" />
    <Resources/>
</Layout>
)

export default ResourcesPage
