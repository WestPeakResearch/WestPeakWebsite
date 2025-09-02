/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  description?: string,
  lang?: string,
  meta: Array<any>,
  title: string
}

function SEO({ description, lang, meta, title } : SEOProps) {
  const { site } : Queries.SEOQuery = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site!.siteMetadata!.description!
  
  return (
    <>
      <html lang={lang} />
      <title>{title} | {site!.siteMetadata!.title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {meta.map((metaItem, index) => (
        <meta key={index} {...metaItem} />
      ))}
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
