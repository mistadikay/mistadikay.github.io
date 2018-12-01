import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import get from "lodash/get";

import Layout from "../../components/layout";
import s from "./index.module.css";

const moviesRootPath = "/movies/";

const MoviePageTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const siteTitle = get(data, "site.siteMetadata.title");
  const rootPath = `${__PATH_PREFIX__}/`;
  const header = (
    <Link
      style={{
        boxShadow: "none",
        textDecoration: "none",
        color: "inherit"
      }}
      to={
        window.location.pathname === moviesRootPath ? rootPath : moviesRootPath
      }
    >
      back
    </Link>
  );

  return (
    <Layout>
      <div className={s.root}>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        {header}
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export default MoviePageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
