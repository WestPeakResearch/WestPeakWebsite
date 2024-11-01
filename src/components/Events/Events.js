import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  content,
  title,
  section,
  sectionContent,
  image,
  imageLeft,
  sponsors,
  sponsorLogos
} from "./Events.module.css"
import { StaticImage } from "gatsby-plugin-image"
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
              <div> {events.map(e => <EventComponent event={e.frontmatter} />)} </div>
              <br />
            </>
            :
            <></>
        }
        <span className={title}>Past Events</span>
        <div className={section}>
          <div className={sectionContent}>
            <h3>YWiB x WestPeak Stock Pitch Competition</h3>
            <p>
              WestPeak runs an annual Stock Pitch Competition in collaboration with 
              Young Women in Business UBC. The goal is to offer post-secondary students 
              in British Columbia an opportunity to learn about the public markets and 
              showcase their stock pitching skills, whilst encouraging the participation 
              of women in finance.
            </p>
          </div>
          <StaticImage className={image} src="images/media_ywib_wp_stock_pitch.jpg" />
        </div>
        <div className={section}>
          <StaticImage className={imageLeft} src="images/media_internal_stock_pitch.jpg" />
          <div className={sectionContent}>
            <h3>WestPeak Internal Stock Pitch</h3>
            <p>
              The WestPeak Internal Stock Pitch is an annual event at the end of every
              academic year where all analysts at WestPeak compete with each other, 
              as a cumulative showcase of skills learned throughout the year.
            </p>
          </div>
        </div>
        <br />
        <span className={title}>Sponsors</span>
        <div>
          <p>We would like to sincerely thank our sponsors that make hosting our events possible.</p>
          <div className={sponsors}>
            <div>Gold Sponsors</div>
            <div className={sponsorLogos}>
              <StaticImage src="images/sponsors_rbc.png" style={{ height: "100%" }} objectFit="contain" />
            </div>
            <div>Silver Sponsors</div>
            <div>
              <StaticImage src="images/sponsors_cibc.jpg" style={{ height: "100%" }} objectFit="contain" />
            </div>
            <div>Bronze Sponsors</div>
            <div>
              <StaticImage src="images/sponsors_td.png" style={{ height: "100%" }} objectFit="contain" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Events