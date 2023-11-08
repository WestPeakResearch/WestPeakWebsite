import React from "react"
import rehypeReact from "rehype-react"
import {Fragment, jsx, jsxs} from 'react/jsx-runtime'
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
    Fragment: Fragment,
    jsx: jsx,
    jsxs: jsxs,
    components: { "link-button": LinkButton },
  }).compiler

  return (
    <div className={container}>
      {
        renderAst(content, "Hiring.js")  
      }
    </div>
  )
}

export default Hiring
