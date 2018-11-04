import React from "react";
import { Link, graphql } from "gatsby";
import classNames from "classnames";

import Layout from "../components/layout";
import s from "./index.module.css";

import email from "./images/email.svg";
import facebook from "./images/facebook.svg";
import github from "./images/github.svg";
import instagram from "./images/instagram.svg";
import linkedin from "./images/linkedin.svg";
import medium from "./images/medium.svg";
import skype from "./images/skype.svg";
import twitter from "./images/twitter.svg";
import movie from "./images/movie.svg";

const links = [
  {
    type: "email",
    title: "E-mail",
    href: "mailto:iam@mistadikay.com",
    icon: email
  },
  {
    type: "skype",
    title: "Skype",
    href: "skype:mr_di_kay?call",
    icon: skype
  },
  {
    type: "linkedin",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/mistadikay",
    icon: linkedin
  },
  {
    type: "github",
    title: "Github",
    href: "https://github.com/mistadikay",
    icon: github
  },
  {
    type: "medium",
    title: "Medium",
    href: "https://medium.com/@mistadikay",
    icon: medium
  },
  {
    type: "twitter",
    title: "Twitter",
    href: "https://twitter.com/mistadikay",
    icon: twitter
  },
  {
    type: "facebook",
    title: "Facebook",
    href: "https://www.facebook.com/denis.koltsov",
    icon: facebook
  },
  {
    type: "instagram",
    title: "Instagram",
    href: "https://www.instagram.com/mistadikay",
    icon: instagram
  },
  {
    type: "movie",
    title: "Movies",
    to: "/movies",
    icon: movie
  }
];

const App = props => (
  <div className={s.app}>
    <Layout>
      <div className={s.page}>
        <div className={s.body}>
          {links.map(({ type, icon, ...link }) => {
            const Component = "to" in link ? Link : "a";

            return (
              <Component
                {...link}
                className={classNames(s.link, s[type])}
                style={{ backgroundImage: `url("${icon}")` }}
                key={type}
              >
                {link.title}
              </Component>
            );
          })}
        </div>
      </div>
    </Layout>
  </div>
);

export default App;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
