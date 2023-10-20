import React from "react"

import Layout from "../components/Layout"
import About from "../components/About"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <PageCover title="About Us" image="about" />
    <About />
  </Layout>
)

export default AboutPage
