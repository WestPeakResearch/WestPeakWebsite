import React from "react"
import rehypeReact from "rehype-react"
import { useStaticQuery, graphql } from "gatsby"
import { container } from "./Hiring.module.css"
import LinkButton from "../ui/LinkButton/LinkButton"

function Hiring() {
  const data = useStaticQuery(graphql`
    query HiringQuery {
      allMarkdownRemark(filter: { frontmatter: { title: { eq: "Hiring" } } }) {
        nodes {
          htmlAst
        }
      }
    }
  `)
  const content = data.allMarkdownRemark.nodes[0].htmlAst

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { "link-button": LinkButton },
  }).Compiler

  return (
    <div className={container}>
      {
        renderAst(content)  
      }
    </div>
  )
}

export default Hiring
