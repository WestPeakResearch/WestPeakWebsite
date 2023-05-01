import React, {useState, useEffect} from "react"
import { container, memberButtons, activeButton, inactiveButton, cards } from "./Team.module.css"
import {useStaticQuery, graphql} from "gatsby"
import ManagementCard from "../ManagementCard"
import AlumniTable from "../AlumniTable"


function Team(){
  const data = useStaticQuery(graphql`
    query teamQuery {
      allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "team"}}}
        sort: {frontmatter: {name: ASC}}
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
                gatsbyImageData(width: 2000, height: 1800, quality: 70)
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

  const team = data.allMarkdownRemark.nodes
  
  useEffect(() => {
    setTeam(localStorage.getItem('team') ? localStorage.getItem('team') : "Management")
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      localStorage.setItem('team', "Management");
    });
  });
   

  const teamMembers = {
    "Management": team.filter( member => member.frontmatter.management === "True"), 
    "Team Leads": team.filter( member => member.frontmatter.management !== "True" && member.frontmatter.position.includes("Head")),
    "Senior Analysts": team.filter( member => member.frontmatter.management !== "True" && member.frontmatter.position.includes("Senior Analyst")),
    "Junior Analysts": team.filter( member => member.frontmatter.management !== "True" && member.frontmatter.position.includes("Junior Analyst")),
    "Alumni": []
  }
 
  function handleMemberButtonClick(event){
    setTeam(event.target.value)
    localStorage.setItem('team', event.target.value);
  }

  return(
    <>
      <main className = {container}>
        <div className = {memberButtons}>
          {
            Object.keys(teamMembers).map(key => (
              <button  
                onClick = {handleMemberButtonClick}
                value = {key}
                className = { key === currTeam ? activeButton : inactiveButton}
              >
                {key}
              </button>
            ))
          }
        </div>

        {currTeam === "Management" ? 
          <section className={cards}>
            {teamMembers[currTeam].filter(member => member.frontmatter.position.startsWith('Director')).map((member, index) => (
              <>
                <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
              </>
            ))}
            {teamMembers[currTeam].filter(member => member.frontmatter.position.startsWith('Internal')).map((member, index) => (
              <>
                <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
              </>
            ))}
            {teamMembers[currTeam].filter(member => member.frontmatter.position.startsWith('External')).map((member, index) => (
              <>
                <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
              </>
            ))}
            {teamMembers[currTeam].filter(member => member.frontmatter.position.startsWith('Tech')).map((member, index) => (
              <>
                <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
              </>
            ))}
          </section>
          :
          <section className={cards}>
            {teamMembers[currTeam].map((member, index) => (
              <>
                <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
              </>
            ))}
          </section>
        }

        {currTeam === "Alumni" ? <AlumniTable /> : null }
      
      </main>
    </>
  )
}


export default Team