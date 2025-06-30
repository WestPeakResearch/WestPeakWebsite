import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import Events from "../components/Events/Events"
import eventsImage from "@images/banners/events.jpg"

const EventsPage = () => (
  <>
    <SEO title="Hiring" />
    <PageCover title="Events" image={eventsImage} />
    <Events />
  </>
)

export default EventsPage