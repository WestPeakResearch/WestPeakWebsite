import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  container,
  media,
  strategyCard,
  images,
  content,
} from "./About.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"
import BlurredBackground from "../ui/BlurredBackground/BlurredBackground"

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
                gatsbyImageData(placeholder: BLURRED, width: 1000, height: 600)
              }
            }
          }
          html
        }
      }
    }
  `)

  const ourMission = data.allMarkdownRemark.nodes[0].html
  const ourStory = data.allMarkdownRemark.nodes[1].html
  const ourStrategy = data.allMarkdownRemark.nodes[2].html
  const strategies = data.strategies.nodes

  return (
    <div className={container}>
      <div className={content}>
        <FadeInBox>
          <span dangerouslySetInnerHTML={{ __html: ourMission! }} />
        </FadeInBox>
      </div>
      <BlurredBackground url="/background/lionsgate.jpg">
        <FadeInBox>
          <div className={content}>
            <span dangerouslySetInnerHTML={{ __html: ourStory! }} />
          </div>
        </FadeInBox>
      </BlurredBackground>
      <div className={content}>
        <FadeInBox>
          <span dangerouslySetInnerHTML={{ __html: ourStrategy! }} />
        </FadeInBox>
        {strategies.map(node => (
          <FadeInBox>
            <div className={strategyCard}>
              <h3>{node.frontmatter!.name}</h3>
              <span dangerouslySetInnerHTML={{ __html: node.html! }} />
              <section className={images}>
                {node.frontmatter?.images!.map(image => (
                  <GatsbyImage
                    className={media}
                    image={getImage(image!.childImageSharp!)!}
                    alt={node.frontmatter!.name!}
                  />
                ))}
              </section>
            </div>
          </FadeInBox>
        ))}
      </div>
    </div>
  )
}

export default About
