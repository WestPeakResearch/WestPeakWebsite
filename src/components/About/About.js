import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import styles from "./About.module.css"


function About(){
    const data = useStaticQuery(graphql`
    query MyQuery {
        allMarkdownRemark(filter: {frontmatter: {title: {eq: "About us"}}}) {
          nodes {
            html
          }
        }
      }
    `)
    const description = data.allMarkdownRemark.nodes[0].html 
    return(
        <div className = {styles.container}>
            <span dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

export default About