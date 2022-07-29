import {
  Box,
  HStack,
  Center,
  useColorMode,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineChecklist,
  MdOutlineLeaderboard,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md';

import KrLogo from '../../assets/theme/logos/krLogo';
import HeaderTab from './HeaderTab';

const Header = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const SwitchIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);

  const indicatorElement = useRef(null);

  const tabs = [
    {
      key: 1,
      route: '/',
      text: 'Dashboard',
      TabIcon: MdOutlineDashboard,
    },
    {
      key: 2,
      route: '/spreadsheet',
      text: 'Spreadsheet',
      TabIcon: MdOutlineChecklist,
    },
    {
      key: 3,
      route: '/leaderboard',
      text: 'Leaderboard',
      TabIcon: MdOutlineLeaderboard,
    },
    {
      key: 4,
      isSpacer: true,
    },
    {
      key: 5,
      route: '/profile',
      TabIcon: MdPersonOutline,
    },
    {
      key: 6,
      TabIcon: MdOutlineLogout,
    },
    {
      key: 7,
      TabIcon: SwitchIcon,
      onClick: toggleColorMode,
    },
  ];

  return (
    <>
      <Center
        as="nav"
        sx={{ position: 'fixed' }}
        zIndex="sticky"
        w="100%"
        px={8}
        h="80px"
        bg={colorMode === 'dark' ? 'blackAlpha.600' : 'whiteAlpha.600'}
        borderBottom="1px"
        borderColor={colorMode === 'dark' ? 'gray.300' : 'black'}
        backdropFilter="auto"
        backdropBlur="16px"
      >
        <HStack spacing={0} pt={4} h="full" w="container.xl">
          <Box
            borderBottom="1px"
            px={4}
            mt="2px"
            borderColor={colorMode === 'dark' ? '#060606' : 'white'}
            h="full"
          >
            <Box mt={2} filter={theme.shadows.dropGlow}>
              <KrLogo
                color={colorMode === 'dark' ? 'white' : 'black'}
                width="260px"
              />
            </Box>
          </Box>
          {tabs.map(tab => (
            <HeaderTab indicatorRef={indicatorElement} {...tab} />
          ))}
        </HStack>
        <Box
          ref={indicatorElement}
          boxShadow="glow"
          bg={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="md"
          h="4px"
          position="absolute"
          bottom="-4px"
          transition="all 150ms ease-in-out"
        />
      </Center>

      <Box pt="100px">
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
