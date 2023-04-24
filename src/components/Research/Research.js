import React, {useState, useEffect} from "react"
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

const INDUSTRY_GROUPS = {
  all: 'All Groups',
  cr: 'Consumer Retail',
  nr: 'Natural Resources',
  regl: 'Real Estate, Gaming, and Lodging',
  tmt: 'Technology, Media, and Telecommunications',
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
  const [years, setYears] = useState(null);
  const [reportType, setReportType] = useState(REPORT_TYPES.equity);
  const [industryGroup, setIndustryGroup] = useState(null);
  const research = data.allMarkdownRemark.nodes;
  const industryGroupOptions = [];

  useEffect(() => {
    const years = [];
    let startYear = EQUITY_START_YEAR;
    if (reportType === REPORT_TYPES.industry) startYear = INDUSTRY_START_YEAR;

    for (var i=CURRENT_YEAR; i>=startYear; i--) {
      years.push({label: i, value: i})
    }

    setYears(years);
  }, [reportType]);

  useEffect(() => {
    Object.keys(INDUSTRY_GROUPS).map(key => industryGroupOptions.push({
      label: INDUSTRY_GROUPS[key], 
      value: INDUSTRY_GROUPS[key]
    }))
  })

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
                options={years}
                optionValue="value"
                optionLabel="label"
                className={year ? styles.activeYearDropdown : styles.inactiveYearDropdown}
              />
          </span>
        </div>
        
        <div className={styles.reportTypeButtons}>
          <button 
            onClick={handleTypeButtonClick}
            value={REPORT_TYPES.equity} 
            className={ REPORT_TYPES.equity === reportType ? styles.activeReportButton : styles.inactiveReportButton}
          >
            {REPORT_TYPES.equity}
          </button>

          {research.filter(paper => new Date(paper.frontmatter.date).getFullYear() === Number(year)).filter(isResearch => isResearch.frontmatter.isIndustryResearch === 'true').length > 0 ?
            <div>
              <span className="p-float-label">
                  <Dropdown 
                    inputId="industry-research-dropdown"
                    value={industryGroup}
                    onChange={handleIndustryGroupSelect}
                    options={industryGroupOptions}
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
    </div>
  )
}


function FilteredReports({research, year, reportType, industryGroup}) {
  const isIndustryResearch = reportType === REPORT_TYPES.industry;
  const allResearchForYear = research.filter(paper => new Date(paper.frontmatter.date).getFullYear() === year);
  const filteredResearch = allResearchForYear.filter(isResearch => {
    if (isIndustryResearch) {
      if (industryGroup && industryGroup !== INDUSTRY_GROUPS.all) {
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
        filteredResearch.map((paper, index) => {
          return (
          <div key={index}>
            <ResearchComponent report={paper.frontmatter}/>
            {index === filteredResearch.length - 1 ? 
              null 
              : 
              <div className={styles.separation}>
                <hr />
              </div>
            }
          </div>
        )})
        :
        <h4 className={styles.noReport}> No data found for the year {year}. </h4>
      }
    </div>
  ) 
}


export default Research