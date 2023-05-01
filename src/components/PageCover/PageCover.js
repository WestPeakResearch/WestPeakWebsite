import React from "react"
import { pageCover, pageTitle } from "./PageCover.module.css"


function PageCover(props){
  const title = props.title

  return(
    <>
      <div className={pageCover}>
        <div className = {pageTitle}>
          {title}
        </div>
      </div>
    </>
  )
}
 
export default PageCover