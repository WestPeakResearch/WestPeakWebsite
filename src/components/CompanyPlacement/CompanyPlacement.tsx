import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  content,
  title,
  description,
  imageContainer,
} from "./CompanyPlacement.module.css"
import { getImage } from "gatsby-plugin-image"
import PlacementsTable from "../ui/PlacementsTable/PlacementsTable"

function CompanyPlacement() {
  const data: Queries.CompanyPlacementQuery = useStaticQuery(graphql`
    query CompanyPlacement {
      images: allFile(
          filter: { absolutePath: { regex: "/placements\/.+(png|jpg|webp)/" }}
          sort: { absolutePath: ASC }
        ) {
        nodes {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 1000)
          }
        }
      }
    }
  `)

  const images = data.images.nodes.map((i) => getImage(i.childImageSharp)!)

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
        <PlacementsTable images={images} />
      </div>
    </>
  )
}

export default CompanyPlacement
