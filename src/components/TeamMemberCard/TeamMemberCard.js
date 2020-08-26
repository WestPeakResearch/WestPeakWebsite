import React from "react"
import styles from "./TeamMemberCard.module.css"
import Img from "gatsby-image"
import {Link} from "gatsby"




function TeamMemberCard(props){



    return(
        <>
                
                <div className={styles.card}>
                <Link to={props.slug} className={styles.link}>
                    <div className={styles.cardImageContainer}>
                        <Img fluid={props.member.headshot.childImageSharp.fluid} fadeIn alt="headshot" />
                    </div>
                    <div className={styles.cardContent}>
                        <p className={styles.cardTitle}>
                            {props.member.name}
                        </p>
                    </div>
    
                </Link>
                </div>
        </>
    )
}


export default TeamMemberCard