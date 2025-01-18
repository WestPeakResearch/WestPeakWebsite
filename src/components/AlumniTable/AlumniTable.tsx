import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  table,
  name,
  year,
  row,
  nameRow,
  nameRowTitle,
} from "./AlumniTable.module.css"

function Alumni(props: { data: Queries.AlumniQuery }) {
  return (
    <div className={table}>
      <div style={{ overflowX: "auto" }}>
        {(props.data.alumni.edges as any)
          .toSorted((a: any, b: any) => {
            return b.node.order - a.node.order
          })
          .map((edge: any, i: number) => (
            <YearRow
              key={"row" + i}
              year={edge.node.year}
              management={edge.node.management}
              gh={edge.node.gh}
            />
          ))}
      </div>
    </div>
  )
}

function YearRow(props: {key: string, year: string, management: any[], gh: any[]}) {
  return (
    <div className={row}>
      <div className={year}>
        <h3>{props.year}</h3>
      </div>
      {props.gh.length > 0 ? (
        <>
          <div className={nameRow}>
            <div
              style={{
                gridRow: "span " + Math.ceil(props.management.length / 3),
              }}
              className={nameRowTitle}
            >
              Management
            </div>
            {props.management.map((mgmt, i) => (
              <a
                className={name}
                href={mgmt.linkedin}
                key={"mgmt" + i}
                target="_blank"
                rel="noreferrer"
              >
                {mgmt.name}
              </a>
            ))}
          </div>
          <div className={nameRow}>
            <div
              style={{ gridRow: "span " + Math.ceil(props.gh.length / 3) }}
              className={nameRowTitle}
            >
              Group Heads
            </div>
            {props.gh.map((gh, i) => (
              <a
                className={name}
                href={gh.linkedin}
                key={"gh" + i}
                target="_blank"
                rel="noreferrer"
              >
                {gh.name}
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className={nameRow}>
          {props.management.map((mgmt, i) => (
            <a
              className={name}
              href={mgmt.linkedin}
              key={"mgmt" + i}
              target="_blank"
              rel="noreferrer"
            >
              {mgmt.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function AlumniTable() {
  const data = useStaticQuery(graphql`
    query Alumni {
      alumni: allAlumniJsonJson {
        edges {
          node {
            order
            year
            management {
              name
              linkedin
            }
            gh {
              name
              linkedin
            }
          }
        }
      }
    }
  `)
  return <Alumni data={data} />
}

export default AlumniTable
