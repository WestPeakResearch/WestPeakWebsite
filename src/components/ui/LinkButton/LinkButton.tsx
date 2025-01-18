import React from "react"
import { Link } from "gatsby"
import { Button } from "primereact/button"
import { button } from "./LinkButton.module.css"

function LinkButton(props: {link: string, target?: string, text: string}) {
  return (
    <Link to={props.link} target={props.target || "_self"}>
      <Button className={button} label={props.text} outlined />
    </Link>
  )
}

export default LinkButton
