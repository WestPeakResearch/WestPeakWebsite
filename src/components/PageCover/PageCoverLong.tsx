import React, { useState, useEffect } from "react"
import {
  pageCoverLong,
  pageTitleLong,
  blur,
} from "./PageCover.module.css"
import FadeInBox from "../ui/FadeInBox/FadeInBox"

interface PageCoverLongProps {
  title: string
  image: string
  description: string
  height?: string
  cta?: React.ReactNode
}

function PageCoverLong({
  title,
  image,
  description,
  cta,
  height = "400px",
}: PageCoverLongProps) {
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Try to load the specific banner image
        const imageModule = await import(`@images/banners/${image}.jpg`)
        setImageUrl(imageModule.default)
      } catch (error) {
        console.warn(`Banner image ${image}.jpg not found, falling back to banner.jpg`)
        // Fallback to default banner
        const fallbackModule = await import(`@images/banner.jpg`)
        setImageUrl(fallbackModule.default)
      }
    }

    loadImage()
  }, [image])

  if (!imageUrl) {
    return null // or a loading spinner
  }

  return (
    <div style={{ display: "grid", height: height }} className={pageCoverLong}>
      <img
        style={{ 
          gridArea: "1/1", 
          height: "100%", 
          width: "100%", 
          objectFit: "cover" 
        }}
        loading="eager"
        alt=""
        src={imageUrl}
      />
      <div
        className={blur}
        style={{
          gridArea: "1/1",
          position: "relative",
          display: "flex",
        }}
      >
        <span className={pageTitleLong}>
          <FadeInBox>
            <h1>{title}</h1>
          </FadeInBox>
          <FadeInBox>
            <p>{description}</p>
          </FadeInBox>
          {cta && <FadeInBox>{cta}</FadeInBox>}
        </span>
      </div>
    </div>
  )
}

export default PageCoverLong
