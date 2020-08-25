import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import styles from "./Legal.module.css"


function Legal(){
    const data = useStaticQuery(graphql`
    query LegalQuery {
        allMarkdownRemark(filter: {frontmatter: {title: {eq: "Legal"}}}) {
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

export default Legal