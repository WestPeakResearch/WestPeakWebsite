import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./AlumniTable.module.css"


function Careers(props){



    return(
        <div className = {styles.table}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ fontSize: 16 }}>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            {props.data.nodes.map(node => (
              <tr className = {styles.tableContent}>
                <td className = {styles.name}><a href = {node.linkedin1}>{node.name1}</a></td>
                <td className = {styles.name}><a href = {node.linkedin2}>{node.name2}</a></td>
                <td className = {styles.name}><a href = {node.linkedin3}>{node.name3}</a></td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
}

  
  function AlumniTable(){
  
      const data = useStaticQuery(graphql`
          query alumniQuery{
              alumni: allAlumniXlsxAlumni
                {
                 nodes {
                   name1
                   linkedin1                  
                   name2
                   linkedin2                  
                   name3
                   linkedin3
                 }
               }
          }
      `)
      const alumni = data.alumni
      return(
              <Careers data={alumni} />
      )
  
  }

  export default AlumniTable