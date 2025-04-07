import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  pageCoverLong,
  pageTitle,
  pageTitleLong,
  pageTitleHeader,
  blur,
} from "./PageCover.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import FadeInBox from "../ui/FadeInBox/FadeInBox"

function PageCoverLong(props: { title: string; image: string; description: string; cta?: React.ReactNode }) {
  const title = props.title
  const image = props.image
  const description = props.description
  const cta = props.cta
  const data: Queries.PageCoverLongQuery = useStaticQuery(graphql`
    query PageCoverLong {
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
              gatsbyImageData(placeholder: BLURRED, quality: 90)
            }
          }
        }
      }
      banner: file(relativePath: { eq: "banner.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, quality: 90)
        }
      }
    }
  `)
  var imageData = data.banner!.childImageSharp!.gatsbyImageData
  data.images.edges.forEach(node => {
    if (node.node.name === image) {
      imageData = node.node.childImageSharp!.gatsbyImageData
    }
  })
  imageData.layout = "fullWidth"

  return (
    <>
      <div
        style={{ display: "grid", height: "450px" }}
        className={pageCoverLong}
      >
        <GatsbyImage
          style={{ gridArea: "1/1", height: "100%" }}
          loading="eager"
          alt=""
          image={imageData}
        />
        <div
          className={blur}
          style={{
            gridArea: "1/1",
            position: "relative",
            display: "flex",
          }}
        >
          <span className={pageTitleLong}>
            <FadeInBox>
              <h1 className={pageTitleHeader}>{title}</h1>
            </FadeInBox>
            <FadeInBox>
              <p>{description}</p>
            </FadeInBox>
            {cta && <FadeInBox>{cta}</FadeInBox>}
          </span>
        </div>
      </div>
    </>
  )
}

export default PageCoverLong
