import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./CareersTable.module.css"

const Careers = props => (
  <div className = {styles.table}>
    <div style={{ overflowX: "auto" }}>
      <table style={{ fontSize: 16 }}>
        <col width="200px" />
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Company</th>
          <th>Location</th>
          <th>Type</th>
        </tr>
        {props.data.nodes.map(node => (
          <tr>
            <td>{node.name}</td>
            <td>{node.position}</td>
            <td>{node.company}</td>
            <td>{node.location}</td>
            <td>{node.type}</td>
          </tr>
        ))}
      </table>
    </div>
  </div>
)


function CareersTable(){

    const data = useStaticQuery(graphql`
        query careersQuery{
            internships2020: allCareersXlsxInternships2019
              {
               nodes {
                 name
                 position
                 company
                 location
                 type
               }
             }
        }
    `)
    const placements = data.internships2020
    return(
        <>
        <div className = {styles.content}>
            <span className = {styles.title}>A Higher Standard of Career Success</span>
            <p>At WestPeak, we’re redefining and raising the bar of successful careers, and our experiences speak to our 
                commitment to professional development. We have countless memebers with competitive internships and full-time 
                experience at Fortune 500 companies, prestigious firms, and unicorn startups.</p>
        </div>
            <Careers data={placements} />
        </>
    )




}

export default CareersTable


// export default function CareersTable(props){

//     const [year, setYear] = useState(props.defaultYear);

//     const handleYearButtonClick = year => {
//         setYear(year)
//     }

//     return(
//     <StaticQuery
//         query={graphql`
//           {
//             internships2020: allCareersXlsxInternships2019
//              {
//               nodes {
//                 name
//                 position
//                 company
//                 location
//                 type
//               }
//             }
//           }
//         `}
//         render={data => {
//           const careersData = {
//             "2020": [
//               {
//                 name: "Internships",
//                 data: data.internships2020,
//               }
//             ],
//           }

//             return (
//                 <div>
//                 {Object.keys(careersData)
//                   .reverse()
//                   .map(key => (
//                     <YearButton
//                       value={key}
//                       currentYear={year}
//                       onClick={handleYearButtonClick}
//                     />
//                   ))}
                
//                 {careersData[2020].map(table => (
//                 <Careers
//                   title={`2020 ${table.name}`}
//                   data={table.data}
//                 />
//               ))}
//               </div>  
//           )
//         }
//     }
//     />
//     )
// }



          
