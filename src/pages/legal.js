import React from "react"

import Layout from "../components/Layout"
import Legal from "../components/Legal"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const LegalPage = () => (
  <Layout>
    <SEO title="Legal" />
    <PageCover  title = "Legal" />
    <Legal/>
  </Layout>
)

export default LegalPage
