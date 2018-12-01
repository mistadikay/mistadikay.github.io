import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import get from "lodash/get";

import Layout from "../../components/layout";
import s from "./index.module.css";
import bgWEBM from "./bg.webm";
import bgMP4 from "./bg.mp4";

const moviesRootPath = "/movies/";

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

  render() {
    const { data, location } = this.props;
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
        to={location.pathname === moviesRootPath ? rootPath : moviesRootPath}
      >
        back
      </Link>
    );

    return (
      <Layout>
        <div className={s.root}>
          <div className={s.body}>
            <div className={s.content}>
              <div className={s.contentInner}>
                <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
                {header}
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
    }
  }
`;
