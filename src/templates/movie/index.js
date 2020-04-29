import React from "react";
import Helmet from "react-helmet";
import { Link, navigate, graphql } from "gatsby";
import dashify from "dashify";
import camelCase from "camelcase";
import classNames from "classnames";

import Layout from "../../components/layout";
import Gallery from "../../components/Gallery";
import s from "./index.module.css";
import bgWEBM from "./bg.webm";
import bgMP4 from "./bg.mp4";

class MoviePageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.bg = React.createRef();
  }

  componentDidMount() {
    this.setBackgroundPlayRate();
  }

  componentDidUpdate() {
    this.setBackgroundPlayRate();
  }

  setBackgroundPlayRate() {
    this.bg.current.playbackRate = 0.5;
  }

  getBackPath() {
    const location = this.props.location.pathname.split("/").filter(Boolean);
    location.pop();
    return `/${location.join("/")}/`;
  }

  renderContent({ html, frontmatter: { movies, images } }) {
    if (images) {
      return (
        <Gallery onClose={() => navigate(this.getBackPath())} images={images} />
      );
    }

    if (movies) {
      return (
        <div className={s.movies}>
          {movies.map((movie) => {
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
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  render() {
    const { data } = this.props;
    const post = data.markdownRemark;
    const { site } = data;
    const title = post ? post.frontmatter.title : "...";

    return (
      <Layout>
        <div className={s.root}>
          <div className={s.body}>
            <div className={s.content}>
              <div className={s.contentInner}>
                <Helmet title={`${title} | ${site.siteMetadata.title}`} />
                <Link className={s.backLink} to={this.getBackPath()}>
                  back
                </Link>
                <h1>{title}</h1>
                {post ? this.renderContent(post) : null}
              </div>
            </div>
          </div>
          <video ref={this.bg} className={s.bg} autoPlay loop muted>
            <source src={bgWEBM} type="video/webm" />
            <source src={bgMP4} type="video/mp4" />
          </video>
          <div className={s.bgOverlay} />
        </div>
      </Layout>
    );
  }
}

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
