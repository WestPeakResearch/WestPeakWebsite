import React from "react"
import Img from "gatsby-image"
import styles from "./PageCover.module.css"



function PageCover(props){
  const title = props.title
  console.log(title)

  return(
    <>
       <div className={styles.pageCover}>
           <div className = {styles.pageTitle}>
                {title}
           </div>
        </div>
      </>

  )
}
 
export default PageCover