const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                movies
                images {
                  caption
                  image {
                    childImageSharp {
                      fluid {
                        src
                        srcSet
                        sizes
                        aspectRatio
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach((post) => {
    const { slug } = post.node.fields;

    createPage({
      path: slug,
      component: path.resolve("./src/templates/movie/index.js"),
      context: {
        slug,
      },
    });
  });

  return result;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
