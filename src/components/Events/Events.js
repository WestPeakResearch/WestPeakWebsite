import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  content,
  title,
  description,
} from "./Events.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import EventComponent from "./EventComponent"
import { DateTime } from "luxon"

function Events() {
  const data = useStaticQuery(graphql`
    query eventsQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { in: "events" } } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          frontmatter {
            title
            details
            date
            time
            deadline
            registration
            link
          }
        }
      }
    }
  `)
  const today = DateTime.now().startOf("day").setZone('America/Vancouver')
  const events = data.allMarkdownRemark.nodes.filter(e => DateTime.fromISO(e.frontmatter.date).setZone('America/Vancouver') >= today)

  return (
    <>
      <div className={content}>
        {
          events.length > 0
          ?
          <>
            <span className={title}>Upcoming Events</span>
            <div> { events.map(e => <EventComponent event={e.frontmatter} />) } </div>
            <br />
          </>
          :
          <></>
        }
        <span className={title}>Our Past Events</span>
        <p className={description}>
          At WestPeak, we’re redefining and raising the bar of successful
          careers, and our experiences speak to our commitment to professional
          development. We have countless members with competitive internships
          and full-time experience at Fortune 500 companies, prestigious firms,
          and unicorn startups.
        </p>
      </div>
    </>
  )
}

export default Events