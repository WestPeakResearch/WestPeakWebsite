import React from "react"
import styles from "./Dropdown.module.css"

function Dropdown(props) {
    const options = props.options;
    const style = props.style
    
    // TODO: add none option
    return (
        <>
            <div>
                <select value={props.value} onChange={props.handleChange} className={style}>
                    {options.map(option => <option value={option.value}>{option.label}</option>)}
                </select>
            </div>
        </>
    )
}

export default Dropdown