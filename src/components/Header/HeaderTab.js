import {
  Box,
  HStack,
  Icon,
  Text,
  Spacer,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

const HeaderTab = ({
  route,
  text,
  TabIcon,
  onClick,
  indicatorRef,
  isSpacer,
}) => {
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

  React.useEffect(() => {
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
    <HStack
      _hover={{
        bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
        transform: 'translateY(-2px)',
      }}
      transform={pathname === route && 'translateY(-2px)'}
      bg={pathname === route ? 'whiteAlpha.200' : null}
      transition="background-color 150ms ease-in-out, transform 150ms ease-in-out"
      spacing={4}
      h="full"
      px={text !== '' ? 8 : 4}
    >
      <Icon
        boxSize={6}
        as={TabIcon}
        filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
      />
      {text !== '' ? (
        <Text textShadow="glow" fontSize="xl" letterSpacing="0.1em">
          {text}
        </Text>
      ) : null}
    </HStack>
  );

  if (isSpacer) {
    return <Spacer />;
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
};

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
