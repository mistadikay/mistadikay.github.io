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
    </Helmet>
    {children}
  </>
);

export default Layout;
