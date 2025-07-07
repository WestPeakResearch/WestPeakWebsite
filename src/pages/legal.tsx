import React from "react"

import Layout from "../components/Layout"
import Legal from "../components/Legal"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const LegalPage = () => (
  <Layout>
    <PageCover title="Legal" image="home" />
    <Legal />
  </Layout>
)

export default LegalPage

export function Head() {
  return <SEO title="Legal" />
}
