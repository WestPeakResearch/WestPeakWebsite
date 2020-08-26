import React from "react"
import styles from "./Team.module.css"
import {useStaticQuery, graphql} from "gatsby"
import ManagementCard from "../ManagementCard"
import TeamMemberCard from "../TeamMemberCard"




function Team(){
    const data = useStaticQuery(graphql`
    query teamQuery {
        allMarkdownRemark(filter: {frontmatter: {type: {eq: "team"}}}) {
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
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                    base64
                  }
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

      const team = data.allMarkdownRemark.nodes
      const management  = team.filter(function (node) {
          return node.frontmatter.management === "True"
      })
      const members = team.filter(function (node) {
          return node.frontmatter.management !== "True"
      })
      console.log(management)
      console.log(members)


    return(
        <>
        {management.map((member, index) => (
            <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug} />
        ))}
         {members.map((member, index) => (
            <TeamMemberCard key = {index} member = {member.frontmatter} slug = {member.fields.slug} />
        ))}
        </>
    )
}


export default Team