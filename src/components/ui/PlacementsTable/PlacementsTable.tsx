import React from "react"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import { imageGrid, gridImage, noMobileGrid } from "./PlacementsTable.module.css"
import { classNames } from "primereact/utils"
import FadeInBox from "../FadeInBox/FadeInBox"
interface PlacementsTableProps {
  images: IGatsbyImageData[]
  itemsPerRow?: number
  homeCover?: boolean
}

function PlacementsTable({ images, itemsPerRow = 5, homeCover = false }: PlacementsTableProps) {
  const rows = []
  for (let i = 0; i < images.length; i += itemsPerRow) {
    const row = images.slice(i, i + itemsPerRow)
    rows.push(row)
  }

  return (
    <div 
      className={classNames(imageGrid, { [noMobileGrid]: homeCover })} 
      style={{ '--items-per-row': itemsPerRow } as React.CSSProperties}
    >
      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((image, colIndex) => (
            <FadeInBox key={`${rowIndex}-${colIndex}`}>
              <GatsbyImage
                key={`${rowIndex}-${colIndex}`}
                className={gridImage}
                image={image}
                alt={`Image ${rowIndex * itemsPerRow + colIndex + 1}`}
                objectFit="contain"
              />
            </FadeInBox>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default PlacementsTable
