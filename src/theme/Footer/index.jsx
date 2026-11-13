import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';

const LEGAL_LINKS = [
  {label: 'License', to: '/docs/license'},
];

function FooterNavLink({item}) {
  return (
    <Link className='footer-nav-link' to={item.to} href={item.href}>
      {item.label}
    </Link>
  );
}

export default function Footer() {
  const {footer} = useThemeConfig();
  const logoSrc = useBaseUrl(footer?.logo?.src);

  if (!footer) {
    return null;
  }

  const {logo, links, copyright} = footer;

  return (
    <footer className='footer'>
      <div className='container container-fluid'>

        <span className='footer-divider' aria-hidden='true' />

        <div className='footer-row footer-row--nav'>
          {logo && (
            <Link href={logo.href} className='footer-logo-link'>
              <img src={logoSrc} alt={logo.alt} width={logo.width} height={logo.height} />
            </Link>
          )}

          {links && links.length > 0 && (
            <ul className='footer-nav-links'>
              {links.map((item, i) => (
                <li key={i}>
                  <FooterNavLink item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className='footer-divider' aria-hidden='true' />

        <div className='footer-row footer-row--legal'>
          {copyright && (
            <div className='footer-copyright' dangerouslySetInnerHTML={{__html: copyright}} />
          )}

          <ul className='footer-legal-links'>
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
