import React from "react"
import {
  container,
  section,
  content,
  image,
  imageLeft,
} from "./Hiring.module.css"
import { StaticImage } from "gatsby-plugin-image"
import FadeInBox from "../ui/FadeInBox/FadeInBox"

function HiringClosed() {
  return (
    <div className={container}>
      <FadeInBox>
        <div className={section}>
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
          <StaticImage
            alt="analysts"
            className={image}
            src="images/media_hiring_analysts.jpg"
          />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <StaticImage
            alt="directors"
            className={imageLeft}
            src="images/media_hiring_directors.jpg"
          />
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
        </div>
      </FadeInBox>
    </div>
  )
}

export default HiringClosed
