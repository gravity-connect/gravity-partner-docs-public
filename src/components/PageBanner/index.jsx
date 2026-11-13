import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import LogoCarousel from '@site/src/components/LogoCarousel';

import './banner.css';
const PLACEHOLDER_TITLE = 'No page title found';

export default function PageBanner({title, desc, button, link, children, className, logos}) {
  return (
    <section className={clsx('banner', className)}>
      <div className='container'>
        <div className='row'>
          <div className='col col--7'>
            <h1>{title || PLACEHOLDER_TITLE}</h1>
            {desc && <p>{desc}</p>}
            {button && link && (
              <Link className='button button--primary button--lg' to={link}>
                {button}
              </Link>
            )}
          </div>
        </div>
        {logos && logos.length > 0 && (
          <div className='row banner__logos'>
            <LogoCarousel logos={logos} />
          </div>
        )}
      </div>
    </section>
  );
}