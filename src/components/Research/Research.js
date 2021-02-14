import React, {useState} from "react"
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


    const [year, setYear] = useState("2021")

    const research = data.allMarkdownRemark.nodes
    const reportsData = {
      "2021": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2021),
      "2020": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2020),
      "2019": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2019),
      "2018": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2018),
      "2017": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2017),
      "2016": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2016),
      "2015": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2015),
      "2014": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2014),
    }

    function handleYearButtonClick(event){
      event.preventDefault()
      setYear(event.target.value)
    }

    
    return(
        <div className = {styles.container}>
          <div className = {styles.yearButtons}>
            {
              Object.keys(reportsData).reverse().map(key => (
                <button  
                onClick = {handleYearButtonClick}
                value = {key}
                className = { key === year ? styles.activeButton : styles.inactiveButton}
                >
                  {key}
                  </button>
              ))
            }
          </div>
          <div className = {styles.research}>   
            {reportsData[year].map((paper, index) => {
             return (
               <>
              <ResearchComponent key = {index} report = {paper.frontmatter}/>
              {index === reportsData[year].length - 1 ? null : <div className = {styles.seperation}>
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