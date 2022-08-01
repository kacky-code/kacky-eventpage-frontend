import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        background: props.colorMode === 'dark' ? '#060606' : 'white',
        textTransform: 'uppercase',
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
  },
  semanticTokens: {
    shadows: {
      glow: {
        default: 'none',
        _dark: 'glowVar',
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
  },
});

export default theme;
