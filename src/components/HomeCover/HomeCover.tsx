import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import {
  container,
  homeCover,
  accomplishments,
  content,
  section,
  imgRight,
  imgLeft,
  blur,
  glanceSection,
} from "./HomeCover.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"
import IncreasingBox from "../ui/IncreasingBox/IncreasingBox"
import LinkButton from "../ui/LinkButton/LinkButton"
import PlacementsTable from "../ui/PlacementsTable/PlacementsTable"

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
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 2000)
        }
      }
      research: allMarkdownRemark(
        filter: { frontmatter: { type: { in: "report" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            isIndustryResearch
          }
        }
      }
      banner: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, quality: 70)
        }
      }
      placements: allFile(
          filter: { absolutePath: { regex: "/placements\/(goldman|jpmorgan|morganstanley|evercore|cpp|blackrock|blackstone|rbc|cibc|td)/" }}
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
  const imageData = data.banner!.childImageSharp!.gatsbyImageData
  imageData.layout = "fullWidth"
  const placements = data.placements.nodes.map((i) => getImage(i.childImageSharp)!)

  return (
    <>
      <div style={{ display: "grid", height: "600px" }} className={homeCover}>
        <GatsbyImage style={{ gridArea: "1/1" }} alt="" image={imageData} />
        <div
          className={blur}
          style={{
            gridArea: "1/1",
            position: "relative",
            display: "flex",
          }}
        >
          <span>
            <FadeInBox>
              <h1>UBC's Premier Capital Markets Club</h1>
            </FadeInBox>
            <FadeInBox>
              <p>
                We aim to create quality equity research while enriching
                education of our members through active peer mentorship and
                structured training seminars.
              </p>
            </FadeInBox>
          </span>
        </div>
      </div>
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
            src="../../images/2nd_Years.jpg"
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
          <h1>A Higher Standard of Career Success</h1>
        </FadeInBox>
        <FadeInBox>
          <PlacementsTable images={placements} homeCover/>
        </FadeInBox>
        <FadeInBox>
          <LinkButton link="/placements" text="See Our Placements" />
        </FadeInBox>
      </div>
    </>
  )
}

export default Home
