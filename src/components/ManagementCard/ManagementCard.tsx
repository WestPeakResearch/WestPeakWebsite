import React from "react"
import {
  card,
  link,
  cardImageContainer,
  cardContent,
  cardTitle,
} from "./ManagementCard.module.css"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

function ManagementCard(props: any) {
  return (
    <>
      <div className={card}>
        <Link to={props.slug} className={link}>
          <div className={cardImageContainer}>
            <GatsbyImage
              image={props.member.headshot.childImageSharp.gatsbyImageData}
              alt={props.member.name}
            />
          </div>
          <div className={cardContent}>
            <p className={cardTitle}>
              {props.member.name} | {props.member.position}
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ManagementCard
