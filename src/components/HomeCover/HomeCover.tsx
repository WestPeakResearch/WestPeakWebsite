import React from "react"
import {
  container,
  accomplishments,
  content,
  section,
  imgRight,
  imgLeft,
  glanceSection,
} from "./HomeCover.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"
import IncreasingBox from "../ui/IncreasingBox/IncreasingBox"
import LinkButton from "../ui/LinkButton/LinkButton"
import RandomPlacementsTable from "../ui/PlacementsTable/RandomPlacementsTable"
import PageCoverLong from "../PageCover/PageCoverLong"
import researchImage from "@images/research.jpg"
import placementsImage from "@images/VPs-3.jpg"
import hiringImage from "@images/2nd_Years.jpg"

function Home() {
  // const data: Queries.HomeQuery = useStaticQuery(graphql`
  //   query Home {
  //     allMarkdownRemark(
  //       filter: { frontmatter: { type: { eq: "home" } } }
  //       sort: { frontmatter: { order: ASC } }
  //     ) {
  //       nodes {
  //         html
  //       }
  //     }
  //     research: allMarkdownRemark(
  //       filter: { frontmatter: { type: { in: "report" } } }
  //       sort: { frontmatter: { date: DESC } }
  //     ) {
  //       nodes {
  //         id
  //       }
  //     }
  //     placements: allFile(
  //       filter: { absolutePath: { regex: "/placements/.+(jpg|png|webp)/" } }
  //       sort: { absolutePath: ASC }
  //     ) {
  //       nodes {
  //         childImageSharp {
  //           gatsbyImageData(placeholder: BLURRED, width: 1000)
  //         }
  //       }
  //     }
  //   }
  // `)

  const alumniCount = 150
  const researchCount = 170
  // const placements = data.placements.nodes.map(
  //   i => getImage(i.childImageSharp)!,
  // )

  return (
    <>
      <PageCoverLong
        title="UBC's Premier Capital Markets Club"
        image="home"
        description="Creating quality equity research while enriching education through peer mentorship and training seminars."
        height="600px"
      />
      <FadeInBox>
        <div className={section}>
          <div />
          <div className={content}>
            <div>
              <h1>What We Do</h1>
              <p>Our equity research investigates the valuation considerations of public equities, built on a balance of both the quantitative analysis of financial statements and market trends, as well as the qualitative consideration of competitive strengths and weaknesses.</p>
            </div>
            <LinkButton link="/research" text="View Research" />
          </div>
          <img
            className={imgRight}
            alt="research"
            src={researchImage}
          />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <img
            className={imgLeft}
            alt="placements"
            src={placementsImage}
          />
          <div className={content}>
            <div>
              <h1>Connect With Alumni</h1>
              <p>Many of our members and alumni work in major financial institutions spanning major financial hubs across the world, including London, Los Angeles, New York, Hong Kong, Toronto, Vancouver, and Calgary.</p>
            </div>
            <LinkButton link="/placements" text="See Our Placements" />
          </div>
          <div />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <div />
          <div className={content}>
            <div>
              <h1>Join Us</h1>
              <p>Learn with a group of passionate like-minded individuals.</p>
            </div>
            <LinkButton link="/hiring" text="View Hiring Details" />
          </div>
          <img
            className={imgRight}
            alt="hiring"
            src={hiringImage}
          />
        </div>
      </FadeInBox>
      <div className={glanceSection}>
        <div className={container}>
          <FadeInBox>
            <h1>WestPeak at a Glance</h1>
          </FadeInBox>
          <FadeInBox>
            <div className={accomplishments}>
              <IncreasingBox
                to={
                  new Date(
                    new Date().valueOf() - new Date("2014-09-01").valueOf(),
                  ).getFullYear() - 1970
                }
              >
                Years since inception
              </IncreasingBox>
              <IncreasingBox to={researchCount}>
                Research reports published
              </IncreasingBox>
              <IncreasingBox to={alumniCount} add={true}>
                Alumni
              </IncreasingBox>
            </div>
          </FadeInBox>
        </div>
      </div>
      <div className={container}>
        <FadeInBox>
          <h1>Reach New Heights</h1>
        </FadeInBox>
        <FadeInBox>
          {/*<RandomPlacementsTable
            images={placements}
            limit={10}
            mobileItemsPerRow={4}
            mobileLimit={8}
          />*/}
        </FadeInBox>
      </div>
    </>
  )
}

export default Home
