import React, {useState} from "react"
import styles from "./Research.module.css"
import ResearchComponent from "./ResearchComponent"
import {useStaticQuery, graphql} from "gatsby"
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
        

const CURRENT_YEAR = 2022;
const EQUITY_START_YEAR = 2014;
const INDUSTRY_START_YEAR = 2021;

const REPORT_TYPES = {
  equity: 'Equity Research',
  industry: 'Industry Research',
}

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
          }
        }
      }
    }      
  `);

  const [year, setYear] = useState(CURRENT_YEAR);
  const [reportType, setReportType] = useState(REPORT_TYPES.equity);
  const [industryGroup, setIndustryGroup] = useState(null);
  const research = data.allMarkdownRemark.nodes;

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

  const industryGroups = [
    {label: 'All Groups', value: 'All'},
    {label: 'Consumer Retail', value: 'Consumer Retail'}, 
    {label: 'Natural Resources', value: 'Natural Resources'},  
    {label: 'Real Estate, Gaming, and Lodging', value: 'Real Estate, Gaming, and Lodging'}, 
    {label: 'Technology, Media, and Telecommunications', value: 'Technology, Media, and Telecommunications'},
  ];

  const handleIndustryGroupSelect = (event) => {
    event.preventDefault();
    setReportType(REPORT_TYPES.industry);
    setIndustryGroup(event.target.value);
  };

  function handleYearSelect(event) {
    event.preventDefault();
    setYear(event.target.value);
  }

  function handleTypeButtonClick(event) {
    event.preventDefault()
    setReportType(event.target.value)
    setIndustryGroup(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.reportTypeButtons}>
        <div>
          <span className="p-float-label">
              <Dropdown 
                value={year}
                onChange={handleYearSelect}
                options={reportType === REPORT_TYPES.equity ? equityYears : industryYears}
                optionValue="value"
                optionLabel="label"
                className={year ? styles.activeYearDropdown : styles.inactiveYearDropdown}
              />
          </span>
        </div>
        
        <div className={styles.reportTypeButtons}>
          <button onClick={handleTypeButtonClick} value={REPORT_TYPES.equity} className={ REPORT_TYPES.equity === reportType ? styles.activeReportButton : styles.inactiveReportButton}>
            {REPORT_TYPES.equity}
          </button>

          {research.filter(paper => new Date(paper.frontmatter.date).getFullYear() === Number(year)).filter(isResearch => isResearch.frontmatter.isIndustryResearch === 'true').length > 0 ?
            <div>
              <span className="p-float-label">
                  <Dropdown 
                    inputId="industry-research-dropdown"
                    value={industryGroup}
                    onChange={handleIndustryGroupSelect}
                    options={industryGroups}
                    optionValue="value"
                    optionLabel="label"
                    className={REPORT_TYPES.industry === reportType ? styles.activeDropdown : styles.inactiveDropdown}
                  />
                  <label 
                    htmlFor="industry-research-dropdown"
                    className={industryGroup ? styles.activeDropdownLabel : styles.inactiveDropdownLabel}
                  >
                    {REPORT_TYPES.industry}
                  </label>
              </span>

            </div>
            :
            null
          }
        </div>
      </div>

      <FilteredReports research={research} year={year} reportType={reportType} industryGroup={industryGroup}/>
      {/* {showEquityResearch ||  industryGroup ? 
        <FilteredReports year={year} allResearch={allResearch} reportType={reportType} industryGroup={industryGroup}/>
        : 
        <IndustryGroupButtons industryGroup={industryGroup} setIndustryGroup={setIndustryGroup}/>
      } */}
    </div>
  )
}


function FilteredReports({research, year, reportType, industryGroup}) {
  const isIndustryResearch = reportType === REPORT_TYPES.industry;
  const allResearchForYear = research.filter(paper => new Date(paper.frontmatter.date).getFullYear() === year);
  const filteredResearch = allResearchForYear.filter(isResearch => {
    if (isIndustryResearch) {
      if (industryGroup && industryGroup !== 'All') {
        return isResearch.frontmatter.isIndustryResearch === 'true' && isResearch.frontmatter.industryGroup === industryGroup;
      } else {
        return isResearch.frontmatter.isIndustryResearch === 'true'
      }
    }

    return isResearch.frontmatter.isIndustryResearch !== 'true'
  })

  return (
    <div className={styles.research}>   
      {filteredResearch.length > 0 ?
        filteredResearch.map((paper, index) => { return (
          <>
            <ResearchComponent key={index} report={paper.frontmatter}/>
            {index === filteredResearch.length - 1 ? 
              null 
              : 
              <div className={styles.separation}>
                <hr />
              </div>
            }
          </>
        )})
        :
        <h4 className={styles.noReport}> No data found for the year {year}. </h4>
      }
    </div>
  ) 
}


function IndustryGroupButtons({industryGroup, setIndustryGroup}) {
  const industryGroups = [
    'Consumer Retail', 
    'Natural Resources', 
    'Real Estate, Gaming, and Lodging', 
    'Technology, Media, and Telecommunications'
  ];

  const handleIndustryButtonClick = (event) => {
    event.preventDefault();
    setIndustryGroup(event.target.value);
  };

  return (
    <div className={styles.buttons}>
      {industryGroups.map(group => (
        <div>
          <button onClick={handleIndustryButtonClick} value={group} className={ group === industryGroup ? styles.activeGroupButton : styles.inactiveGroupButton}>
            {group} 
          </button>
        </div>
      ))}
    </div>
  )
}


export default Research