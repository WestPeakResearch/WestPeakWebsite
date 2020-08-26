import React from "react"
import PropTypes from "prop-types"
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
    
      <div className = {styles.elements}>
        <main className = {styles.container}>{children}</main>
      </div>
        <footer>
          <Footer />
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
