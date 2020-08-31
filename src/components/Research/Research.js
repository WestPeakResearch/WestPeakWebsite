import React from "react"
import styles from "./Research.module.css"
import ResearchComponent from "./ResearchComponent"
import {useStaticQuery, graphql} from "gatsby"


function Research(){
    const data = useStaticQuery(graphql`
    query researchQuery {
      allMarkdownRemark(filter: {frontmatter: {type: {eq: "report"}}}, sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
          frontmatter {
            paper
            author
            company
            summary
            title
            date (formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    
    
      
    `)

    const research = data.allMarkdownRemark.nodes

    return(
        <div className = {styles.container}>
          <div className = {styles.research}>   
            {research.map((paper, index) => {
              
             return (
               <>
              <ResearchComponent key = {index} report = {paper.frontmatter}/>
              {index === research.length - 1 ? null : <div className = {styles.seperation}>
              <hr />
              </div>}
              </>
             )
            }
            )
          }
          </div>
        </div>
    )
}


export default Research