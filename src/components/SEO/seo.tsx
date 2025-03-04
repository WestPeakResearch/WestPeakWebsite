/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
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
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site!.siteMetadata!.title}`}
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

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
