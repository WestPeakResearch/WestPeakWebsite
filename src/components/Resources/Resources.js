import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import styles from "./Resource.module.css"


function Resources(){
  const data = useStaticQuery(graphql`
    query Resourcequery {
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Resources"}}}) {
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

export default Resources