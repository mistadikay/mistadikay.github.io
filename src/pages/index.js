import React from "react";
import { Link, graphql } from "gatsby";
import classNames from "classnames";

import Layout from "../components/layout";
import * as s from "./index.module.css";

import email from "./images/icons/email.svg";
import facebook from "./images/icons/facebook.svg";
import github from "./images/icons/github.svg";
import instagram from "./images/icons/instagram.svg";
import linkedin from "./images/icons/linkedin.svg";
import medium from "./images/icons/medium.svg";
import skype from "./images/icons/skype.svg";
import twitter from "./images/icons/twitter.svg";
import movie from "./images/icons/movie.svg";
import film from "./images/icons/film.svg";

const links = [
  {
    type: "email",
    title: "E-mail",
    href: "mailto:iam@mistadikay.com",
    icon: email,
  },
  {
    type: "skype",
    title: "Skype",
    href: "skype:mr_di_kay?call",
    icon: skype,
  },
  {
    type: "linkedin",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/mistadikay",
    icon: linkedin,
  },
  {
    type: "github",
    title: "Github",
    href: "https://github.com/mistadikay",
    icon: github,
  },
  {
    type: "medium",
    title: "Medium",
    href: "https://medium.com/@mistadikay",
    icon: medium,
  },
  {
    type: "twitter",
    title: "Twitter",
    href: "https://twitter.com/mistadikay",
    icon: twitter,
  },
  {
    type: "facebook",
    title: "Facebook",
    href: "https://www.facebook.com/mistadikay",
    icon: facebook,
  },
  {
    type: "instagram",
    title: "Instagram",
    href: "https://www.instagram.com/mistadikay",
    icon: instagram,
  },
  {
    type: "film",
    title: "Film",
    href: "/film",
    icon: film,
  },
  {
    type: "movie",
    title: "Movies",
    to: "/movies",
    icon: movie,
  },
];

const App = () => (
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
