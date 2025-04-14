import React from "react"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import {
  imageGrid,
  gridImage,
  noMobileGrid,
} from "./PlacementsTable.module.css"
import { classNames } from "primereact/utils"
import FadeInBox from "../FadeInBox/FadeInBox"

interface PlacementsTableProps {
  title: string
  images: (IGatsbyImageData | undefined | null)[]
  itemsPerRow?: number
  homeCover?: boolean
}

function PlacementsTable({
  title,
  images,
  itemsPerRow = 5,
  homeCover = false,
}: PlacementsTableProps) {
  const rows = []
  for (let i = 0; i < images.length; i += itemsPerRow) {
    const row = images.slice(i, i + itemsPerRow)
    rows.push(row)
  }

  return (
    <FadeInBox>
      <p>
        <b>{title}</b>
      </p>
      <div
        className={classNames(imageGrid, { [noMobileGrid]: homeCover })}
        style={{ "--items-per-row": itemsPerRow } as React.CSSProperties}
      >
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map(
              (image, colIndex) =>
                image && (
                  <FadeInBox key={`${rowIndex}-${colIndex}`}>
                    <GatsbyImage
                      key={`${rowIndex}-${colIndex}`}
                      className={gridImage}
                      image={image}
                      alt={`Image ${rowIndex * itemsPerRow + colIndex + 1}`}
                      objectFit="contain"
                    />
                  </FadeInBox>
                ),
            )}
          </React.Fragment>
        ))}
      </div>
    </FadeInBox>
  )
}

export default PlacementsTable
