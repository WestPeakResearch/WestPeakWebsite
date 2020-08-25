import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import HomeCover from "../components/HomeCover"
import SEO from "../components/SEO"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <HomeCover />

    </Layout>
)

export default IndexPage
