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
            Please refer to our <a href="WPRA_Hiring_Package_2024.pdf" target="_blank"><b>Hiring Package </b></a>
            for more details on each.
          </p>
          <p>
            Please apply using the button below before <b>September 20th, 11:59pm PT</b>.
            Please note you must be a <b>UBC Vancouver student</b>, and may only apply to <b>one program</b>.
          </p>
          <p>
            <LinkButton link="https://forms.gle/G3v846c9srVEfDXAA"
              target="_blank"
              text="Access the 2024 WestPeak Research Association Application Form" />
          </p>
          <p>
            For a more in depth overview of our programs and to meet the team, we encourage you to
            <b> attend one of our upcoming information sessions</b>:
            <ul>
              <li>
                <b>September 11, 7:00pm PT, In Person:</b> <a href="https://forms.gle/A37vHEgJedbe2sAE8">Sign up here!</a>
              </li>
            </ul>
          </p>
        </div>
        <StaticImage alt="analysts" className={image} src="images/media_hiring_analysts.jpg" />
      </div>
      <div className={section}>
        <StaticImage alt="directors" className={imageLeft} src="images/media_hiring_directors.jpg" />
        <div className={content}>
          <h3>TIMELINE</h3>
          <ul>
            <li>August 25: Applications Open</li>
            <li>August 28: Information Session 1 Online, 7:00pm PT</li>
            <li>September 11: Information Session 2 In Person, 7:00pm PT</li>
            <li>September 20: Applications Close, 11:59pm PT</li>
            <li>September 23-25: Successful candidates will be contacted for interviews</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HiringOpen