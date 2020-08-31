import React from "react"
import { graphql, withPrefix } from "gatsby"
import styles from "./teamMember.module.css"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import {SiLinkedin} from "react-icons"

export default function teamMember({ data }) {
  console.log(data)
  const post = data.markdownRemark
  const research = post.frontmatter.research
  return (
    <Layout>
      <div className={styles.container}>
        <div className= {styles.member}>
          <div className = {styles.memberImage}>
          <Img fluid={post.frontmatter.headshot.childImageSharp.fluid} fadeIn alt="headshot" />
          </div>
          <div className = {styles.memberInfo}>
            <div className = {styles.keyInfo}>       
              <span className = {styles.name}>{post.frontmatter.name}</span>
              <br />
              <span className = {styles.degree}>{post.frontmatter.degree}</span>    
          </div>
          <span className = {styles.title}>{post.frontmatter.position}</span>
            <div className = {styles.text} dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className = {styles.research}>
        <span className = {styles.researchtitle}>Research</span>
        <br />
        {research.map((paper, index) => (
          <>
          <br />
             <a
             rel="noopener noreferrer"
             href={withPrefix(`${paper}`)}
             target="_blank"
             key = {index}
             className = {styles.researchLink}
             >
               {paper.substr(0, paper.indexOf('_'))}
             </a>
             <br />
             </>
  ))}
    </div>
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
            fluid(maxWidth:1000 maxHeight: 1500 quality:70) {
              ...GatsbyImageSharpFluid
              base64
            }
          }
        }
      }
    }
  }
`