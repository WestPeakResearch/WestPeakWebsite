/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./layout.module.css"
import NavBar from "../NavBar"

const Layout = ({ children }) => {

  return (
    <>
      <div>
        <NavBar />
        <main className = {styles.container}>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          Love by Hasan
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
