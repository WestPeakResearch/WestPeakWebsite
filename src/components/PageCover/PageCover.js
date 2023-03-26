import React from "react"
import styles from "./PageCover.module.css"


function PageCover(props){
  const title = props.title

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