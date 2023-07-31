import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  container,
  homeCover,
  homeTitle,
  accomplishments,
} from "./HomeCover.module.css"
import FadeInBox from "../FadeInBox/FadeInBox"
import IncreasingBox from "../IncreasingBox/IncreasingBox"

function Home() {
  const data = useStaticQuery(graphql`
    query homeQuery {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "home" } } }) {
        nodes {
          html
        }
      }
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 2000)
        }
      }
      alumni: allAlumniXlsxAlumni {
        nodes {
          name1
          name2
          name3
        }
      }
      research: allMarkdownRemark(
        filter: { frontmatter: { type: { in: "report" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            isIndustryResearch
          }
        }
      }
    }
  `)

  const logo = getImage(data.logo.childImageSharp)
  const alumniCount =
    (data.alumni.nodes.length - 1) * 3 +
    Object.values(data.alumni.nodes.at(-1)).filter(e => e !== null).length
  const industryCount = data.research.nodes.filter(
    node => node.frontmatter.isIndustryResearch,
  ).length
  const researchCount = data.research.nodes.length - industryCount

  return (
    <>
      <div className={homeCover}>
        <FadeInBox>
          <GatsbyImage className={homeTitle} image={logo} fadeIn alt="logo" />
          <span
            dangerouslySetInnerHTML={{
              __html: data.allMarkdownRemark.nodes[0].html,
            }}
          ></span>
        </FadeInBox>
      </div>
      <div className={container}>
        <h1>
          Over the{" "}
          {new Date(new Date() - new Date("2014-09-01")).getFullYear() - 1970}{" "}
          years since inception, we have...
        </h1>
        <FadeInBox>
          <div className={accomplishments}>
            <IncreasingBox to={researchCount}>
              Equity research reports published
            </IncreasingBox>
            <IncreasingBox to={industryCount}>
              Industry primers published
            </IncreasingBox>
            <IncreasingBox to={alumniCount}>Alumni</IncreasingBox>
          </div>
        </FadeInBox>
      </div>
    </>
  )
}

export default Home
