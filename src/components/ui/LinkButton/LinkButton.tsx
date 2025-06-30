import React from "react"
import { Link } from "react-router"
import { Button } from "primereact/button"
import { button } from "./LinkButton.module.css"

function LinkButton(props: {
  link: string, 
  target?: string, 
  text: string,
  color?: string
}) {
  const style = props.color ? {
    '--custom-button-color': props.color
  } as React.CSSProperties : undefined;

  return (
    <Link to={props.link} target={props.target || "_self"}>
      <Button 
        className={button} 
        label={props.text} 
        outlined
        style={style}
      />
    </Link>
  )
}

export default LinkButton
