import { Helmet } from "react-helmet"

interface SEOProps {
  description?: string,
  lang?: string,
  meta?: Array<any>,
  title: string
}

function SEO({ description = "", lang = "en", meta = [], title} : SEOProps) {
  const defaultTitle = "WestPeak Research Association"
  const defaultDescription = "WestPeak Research Association"

  const metaDescription = description || defaultDescription

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
