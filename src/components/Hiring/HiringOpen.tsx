import React from "react"
import LinkButton from "../ui/LinkButton/LinkButton"
import { StaticImage } from "gatsby-plugin-image"
import {
  container,
  section,
  content,
  image,
  imageLeft,
} from "./Hiring.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"

function HiringOpen() {
  return (
    <div className={container}>
      <FadeInBox>
        <div className={section}>
          <div className={content}>
            <h3>HOW TO APPLY</h3>
            <p>
              We offer a <b>Junior Analyst</b> program and a{" "}
              <b>Senior Analyst</b> program. Please refer to our{" "}
              <a href="WPRA_Hiring_Package_2026.pdf" target="_blank">
                <b>Hiring Package </b>
              </a>
              for more details.
            </p>
            <p>
              Please apply using the button below before{" "}
              <b>April 2 2026, 11:59AM PT</b>. Please note you must be a{" "}
              <b>UBC Vancouver student</b>, and may only apply to{" "}
              <b>one program</b>.
            </p>
            <p>
              <LinkButton
                link="https://forms.gle/WgYVF2Wg5UApthin8"
                target="_blank"
                text="Access the 2026-2027 WestPeak Research Association Application Form"
              />
            </p>
            <p>
              For a more in-depth overview of our programs and to meet the team,
              we encourage you to attend our upcoming information
              session:
              <ul>
                <li>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeGQ1fXnCcYcdomKLaekAj8hkp0in-XI86erFIOVsTo_LK4FQ/viewform?usp=publish-editor" target="_blank">
                    <b>April 1, 6:00PM PT</b>
                  </a>
                </li>
              </ul>
            </p>
          </div>
          <StaticImage
            alt="analysts"
            className={image}
            src="images/media_hiring_analysts.jpg"
          />
        </div>
      </FadeInBox>
      {/* <FadeInBox>
        <div className={section}>
        <StaticImage
            alt="group"
            className={imageLeft}
            src="images/media_hiring_group.jpg"
          />
          <div className={content}>
            <h3>Timeline</h3>
            <ul>
              <li>March 29: Applications Open</li>
              <li>April 1: Information Session, 6:30pm PT</li>
              <li>April 2: Applications Close, 5:00pm PT</li>
            </ul>
          </div>
        </div>
      </FadeInBox> */}
      <FadeInBox>
        <div className={section}>
            <StaticImage
            alt="discussion"
            className={image}
            src="images/media_hiring_discussion.jpg"
          />
          <div className={content}>
            <h3>WHAT WE LOOK FOR</h3>
            <p>
              We are looking for students with a high willingness to learn and
              an interest in the capital markets. Our ideal students are driven
              self-starters who are able to take the material they learn to the
              next level. In the past, our most successful analysts have been
              those with unwavering curiosity and eagerness to explore topics
              related to financial markets. Students with an interest in
              pursuing a career in the capital markets industry are encouraged
              to apply.
            </p>
          </div>
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <div className={content}>
            <h3>WHAT WE OFFER</h3>
            <p>
              When you join WestPeak, you are joining a community of current
              members and alumni that are as driven as you. You will have access
              to exclusive training modules and resources designed to help you
              learn finance concepts and develop skills needed within the
              capital markets. Through your deliverables, you will gain valuable
              research, analytical, and financial modelling skills. In addition
              to the learning, you will also gain access to mentors and
              networking sessions held with industry professionals and alumni
              working in investment banking, sales and trading, asset
              management, wealth management, and more.
            </p>
          </div>
          <StaticImage
            alt="computer"
            className={imageLeft}
            src="images/media_hiring_computer.jpg"
          />
        </div>
      </FadeInBox>
    </div>
  )
}

export default HiringOpen
