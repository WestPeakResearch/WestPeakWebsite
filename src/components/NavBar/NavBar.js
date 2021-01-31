import React, {useState} from "react";
import styles from "./NavBar.module.css";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";





const ListLink = props => (
  <li>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>
);

const Links = props => (
  <ul>
    <ListLink to="/">Home</ListLink>
    <ListLink to="/about">About</ListLink>
    <ListLink to="/team">Team</ListLink>
    <ListLink to="/research">Research</ListLink>
    <ListLink to="/hiring">Hiring</ListLink>
    <ListLink to="/resources">Resources</ListLink>
    <ListLink to="/placements">Placements</ListLink>
    <ListLink to="/contact">Contact</ListLink>
    <ListLink to="/legal">Legal</ListLink>
  </ul>
)



function MinimalBar(props){
    const data = props.data;
  if(!props.show){
    return null;
  } else {
    return (
      <div
        className={props.className}
      >
        <span className={styles.mobileBrand}><Img fluid={data.logo.childImageSharp.fluid} fadeIn alt="logo" /></span>
        <button
          className={styles.closeButton}
          onClick={props.onClick}
        >
          <span style={{ color: props.textColor }}>Menu</span>
        </button>
      </div>
    )
  }
}

  function FullBar(props){
    const data = props.data
    return (
      <div className={[styles.navbar, styles.navbarDesktop].join(" ")}>
        <div className = {styles.navBarImage}>
            <Img fluid={data.logo.childImageSharp.fluid} fadeIn alt="logo" />
        </div>
        <Links isFull={true} />
      </div>
    )
  }

  function NavMobileMenu(props){

    if(!props.show){
      return null;
    } else {
      return (
      <div className={props.className}>
        <button className={styles.closeButton} onClick={props.onClick}>
            <span>Close</span>
        </button>
        <Links isFull={false} />
      </div>
      )
    }
  }

  function Navbar(props){
    const data = useStaticQuery(graphql`
    query logoQuery {
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
    const [toggled, setToggled] = useState(false);

    function handleMenuClick(){
      setToggled(true);
    }

    function handleCloseButtonClick(){
      setToggled(false);
    }

    return(
      <div>
        <FullBar className={[styles.navbar, styles.navbarDesktop, props.className].join(" ")} data = {data} />
        <MinimalBar className = {[styles.navbar, styles.navbarMobile, props.className].join(" ")}
        show={!toggled} onClick={handleMenuClick} data = {data}/>
        <NavMobileMenu className={[styles.navbarMobileMenu, props.className].join(" ")} show ={toggled} onClick={handleCloseButtonClick} />
      </div>
    )
  }




export default props => (
  <Navbar>
    {props.children}
  </Navbar>
);
