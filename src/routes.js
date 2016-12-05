import React from 'react';
import { Route } from 'react-router';
import { PageContainer as PhenomicPageContainer } from 'phenomic';

import AppContainer from './AppContainer';

import Page from './layouts/Page';
import PageError from './layouts/PageError';
import PageLoading from './layouts/PageLoading';
import Homepage from './layouts/Homepage';

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Page,
      PageError,
      PageLoading,
      Homepage
    }}
  />
);

export default (
  <Route component={ AppContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
);
