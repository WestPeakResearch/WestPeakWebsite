import React from "react"
import {
  eventContainer,
  eventDate,
  eventLinks,
  eventDetails,
  eventTitle,
  closedButton
} from "./Events.module.css"
import LinkButton from "../ui/LinkButton/LinkButton"
import { Button } from "primereact/button";
import { DateTime } from "luxon";

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function EventComponent(props) {
  const event = props.event
  const today = DateTime.now().startOf("day").setZone('America/Vancouver')
  const date = DateTime.fromISO(event.date).setZone('America/Vancouver')

  return (
    <div className={eventContainer}>
      <div className={eventDate}>
        <span>{date.toFormat("LLLL dd")}</span>
        {event.time !== "" ? <span>{event.time}</span> : <></>}
      </div>
      <div className={eventDetails}>
        <span className={eventTitle}>{event.title}</span>
        <span>{event.details}</span>
        <div className={eventLinks}>
          <LinkButton link={event.link} target="_blank" text="&nbsp;Read More&nbsp;" />
          {
            today > DateTime.fromISO(event.deadline) ?
            <Button className={closedButton} label="Registration Closed" outlined disabled/> :
            <LinkButton link={event.registration} target="_blank" text="&nbsp;&nbsp;&nbsp;Sign Up&nbsp;&nbsp;&nbsp;&nbsp;" />
          }
        </div>
      </div>
    </div>
  )
}

export default EventComponent
