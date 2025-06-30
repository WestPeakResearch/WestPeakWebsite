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
import CloseIcon from "../../images/close.svg"
import logo from "@images/logo.png"
import { Link } from "react-router"

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

function MinimalBar(props: { show: boolean, className: string, onClick: () => void }) {
  {
    if (!props.show) {
      return null
    } else {
      return (
        <div className={props.className}>
          <Link className={mobileBrand} to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button className={closeButton} onClick={props.onClick}>
            <span>Menu</span>
          </button>
        </div>
      )
    }
  }
}

function FullBar(props: { className: string }) {
  return (
    <div className={[navbar, navbarDesktop, props.className].join(" ")}>
      <div className={spacer}>
        <div className={navbarImage}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
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
  const [toggled, setToggled] = useState(false)

  function handleMenuClick() {
    setToggled(true)
  }

  function handleCloseButtonClick() {
    setToggled(false)
  }

  return (
    <div>
      <FullBar className={[navbar, navbarDesktop, props.className].join(" ")} />
      <MinimalBar
        className={[navbar, navbarMobile, props.className].join(" ")}
        show={!toggled}
        onClick={handleMenuClick}
      />
      <NavMobileMenu
        className={[navbarMobileMenu, props.className].join(" ")}
        show={toggled}
        onClick={handleCloseButtonClick}
      />
    </div>
  )
}
