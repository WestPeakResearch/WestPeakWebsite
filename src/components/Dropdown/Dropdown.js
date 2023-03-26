import React from "react"
import styles from "./Dropdown.module.css"

function Dropdown({options, style, value, onChange}) {
  return (
    <>
      <div>
        <select value={value} onChange={onChange} className={style}>
          {options.map(option => <option value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </>
  )
}
  
export default Dropdown