import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import BackgroundImage from "gatsby-background-image-es5"
import {
  container,
  homeCover,
  homeTitle,
  accomplishments,
  content,
  section,
  imgRight,
  imgLeft,
} from "./HomeCover.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"
import IncreasingBox from "../ui/IncreasingBox/IncreasingBox"
import LinkButton from "../ui/LinkButton/LinkButton"

function Home() {
  const data = useStaticQuery(graphql`
    query homeQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "home" } } }
        sort: { frontmatter: { order: ASC } }
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
      banner: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const logo = getImage(data.logo.childImageSharp)
  const alumniCount = 100
  const researchCount = data.research.nodes.length
  const imageData = data.banner.childImageSharp.fluid
  const imageStack = [
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    imageData,
  ]

  return (
    <>
      <BackgroundImage
        className={homeCover}
        fluid={imageStack}
        backgroundColor={`#040e18`}
      >
        <FadeInBox>
          <GatsbyImage className={homeTitle} image={logo} fadeIn alt="logo" />
          <span
            dangerouslySetInnerHTML={{
              __html: data.allMarkdownRemark.nodes[0].html,
            }}
          ></span>
        </FadeInBox>
      </BackgroundImage>
      <div className={container}>
        <FadeInBox>
          <h1>
            Our Club in Numbers...
          </h1>
        </FadeInBox>
        <FadeInBox>
          <div className={accomplishments}>
            <IncreasingBox to={new Date(new Date() - new Date("2014-09-01")).getFullYear() - 1970}>
              Years since inception
            </IncreasingBox>
            <IncreasingBox to={researchCount}>
              Research reports published
            </IncreasingBox>
            <IncreasingBox to={alumniCount} add={true}>
              Alumni
            </IncreasingBox>
          </div>
        </FadeInBox>
      </div>
      <FadeInBox>
        <div className={section}>
          <div />
          <div className={content}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[1].html,
              }}
            />
            <LinkButton link="/research" text="View Research" />
          </div>
          <StaticImage
            className={imgRight}
            alt="research"
            src="../../images/research.jpg"
            placeholder="blurred"
          />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <StaticImage
            className={imgLeft}
            alt="placements"
            src="../../images/VPs-3.jpg"
            placeholder="blurred"
          />
          <div className={content}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[2].html,
              }}
            />
            <LinkButton link="/placements" text="See Our Placements" />
          </div>
          <div />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <div />
          <div className={content}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[3].html,
              }}
            />
            <LinkButton link="/hiring" text="View Hiring Details" />
          </div>
          <StaticImage
            className={imgRight}
            alt="hiring"
            src="../../images/2nd_Years.jpg"
            placeholder="blurred"
          />
        </div>
      </FadeInBox>
    </>
  )
}

export default Home
