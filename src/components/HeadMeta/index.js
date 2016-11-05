import React from 'react';
import Helmet from 'react-helmet';
import favicon from './images/favicon.png';

const HeadMeta = () => (
  <div hidden>
    <Helmet
      meta={ [
        {
          name: 'viewport',
          content: 'width=device-width'
        },
        {
          name: 'google-site-verification',
          content: 'VaTl-665VAXK5f8XfQqBeAyYW71Y91rhpF4AvwsBVZY'
        },
        {
          name: 'generator',
          content: `${process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`
        }
      ] }
      link={ [
        { rel: 'icon', type: 'image/png', href: favicon }
      ] }
      script={ [
        { src: 'https://cdn.polyfill.io/v2/polyfill.min.js' },
      ] }
    />
  </div>
);

export default HeadMeta;
