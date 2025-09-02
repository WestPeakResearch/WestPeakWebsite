import React, { useState, useEffect, useRef, useMemo } from "react"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import { imageGrid, gridImage } from "./PlacementsTable.module.css"
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion"
import { useWindowSize } from "../../../hooks/useWindowSize"

interface RandomPlacementsTableProps {
  images: IGatsbyImageData[]
  limit: number
  itemsPerRow?: number
  mobileLimit?: number
  mobileItemsPerRow?: number
}

function RandomPlacementsTable({ 
  images, 
  limit,
  itemsPerRow = 5, 
  mobileLimit,
  mobileItemsPerRow = 3,
}: RandomPlacementsTableProps) {
  const { width } = useWindowSize()
  const isMobile = width <= 900
  
  const effectiveLimit = useMemo(() => {
    if (isMobile && mobileLimit !== undefined) {
      return Math.min(mobileLimit, images.length)
    }
    return Math.min(limit, images.length)
  }, [isMobile, mobileLimit, limit, images.length])
  
  const effectiveItemsPerRow = useMemo(() => {
    return isMobile ? mobileItemsPerRow : itemsPerRow
  }, [isMobile, mobileItemsPerRow, itemsPerRow])
  
  const displayedImagesRef = useRef<IGatsbyImageData[]>([])
  const remainingIndicesRef = useRef<Set<number>>(new Set(Array.from({ length: 0 })))
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  
  const positionLastSwappedRef = useRef<number[]>([])

  const [displayedImages, setDisplayedImages] = useState<IGatsbyImageData[]>([])

  const initializeImages = () => {
    const allIndices = new Set(Array.from({ length: images.length }, (_, i) => i))
    const selectedImages: IGatsbyImageData[] = []
    
    while (selectedImages.length < effectiveLimit) {
      const randomIndex = Math.floor(Math.random() * images.length)
      if (allIndices.has(randomIndex)) {
        selectedImages.push(images[randomIndex])
        allIndices.delete(randomIndex)
      }
    }

    displayedImagesRef.current = selectedImages
    remainingIndicesRef.current = allIndices
    
    positionLastSwappedRef.current = Array(effectiveLimit).fill(0)
    
    return selectedImages
  }

  const pickPositionWithBias = () => {
    const now = Date.now()
    const swapTimes = positionLastSwappedRef.current
    
    const weights = swapTimes.map(time => {
      const timeSinceLastSwap = now - time + 1
      return Math.pow(timeSinceLastSwap, 1/3)
    })
    
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    
    let randomValue = Math.random() * totalWeight
    
    for (let i = 0; i < weights.length; i++) {
      randomValue -= weights[i]
      if (randomValue <= 0) {
        return i
      }
    }
    
    return Math.floor(Math.random() * effectiveLimit)
  }

  const swapOneImage = () => {
    const positionToSwap = pickPositionWithBias()
    
    const remainingArray = Array.from(remainingIndicesRef.current)
    const indexToAdd = remainingArray[Math.floor(Math.random() * remainingArray.length)]
    
    const newDisplayedImages = [...displayedImagesRef.current]
    newDisplayedImages[positionToSwap] = images[indexToAdd]
    
    const oldImageIndex = images.indexOf(displayedImagesRef.current[positionToSwap])
    remainingIndicesRef.current.delete(indexToAdd)
    remainingIndicesRef.current.add(oldImageIndex)
    
    positionLastSwappedRef.current[positionToSwap] = Date.now()
    
    displayedImagesRef.current = newDisplayedImages
    setDisplayedImages(newDisplayedImages)
    
    scheduleNextSwap()
  }
  
  const scheduleNextSwap = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    const randomDelay = Math.floor(Math.random() * 2000) + 1000
    
    timeoutRef.current = setTimeout(swapOneImage, randomDelay)
  }

  useEffect(() => {
    const initialImages = initializeImages()
    setDisplayedImages(initialImages)

    scheduleNextSwap()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [effectiveLimit, effectiveItemsPerRow, images.length])

  const rows = []
  for (let i = 0; i < displayedImages.length; i += effectiveItemsPerRow) {
    const row = displayedImages.slice(i, i + effectiveItemsPerRow)
    rows.push(row)
  }

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div 
        className={imageGrid} 
        style={{ '--items-per-row': effectiveItemsPerRow } as React.CSSProperties}
      >
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((image, colIndex) => {
              const position = rowIndex * effectiveItemsPerRow + colIndex
              const imageId = images.indexOf(image)
              
              return (
                <AnimatePresence mode="wait" key={`position-${position}`}>
                  <m.div
                    key={`image-${imageId}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={imageVariants}
                  >
                    <GatsbyImage
                      className={gridImage}
                      image={image}
                      alt={`Image ${position + 1}`}
                      objectFit="contain"
                    />
                  </m.div>
                </AnimatePresence>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </LazyMotion>
  )
}

export default RandomPlacementsTable
