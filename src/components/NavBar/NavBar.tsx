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

interface ListLinkProps {
  to: string
  children: React.ReactNode
}

const ListLink = (props: ListLinkProps) => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Links = () => (
  <ul>
    <ListLink to="/about">About</ListLink>
    <ListLink to="/team">Team</ListLink>
    <ListLink to="/research">Research</ListLink>
    <ListLink to="/events">Events</ListLink>
    <ListLink to="/hiring">Hiring</ListLink>
    <ListLink to="/placements">Placements</ListLink>
    <ListLink to="/contact">Contact</ListLink>
  </ul>
)

function MinimalBar(props: { data: Queries.NavbarQuery, show: boolean, className: string, onClick: () => void }) {
  {
    const data = props.data
    if (!props.show) {
      return null
    } else {
      const logo = getImage(data.logo!.childImageSharp)!

      return (
        <div className={props.className}>
          <a className={mobileBrand} href="/">
            <GatsbyImage image={logo} alt="logo" />
          </a>
          <button className={closeButton} onClick={props.onClick}>
            <span>Menu</span>
          </button>
        </div>
      )
    }
  }
}

function FullBar(props: { data: Queries.NavbarQuery, className: string }) {
  const data = props.data
  const logo = getImage(data.logo!.childImageSharp)!

  return (
    <div className={[navbar, navbarDesktop].join(" ")}>
      <div className={spacer}>
        <div className={navbarImage}>
          <a href="/">
            <GatsbyImage image={logo} alt="logo" />
          </a>
        </div>
        <Links />
      </div>
    </div>
  )
}

function NavMobileMenu(props: { show: boolean, className: string, onClick: () => void }) {
  if (!props.show) {
    return null
  } else {
    return (
      <div className={props.className}>
        <button className={closeButton} onClick={props.onClick}>
          <img src={CloseIcon} alt="close" />
        </button>
        <Links />
      </div>
    )
  }
}

export default function Navbar(props: { className?: string, children?: React.ReactNode }) {
  const data = useStaticQuery(graphql`
    query Navbar {
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
