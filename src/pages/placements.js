import React from "react"

import Layout from "../components/Layout"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import CompanyPlacement from "../components/CompanyPlacement"

const Placements = () => (
  <Layout>
    <SEO title="Placements" />
    <PageCover title="Placements" />
    <CompanyPlacement />
  </Layout>
)

export default Placements
