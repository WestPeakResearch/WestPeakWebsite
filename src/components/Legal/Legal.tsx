import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { container } from "./Legal.module.css"

function Legal() {
  const data = useStaticQuery(graphql`
    query Legal {
      allMarkdownRemark(filter: { frontmatter: { title: { eq: "Legal" } } }) {
        nodes {
          html
        }
      }
    }
  `)
  const description = data.allMarkdownRemark.nodes[0].html

  return (
    <div className={container}>
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export default Legal
