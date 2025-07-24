import React, {useEffect, useState, useRef} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Carousel } from "primereact/carousel"
import {
  carouselContainer,
  carouselContent,
  media,
  strategyCardDescription
} from "./StrategyCarousel.module.css"
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import "primereact/resources/primereact.min.css"

export function StrategyCarousel({
  strategies,
}: {
  strategies: Queries.AboutQuery["strategies"]["nodes"]
}) {
  const cards = strategies.map(node => (
    <div key={node.frontmatter!.name!}>
      <GatsbyImage
        className={media}
        image={getImage(node.frontmatter!.images![0]!.childImageSharp!)!}
        alt={node.frontmatter!.name!}
      />
      <div className={strategyCardDescription}>
        <h1>{node.frontmatter!.name}</h1>
        <span dangerouslySetInnerHTML={{ __html: node.html! }} />
      </div>
    </div>
  ))

  const [page, setPage] = useState(0);

  const pageChangeInterval = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    pageChangeInterval.current = setInterval(() => {
      setPage(page => (page + 1) % cards.length);
    }, 10000);
  }, []);

  return (
    <Carousel
      containerClassName={carouselContainer}
      contentClassName={carouselContent}
      value={[...Array(cards.length).keys()]}
      numVisible={1}
      numScroll={1}
      itemTemplate={index => cards[index]}
      showIndicators={false}
      page={page}
      onPageChange={(event) => {
        if (event.page !== page) {
          pageChangeInterval.current && clearTimeout(pageChangeInterval.current)
        }
        setPage(event.page)
      }}
    />
  )
}
