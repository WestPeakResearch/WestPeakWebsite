import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img  from "gatsby-image"
import styles from "./CompanyPlacement.module.css"


function CompanyPlacement(){
  const data = useStaticQuery(graphql`
    query placementsQuery {
      one: file(absolutePath: {regex: "/placements1.jpg/"}) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      two: file(absolutePath: {regex: "/placements2.PNG/"}) {
        childImageSharp {
          fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return(
    <>
      <div className = {styles.content}>
        <span className = {styles.title}>A Higher Standard of Career Success</span>
        <p>At WestPeak, we’re redefining and raising the bar of successful careers, and our experiences speak to our 
            commitment to professional development. We have countless members with competitive internships and full-time 
            experience at Fortune 500 companies, prestigious firms, and unicorn startups.</p>
      </div>
      <div>
        <Img className = {styles.logoImage} fluid={data.one.childImageSharp.fluid} fadeIn alt="logo" />
        <Img className = {styles.logoImage} fluid={data.two.childImageSharp.fluid} fadeIn alt="logo" />
      </div>
    </>
  )
}

export default CompanyPlacement

