import React from "react"
import LinkButton from "../ui/LinkButton/LinkButton"
import { StaticImage } from "gatsby-plugin-image"
import { container, section, content, image, imageLeft } from "./Hiring.module.css"

function HiringOpen() {
  return (
    <div className={container}>
      <div className={section}>
        <div className={content}>
          <h3>HOW TO APPLY</h3>
          <p>
            We offer a <b>Junior Analyst</b> program and a <b>Senior Analyst</b> program.
            Please refer to our <a href="WPRA_Hiring_Package_2025.pdf" target="_blank"><b>Hiring Package </b></a>
            for more details on each.
          </p>
          <p>
            Please apply using the button below before <b>April 24th 2025, 11:59pm PT</b>.
            Please note you must be a <b>UBC Vancouver student</b>, and may only apply to <b>one program</b>.
          </p>
          <p>
            <LinkButton link="https://forms.gle/4DbV5S1KBvSpud3p8"
              target="_blank"
              text="Access the 2025 WestPeak Research Association Application Form" />
          </p>
        </div>
        <StaticImage alt="analysts" className={image} src="images/media_hiring_analysts.jpg" />
      </div>
    </div>
  )
}

export default HiringOpen