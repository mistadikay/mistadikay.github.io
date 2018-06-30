import React from "react";
import Helmet from "react-helmet";

import Home from "./Home";
import favicon from "./favicon.png";
import s from "./index.module.css";

const App = () => (
  <div className={s.app}>
    <Helmet>
      <meta name="viewport" content="width=device-width" />
      <meta
        name="google-site-verification"
        content="VaTl-665VAXK5f8XfQqBeAyYW71Y91rhpF4AvwsBVZY"
      />
      <meta
        name="generator"
        content={`${process.env.PHENOMIC_NAME} ${process.env.PHENOMIC_VERSION}`}
      />
      <link rel="icon" type="image/png" href={favicon} />
    </Helmet>
    <Home />
  </div>
);

export default App;
