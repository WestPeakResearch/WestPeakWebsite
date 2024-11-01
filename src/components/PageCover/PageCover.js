import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { pageCover, pageTitle } from "./PageCover.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

function PageCover(props) {
  const title = props.title
  const image = props.image
  const data = useStaticQuery(graphql`
    query {
      images: allFile(
        filter: {
          extension: { eq: "jpg" }
          relativeDirectory: { eq: "banners" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                quality: 90
              )
            }
          }
        }
      }
      banner: file(relativePath: { eq: "banner.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            quality: 90
          )
        }
      }
    }
  `)
  var imageData = data.banner.childImageSharp.gatsbyImageData
  data.images.edges.forEach(node => {
    if (node.node.name === image) {
      imageData = node.node.childImageSharp.gatsbyImageData
    }
  })

  return (
    <>
      <div style={{ display: "grid", overflow: "hidden"}} className={pageCover}>
        <GatsbyImage style={{ gridArea: "1/1", height: "100%"}} layout="fullWidth" loading="eager" alt="" image={imageData} />
        <div style={{
          gridArea: "1/1",
          position: "relative",
          placeItems: "center",
          display: "grid",
          height: "100%"
        }}>
          <div className={pageTitle}>{title}</div>
        </div>
      </div>
    </>
  )
}

export default PageCover
