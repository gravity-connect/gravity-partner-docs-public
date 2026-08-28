import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Gravity Connect',
  tagline: 'The open standard for DER integrations',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://gravity-connect.github.io',
  baseUrl: '/gravity-docs-docusaurus/',

  organizationName: 'gravity-connect',
  projectName: 'gravity-docs-docusaurus',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'style',
      attributes: {},
      innerHTML: '@layer overrides, docusaurus;',
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/fpd5hqq.css',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Recent Posts',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'Gravity Connect Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'right',
          label: 'Guide',
        },
        {
          type: 'dropdown',
          label: 'Specification',
          position: 'right',
          items: [
            {
              to: '/device-partner-api',
              label: 'Device Partner Specification',
            },
            {
              to: '/vpp-api',
              label: 'VPP Specification',
            },
          ],
        },
        {
          to: '/blog',
          label: 'News',
          position: 'right',
        },
        {
          to: '/about',
          label: 'About',
          position: 'right',
        },
        {
          to: '/get-involved',
          label: 'Get Involved',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'Gravity Connect Logo',
        src: 'img/logo-dark.svg',
        href: 'https://gravityconnect.com',
        width: 255,
        height: 47,
      },
      links: [
        {
          label: 'Guide',
          to: '/docs/getting-started',
        },
        {
          label: 'Specification',
          to: '/api',
        },
        {
          label: 'News',
          to: '/blog',
        },
        {
          label: 'About',
          to: '/about',
        },
        {
          label: 'Get Involved',
          to: '/get-involved',
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Virtual Peaker, Inc. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
