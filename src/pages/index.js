import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Home from "../components/Home"
import SEO from "../components/SEO"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Home />

  </Layout>
)

export default IndexPage
