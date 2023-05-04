import React from "react"
import {useStaticQuery, graphql } from "gatsby"
import { homeCover, homeTitle } from "./HomeCover.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


function Home(){
  const data = useStaticQuery(graphql`
    query homeQuery {
      logo: file(absolutePath: {regex: "/logo.png/"}) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 2000)
        }
      }
    }
  `)

  const logo = getImage(data.logo.childImageSharp);

  return(
    <>
      <div className={homeCover}>
        <GatsbyImage className={homeTitle} image={logo} fadeIn alt="logo" />
      </div>
    </>
  )
}
 
export default Home