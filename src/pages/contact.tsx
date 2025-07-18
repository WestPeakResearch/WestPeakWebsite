import React from "react"

import Layout from "../components/Layout"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import Contact from "../components/Contact"

const ContactPage = () => (
  <Layout>
    <PageCover title="Contact" image="contact" />
    <Contact />
  </Layout>
)

export default ContactPage

export function Head() {
  return <SEO title="Contact" />
}
