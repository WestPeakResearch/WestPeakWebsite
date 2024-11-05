import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  content,
  title,
  description,
  imageContainer,
} from "./CompanyPlacement.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function CompanyPlacement() {
  const data = useStaticQuery(graphql`
    query placementsQuery {
      images: allFile(
          filter: { absolutePath: { regex: "/placements.+.png/" }}
          sort: { absolutePath: ASC }
        ) {
        nodes {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 2000)
          }
        }
      }
    }
  `)

  const images = data.images.nodes.map((i) => getImage(i.childImageSharp))

  return (
    <>
      <div className={content}>
        <span className={title}>A Higher Standard of Career Success</span>
        <p className={description}>
          At WestPeak, we’re redefining and raising the bar of successful
          careers, and our experiences speak to our commitment to professional
          development. We have countless members with competitive internships
          and full-time experience at Fortune 500 companies, prestigious firms,
          and unicorn startups.
        </p>
      </div>
      <div className={imageContainer}>
        {
          images.map((i) => <FadeInBox><GatsbyImage image={i} fadeIn alt="logo" /></FadeInBox>)
        }
      </div>
    </>
  )
}

export default CompanyPlacement
