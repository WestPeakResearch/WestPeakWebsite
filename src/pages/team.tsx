import React from "react"

import Layout from "../components/Layout"
import Team from "../components/Team"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"

const TeamPage = () => (
  <Layout>
    <PageCover title="Our Team" image="team" />
    <Team />
  </Layout>
)

export default TeamPage

export function Head() {
  return <SEO title="Team" />
}
