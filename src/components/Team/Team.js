import React from "react"
import styles from "./Team.module.css"
import {useStaticQuery, graphql} from "gatsby"
import ManagementCard from "../ManagementCard"
import TeamMemberCard from "../TeamMemberCard"




function Team(){
    const data = useStaticQuery(graphql`
    query teamQuery {
        allMarkdownRemark(filter: {frontmatter: {type: {eq: "team"}}}, sort: {order: ASC, fields: frontmatter___position}) {
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
                    fluid(maxWidth:500 maxHeight: 500 quality:100) {
                      ...GatsbyImageSharpFluid
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
        <h3 className = {styles.title}>MANAGEMENT</h3>
        <main>
        <section className={styles.cards}>
          {management.map((member, index) => (
              <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug} />
          ))}
        </section>
        </main>

        <h1>Analysts</h1>
         {members.map((member, index) => (
            <TeamMemberCard key = {index} member = {member.frontmatter} slug = {member.fields.slug} />
        ))}
        </>
    )
}


export default Team