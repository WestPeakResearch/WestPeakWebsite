import React from "react"
import { card, link, cardImageContainer, cardContent, cardTitle } from "./ManagementCard.module.css"
import {Link} from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


function ManagementCard(props){
  const headshot = getImage(props.member.headshot.childImageSharp);
  
  return(
    <>
      <div className={card}>
        <Link to={props.slug} className={link}>
          <div className={cardImageContainer}>
            <GatsbyImage image={headshot} fadeIn alt="headshot" />
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