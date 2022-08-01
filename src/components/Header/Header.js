import {
  Box,
  HStack,
  Center,
  useColorMode,
  useColorModeValue,
  useTheme,
  useBreakpointValue,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineChecklist,
  MdOutlineLeaderboard,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  // eslint-disable-next-line no-unused-vars
  MdOutlineHome,
  MdOutlineMoreVert,
} from 'react-icons/md';

import KrLogo from '../../assets/logos/krLogo';
import HeaderTab from './HeaderTab';

const Header = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const logoSize = useBreakpointValue({
    base: '120px',
    md: '200px',
    xl: '260px',
  });
  const showMenu = useBreakpointValue({
    base: true,
    md: false,
  });

  const SwitchIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);

  const indicatorElement = useRef(null);

  const tabsDesktop = [
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

  const tabsMobile = [
    // can be added again if a homepage is needed
    /* {
      key: 0,
      text: 'Home',
      TabIcon: MdOutlineHome,
    }, */
    {
      key: 8,
      isSpacer: true,
    },
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
  ];

  const tabData = useBreakpointValue({
    base: tabsMobile,
    md: tabsDesktop,
  });

  return (
    <>
      <Center
        as="nav"
        pos="fixed"
        bottom={{ base: '0', md: 'auto' }}
        zIndex="sticky"
        w="100%"
        px={{ base: 4, md: 8 }}
        h={{ base: '60px', md: '80px' }}
        bg={colorMode === 'dark' ? 'blackAlpha.600' : 'whiteAlpha.600'}
        borderBottom={{ base: 'none', md: '1px' }}
        borderTop={{ base: '1px', md: 'none' }}
        borderColor={colorMode === 'dark' ? 'gray.300' : 'black'}
        backdropFilter="auto"
        backdropBlur="16px"
      >
        <HStack spacing={0} pt={{ base: 1, md: 4 }} h="full" w="container.xl">
          <Box
            display={{ base: 'none', md: 'block' }}
            borderBottom="1px"
            px={4}
            mt="2px"
            borderColor={colorMode === 'dark' ? '#060606' : 'white'}
            h="full"
          >
            <Box mt={2} filter={theme.shadows.dropGlow}>
              <KrLogo
                color={colorMode === 'dark' ? 'white' : 'black'}
                width={logoSize}
              />
            </Box>
          </Box>
          {tabData.map(tab => (
            <HeaderTab indicatorRef={indicatorElement} {...tab} />
          ))}
          {showMenu ? (
            <Menu autoSelect={false}>
              <MenuButton
                TabIcon={MdOutlineMoreVert}
                text="More"
                as={HeaderTab}
              />
              <MenuList minW="0" w="160px" fontSize="xs">
                <Link to="/profile">
                  <MenuItem
                    h={10}
                    filter={
                      colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                    }
                    icon={<MdPersonOutline fontSize="1.25rem" />}
                  >
                    Profile
                  </MenuItem>
                </Link>
                <MenuItem
                  h={10}
                  filter={
                    colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                  }
                  icon={<MdOutlineLogout fontSize="1.25rem" />}
                >
                  Logout
                </MenuItem>
                <MenuItem
                  h={10}
                  onClick={toggleColorMode}
                  filter={
                    colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                  }
                  icon={<SwitchIcon fontSize="1.25rem" />}
                >
                  Theme
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </HStack>
        <Box
          ref={indicatorElement}
          boxShadow="glow"
          bg={colorMode === 'dark' ? 'white' : 'black'}
          borderRadius="md"
          h="4px"
          visibility={
            pathname === '/profile' ? { base: 'hidden', md: 'visible' } : null
          }
          position="absolute"
          bottom={{ base: 'initial', md: '-4px' }}
          top={{ base: '-1px', md: 'initial' }}
          transition="all 150ms ease-in-out"
        />
      </Center>

      <Box pt={{ base: '16px', md: '100px' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
