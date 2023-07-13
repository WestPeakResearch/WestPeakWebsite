import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { container, homeCover, homeTitle, accomplishments } from "./HomeCover.module.css"
import FadeInBox from "../FadeInBox/FadeInBox"
import IncreasingBox from "../IncreasingBox/IncreasingBox"

function Home() {
  const data = useStaticQuery(graphql`
    query homeQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "home" } } }
      ) {
        nodes {
          html
        }
      }
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 2000)
        }
      }
    }
  `)

  const logo = getImage(data.logo.childImageSharp)

  return (
    <>
      <div className={homeCover}>
      <FadeInBox>
        <GatsbyImage className={homeTitle} image={logo} fadeIn alt="logo" />
        <span dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.nodes[0].html }}></span>
      </FadeInBox>
      </div>
      <div className={container}>
        <h1>Since 2014, we have...</h1>
        <FadeInBox>
          <div className={accomplishments}>
            <IncreasingBox to={20}>Test</IncreasingBox>
            <IncreasingBox to={34}>Lorem ipsum dolor sit amet</IncreasingBox>
            <IncreasingBox to={321}>Testing again, lorem ipsum</IncreasingBox>
          </div>
        </FadeInBox>
      </div>
    </>
  )
}

export default Home
