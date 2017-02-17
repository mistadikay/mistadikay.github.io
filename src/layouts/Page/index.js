import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import invariant from 'invariant';
import { joinUri } from 'phenomic';

const Page = (
  {
    __filename,
    __url,
    head,
    header,
    footer,
    children,
    className
  }
) => {
  invariant(
    typeof head.title === 'string',
    `Your page '${ __filename }' needs a title`
  );

  const metaTitle = head.metaTitle ? head.metaTitle : head.title;

  const meta = [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: metaTitle },
    {
      property: 'og:url',
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: 'og:description', content: head.description },
    { name: 'description', content: head.description },
    { property: 'og:site_name', content: metaTitle },
    { property: 'og:image', content: 'http://0x.se/images/static/0x_banner.png' }
  ];

  return (
    <div className={className}>
      <Helmet
        title={metaTitle}
        meta={meta}
      />
      { header }
      { children }
      { footer }
    </div>
  );
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  __filename: PropTypes.string.isRequired,
  __url: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  header: PropTypes.element,
  footer: PropTypes.element,
};

export default Page;
