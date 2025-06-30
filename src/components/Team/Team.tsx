import { useState, useEffect } from "react"
import { useLoaderData } from "react-router"
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
import ManagementCard from "../ManagementCard"
import AlumniTable from "../AlumniTable"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { TeamMember } from "../../utils/content"

interface TeamLoaderData {
  teamMembers: TeamMember[]
}

function Team() {
  const { teamMembers: team } = useLoaderData() as TeamLoaderData

  const [currTeam, setTeam] = useState("Management")
  const teamMobileOptions = [
    { label: "Management", value: "Management" },
    { label: "Group Heads", value: "Group Heads" },
    { label: "Alumni", value: "Alumni" },
  ]

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
    Management: team.filter(
      (member: TeamMember) => member.management === true,
    ),
    "Group Heads": team.filter(
      (member: TeamMember) =>
        member.management !== true &&
        member.position.includes("Head"),
    ),
    Alumni: [] as TeamMember[],
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const team = params.get("team")
    const validTeams = ["Management", "Group Heads", "Alumni"]
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
          {Object.keys(teamMembers).map((key: string) => (
            <button
              key={key}
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
                (member: TeamMember) =>
                  member.position.startsWith("Co-Director") ||
                  member.position.startsWith("Director"),
              )
              .map((member: TeamMember, index: number) => (
                <ManagementCard
                  key={index}
                  member={member}
                  slug={member.slug}
                />
              ))}
            <div className={breakCard}></div>
            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter((member: TeamMember) =>
                member.position.startsWith("Vice-President"),
              )
              .map((member: TeamMember, index: number) => (
                <ManagementCard
                  key={index}
                  member={member}
                  slug={member.slug}
                />
              ))}
            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter((member: TeamMember) =>
                member.position.includes("External"),
              )
              .map((member: TeamMember, index: number) => (
                <ManagementCard
                  key={index}
                  member={member}
                  slug={member.slug}
                />
              ))}

            <div className={breakCard}></div>

            <div className={breakCard}></div>
            {teamMembers[currTeam]
              .filter((member: TeamMember) => member.position.includes("Tech"))
              .map((member: TeamMember, index: number) => (
                <ManagementCard
                  key={index}
                  member={member}
                  slug={member.slug}
                />
              ))}

            <div className={breakCard}></div>

            <div className={breakCard}></div>
          </section>
        ) : currTeam === "Group Heads" ? (
          <section className={cards}>
            {teamMembers[currTeam as keyof typeof teamMembers]
              .sort((a: TeamMember, b: TeamMember) =>
                a.position.localeCompare(b.position),
              )
              .map((member: TeamMember, index: number) => (
                <ManagementCard
                  key={index}
                  member={member}
                  slug={member.slug}
                />
              ))}
          </section>
        ) : (
          <section className={cards}>
            {teamMembers[currTeam as keyof typeof teamMembers].map(
              (member: TeamMember, index: number) => (
                <ManagementCard
                  key={index}
                  member={member}
                  slug={member.slug}
                />
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
