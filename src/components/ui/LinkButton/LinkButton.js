import React from "react"
import { Link } from "gatsby"
import { Button } from "primereact/button"
import { button } from "./LinkButton.module.css"

function LinkButton(props) {
  return (
    <Link to={props.link}>
      <Button
        className={button}
        label={props.text}
        outlined />
    </Link>
  )
}

export default LinkButton