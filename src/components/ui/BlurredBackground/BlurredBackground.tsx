import React from "react"
import { background, blur } from "./BlurredBackground.module.css"

function BlurredBackground({ url, children }: {url: string, children?: React.ReactNode}) {
  return (
    <div
      className={background}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`,
      }}
    >
      <div className={blur}>{children}</div>
    </div>
  )
}

export default BlurredBackground
