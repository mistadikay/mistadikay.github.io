import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { Link, navigate, graphql } from "gatsby";
import dashify from "dashify";
import camelCase from "camelcase";
import classNames from "classnames";

import Layout from "../../components/layout";
import Gallery from "../../components/Gallery";
import * as s from "./index.module.css";
import bgWEBM from "./bg.webm";
import bgMP4 from "./bg.mp4";

const MoviePageTemplate = ({ data, location }) => {
  const bg = React.createRef();
  useEffect(() => {
    bg.current.playbackRate = 0.5;
  });

  // determine path for a "back" link
  const pathList = location.pathname.split("/").filter(Boolean);
  pathList.pop();
  const backPath = pathList.length ? `/${pathList.join("/")}/` : "/";

  // determine page content
  const { site, markdownRemark } = data;
  let title = "...";
  let post = null;
  if (markdownRemark) {
    const { html, frontmatter } = markdownRemark;
    title = frontmatter.title;

    if (frontmatter.images) {
      post = (
        <Gallery
          onClose={() => navigate(backPath)}
          images={frontmatter.images}
        />
      );
    } else if (frontmatter.movies) {
      post = (
        <div className={s.movies}>
          {frontmatter.movies.map((movie) => {
            const movieClassName = `cover_${camelCase(movie).replace(":", "")}`;
            const movieLink = `/movies/${dashify(movie)}/`;

            return (
              <Link
                className={classNames(s.cover, s[movieClassName])}
                to={movieLink}
                key={movie}
              >
                <span className={s.title}>{movie}</span>
              </Link>
            );
          })}
        </div>
      );
    } else {
      post = <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
  }

  return (
    <Layout>
      <div className={s.root}>
        <div className={s.body}>
          <div className={s.content}>
            <div className={s.contentInner}>
              <Helmet title={`${title} | ${site.siteMetadata.title}`} />
              <Link className={s.backLink} to={backPath}>
                back
              </Link>
              <h1>{title}</h1>
              {post}
            </div>
          </div>
        </div>
        <video ref={bg} className={s.bg} autoPlay loop muted>
          <source src={bgWEBM} type="video/webm" />
          <source src={bgMP4} type="video/mp4" />
        </video>
        <div className={s.bgOverlay} />
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
`;
