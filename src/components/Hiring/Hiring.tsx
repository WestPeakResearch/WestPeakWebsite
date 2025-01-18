import React from "react"
import HiringOpen from "./HiringOpen"
import HiringClosed from "./HiringClosed"

function Hiring() {
  const HIRING_OPEN = false

  return HIRING_OPEN ? <HiringOpen /> : <HiringClosed />
}

export default Hiring
