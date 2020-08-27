import React from "react"

import Layout from "../components/Layout"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import Contact from "../components/Contact"

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <PageCover  title = "Contact" />
    <Contact />
</Layout>
)

export default ContactPage
