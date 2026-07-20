import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';
import LinkedInIcon from '@theme/Icon/Socials/LinkedIn';
import XIcon from '@theme/Icon/Socials/X';
import BlueskyIcon from '@theme/Icon/Socials/Bluesky';

const MONOCHROME_ICON_STYLE = {'--dark': 'currentColor', '--light': 'currentColor'};

const SOCIALS = [
  {label: 'LinkedIn', href: '#', Icon: LinkedInIcon},
  {label: 'X', href: '#', Icon: XIcon},
  {label: 'Bluesky', href: '#', Icon: BlueskyIcon},
];

const LEGAL_LINKS = [
  {label: 'Privacy Policy', href: '#'},
  {label: 'Terms', href: '#'},
  {label: 'Cookie Preferences', href: '#'},
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

        <div className='footer-row footer-row--social'>
          <span className='footer-social-label'>Let&apos;s Connect</span>

          <div className='footer-social-icons'>
            {SOCIALS.map(({label, href, Icon}) => (
              <a
                key={label}
                href={href}
                className='footer-social-icon'
                aria-label={label}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon style={MONOCHROME_ICON_STYLE} />
              </a>
            ))}
          </div>
        </div>

        <span className='footer-divider' aria-hidden='true' />

        <div className='footer-row footer-row--legal'>
          {copyright && (
            <div className='footer-copyright' dangerouslySetInnerHTML={{__html: copyright}} />
          )}

          <ul className='footer-legal-links'>
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
