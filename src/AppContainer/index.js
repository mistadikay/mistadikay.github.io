import React, { PropTypes } from 'react';

import HeadMeta from '~/components/HeadMeta';

import styles from './index.css';

const AppContainer = (props) => (
  <div className={ styles.app }>
    <HeadMeta />
    { props.children }
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.node
};

export default AppContainer;
