import React, { useState, useEffect } from "react"
import ResearchComponent from "./ResearchComponent"
import {
  container,
  reportTypeButtons,
  yearDropdown,
  dropdown,
  separation,
  noReport,
  searchBar,
} from "./Research.module.css"
import { useStaticQuery, graphql } from "gatsby"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "../../utils/reset.css"

const CURRENT_YEAR = 2024
const EQUITY_START_YEAR = 2014
const INDUSTRY_START_YEAR = 2021

const REPORT_TYPES = {
  all: "All Research",
  equity: "Equity Research",
  industry: "Industry Research",
  mna: "M&A Research",
  aa: "Alternative Assets Research"
}

function Research() {
  const data = useStaticQuery(graphql`
    query researchQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { in: "report" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
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
            isMNAResearch
            isAA
          }
        }
      }
    }
  `)

  const [year, setYear] = useState(-1)
  const [years, setYears] = useState<{ label: string, value: number }[] | undefined>(undefined)
  const [researchType, setResearchType] = useState(REPORT_TYPES.all)
  const [search, setSearch] = useState<string | null>(null)
  const research = data.allMarkdownRemark.nodes
  const researchOptions = [
    { label: "All Research", value: REPORT_TYPES.all },
    { label: "Equity Research", value: REPORT_TYPES.equity },
    { label: "Industry Research", value: REPORT_TYPES.industry },
    { label: "M&A Research", value: REPORT_TYPES.mna },
    { label: "Alternative Assets Research", value: REPORT_TYPES.aa }
  ]

  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [startIndex, setStartIndex] = useState(0)
  const [reportCount, setReportCount] = useState(0)

  useEffect(() => {
    const years = []
    years.push({ label: "All Years", value: -1 })
    let startYear = EQUITY_START_YEAR
    for (var i = CURRENT_YEAR; i >= startYear; i--) {
      years.push({ label: String(i), value: i })
    }
    setYears(years)
  }, [])

  const handleResearchSelect = (event: DropdownChangeEvent) => {
    event.preventDefault()
    setResearchType(event.target.value)
  }

  function handleYearSelect(event: DropdownChangeEvent) {
    event.preventDefault()
    setYear(Number(event.target.value))
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setSearch(event.target.value)
  }

  function onPageChange(event: PaginatorPageChangeEvent) {
    setStartIndex(event.first)
    setTimeout(() => {
      document.getElementById("research")!.scrollIntoView({ behavior: "smooth" });
    }, 40)
  }

  return (
    <div id="research" className={container}>
      <div className={reportTypeButtons}>
        <div>
          <span className="p-float-label">
            <Dropdown
              id="year"
              value={year}
              onChange={handleYearSelect}
              options={years}
              optionValue="value"
              optionLabel="label"
              className={yearDropdown}
            />
          </span>
        </div>
        <div>
          <span className="">
            <Dropdown
              id="research-type"
              inputId="industry-research-dropdown"
              value={researchType}
              onChange={handleResearchSelect}
              options={researchOptions}
              optionValue="value"
              optionLabel="label"
              className={dropdown}
            />
          </span>
        </div>
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              id="search"
              name="search"
              value={search}
              placeholder="Enter company, ticker, analyst name..."
              onChange={handleSearch}
              className={searchBar}
            />
          </span>
        </div>
      </div>

      <FilteredReports
        research={research}
        year={year}
        researchType={researchType}
        search={search}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        setReportCount={setReportCount}
      />
      {
        reportCount === 0 ? <></> : <Paginator first={startIndex} rows={30} totalRecords={reportCount} onPageChange={onPageChange} />
      }
    </div>
  )
}

function FilteredReports({ research, year, researchType, search, startIndex, itemsPerPage, setReportCount }: any) {
  const filteredByYear = research.filter((paper: any) => {
    if (year === -1) {
      return true
    }
    return new Date(paper.frontmatter.date).getFullYear() === year
  })
  const filteredByType = filteredByYear.filter((isResearch: any) => {
    if (researchType === REPORT_TYPES.all) {
      return true
    }
    if (researchType === REPORT_TYPES.industry) {
      return isResearch.frontmatter.isIndustryResearch === "true"
    }
    if (researchType === REPORT_TYPES.mna) {
      return isResearch.frontmatter.isMNAResearch === "true"
    }
    if (researchType === REPORT_TYPES.aa) {
      return isResearch.frontmatter.isAA === "true"
    }
    return isResearch.frontmatter.isIndustryResearch !== "true"
  })
  const filteredResearch = filteredByType.filter((res: any) => {
    if (!search) {
      return true
    }
    if (res.frontmatter.title.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    if (res.frontmatter.company.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    if (res.frontmatter.author.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    if (res.frontmatter.summary.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    return false
  })
  setReportCount(filteredResearch.length)

  return (
    <div>
      {filteredResearch.length > 0 ? (
        filteredResearch.slice(startIndex, startIndex+itemsPerPage).map((paper: any, index: any) => {
          return (
            <div key={index}>
              <ResearchComponent report={paper.frontmatter} />
              {index === filteredResearch.length - 1 ? null : (
                <div className={separation}>
                  <hr />
                </div>
              )}
            </div>
          )
        })
      ) : (
        <div className={noReport}>
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "5rem" }}
          />
          <h3> </h3>
          <h3> No results found </h3>
          <p>Sorry, no reports matched the applied filters.</p>
          <p>Please modify your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Research
