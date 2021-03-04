import React, {useState} from "react"
import styles from "./Research.module.css"
import ResearchComponent from "./ResearchComponent"
import {useStaticQuery, graphql} from "gatsby"




function Research(){
    const data = useStaticQuery(graphql`
    query researchQuery {
      allMarkdownRemark(filter: {frontmatter: {type: {in: "report"}}}, sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
          frontmatter {
            paper
            author
            company
            summary
            title
            date(formatString: "MMMM DD, YYYY")
            isPrimer
          }
        }
      }
    }      
    `)


    const [year, setYear] = useState("2021")
    const [reportType, setReportType] = useState('Industry Primers')
    const allResearch = data.allMarkdownRemark.nodes
    let research = data.allMarkdownRemark.nodes.filter(isResearch => isResearch.frontmatter.isPrimer !== 'true')
    if(reportType === 'Industry Primers'){
      research = data.allMarkdownRemark.nodes.filter(isResearch => isResearch.frontmatter.isPrimer === 'true')
    }
    
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

    function handleTypeButtonClick(event){
      event.preventDefault()
      setReportType(event.target.value)
    }



    
    return(
        <div className = {styles.container}>
          <div className = {styles.reportTypeButtons}>
            <button  
            onClick = {handleTypeButtonClick}
            value = 'Equity Research'
            className = { 'Equity Research' === reportType ? styles.activeReportButton : styles.inactiveReportButton}
            >
              Equity Research
            </button>
            { allResearch.filter(paper => new Date(paper.frontmatter.date).getFullYear() === Number(year)).filter(isResearch => isResearch.frontmatter.isPrimer === 'true').length > 0 ?
            <button  
            onClick = {handleTypeButtonClick}
            value = 'Industry Primers'
            className = { 'Industry Primers' === reportType ? styles.activeReportButton : styles.inactiveReportButton}
            >
              Industry Primers
            </button>
            :
            null
}
          </div>
          <div className = {styles.yearButtons}>
            {
              Object.keys(reportsData).reverse().filter((year) =>  reportsData[year].length > 0).map(key => (
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
            {
            reportsData[year].length > 0 ?
            reportsData[year].map((paper, index) => {
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
            :
            <h4 className = {styles.noReport} >No data found for the year {year}.</h4>
          }
          </div>
        </div>
    )
}


export default Research