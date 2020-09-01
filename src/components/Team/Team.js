import React from "react"
import styles from "./Team.module.css"
import {useStaticQuery, graphql} from "gatsby"
import ManagementCard from "../ManagementCard"




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
                    fluid(maxWidth:1000 maxHeight: 1500 quality:70) {
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

      let members = team.filter(function (node) {
          return node.frontmatter.management !== "True"
      })

      function compare( a, b ) {
        if ( a.frontmatter.name < b.frontmatter.name ){
          return -1;
        }
        if ( a.frontmatter.name > b.frontmatter.name ){
          return 1;
        }
        return 0;
      }

      members = members.sort(compare)
      

    return(
        <>
        <h3 className = {styles.title}>MANAGEMENT</h3>
        <main className = {styles.container}>
        <section className={styles.cards}>
          {management.map((member, index) => (
              <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
          ))}
        </section>
        <h3 className = {styles.title}>ANALYSTS</h3>
        <section className={styles.cards}>
         {members.map((member, index) => (
            <ManagementCard key = {index} member = {member.frontmatter} slug = {member.fields.slug}/>
        ))}
        </section>
        </main>
        </>
    )
}


export default Team