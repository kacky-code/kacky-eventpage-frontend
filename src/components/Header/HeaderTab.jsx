import {
  Box,
  Stack,
  Icon,
  Text,
  Spacer,
  useColorMode,
  useTheme,
  forwardRef,
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

const HeaderTab = forwardRef(
  (
    {
      route,
      subRoutes,
      text,
      TabIcon,
      SVGIcon: SVGTabIcon,
      onClick,
      indicatorRef,
      isSpacer,
      isBlank,
      fontSize,
    },
    ref
  ) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const tabElement = useRef(null);

    const [dimensions, setDimensions] = useState({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    const { pathname } = useLocation();
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
      setHighlight(pathname === route || subRoutes.includes(pathname));
      if (
        highlight &&
        tabElement.current !== null &&
        indicatorRef.current !== null
      ) {
        let prevValue = JSON.stringify(
          tabElement.current.getBoundingClientRect()
        );

        const handle = setInterval(() => {
          if (tabElement.current === null) {
            clearInterval(handle);
          } else {
            const nextValue = JSON.stringify(
              tabElement.current.getBoundingClientRect()
            );

            if (nextValue === prevValue) {
              indicatorRef.current.setAttribute(
                'style',
                `width: ${tabElement.current.getBoundingClientRect().width}px;
                left: ${tabElement.current.getBoundingClientRect().left}px;`
              );

              clearInterval(handle);
            } else {
              prevValue = nextValue;
            }
          }
        }, 100);
      }
    }, [
      indicatorRef,
      tabElement,
      dimensions,
      pathname,
      route,
      subRoutes,
      highlight,
    ]);

    useEffect(() => {
      const handleResize = () => {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    const content = (
      <Stack
        ref={ref}
        align='center'
        justify='center'
        direction={{ base: 'column', xl: 'row' }}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          transform: { base: 'translateY(0px)', md: 'translateY(-2px)' },
        }}
        transform={
          highlight
            ? {
                base: 'translateY(0px)',
                md: 'translateY(-2px)',
              }
            : {}
        }
        bg={highlight ? 'whiteAlpha.200' : null}
        transition='background-color 150ms ease-in-out, transform 150ms ease-in-out'
        spacing={{ base: 1, xl: 4 }}
        h='full'
        px={text !== '' ? { base: 2, md: 4, xl: 8 } : { base: 1, md: 2, xl: 4 }}
      >
        {TabIcon !== null ? (
          <Icon
            boxSize={{ base: 5, xl: 6 }}
            as={TabIcon}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          />
        ) : null}
        {SVGTabIcon !== null ? (
          <Box>
            <SVGTabIcon
              width='26px'
              color={colorMode === 'dark' ? 'white' : 'black'}
            />
          </Box>
        ) : null}
        {text !== '' ? (
          <Text
            noOfLines={1}
            textShadow='glow'
            fontSize={fontSize}
            letterSpacing='0.1em'
          >
            {text}
          </Text>
        ) : null}
      </Stack>
    );

    if (isSpacer) {
      return <Spacer />;
    }

    if (isBlank) {
      return null;
    }

    if (route !== '') {
      return (
        <Link ref={tabElement} style={{ height: '100%' }} to={route}>
          {content}
        </Link>
      );
    }

    return (
      <Box cursor='pointer' onClick={onClick} h='full'>
        {content}
      </Box>
    );
  }
);

HeaderTab.propTypes = {
  route: PropTypes.string,
  subRoutes: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  TabIcon: PropTypes.func,
  SVGIcon: PropTypes.func,
  onClick: PropTypes.func,
  indicatorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  isSpacer: PropTypes.bool,
  fontSize: PropTypes.shape({
    base: PropTypes.string,
    md: PropTypes.string,
    xl: PropTypes.string,
  }),
};

HeaderTab.defaultProps = {
  route: '',
  subRoutes: [],
  text: '',
  TabIcon: null,
  SVGIcon: null,
  onClick: () => {},
  indicatorRef: null,
  isSpacer: false,
  fontSize: { base: 'xs', md: 'md', xl: 'xl' },
};

export default HeaderTab;
