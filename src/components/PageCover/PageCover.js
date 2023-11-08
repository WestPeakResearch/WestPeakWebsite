import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { pageCover, pageTitle } from "./PageCover.module.css"
import BackgroundImage from "gatsby-background-image-es5"

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
              fluid(quality: 90, maxWidth: 1800) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      banner: file(relativePath: { eq: "banner.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  var imageData = data.banner.childImageSharp.fluid
  data.images.edges.forEach(node => {
    if (node.node.name === image) {
      imageData = node.node.childImageSharp.fluid
    }
  })
  const imageStack = [
    `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
    imageData,
  ]

  return (
    <>
      <BackgroundImage
        className={pageCover}
        fluid={imageStack}
        backgroundColor={`#040e18`}
      >
        <div className={pageTitle}>{title}</div>
      </BackgroundImage>
    </>
  )
}

export default PageCover
