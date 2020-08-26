import React from "react"
import styles from "./Research.module.css"
import {withPrefix} from "gatsby"



function ResearchComponent(props){ 
    const report = props.report
    return(
        <>
        <div className = {styles.reportPost}>
            <div className = {styles.reportInfo}>
                <div className={styles.reportDate}>
                    <span>{report.date}</span>
                </div>
                <span className = {styles.reportTitle}>{report.company} | {report.author}</span>
                <p className = {styles.reportText}>
                    {report.summary}
                </p>
                    <a className = {styles.reportLink}
                     rel="noopener noreferrer"
                     href={withPrefix(`${report.paper}`)}
                     target="_blank">{report.title}</a>
                    </div>
            </div>
                        </>
    )
}



export default ResearchComponent

