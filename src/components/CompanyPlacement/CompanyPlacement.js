import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  content,
  title,
  description,
  logoImage,
  images,
} from "./CompanyPlacement.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function CompanyPlacement() {
  const data = useStaticQuery(graphql`
    query placementsQuery {
      one: file(absolutePath: { regex: "/placements.png/" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 2000)
        }
      }
    }
  `)

  const image1 = getImage(data.one.childImageSharp)

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
      <div className={images}>
        <GatsbyImage className={logoImage} image={image1} fadeIn alt="logo" />
      </div>
    </>
  )
}

export default CompanyPlacement
