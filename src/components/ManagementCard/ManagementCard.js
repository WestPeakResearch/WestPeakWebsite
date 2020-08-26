import React from "react"
import styles from "./ManagementCard.module.css"
import Img from "gatsby-image"
import {Link} from "gatsby"




function ManagementCard(props){



    return(
        <>
                
                <div className={styles.card}>
                <Link to={props.slug} className={styles.link}>
                    <div className={styles.cardImageContainer}>
                        <Img fluid={props.member.headshot.childImageSharp.fluid} fadeIn alt="headshot" />
                    </div>
                    <div className={styles.cardContent}>
                        <p className={styles.cardTitle}>
                            {props.member.name} | {props.member.position}
                        </p>
                    </div>
    
                </Link>
                </div>
        </>
    )
}


export default ManagementCard