import React, { useState, useEffect } from "react"
import {
  container,
  memberButtons,
  activeButton,
  inactiveButton,
  cards,
  mobileDropdownContainer,
  mobileDropdown,
  breakCard,
} from "./Team.module.css"
import { useStaticQuery, graphql } from "gatsby"
import ManagementCard from "../ManagementCard"
import AlumniTable from "../AlumniTable"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"

function Team() {
  const data: Queries.TeamQuery = useStaticQuery(graphql`
    query Team {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "team" } } }
        sort: { frontmatter: { name: ASC } }
      ) {
        nodes {
          frontmatter {
            degree
            management
            name
            position
            research
            headshot {
              publicURL
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  quality: 70
                  layout: CONSTRAINED
                  width: 800
                  height: 1200
                )
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const [currTeam, setTeam] = useState("Management")
  const teamMobileOptions = [
    { label: "Management", value: "Management" },
    { label: "Group Heads", value: "Group Heads" },
    { label: "Alumni", value: "Alumni" },
  ]

  const team = data.allMarkdownRemark.nodes

  // useEffect(() => {
  //   setTeam(
  //     localStorage.getItem("team") || "Management",
  //   )
  // }, [])

  // const teamMembers = {
  //   Management: team.filter(member => member.frontmatter!.management === "True"),
  //   "Group Heads": team.filter(
  //     member =>
  //       member.frontmatter!.management !== "True" &&
  //       member.frontmatter!.position!.includes("Head"),
  //   ),
  //   "Senior Analysts": team.filter(
  //     member =>
  //       member.frontmatter!.management !== "True" &&
  //       member.frontmatter!.position!.includes("Senior Analyst"),
  //   ),
  //   "Junior Analysts": team.filter(
  //     member =>
  //       member.frontmatter!.management !== "True" &&
  //       member.frontmatter!.position!.includes("Junior Analyst"),
  //   ),
  //   Alumni: [],
  // }

  const teamMembers = {
    Management: team.filter(member => member.frontmatter!.management === "True"),
    "Group Heads": team.filter(
      member =>
        member.frontmatter!.management !== "True" &&
        member.frontmatter!.position!.includes("Head"),
    ),
    Alumni: [],
  }

  const handleTeamMobileSelect = (event: DropdownChangeEvent) => {
    event.preventDefault()
    setTeam(event.target.value)
    localStorage.setItem("team", event.target.value)
  }

  function handleMemberButtonClick(event: any) {
    setTeam(event.target.value)
    localStorage.setItem("team", event.target.value)
  }

  return (
    <>
      <main className={container}>
        <div className={mobileDropdownContainer}>
          <span className="p-float-label">
            <Dropdown
              value={currTeam}
              onChange={handleTeamMobileSelect}
              options={teamMobileOptions}
              optionValue="value"
              optionLabel="label"
              className={mobileDropdown}
            />
          </span>
        </div>

        <div className={memberButtons}>
          {Object.keys(teamMembers).map(key => (
            <button
              onClick={handleMemberButtonClick}
              value={key}
              className={key === currTeam ? activeButton : inactiveButton}
            >
              {key}
            </button>
          ))}
        </div>

        {currTeam === "Management" ? (
          <section className={cards}>
            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter(member =>
                member.frontmatter!.position!.startsWith("Co-Director") ||
                member.frontmatter!.position!.startsWith("Director"),
              )
              .map((member, index) => (
                <>
                  <ManagementCard
                    key={index}
                    member={member.frontmatter}
                    slug={member.fields!.slug}
                  />
                </>
              ))}
            <div className={breakCard}></div>
            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter(member =>
                member.frontmatter!.position!.startsWith("Vice-President"),
              )
              .map((member, index) => (
                <>
                  <ManagementCard
                    key={index}
                    member={member.frontmatter}
                    slug={member.fields!.slug}
                  />
                </>
              ))}
            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter(member =>
                member.frontmatter!.position!.includes("External"),
              )
              .map((member, index) => (
                <>
                  <ManagementCard
                    key={index}
                    member={member.frontmatter}
                    slug={member.fields!.slug}
                  />
                </>
              ))}

            <div className={breakCard}></div>

            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter(member => member.frontmatter!.position!.includes("Tech"))
              .map((member, index) => (
                <>
                  <ManagementCard
                    key={index}
                    member={member.frontmatter}
                    slug={member.fields!.slug}
                  />
                </>
              ))}

            <div className={breakCard}></div>

            <div className={breakCard}></div>
          </section>
        ) : (
          <section className={cards}>
            {teamMembers[currTeam as keyof typeof teamMembers].map((member, index) => (
              <>
                <ManagementCard
                  key={index}
                  member={member.frontmatter}
                  slug={member.fields!.slug}
                />
              </>
            ))}
          </section>
        )}

        {currTeam === "Alumni" ? <AlumniTable /> : null}
      </main>
    </>
  )
}

export default Team
