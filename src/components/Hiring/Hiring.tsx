import React from "react"
import HiringOpen from "./HiringOpen"
import HiringClosed from "./HiringClosed"
import PageCoverLong from "../PageCover/PageCoverLong"
import LinkButton from "../ui/LinkButton/LinkButton"

function Hiring() {
  const HIRING_OPEN = false

  const coverDescription = HIRING_OPEN
    ? "Applications are open until September 20, 2024."
    : "Applications for the 2024-2025 cohort have closed. Please check back August 2025."
  const coverCta = HIRING_OPEN ? (
    <LinkButton
      link="https://forms.gle/G3v846c9srVEfDXAA"
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
