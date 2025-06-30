import React from "react"
import {
  container,
  member,
  memberImage,
  name,
  degree,
  title,
  text,
  researchTitle,
  researchLink,
  noResearch,
} from "./teamMember.module.css"
import Layout from "../components/Layout"

export default function teamMember({ data }: { data: Queries.teamMemberQuery }) {
  const post = data.markdownRemark
  const research = post.frontmatter.research

  const getResearchButtonLabel = (paper: string) => {
    const industryPrefixes = ["CR", "NR", "REGL", "TMT"]
    const prefix = paper.substr(0, paper.indexOf("_"))
    let label = prefix

    // add the year to the label if it's industry research
    if (industryPrefixes.includes(prefix)) {
      label = prefix + " " + paper.substring(paper.length - 8, paper.length - 4)
    }

    return label
  }

  const headshot = getImage(post.frontmatter.headshot.childImageSharp)

  return (
    <Layout>
      <div className={container}>
        <div className={member}>
          <div className={memberImage}>
            <GatsbyImage image={headshot} alt="headshot" />
          </div>
          <div>
            <span className={name}>{post.frontmatter.name}</span>
            <span className={title}>{post.frontmatter.position}</span>
            <span className={degree}>{post.frontmatter.degree}</span>

            <div
              className={text}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div>
              <span className={researchTitle}>Research</span>
              <br />
              {research.length !== 0 ? (
                research.map((paper, index) => (
                  <>
                    <br />
                    <a
                      rel="noopener noreferrer"
                      href={withPrefix(`${paper}`)}
                      target="_blank"
                      key={index}
                      className={researchLink}
                    >
                      {getResearchButtonLabel(paper)}
                    </a>
                    <br />
                  </>
                ))
              ) : (
                <p className={noResearch}>Coming Soon!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query teamMember($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        name
        position
        degree
        research
        headshot {
          publicURL
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              width: 1000
              height: 1500
              quality: 70
            )
          }
        }
      }
    }
  }
`
