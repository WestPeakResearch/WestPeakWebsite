const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  type
                }
                fields {
                  slug
                }
              }
            }
          }
        }
    `)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if(node.frontmatter.type == "team"){
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/teamMember.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    }
    })
  }