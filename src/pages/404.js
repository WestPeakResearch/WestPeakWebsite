import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/SEO"

const errorPage = () => (
  <Layout>
    <h1>Oops... You have hit a route that doesn't exist!</h1>
  </Layout>
)

export default errorPage
