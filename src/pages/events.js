import React from "react"

import Layout from "../components/Layout"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import Events from "../components/Events/Events"

const EventsPage = () => (
  <Layout>
    <SEO title="Hiring" />
    <PageCover title="Events" image="events" />
    <Events />
  </Layout>
)

export default EventsPage