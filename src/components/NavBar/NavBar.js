import React, { useState } from "react"
import {
  mobileBrand,
  closeButton,
  navbar,
  navbarDesktop,
  navbarMobile,
  navbarImage,
  navbarMobileMenu,
  spacer,
} from "./NavBar.module.css"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import CloseIcon from "../../images/close.svg"

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Links = () => (
  <ul>
    <ListLink to="/about">About</ListLink>
    <ListLink to="/team">Team</ListLink>
    <ListLink to="/research">Research</ListLink>
    <ListLink to="/hiring">Hiring</ListLink>
    <ListLink to="/resources">Resources</ListLink>
    <ListLink to="/placements">Placements</ListLink>
    <ListLink to="/contact">Contact</ListLink>
  </ul>
)

function MinimalBar(props) {
  const data = props.data
  if (!props.show) {
    return null
  } else {
    const logo = getImage(data.logo.childImageSharp)

    return (
      <div className={props.className}>
        <a className={mobileBrand} href="/">
          <GatsbyImage image={logo} fadeIn alt="logo" />
        </a>
        <button className={closeButton} onClick={props.onClick}>
          <span style={{ color: props.textColor }}>Menu</span>
        </button>
      </div>
    )
  }
}

function FullBar(props) {
  const data = props.data
  const logo = getImage(data.logo.childImageSharp)

  return (
    <div className={[navbar, navbarDesktop].join(" ")}>
      <div className={spacer}>
        <div className={navbarImage}>
          <a href="/">
            <GatsbyImage image={logo} fadeIn alt="logo" />
          </a>
        </div>
        <Links isFull={true} />
      </div>
    </div>
  )
}

function NavMobileMenu(props) {
  if (!props.show) {
    return null
  } else {
    return (
      <div className={props.className}>
        <button className={closeButton} onClick={props.onClick}>
          <img src={CloseIcon} alt="close" />
        </button>
        <Links isFull={false} />
      </div>
    )
  }
}

function Navbar(props) {
  const data = useStaticQuery(graphql`
    query logoQuery {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 200)
        }
      }
    }
  `)
  const [toggled, setToggled] = useState(false)

  function handleMenuClick() {
    setToggled(true)
  }

  function handleCloseButtonClick() {
    setToggled(false)
  }

  return (
    <div>
      <FullBar
        className={[navbar, navbarDesktop, props.className].join(" ")}
        data={data}
      />
      <MinimalBar
        className={[navbar, navbarMobile, props.className].join(" ")}
        show={!toggled}
        onClick={handleMenuClick}
        data={data}
      />
      <NavMobileMenu
        className={[navbarMobileMenu, props.className].join(" ")}
        show={toggled}
        onClick={handleCloseButtonClick}
      />
    </div>
  )
}

const props = () => <Navbar>{props.children}</Navbar>

export default props
