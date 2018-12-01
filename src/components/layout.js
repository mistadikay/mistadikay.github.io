import React from "react";
import Helmet from "react-helmet";

import favicon from "./favicon.png";

const Layout = ({ children }) => (
  <>
    <Helmet>
      <meta name="viewport" content="width=device-width" />
      <meta
        name="google-site-verification"
        content="VaTl-665VAXK5f8XfQqBeAyYW71Y91rhpF4AvwsBVZY"
      />
      <link rel="icon" type="image/png" href={favicon} />
      <style type="text/css">
        {`
        html,
        body {
          height: 100%;
        }

        body {
          font-family: Helvetica, Arial, sans-serif;
          background: #fff;
          color: #333;
          font-size: 14px;
          line-height: 22px;
          margin: 0;
        }

        #___gatsby,
        #___gatsby > div {
          height: 100%;
        }
      `}
      </style>
    </Helmet>
    {children}
  </>
);

export default Layout;
