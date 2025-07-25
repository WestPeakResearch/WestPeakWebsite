import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { media, strategyCardDescription } from "./StrategyCards.module.css"
import FadeInBox from "../../ui/FadeInBox/FadeInBox"

export function StrategyCards({
  strategies,
}: {
  strategies: Queries.AboutQuery["strategies"]["nodes"]
}) {
  return strategies.map(node => (
    <div key={node.frontmatter!.name!}>
      <FadeInBox>
        <GatsbyImage
          className={media}
          image={getImage(node.frontmatter!.images![0]!.childImageSharp!)!}
          alt={node.frontmatter!.name!}
        />
        <div className={strategyCardDescription}>
          <h1>{node.frontmatter!.name}</h1>
          <span dangerouslySetInnerHTML={{ __html: node.html! }} />
        </div>
      </FadeInBox>
    </div>
  ))
}
