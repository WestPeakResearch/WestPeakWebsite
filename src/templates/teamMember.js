import React from "react"
import { graphql, withPrefix } from "gatsby"
import styles from "./teamMember.module.css"
import Layout from "../components/layout"

export default function teamMember({ data }) {
  console.log(data)
  const post = data.markdownRemark
  const research = post.frontmatter.research
  return (
    <Layout>
      <div className={styles.container}>
        <div className= {styles.member}>
          <div className = {styles.memberImage}>
              <img src = {post.frontmatter.headshot.publicURL} alt="showcase" />
          </div>
          <div className = {styles.memberInfo}>
            <div className = {styles.keyInfo}>       
              <span>{post.frontmatter.name}</span>
              <span>{post.frontmatter.degree}</span>    
          </div>
          <span className = {styles.title}>{post.frontmatter.position}</span>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className = {styles.research}>
        <span>Research</span>
        {research.map((paper, index) => (
          <>
             <a
             rel="noopener noreferrer"
             href={withPrefix(`${paper.paper}`)}
             target="_blank"
             key = {index}> {paper.title}
             </a>
             <br />
             </>
  ))}
    </div>
      </div>
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