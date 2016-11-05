// Hot loading HRM Patch
import 'react-hot-loader/patch';

// fetch polyfill
import 'whatwg-fetch';

import metadata from '../src/metadata.js';
import routes from '../src/routes.js';
import store from '../src/store.js';
import phenomicClient from 'phenomic/lib/client';

phenomicClient({ metadata, routes, store });

// md files processed via phenomic-loader to JSON & generate collection
let mdContext = require.context('../content', true, /\.md$/);
mdContext.keys().forEach(mdContext);

// hot loading
if (module.hot) {

  // hot load md
  module.hot.accept(mdContext.id, () => {
    mdContext = require.context('../content', true, /\.md$/);
    const mdHotUpdater = require('phenomic/lib/client/hot-md').default;

    const requireUpdate = mdHotUpdater(mdContext, window.__COLLECTION__, store);
    mdContext.keys().forEach(requireUpdate);
  });

  // hot load app
  module.hot.accept(
    [ '../src/metadata.js', '../src/routes.js', '../src/store.js' ],
    // webpack 1
    // () => phenomicClient({
    //   metadata: require('../src/metadata.js').default,
    //   routes: require('../src/routes.js').default,
    //   store: require('../src/store.js').default,
    // })
    // webpack 2
    () => phenomicClient({ metadata, routes, store })
  );
}

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-12099885-2', 'auto');
ga('send', 'pageview');
/* eslint-enable */
