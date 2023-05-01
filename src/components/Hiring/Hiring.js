import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { container } from "./Hiring.module.css"

function Hiring(){
  const data = useStaticQuery(graphql`
    query HiringQuery {
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Hiring"}}}) {
        nodes {
          html
        }
      }
    }
  `)
  const description = data.allMarkdownRemark.nodes[0].html 

  return(
    <div className = {container}>
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export default Hiring