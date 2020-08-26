import React from "react"
import { graphql, withPrefix } from "gatsby"
import Img from "gatsby-image"
import styles from "./teamMember.module.css"
import Layout from "../components/layout"

export default function teamMember({ data }) {
  console.log(data)
  const post = data.markdownRemark
  const research = post.frontmatter.research
  console.log(research[0])
  return (
    <Layout>
      <div className={styles.container}>
        <h1>{post.frontmatter.name}</h1>
        <h1>{post.frontmatter.degree}</h1>        
        <h1>{post.frontmatter.position}</h1>
        <img src = {post.frontmatter.headshot.publicURL} alt="showcase" />


        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <h1>Research</h1>
        {research.map((paper, index) => (
          <>
             <a
             rel="noopener noreferrer"
             href={withPrefix(`${paper}`)}
             target="_blank"
             key = {index}> Click to see research
             </a>
             </>
  ))}
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