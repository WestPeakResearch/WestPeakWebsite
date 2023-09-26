import React from "react"
import { Link } from "gatsby"
import { container, text, shoutout, linkText } from "./Footer.module.css"

function Footer() {
  return (
    <div className={container}>

      <div className={text}>
        © 2014 - {new Date().getFullYear()}, WestPeak Research Association. All
        rights reserved. <Link to="/legal" className={linkText}>Please click here for Terms of Use and Website Privacy
        Statement</Link>.
        <div className={shoutout}>
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/hasanaltaf/"
            target="_blank"
            rel="noreferrer"
          >
            Hasan Altaf
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/jocelynbachmann/"
            target="_blank"
            rel="noreferrer"
          >
            Jocelyn Bachmann
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/in/hilarylau/"
            target="_blank"
            rel="noreferrer"
          >
            Hilary Lau
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
