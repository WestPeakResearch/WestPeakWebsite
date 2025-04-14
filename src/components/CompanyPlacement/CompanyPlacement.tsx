import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  container,
  description,
  imageContainer,
} from "./CompanyPlacement.module.css"
import { getImage } from "gatsby-plugin-image"
import PlacementsTable from "../ui/PlacementsTable/PlacementsTable"
import PageCoverLong from "../PageCover/PageCoverLong"

function CompanyPlacement() {
  const data: Queries.CompanyPlacementQuery = useStaticQuery(graphql`
    query CompanyPlacement {
      images: allFile(
        filter: { absolutePath: { regex: "/placements/.+(png|jpg|webp)/" } }
        sort: { absolutePath: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 1000)
          }
        }
      }
      placements: allPlacementsJsonJson {
        edges {
          node {
            title
            order
            images
          }
        }
      }
    }
  `)
  const imageMap: any = {}
  for (const node of data.images.nodes) {
    imageMap[node.name] = node.childImageSharp
  }

  const placementsEdges = data.placements.edges
  const placementsWithImage = placementsEdges
    .map(edge => {
      return {
        title: edge.node.title,
        order: edge.node.order,
        images: edge.node.images?.map(image =>
          image ? getImage(imageMap[image]) : null,
        ),
      }
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <>
      <PageCoverLong
        title="Placements"
        description="A Higher Standard of Career Success"
        image="placements"
      />
      <div className={container}>
        <p className={description}>
          At WestPeak, we’re redefining and raising the bar of successful
          careers, and our experiences speak to our commitment to professional
          development. We have countless members with competitive internships
          and full-time experience at Fortune 500 companies, prestigious firms,
          and unicorn startups.
        </p>
        <div className={imageContainer}>
          {placementsWithImage.map(obj => (
            <PlacementsTable
              title={obj.title || ""}
              images={obj.images || []}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CompanyPlacement
