import { combineReducers } from 'redux';
import createStore from 'phenomic/lib/redux/createStore';
import * as phenomicReducers from 'phenomic/lib/redux/modules';

const store = createStore(
  combineReducers(phenomicReducers),
  /* eslint-disable no-underscore-dangle */
  { ...(typeof window !== 'undefined') && window.__INITIAL_STATE__ },
  /* eslint-enable no-underscore-dangle */
);

export default store;
