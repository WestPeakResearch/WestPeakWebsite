import React from "react"
import {
  reportPost,
  reportLink,
  reportDate,
  reportText,
  reportTitle,
} from "./Research.module.css"

function ResearchComponent(props: any) {
  const report = props.report

  return (
    <>
      <div className={reportPost}>
        <a
          className={reportLink}
          rel="noopener noreferrer"
          href={withPrefix(`${report.paper}`)}
          target="_blank"
        >
          {report.title}
        </a>
        <div>
          <div className={reportDate}>
            <span>{report.date}</span>
          </div>
          {report.author ? (
            <span className={reportTitle}>
              {report.company} | {report.author}
            </span>
          ) : (
            <span className={reportTitle}>{report.company}</span>
          )}
          <p className={reportText}>{report.summary}</p>
        </div>
        <br />
      </div>
    </>
  )
}

export default ResearchComponent
