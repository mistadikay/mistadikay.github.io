import React, { PropTypes } from 'react';
import { BodyContainer } from 'phenomic';

import Page from '../Page';
import styles from './index.css';

const HomePage = (props) => (
  <Page {...props} className={styles.page}>
    <BodyContainer className={styles.body}>
      {
        props.head.links.map((link) => (
          <a
            title={link.title}
            href={link.href}
            className={styles[`social-link-${link.type}`]}
            key={link.type}
          >
            { link.title }
          </a>
        ))
      }
    </BodyContainer>
  </Page>
);

HomePage.propTypes = {
  head: PropTypes.object.isRequired
};

export default HomePage;
