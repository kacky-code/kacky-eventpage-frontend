import { extendTheme } from '@chakra-ui/react';
import trumpophant from '../images/trumpophant.png';

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: {
    global: props => ({
      html: {
        overflowY: 'scroll',
      },
      body: {
        backgroundImage: trumpophant,
        backgroundSize: "640px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        background: props.colorMode === 'dark' ? '#060606' : 'white',
        textTransform: 'uppercase',
        fontWeight: 300,
      },
      '&::-webkit-scrollbar': {
        width: '16px',
      },
      '&::-webkit-scrollbar-track': {
        border: '1px',
        borderColor:
          props.colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
        background: props.colorMode === 'dark' ? 'black' : 'white',
      },
      '&::-webkit-scrollbar-thumb': {
        border: '4px',
        borderColor: props.colorMode === 'dark' ? 'black' : 'white',
        background:
          props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
        borderRadius: '100vw',
      },
    }),
  },
  components: {
    Heading: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        margin: '45px 0 35px 0',
      }),
    },
    Switch: {
      baseStyle: props => ({
        track: {
          bg: props.colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300',
          _checked: {
            bg:
              props.colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700',
          },
        },
      }),
    },
    Table: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        table: {
          background: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          fontVariantNumeric: 'lining-nums tabular-nums',
          borderCollapse: 'collapse',
          width: 'full',
        },
        th: {
          fontFamily: 'heading',
          fontWeight: 'normal',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          textAlign: 'start',
        },
        td: {
          textAlign: 'start',
        },
      }),
      variants: {
        simple: {
          th: {
            bg: 'blackAlpha.200',
            color: 'blackAlpha.700',
            borderColor: 'blackAlpha.400',
            _dark: {
              bg: 'whiteAlpha.200',
              color: 'whiteAlpha.700',
              borderColor: 'whiteAlpha.400',
            },
          },
          td: {
            borderColor: 'blackAlpha.400',
            _dark: {
              borderColor: 'whiteAlpha.400',
            },
          },
        },
      },
      sizes: {
        sm: {
          th: {
            px: '4',
            py: '1',
            h: 8,
            lineHeight: '4',
            fontSize: 'sm',
          },
          td: {
            px: '4',
            py: '1',
            h: 12,
            fontSize: 'md',
            lineHeight: '4',
          },
        },
      },
    },
    FormLabel: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        letterSpacing: '0.1em',
        fontWeight: 'hairline',
      }),
    },
    FormError: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        text: {
          letterSpacing: '0.1em',
          fontWeight: 'normal',
        },
      }),
    },
    Input: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        field: { fontWeight: 'hairline', letterSpacing: '0.1em' },
      }),
      variants: {
        outline: {
          field: {
            background: 'blackAlpha.50',
            _dark: { background: 'whiteAlpha.200' },
          },
        },
      },
    },
    Select: {
      // eslint-disable-next-line no-unused-vars
      baseStyle: props => ({
        field: { fontWeight: 'hairline', letterSpacing: '0.1em' },
      }),
      variants: {
        outline: {
          field: {
            background: 'blackAlpha.50',
            _dark: { background: 'whiteAlpha.200' },
          },
        },
      },
    },
    Popover: {
      baseStyle: props => ({
        content: { bg: props.colorMode === 'dark' ? '#060606' : 'white' },
      }),
    },
    Modal: {
      baseStyle: props => ({
        dialog: { bg: props.colorMode === 'dark' ? '#060606' : 'white' },
      }),
    },
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
        danger: {
          boxShadow: '0px 2px 4px rgba(252, 129, 129, 0.5);',
          color: 'red.900',
          bg: 'red.300',
          _dark: { bg: 'red.300' },
          _hover: {
            _disabled: {
              bg: 'red.300',
              _dark: { bg: 'red.300' },
            },
            bg: 'red.400',
            _dark: { bg: 'red.400' },
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
        yellow: {
          bg: 'yellow.300',
          color: 'yellow.900',
          boxShadow: '0px 2px 4px rgba(250, 240, 137, 0.5);',
        },
        orange: {
          bg: 'orange.300',
          color: 'orange.900',
          boxShadow: '0px 2px 4px rgba(246, 173, 85, 0.5);',
        },
        purple: {
          bg: 'purple.300',
          color: 'purple.900',
          boxShadow: '0px 2px 4px rgba(183, 148, 244, 0.5);',
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
