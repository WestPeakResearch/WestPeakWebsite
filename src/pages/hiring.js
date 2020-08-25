import React from "react"

import Layout from "../components/Layout"
import Hiring from "../components/Hiring"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const HiringPage = () => (
  <Layout>
    <SEO title="Hiring" />
    <PageCover  title = "Hiring" />
    <Hiring/>
</Layout>
)

export default HiringPage
