/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./Layout.module.css"
import NavBar from "../NavBar"
import Footer from "../Footer"
import Headroom from "react-headroom"

const Layout = ({ children }) => {

  return (
    <>
    <Headroom>
    <NavBar />
    </Headroom>
    
      <div>
        <main className = {styles.container}>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
