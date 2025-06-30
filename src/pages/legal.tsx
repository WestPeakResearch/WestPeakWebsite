import Legal from "../components/Legal"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import legalImage from "@images/banners/about.jpg"

const LegalPage = () => (
  <>
    <SEO title="Legal" />
    <PageCover title="Legal" image={legalImage} />
    <Legal />
  </>
)

export default LegalPage
