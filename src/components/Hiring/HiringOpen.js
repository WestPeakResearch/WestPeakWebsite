import React from "react"
import LinkButton from "../ui/LinkButton/LinkButton"
import { StaticImage } from "gatsby-plugin-image"
import { container } from "./Hiring.module.css"

function HiringOpen() {
  return (
    <div className={ container }>
      <h2>Applications for the 2024-2025 cohort are open until September 20, 2024.</h2>
      <h3>HOW TO APPLY</h3>
      <p>
        We offer a <bold>Junior Analyst</bold> program and a <bold>Senior Analyst</bold> program. 
        Please refer to our <a href="WPRA_Hiring_Package_2024.pdf" target="_blank"><bold>Hiring Package </bold></a>  
        for more details on each.
      </p>
      <p>
        Please apply using the button below before <bold>September 20th, 11:59pm PT</bold>. 
        Please note you must be a <bold>UBC Vancouver student</bold>, and may only apply to <bold>one program</bold>.
      </p>
      <p>
        <LinkButton link="https://forms.gle/G3v846c9srVEfDXAA" 
                    target="_blank" 
                    text="Access the 2024 WestPeak Research Association Application Form" />
      </p>
      <p>
        For a more in depth overview of our programs and to meet the team, we encourage you to
        <bold> attend one of our upcoming information sessions</bold>:
        <ul>
          <li>
            <bold>September 11, 7:00pm PT, In Person:</bold> <a href="https://forms.gle/A37vHEgJedbe2sAE8">Sign up here!</a>
          </li>
        </ul>
      </p>
      <h3>TIMELINE</h3>
      <ul>
        <li>August 25: Applications Open</li>
        <li>August 28: Information Session 1 Online, 7:00pm PT</li>
        <li>September 11: Information Session 2 In Person, 7:00pm PT</li>
        <li>September 20: Applications Close, 11:59pm PT</li>
        <li>September 23-25: Successful candidates will be contacted for interviews</li>
      </ul>

      <StaticImage src="images/hiring_timeline.png" />
    </div>
  )
}

export default HiringOpen