import React from "react"

import Layout from "../components/Layout"
import Team from "../components/Team"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const TeamPage = () => (
  <Layout>
    <SEO title="Team" />
    <PageCover title="Our Team" />
    <Team />
  </Layout>
)

export default TeamPage
