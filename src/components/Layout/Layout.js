import React from "react"
import { container } from "./Layout.module.css"
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
        <main className = {container}>{children}</main>
      </div>
        <footer>
          <Footer />
        </footer>
    </>
  )
}

export default Layout