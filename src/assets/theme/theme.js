import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        background: props.colorMode === 'dark' ? '#060606' : 'white',
        textTransform: 'uppercase',
        fontWeight: 300,
      },
    }),
  },
  components: {
    Menu: {
      baseStyle: props => ({
        list: {
          rounded: 'none',
          background: props.colorMode === 'dark' ? '#060606' : 'white',
          borderColor:
            props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
        },
        item: {
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          _hover: {
            background:
              props.colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          },
        },
      }),
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 'normal',
      },
      variants: {
        solid: {
          bg: 'blackAlpha.200',
          _dark: { bg: 'whiteAlpha.200' },
          _hover: {
            _disabled: {
              bg: 'blackAlpha.200',
              _dark: { bg: 'whiteAlpha.200' },
            },
            bg: 'blackAlpha.300',
            _dark: { bg: 'whiteAlpha.300' },
          },
        },
      },
    },
    Badge: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        letterSpacing: '0.1em',
        fontWeight: 'semibold',
      }),
      variants: {
        white: {
          bg: 'white',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.5);',
        },
        green: {
          bg: 'green.300',
          color: 'green.900',
          boxShadow: '0px 2px 4px rgba(104, 211, 145, 0.5);',
        },
        blue: {
          bg: 'blue.300',
          color: 'blue.900',
          boxShadow: '0px 2px 4px rgba(144, 205, 244, 0.5);',
        },
        red: {
          bg: 'red.300',
          color: 'red.900',
          boxShadow: '0px 2px 4px rgba(252, 129, 129, 0.5);',
        },
        black: {
          bg: '#666666',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5);',
        },
      },
    },
  },
  semanticTokens: {
    shadows: {
      glow: {
        default: 'none',
        _dark: 'glowVar',
      },
      finGlow: {
        default: 'finGlowLight',
        _dark: 'finGlowDark',
      },
    },
    colors: {
      background: {
        default: 'white',
        _dark: 'backgroundDark',
      },
    },
  },
  fonts: {
    heading: `'Oswald', sans-serif`,
    body: `'Oswald', sans-serif`,
  },
  shadows: {
    glowVar:
      '0px 2px 16px rgba(255, 255, 255, 0.25), 0px 0px 4px rgba(255, 255, 255, 0.5);',
    dropGlow:
      'drop-shadow(0px 2px 16px rgba(255, 255, 255, 0.25)) drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.5));',
    finGlowDark: 'drop-shadow(0px 0px 10px #00FF00);',
    finGlowLight: 'drop-shadow(0px 0px 10px #00FF77);',
  },
  colors: {
    backgroundDark: '#060606',
  },
});

export default theme;
