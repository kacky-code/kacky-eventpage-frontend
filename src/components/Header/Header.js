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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineEvent,
  MdOutlineChecklist,
  // eslint-disable-next-line no-unused-vars
  MdOutlineLeaderboard,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  // eslint-disable-next-line no-unused-vars
  MdOutlineHome,
  MdOutlineMoreVert,
} from 'react-icons/md';

import Cookies from 'universal-cookie';

import KrLogo from '../../assets/logos/krLogo';
import HeaderTab from './HeaderTab';
import AuthModal from './AuthModal/AuthModal';
import AuthContext from '../../context/AuthContext';
import EventContext from '../../context/EventContext';
import { logoutServer } from '../../api/api';

const leaderboardPageUrl = 'https://kackyreloaded.com/';

const Header = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authentication, setAuthentication } = useContext(AuthContext);
  const { event } = useContext(EventContext);

  const logout = () => {
    logoutServer(authentication.token);
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    cookies.remove('expires', { path: '/' });

    setAuthentication({
      isLoggedIn: false,
      token: '',
      expires: '',
    });
  };

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

  const tabsDesktopLoggedIn = [
    {
      key: 1,
      route: '/',
      text: 'Dashboard',
      TabIcon: MdOutlineDashboard,
    },
    event.isLive === "active" ? {
      key: 2,
      route: '/schedule',
      text: 'Schedule',
      TabIcon: MdOutlineEvent,
    } : {
      key: 2,
      isBlank: true,
    },
    {
      key: 3,
      route: '/hunting',
      text: 'Hunting',
      TabIcon: MdOutlineChecklist,
    },
    {
      key: 4,
      onClick: () => window.open(leaderboardPageUrl),
      /* route: '/leaderboard', */
      text: 'Leaderboard',
      TabIcon: MdOutlineLeaderboard,
    },
    {
      key: 5,
      isSpacer: true,
    },
    {
      key: 6,
      route: '/profile',
      TabIcon: MdPersonOutline,
    },
    {
      key: 7,
      TabIcon: MdOutlineLogout,
      onClick: logout,
    },
    {
      key: 8,
      TabIcon: SwitchIcon,
      onClick: toggleColorMode,
    },
  ];

  const tabsDesktop = [
    {
      key: 1,
      route: '/',
      text: 'Dashboard',
      TabIcon: MdOutlineDashboard,
    },
    event.isLive === "active" ? {
      key: 2,
      route: '/schedule',
      text: 'Schedule',
      TabIcon: MdOutlineEvent,
    } : { 
      key: 2,
      isBlank: true,
    },
    {
      key: 3,
      route: '/hunting',
      text: 'Hunting',
      TabIcon: MdOutlineChecklist,
    },
    {
      key: 4,
      onClick: () => window.open(leaderboardPageUrl),
      /* route: '/leaderboard', */
      text: 'Leaderboard',
      TabIcon: MdOutlineLeaderboard,
    },
    {
      key: 5,
      isSpacer: true,
    },
    {
      key: 6,
      text: 'Login',
      TabIcon: MdOutlineLogout,
      onClick: onOpen,
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
    /* {
      key: 8,
      isSpacer: true,
    }, */
    {
      key: 1,
      route: '/',
      text: 'Dashboard',
      TabIcon: MdOutlineDashboard,
    },
    event.isLive === "active" ? {
      key: 2,
      route: '/schedule',
      text: 'Schedule',
      TabIcon: MdOutlineEvent,
    } : {
      key: 2,
      isBlank: true,
    },
    {
    key: 3,
    route: '/hunting',
    text: 'Hunting',
    TabIcon: MdOutlineChecklist,
    },
    {
      key: 4,
      onClick: () => window.open(leaderboardPageUrl),
      /* route: '/leaderboard', */
      text: 'Leaderboard',
      TabIcon: MdOutlineLeaderboard,
    },
    {
      key: 5,
      isSpacer: true,
    },
  ];

  const tabData = useBreakpointValue({
    base: tabsMobile,
    md: authentication.isLoggedIn ? tabsDesktopLoggedIn : tabsDesktop
  });

  useEffect(() => {
    if (new Date().getTime() < authentication.expires) {
      logoutServer(authentication.token);
      const cookies = new Cookies();
      cookies.remove('token', { path: '/' });
      cookies.remove('expires', { path: '/' });

      setAuthentication({
        isLoggedIn: false,
        token: '',
        expires: '',
      });
    }
  }, [authentication.expires, authentication.token, setAuthentication])

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
                {authentication.isLoggedIn ? (
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
                ) : null}
                {authentication.isLoggedIn ? (
                  <MenuItem
                    onClick={logout}
                    h={10}
                    filter={
                      colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                    }
                    icon={<MdOutlineLogout fontSize="1.25rem" />}
                  >
                    Logout
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={onOpen}
                    h={10}
                    filter={
                      colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                    }
                    icon={<MdOutlineLogout fontSize="1.25rem" />}
                  >
                    Login
                  </MenuItem>
                )}
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
          <AuthModal isOpen={isOpen} onClose={onClose} />
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

      <Box pt={{ base: '16px', md: '100px', xl: '130px' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
