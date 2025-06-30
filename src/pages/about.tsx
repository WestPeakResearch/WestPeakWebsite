import About from "../components/About"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import aboutImage from "@images/banners/about.jpg"

const AboutPage = () => (
  <>
    <SEO title="About" />
    <PageCover title="About Us" image={aboutImage} />
    <About />
  </>
)

export default AboutPage
