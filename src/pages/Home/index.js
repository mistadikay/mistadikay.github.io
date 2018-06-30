import React from "react";
import classNames from "classnames";

import email from "./images/email.svg";
import facebook from "./images/facebook.svg";
import github from "./images/github.svg";
import instagram from "./images/instagram.svg";
import linkedin from "./images/linkedin.svg";
import medium from "./images/medium.svg";
import skype from "./images/skype.svg";
import twitter from "./images/twitter.svg";
import s from "./index.module.css";

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
  }
];

const Home = props => (
  <div className={s.page}>
    <div className={s.body}>
      {links.map(link => (
        <a
          title={link.title}
          href={link.href}
          className={classNames(s.link, s[link.type])}
          style={{ backgroundImage: `url("${link.icon}")` }}
          key={link.type}
        >
          {link.title}
        </a>
      ))}
    </div>
  </div>
);

export default Home;
