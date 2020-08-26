import React from "react"
import {useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./HomeCover.module.css"



function Home(){
    const data = useStaticQuery(graphql`
    query homeQuery {
        logo: file(absolutePath: {regex: "/logo.png/"}) {
            childImageSharp {
                fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
    `
    )

  return(
    <>
       <div className={styles.homeCover}>
        <div >
            <Img className={styles.homeTitle} fluid={data.logo.childImageSharp.fluid} fadeIn alt="logo" />
        </div>
        </div>
      </>

  )
}
 
export default Home