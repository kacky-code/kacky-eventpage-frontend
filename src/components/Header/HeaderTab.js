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
  ({ route, text, TabIcon, onClick, indicatorRef, isSpacer, isBlank }, ref) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const tabElement = useRef(null);

    const [dimensions, setDimensions] = useState({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    const { pathname } = useLocation();

    useEffect(() => {
      if (
        pathname === route &&
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
    }, [indicatorRef, tabElement, dimensions, pathname, route]);

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
        align="center"
        justify="center"
        direction={{ base: 'column', xl: 'row' }}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          transform: { base: 'translateY(0px)', md: 'translateY(-2px)' },
        }}
        transform={
          pathname === route && {
            base: 'translateY(0px)',
            md: 'translateY(-2px)',
          }
        }
        bg={pathname === route ? 'whiteAlpha.200' : null}
        transition="background-color 150ms ease-in-out, transform 150ms ease-in-out"
        spacing={{ base: 1, xl: 4 }}
        h="full"
        px={text !== '' ? { base: 2, md: 4, xl: 8 } : { base: 1, md: 2, xl: 4 }}
      >
        <Icon
          boxSize={{ base: 5, xl: 6 }}
          as={TabIcon}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
        />
        {text !== '' ? (
          <Text
            textShadow="glow"
            fontSize={{ base: 'xs', md: 'md', xl: 'xl' }}
            letterSpacing="0.1em"
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
      return (null);
    }

    if (route !== '') {
      return (
        <Link ref={tabElement} style={{ height: '100%' }} to={route}>
          {content}
        </Link>
      );
    }

    return (
      <Box cursor="pointer" onClick={onClick} h="full">
        {content}
      </Box>
    );
  }
);

HeaderTab.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
  TabIcon: PropTypes.func,
  onClick: PropTypes.func,
  indicatorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  isSpacer: PropTypes.bool,
};

HeaderTab.defaultProps = {
  route: '',
  text: '',
  TabIcon: null,
  onClick: () => {},
  indicatorRef: null,
  isSpacer: false,
};

export default HeaderTab;
