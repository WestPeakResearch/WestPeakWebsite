import React from "react"
import { container, section, content, image, imageLeft } from "./Hiring.module.css"
import { StaticImage } from "gatsby-plugin-image"

function HiringClosed() {
  return (
    <div className={container}>
      <h2>Applications for the 2024-2025 cohort have closed. Please check back August 2025.</h2>
      <div className={section}>
        <div className={content}>
          <h3>WHAT WE DO</h3>
          <p>
            WestPeak Research Association (“WestPeak”) is a student-run capital markets group that aims
            to create quality equity research while enriching the education of its members through active
            peer mentorship and structured training seminars. We seek to prepare our members with the necessary
            skills required for success in the capital markets.
          </p>
          <h3>WHAT WE LOOK FOR</h3>
          <p>
            We are looking for students with a high willingness to learn and an interest in the capital markets.
            Our ideal students are driven self-starters who are able to take the material they learn to the next level.
            In the past, our most successful analysts have been those with unwavering curiosity and eagerness to explore
            topics related to financial markets. Students with an interest in pursuing a career in the capital markets
            industry are encouraged to apply.
          </p>
        </div>
        <StaticImage className={image} src="images/media_hiring_analysts.jpg" />
      </div>
      <div className={section}>
        <StaticImage className={imageLeft} src="images/media_hiring_directors.jpg" />
        <div className={content}>
          <h3>WHAT WE OFFER</h3>
          <p>
            When you join WestPeak, you are joining a community of current members and alumni that are as driven as you.
            You will have access to exclusive training modules and resources designed to help you learn finance concepts
            and develop skills needed within the capital markets. Through your deliverables, you will gain valuable research,
            analytical, and financial modelling skills. In addition to the learning, you will also gain access to mentors and
            networking sessions held with industry professionals and alumni working in investment banking, sales and trading,
            asset management, wealth management, and more.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HiringClosed