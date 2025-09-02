import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { container, content } from "./About.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"
import BlurredBackground from "../ui/BlurredBackground/BlurredBackground"
import PageCoverLong from "../PageCover/PageCoverLong"
import { StrategyCards } from "./components/StrategyCards"

function About() {
  const data: Queries.AboutQuery = useStaticQuery(graphql`
    query About {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "about" } } }
        sort: { frontmatter: { order: ASC } }
      ) {
        nodes {
          frontmatter {
            name
          }
          html
        }
      }
      strategies: allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "about-strategies" } } }
        sort: { frontmatter: { order: ASC } }
      ) {
        nodes {
          frontmatter {
            name
            images {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  width: 2000
                  height: 800
                  layout: CONSTRAINED
                )
              }
            }
          }
          html
        }
      }
    }
  `)
  const ourStory = data.allMarkdownRemark.nodes[0].html
  const ourStrategy = data.allMarkdownRemark.nodes[1].html
  const strategies = data.strategies.nodes

  return (
    <>
      <PageCoverLong
        title="About Us"
        image="about"
        description="Where UBC students ignite their spark for finance."
      />
      <div className={container}>
        <div className={content}>
          <FadeInBox>
            <h1>Our Strategy</h1>
          </FadeInBox>
          <StrategyCards strategies={strategies} />
        </div>
      </div>
      <BlurredBackground url="/background/lionsgate.jpg">
        <FadeInBox>
          <div className={content}>
            <span dangerouslySetInnerHTML={{ __html: ourStory! }} />
          </div>
        </FadeInBox>
      </BlurredBackground>
    </>
  )
}

export default About
