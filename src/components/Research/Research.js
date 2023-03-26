import React, {useState} from "react"
import styles from "./Research.module.css"
import ResearchComponent from "./ResearchComponent"
import {useStaticQuery, graphql} from "gatsby"
import Dropdown from "../Dropdown/Dropdown"

const CURRENT_YEAR = 2022;
const START_YEAR = 2014;

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
            isIndustryResearch
            industryGroup
            primerOrDeal
          }
        }
      }
    }      
  `)

  const [year, setYear] = useState(CURRENT_YEAR) 
  const [reportType, setReportType] = useState('Equity Research')
  const [industryGroup, setIndustryGroup] = useState(null)
  const [primerOrDeal, setPrimerOrDeal] = useState(null)
  const [showPrimerOrDealResearch, setShowPrimerOrDealResearch] = useState(false)
  const allResearch = data.allMarkdownRemark.nodes
  let research = allResearch.filter(isResearch => isResearch.frontmatter.isIndustryResearch !== 'true')
  let showEquityResearch = true
  let isIndustryResearch = false;

  if (reportType === 'Industry Research'){
    showEquityResearch = false;
    isIndustryResearch = 'true';

    research = allResearch.filter(isResearch => 
      isResearch.frontmatter.isIndustryResearch === isIndustryResearch &&
      isResearch.frontmatter.industryGroup === industryGroup &&
      isResearch.frontmatter.primerOrDeal === primerOrDeal
    );
  }

  const years = [
    {label: 2022, value: 2022},
    {label: 2021, value: 2021},
    {label: 2020, value: 2020},
    {label: 2019, value: 2019},
    {label: 2018, value: 2018},
    {label: 2017, value: 2017},
    {label: 2016, value: 2016},
    {label: 2015, value: 2015},
    {label: 2014, value: 2014},
  ]

  const equityYears = [
    {label: 2022, value: 2022},
    {label: 2021, value: 2021},
    {label: 2020, value: 2020},
    {label: 2019, value: 2019},
    {label: 2018, value: 2018},
    {label: 2017, value: 2017},
    {label: 2016, value: 2016},
    {label: 2015, value: 2015},
    {label: 2014, value: 2014},
  ]

  const industryYears = [
    {label: 2022, value: 2022},
    {label: 2021, value: 2021},
  ]

  const reportsData = {
    "2022": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2022),
    "2021": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2021),
    "2020": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2020),
    "2019": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2019),
    "2018": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2018),
    "2017": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2017),
    "2016": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2016),
    "2015": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2015),
    "2014": research.filter( paper => new Date(paper.frontmatter.date).getFullYear() === 2014),
  }

  const reportTypes = [
    {label: 'Equity Research', value: 'Equity Research'},
    {label: 'Industry Research', value: 'Industry Research'},
  ]

  function handleYearSelect(event) {
    event.preventDefault();
    setYear(event.target.value);
  }

  function handleTypeButtonClick(event) {
    event.preventDefault()
    setReportType(event.target.value)
    setIndustryGroup(null)
  }

  function handleIndustryButtonClick(event) {
    event.preventDefault();
    setIndustryGroup(event.target.value);
    setShowPrimerOrDealResearch(false);
    setPrimerOrDeal(null);
  }

  function handlePrimerOrDealButtonClick(event) {
    event.preventDefault();
    setPrimerOrDeal(event.target.value);
    setShowPrimerOrDealResearch(true);
  }

  return (
    <div className = {styles.container}>

      {/* showing dropdowns for year and equity/industry research*/}
      <div className = {styles.reportTypeButtons}>
        <Dropdown
          options={reportType === 'Equity Research' ? equityYears : industryYears}
          onChange={handleYearSelect}
          value={year}
          style={styles.dropdown}
        ></Dropdown>
        <div className = {styles.reportTypeButtons}>
          <button onClick = {handleTypeButtonClick} value = 'Equity Research' className = { 'Equity Research' === reportType ? styles.activeReportButton : styles.inactiveReportButton}>
            Equity Research
          </button>

          {/* if there's industry research for the selected year, show Industry Research button */}
          {allResearch.filter(paper => new Date(paper.frontmatter.date).getFullYear() === Number(year)).filter(isResearch => isResearch.frontmatter.isIndustryResearch === 'true').length > 0 ?
            <button onClick = {handleTypeButtonClick} value = 'Industry Research' className = { 'Industry Research' === reportType ? styles.activeReportButton : styles.inactiveReportButton}>
              Industry Research
            </button>
            :
            null
          }
        </div>
      </div>

      {/* CASE 1 - if Equity Research is selected */}
      {showEquityResearch ? 
      
        <div>
          {/* showing research for selected year */}
          <div className = {styles.research}>   
            {reportsData[year].length > 0 ?
              reportsData[year].map((paper, index) => { return (
                <>
                  <ResearchComponent key = {index} report = {paper.frontmatter}/>
                  {index === reportsData[year].length - 1 ? 
                    null 
                    : 
                    <div className = {styles.separation}>
                      <hr />
                    </div>
                  }
                </>
              )})
              :
              <h4 className = {styles.noReport}> No data found for the year {year}. </h4>
            }
          </div> 
        </div>

      : 

        // CASE 2 - if Industry Research is selected
        <div>
          <div>
                
            {/* CASE 3 - if an Industry Group is clicked */}
            <div>
              {industryGroup ?
  
                // CASE 4 - if either of Subsector Primers or Deal Summaries are clicked
                <div>
                  {showPrimerOrDealResearch ? 
                          
                    // showing selected industry group button and selected report type (primer / deal) button
                    <div>
                      <div className = {styles.buttonsContainer}>
                        <button onClick={handlePrimerOrDealButtonClick} value={primerOrDeal} className={styles.activeBiggerGroupButton}>
                          {industryGroup + ' ' + primerOrDeal}
                        </button>
                      </div>


                      <div>
                        {/* showing research for selected year */}
                        <div className = {styles.research}>   
                          {reportsData[year].length > 0 ?
                            reportsData[year].map((paper, index) => { return (
                              <>
                                <ResearchComponent key = {index} report = {paper.frontmatter}/>
                                {index === reportsData[year].length - 1 ? 
                                  null 
                                  : 
                                  <div className = {styles.separation}>
                                    <hr />
                                  </div>
                                }
                              </>
                            )})
                            :
                            <h4 className = {styles.noReport}> No data found for the year {year}. </h4>
                          }
                        </div> 
                      </div>
                    </div>

                    :

                    <div className = {styles.buttons}>

                      {/* showing Industry Research button and selected industry group button */}
                      <div className={styles.buttonsContainer}>
                        <button onClick = {handleIndustryButtonClick} value = {industryGroup} className = { styles.activeBiggerGroupButton }>
                          {industryGroup}
                        </button>
                      </div>

                      {/* showing Subsector Primers and Deal Summaries buttons */}
                      <div>
                        <button onClick = {handlePrimerOrDealButtonClick} value = 'Subsector Primers' className = { 'Subsector Primers' === primerOrDeal ? styles.activePrimerOrDealButton : styles.inactivePrimerOrDealButton}>
                          Subsector Primers
                        </button>

                        <button onClick = {handlePrimerOrDealButtonClick} value = 'Deal Summaries' className = { 'Deal Summaries' === primerOrDeal ? styles.activePrimerOrDealButton : styles.inactivePrimerOrDealButton}>
                          Deal Summaries
                        </button>
                      </div>
                    </div>
                  }
                </div>

                :

                <div>
                  {/* showing industry group buttons */}
                  <div className = {styles.buttons}>
                    <div>
                      <button onClick = {handleIndustryButtonClick} value = 'Consumer Retail' className = { 'Consumer Retail' === industryGroup ? styles.activeGroupButton : styles.inactiveGroupButton}>
                        Consumer Retail 
                      </button>
                    </div>

                    <div>
                      <button onClick = {handleIndustryButtonClick} value = 'Natural Resources' className = { 'Natural Resources' === industryGroup ? styles.activeGroupButton : styles.inactiveGroupButton}>
                        Natural Resources 
                      </button>
                    </div>

                    <div>
                      <button onClick = {handleIndustryButtonClick} value = 'Real Estate, Gaming, and Lodging' className = { 'Real Estate, Gaming, and Lodging' === industryGroup ? styles.activeGroupButton : styles.inactiveGroupButton}>
                        Real Estate, Gaming, and Lodging (REGL)
                      </button>
                    </div>

                    <div>
                      <button onClick = {handleIndustryButtonClick} value = 'Technology, Media, and Telecommunications' className = { 'Technology, Media, and Telecommunications' === industryGroup ? styles.activeGroupButton : styles.inactiveGroupButton}>
                        Technology, Media, and Telecommunications (TMT)
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}


export default Research