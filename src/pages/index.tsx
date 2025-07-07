import React from "react"

import Layout from "../components/Layout"
import HomeCover from "../components/HomeCover"
import SEO from "../components/SEO"

const IndexPage = () => (
  <Layout>
    <HomeCover />
  </Layout>
)

export default IndexPage

export function Head() {
  return <SEO title="Home" />
}
