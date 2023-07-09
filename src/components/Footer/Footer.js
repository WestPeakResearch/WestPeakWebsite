import React from "react"
import { container, text, shoutout } from "./Footer.module.css"

function Footer() {
  return (
    <div className={container}>
      <div className={text}>
        © 2014 - {new Date().getFullYear()}, WestPeak Research Association. All
        rights reserved. Please see "LEGAL" for Terms of Use and Website Privacy
        Statement.
        <div className={shoutout}>
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/hasanaltaf/"
            target="_blank"
            rel="noreferrer"
          >
            Hasan Altaf
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/in/jocelynbachmann/"
            target="_blank"
            rel="noreferrer"
          >
            Jocelyn Bachmann
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
