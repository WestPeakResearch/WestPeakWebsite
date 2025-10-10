import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage, getImage } from "gatsby-plugin-image"
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

function Home() {
  const data: Queries.HomeQuery = useStaticQuery(graphql`
    query Home {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "home" } } }
        sort: { frontmatter: { order: ASC } }
      ) {
        nodes {
          html
        }
      }
      research: allMarkdownRemark(
        filter: { frontmatter: { type: { in: "report" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
        }
      }
      placements: allFile(
        filter: { absolutePath: { regex: "/placements/.+(jpg|png|webp)/" } }
        sort: { absolutePath: ASC }
      ) {
        nodes {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 1000)
          }
        }
      }
    }
  `)

  const alumniCount = 150
  const researchCount = data.research.nodes.length
  const placements = data.placements.nodes.map(
    i => getImage(i.childImageSharp)!,
  )

  return (
    <>
      <PageCoverLong
        title="WestPeak Research Association"
        image="home"
        description="The University of British Columbia's premier student led capital markets and finance club."
        height="600px"
        mobileHeight="500px"
      />
      <FadeInBox>
        <div className={section}>
          <div />
          <div className={content}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[1].html!,
              }}
            />
            <LinkButton link="/research" text="View Research" />
          </div>
          <StaticImage
            className={imgRight}
            alt="research"
            src="../../images/research.jpg"
            placeholder="blurred"
          />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <StaticImage
            className={imgLeft}
            alt="placements"
            src="../../images/VPs-3.jpg"
            placeholder="blurred"
          />
          <div className={content}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[2].html!,
              }}
            />
            <LinkButton link="/placements" text="See Our Placements" />
          </div>
          <div />
        </div>
      </FadeInBox>
      <FadeInBox>
        <div className={section}>
          <div />
          <div className={content}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[3].html!,
              }}
            />
            <LinkButton link="/hiring" text="View Hiring Details" />
          </div>
          <StaticImage
            className={imgRight}
            alt="hiring"
            src="../../images/firstyears.jpg"
            placeholder="blurred"
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
          <RandomPlacementsTable
            images={placements}
            limit={10}
            mobileItemsPerRow={4}
            mobileLimit={8}
          />
        </FadeInBox>
      </div>
    </>
  )
}

export default Home
