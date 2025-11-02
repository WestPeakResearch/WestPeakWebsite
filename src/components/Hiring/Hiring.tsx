import React from "react"
import HiringOpen from "./HiringOpen"
import HiringClosed from "./HiringClosed"
import PageCoverLong from "../PageCover/PageCoverLong"
import LinkButton from "../ui/LinkButton/LinkButton"
import HiringUpcoming from "./HiringUpcoming"

enum HiringStatus {
  Open = 'open',
  Upcoming = 'upcoming',
  Closed = 'closed'
}

const HIRING_STATUS: HiringStatus = HiringStatus.Closed

function Hiring() {
  const coverDescription = getCoverDescription(HIRING_STATUS)
  const coverCta = HIRING_STATUS === HiringStatus.Open ? (
    <LinkButton
      link="https://forms.gle/kMpGzKJRmLn6T7qJ7"
      target="_blank"
      text="Apply Now"
      color="rgba(255, 255, 255, 0.9)"
    />
  ) : undefined
  const pageElement = getPageElement(HIRING_STATUS)

  return (
    <>
      <PageCoverLong
        title="Hiring"
        image="hiring"
        description={coverDescription}
        cta={coverCta}
      />
      {pageElement}
    </>
  )
}

function getCoverDescription(status: HiringStatus) {
  switch (status) {
    case HiringStatus.Closed:
      return "Applications are currently closed."
    case HiringStatus.Upcoming:
      return "Applications will open on September 2, 2025."
    case HiringStatus.Open:
      return "Applications are open until September 18, 2025."
  }
}

function getPageElement(status: HiringStatus) {
  switch (status) {
    case HiringStatus.Closed:
      return <HiringClosed />
    case HiringStatus.Upcoming:
      return <HiringUpcoming />
    case HiringStatus.Open:
      return <HiringOpen />
  }
}

export default Hiring
