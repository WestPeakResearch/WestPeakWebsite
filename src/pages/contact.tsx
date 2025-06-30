import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import Contact from "../components/Contact"
import contactImage from "@images/banners/contact.jpg"

const ContactPage = () => (
  <>
    <SEO title="Contact" meta={[]} />
    <PageCover title="Contact" image={contactImage} />
    <Contact />
  </>
)

export default ContactPage
