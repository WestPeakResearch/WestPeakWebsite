import React from "react"
import styles from "./Footer.module.css"


function Footer(){

    return(
    
        <div className={styles.container}>

            <div className={styles.text}>
        © {new Date().getFullYear()}, WestPeak Research Association. 
        All rights reserved. Please see "LEGAL" for Terms of Use and Website Privacy Statement.
        <div className = {styles.shoutout}>
                Developed by <a href="https://www.linkedin.com/in/hasanaltaf/" target = "_blank" rel="noreferrer">Hasan Altaf</a>
            </div>
        </div>
        </div>
    )
}

export default Footer