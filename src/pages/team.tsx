import Team from "../components/Team"
import PageCover from "../components/PageCover"
import SEO from "../components/SEO"
import teamImage from "@images/banners/team.jpg"

const TeamPage = () => (
  <>
    <SEO title="Team" />
    <PageCover title="Our Team" image={teamImage} />
    <Team />
  </>
)

export default TeamPage
