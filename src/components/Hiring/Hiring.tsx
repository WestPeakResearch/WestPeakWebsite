import React from "react"
import HiringOpen from "./HiringOpen"
import HiringClosed from "./HiringClosed"
import PageCoverLong from "../PageCover/PageCoverLong"
import LinkButton from "../ui/LinkButton/LinkButton"

function Hiring() {
  const HIRING_OPEN = false

  const coverDescription = HIRING_OPEN
    ? "Applications are open until April 24, 2025."
    : "Applications are currently closed."
  const coverCta = HIRING_OPEN ? (
    <LinkButton
      link="https://forms.gle/4DbV5S1KBvSpud3p8"
      target="_blank"
      text="Apply Now"
      color="rgba(255, 255, 255, 0.9)"
    />
  ) : undefined

  return (
    <>
      <PageCoverLong
        title="Hiring"
        image="hiring"
        description={coverDescription}
        cta={coverCta}
      />
      {HIRING_OPEN ? <HiringOpen /> : <HiringClosed />}
    </>
  )
}

export default Hiring
