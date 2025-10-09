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
    { label: "Senior Analyst", value: "Senior Analyst" },
    { label: "Junior Analyst", value: "Junior Analyst" },
    { label: "Alumni", value: "Alumni" },
  ]

  const team = data.allMarkdownRemark.nodes

  useEffect(() => {
    setTeam(
      localStorage.getItem("team") || "Management",
    )
  }, [])

  const teamMembers = {
    Management: team.filter(member => member.frontmatter!.management === "True"),
    "Group Heads": team.filter(
      member =>
        member.frontmatter!.management !== "True" &&
        member.frontmatter!.position!.includes("Head"),
    ),
    "Senior Analysts": team.filter(
      member =>
        member.frontmatter!.management !== "True" &&
        member.frontmatter!.position!.includes("Senior Analyst"),
    ),
    "Junior Analysts": team.filter(
      member =>
        member.frontmatter!.management !== "True" &&
        member.frontmatter!.position!.includes("Junior Analyst"),
    ),
    Alumni: [],
  }

//   const teamMembers = {
//     Management: team.filter(
//       member => member.frontmatter!.management === "True",
//     ),
//     "Group Heads": team.filter(
//       member =>
//         member.frontmatter!.management !== "True" &&
//         member.frontmatter!.position!.includes("Head"),
//     ),
//     Alumni: [],
//   }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const team = params.get("team")
    const validTeams = ["Management", "Group Heads", "Senior Analyst", "Junior Analyst", "Alumni"]
    if (team && validTeams.includes(team)) {
        setTeam(team)
    } else {
        setTeam("Management")
        params.set("team", "Management")
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`)
  }, [])

  const handleTeamChange = (newTeam: string) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.set("team", newTeam)
    const newUrl = `${window.location.pathname}?${newParams.toString()}`
    window.history.replaceState({}, "", newUrl)
    setTeam(newTeam)
  }

  const handleTeamMobileSelect = (event: DropdownChangeEvent) => {
    event.preventDefault()
    handleTeamChange(event.value)
  }

  function handleMemberButtonClick(event: any) {
    handleTeamChange(event.target.value)
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
              .filter(
                member =>
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
        ) : currTeam === "Group Heads" ? (
          <section className={cards}>
            {teamMembers[currTeam as keyof typeof teamMembers]
              .sort((a, b) =>
                a.frontmatter!.position!.localeCompare(b.frontmatter!.position!),
              )
              .map((member, index) => (
                <>
                  <ManagementCard
                    key={index}
                    member={member.frontmatter}
                    slug={member.fields!.slug}
                  />
                </>
              ),
            )}
          </section>
        ) : (
          <section className={cards}>
            {teamMembers[currTeam as keyof typeof teamMembers].map(
              (member, index) => (
                <>
                  <ManagementCard
                    key={index}
                    member={member.frontmatter}
                    slug={member.fields!.slug}
                  />
                </>
              ),
            )}
          </section>
        )}

        {currTeam === "Alumni" ? <AlumniTable /> : null}
      </main>
    </>
  )
}

export default Team
