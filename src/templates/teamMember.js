import React from "react"
import { graphql, withPrefix } from "gatsby"
import Img from "gatsby-image"
import styles from "./teamMember.module.css"
import Layout from "../components/layout"

export default function teamMember({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className={styles.container}>
        <h1>{post.frontmatter.name}</h1>
        <h1>{post.frontmatter.degree}</h1>        
        <h1>{post.frontmatter.position}</h1>
        <img src = {post.frontmatter.headshot.publicURL} alt="showcase" />


        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.frontmatter.research ?
        <a
            rel="noopener noreferrer"
            href={withPrefix(`${post.frontmatter.research}`)}
            target="_blank"> Click to see research
            </a>
            :
            null
        }
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        name
        position
        degree
        research
        headshot {
          publicURL
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
              base64
            }
          }
        }
      }
    }
  }
`