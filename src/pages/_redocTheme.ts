// Shared Redoc theme for the API reference page (src/pages/api.tsx).
// Underscore-prefixed filename keeps Docusaurus from treating this as a route.
//
// Redoc uses `polished` internally to parse and manipulate these colors
// (contrast text, hover shades, tonal offsets), so they must be literal
// hex/rgb/hsl strings — CSS custom properties like var(--gc-color-black)
// can't be parsed. Keep these in sync with src/css/variables.css by hand.

const BRAND_BLACK = '#000000';
const BRAND_WHITE = '#ffffff';
const BRAND_GREY = '#D9D9D9';
const BRAND_BORDER_GREY = '#3E3D3D';
const BRAND_PRIMARY = '#C3FF1E';

const redocTheme = {
  spacing: {
    unit: 8,
    sectionHorizontal: 48,
    sectionVertical: 32,
  },
  colors: {
    primary: {
      main: BRAND_BLACK,
    },
    success: {
      main: '#1E4620',
      light: '#E3F2E1',
      dark: '#143116',
      contrastText: '#1E4620',
    },
    warning: {
      main: '#5C4B1A',
      light: '#F5EEDF',
      dark: '#40350f',
      contrastText: '#5C4B1A',
    },
    error: {
      main: '#5C1A1A',
      light: '#F5E2E2',
      dark: '#401212',
      contrastText: '#5C1A1A',
    },
    gray: {
      50: '#F5F5F5',
      100: BRAND_GREY,
    },
    border: {
      light: BRAND_BORDER_GREY,
      dark: BRAND_BORDER_GREY,
    },
    text: {
      primary: BRAND_BLACK,
      secondary: BRAND_BORDER_GREY,
    },
    responses: {
      success: {
        color: '#1E4620',
        backgroundColor: '#E3F2E1',
        tabTextColor: '#1E4620',
      },
      error: {
        color: '#5C1A1A',
        backgroundColor: '#F5E2E2',
        tabTextColor: '#5C1A1A',
      },
      redirect: {
        color: '#5C4B1A',
        backgroundColor: '#F5EEDF',
        tabTextColor: '#5C4B1A',
      },
      info: {
        color: BRAND_BLACK,
        backgroundColor: BRAND_GREY,
        tabTextColor: BRAND_BLACK,
      },
    },
    http: {
      get: BRAND_BORDER_GREY,
      post: BRAND_BLACK,
      put: '#5B6B4F',
      patch: '#6B5B3E',
      delete: '#7A2E2E',
      options: BRAND_BORDER_GREY,
      basic: BRAND_BORDER_GREY,
      link: BRAND_BLACK,
      head: BRAND_BORDER_GREY,
    },
  },
  schema: {
    linesColor: BRAND_BORDER_GREY,
    typeNameColor: BRAND_BORDER_GREY,
    typeTitleColor: BRAND_BLACK,
    requireLabelColor: '#7A2E2E',
    nestedBackground: 'transparent',
    arrow: {
      color: BRAND_BLACK,
    },
  },
  typography: {
    fontFamily: '"articulat-cf", sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightBold: '700',
    headings: {
      fontFamily: '"articulat-cf", sans-serif',
      fontWeight: '500',
    },
    code: {
      color: BRAND_BLACK,
      backgroundColor: BRAND_GREY,
    },
    links: {
      color: BRAND_BLACK,
      visited: BRAND_BLACK,
      hover: BRAND_BLACK,
      textDecoration: 'underline',
      hoverTextDecoration: 'underline',
    },
  },
  sidebar: {
    backgroundColor: BRAND_WHITE,
    textColor: BRAND_BLACK,
    activeTextColor: BRAND_BLACK,
    groupItems: {
      activeBackgroundColor: BRAND_GREY,
      activeTextColor: BRAND_BLACK,
    },
    level1Items: {
      activeBackgroundColor: BRAND_GREY,
      activeTextColor: BRAND_BLACK,
    },
    arrow: {
      color: BRAND_BLACK,
    },
  },
  logo: {
    gutter: '24px',
  },
  rightPanel: {
    backgroundColor: BRAND_BLACK,
    textColor: BRAND_WHITE,
  },
  codeBlock: {
    backgroundColor: '#1a1a1a',
  },
  fab: {
    backgroundColor: BRAND_BLACK,
    color: BRAND_PRIMARY,
  },
};

export default redocTheme;
