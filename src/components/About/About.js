import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  container,
  media,
  strategyCard,
  images,
  mobileGrid,
} from "./About.module.css"
import FadeInBox from "../FadeInBox/FadeInBox"

function About() {
  const data = useStaticQuery(graphql`
    query aboutQuery {
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
      two: file(absolutePath: { regex: "/westpeak.jpg/" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 2000)
        }
      }
    }
  `)

  const ourMission = data.allMarkdownRemark.nodes[0].html
  const ourStory = data.allMarkdownRemark.nodes[1].html
  const ourStrategy = data.allMarkdownRemark.nodes[2].html
  const strategies = data.strategies.nodes
  const image2 = getImage(data.two.childImageSharp)

  return (
    <div className={container}>
      <FadeInBox>
        <span dangerouslySetInnerHTML={{ __html: ourMission }} />
      </FadeInBox>
      <FadeInBox>
        <div>
          <h1>Our Story</h1>
          <section className={mobileGrid}>
            <span dangerouslySetInnerHTML={{ __html: ourStory }} />
            <div>
              <GatsbyImage
                className={media}
                image={image2}
                fadeIn
                alt="our mission"
              />
            </div>
          </section>
        </div>
      </FadeInBox>
      <FadeInBox>
        <span dangerouslySetInnerHTML={{ __html: ourStrategy }} />
      </FadeInBox>
      {strategies.map(node => (
        <FadeInBox>
          <div className={strategyCard}>
            <h3>{node.frontmatter.name}</h3>
            <span dangerouslySetInnerHTML={{ __html: node.html }} />
            <section className={images}>
              {node.frontmatter.images.map(image => (
                <GatsbyImage
                  className={media}
                  image={getImage(image.childImageSharp)}
                  fadeIn
                  alt={node.frontmatter.name}
                />
              ))}
            </section>
          </div>
        </FadeInBox>
      ))}
    </div>
  )
}

export default About
