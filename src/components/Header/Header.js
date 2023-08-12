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
  VStack,
} from '@chakra-ui/react';
import React, { useRef, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineEvent,
  MdOutlineChecklist,
  MdOutlineLeaderboard,
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineMoreVert,
  // MdOutlineAccountCircle,
} from 'react-icons/md';

import Cookies from 'universal-cookie';

import KrLogo from '../../assets/logos/krLogo';
import HeaderTab from './HeaderTab';
import AuthModal from './AuthModal/AuthModal';
import AuthContext from '../../context/AuthContext';
import EventContext from '../../context/EventContext';
import { logoutServer } from '../../api/api';
import DiscordLogo from '../../assets/logos/discordLogo';

const Header = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authentication, setAuthentication } = useContext(AuthContext);
  const { event } = useContext(EventContext);

  const discordUrl = 'https://kacky.gg/discord';

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
  const indicatorElementSubMenu = useRef(null);

  const tabsDesktopLoggedIn = [
    {
      id: 1,
      route: '/',
      text: event.isLive === 'active' ? 'Dashboard' : 'Info',
      TabIcon: MdOutlineDashboard,
    },
    event.isLive === 'active'
      ? {
          id: 2,
          route: '/schedule',
          text: 'Schedule',
          TabIcon: MdOutlineEvent,
        }
      : {
          id: 2,
          isBlank: true,
        },
    {
      id: 3,
      route: '/hunting',
      subRoutes: ['/wrs', '/pstats'],
      text: 'Hunting',
      TabIcon: MdOutlineChecklist,
    },
    event.isLive === 'active' || event.isLive === 'post'
      ? {
          id: 4,
          route: '/leaderboard',
          text: 'Leaderboard',
          TabIcon: MdOutlineLeaderboard,
        }
      : {
          id: 4,
          isBlank: true,
        },
    {
      id: 5,
      isSpacer: true,
    },
    {
      id: 6,
      onClick: () => window.open(discordUrl),
      SVGIcon: DiscordLogo,
    },
    {
      id: 7,
      TabIcon: SwitchIcon,
      onClick: toggleColorMode,
    },
    {
      id: 8,
      route: '/profile',
      TabIcon: MdPersonOutline,
    },
    {
      id: 9,
      TabIcon: MdOutlineLogout,
      onClick: logout,
    },
  ];

  const tabsDesktop = [
    {
      id: 1,
      route: '/',
      text: event.isLive === 'active' ? 'Dashboard' : 'Info',
      TabIcon: MdOutlineDashboard,
    },
    event.isLive === 'active'
      ? {
          id: 2,
          route: '/schedule',
          text: 'Schedule',
          TabIcon: MdOutlineEvent,
        }
      : {
          id: 2,
          isBlank: true,
        },
    {
      id: 3,
      route: '/hunting',
      subRoutes: ['/wrs', '/pstats'],
      text: 'Hunting',
      TabIcon: MdOutlineChecklist,
    },
    event.isLive === 'active' || event.isLive === 'post'
      ? {
          id: 4,
          route: '/leaderboard',
          text: 'Leaderboard',
          TabIcon: MdOutlineLeaderboard,
        }
      : {
          id: 4,
          isBlank: true,
        },
    {
      id: 5,
      isSpacer: true,
    },
    {
      id: 6,
      onClick: () => window.open(discordUrl),
      SVGIcon: DiscordLogo,
    },
    {
      id: 7,
      TabIcon: SwitchIcon,
      onClick: toggleColorMode,
    },
    {
      id: 8,
      text: 'Login',
      TabIcon: MdOutlineLogout,
      onClick: onOpen,
    },
  ];

  const tabsMobile = [
    // can be added again if a homepage is needed
    /* {
      id: 0,
      text: 'Home',
      TabIcon: MdOutlineHome,
    }, */
    /* {
      id: 8,
      isSpacer: true,
    }, */
    {
      id: 1,
      route: '/',
      text: event.isLive === 'active' ? 'Dashboard' : 'Info',
      TabIcon: MdOutlineDashboard,
    },
    event.isLive === 'active'
      ? {
          id: 2,
          route: '/schedule',
          text: 'Schedule',
          TabIcon: MdOutlineEvent,
        }
      : {
          id: 2,
          isBlank: true,
        },
    {
      id: 3,
      route: '/hunting',
      subRoutes: ['/wrs', '/pstats'],
      text: 'Hunting',
      TabIcon: MdOutlineChecklist,
    },
    event.isLive === 'active' || event.isLive === 'post'
      ? {
          id: 4,
          route: '/leaderboard',
          text: 'Leaderboard',
          TabIcon: MdOutlineLeaderboard,
        }
      : {
          id: 4,
          isBlank: true,
        },
    {
      id: 5,
      isSpacer: true,
    },
    {
      id: 6,
      route: '/leaderboard',
      text: '',
      TabIcon: MdOutlineLeaderboard,
    },
  ];

  const huntingSubMenu = [
    {
      id: 1,
      route: '/hunting',
      text: 'Hunting Sheet',
      TabIcon: MdOutlineChecklist,
    },
    {
      id: 2,
      route: '/wrs',
      text: 'WR Holders',
      TabIcon: MdOutlineLeaderboard,
    },
    /* authentication.isLoggedIn ? {
      id: 3,
      route: '/pstats',
      text: 'My Stats',
      TabIcon: MdOutlineAccountCircle,
    } : {
      id: 3,
      isBlank: true
    }, */
  ];

  const tabData = useBreakpointValue({
    base: tabsMobile,
    md: authentication.isLoggedIn ? tabsDesktopLoggedIn : tabsDesktop,
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
  }, [authentication.expires, authentication.token, setAuthentication]);

  const [huntingSubMenuVisible, setHuntingSubMenuVisible] = useState(false);
  useEffect(() => {
    setHuntingSubMenuVisible(
      pathname === '/hunting' || pathname === '/wrs' || pathname === '/pstats'
    );
  }, [pathname]);

  return (
    <>
      <VStack as="nav">
        <Center
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
              <HeaderTab
                key={tab.id}
                indicatorRef={indicatorElement}
                {...tab}
              />
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
                        icon={
                          <DiscordLogo
                            width="10"
                            color={colorMode === 'dark' ? 'white' : 'black'}
                          />
                        }
                      >
                        Discord
                      </MenuItem>
                    </Link>
                  ) : null}
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
        <Center
          pos="sticky"
          w="inherit"
          px={{ base: 4, md: 8 }}
          h={{ base: '40px', md: '60px' }}
          bg={colorMode === 'dark' ? 'blackAlpha.600' : 'whiteAlpha.600'}
          borderColor={colorMode === 'dark' ? 'gray.300' : 'black'}
          pt={{ base: '80px', md: '100px' }}
          // visible={huntingSubMenuVisible ? { base: 'hidden', md: 'visible' } : { base: 'hidden', md: 'hidden' }}
          display={huntingSubMenuVisible ? 'inherit' : 'none'}
          alignItems="center"
          justifyContent="center"
        >
          {huntingSubMenu.map(tab => (
            <Box
              h="inherit"
              display={tab.isBlank ? 'none' : 'inherit'}
              key={tab.id}
            >
              <HeaderTab
                indicatorRef={indicatorElementSubMenu}
                fontSize={{ base: 'xs', md: 'md', xl: 'l' }}
                {...tab}
              />
            </Box>
          ))}
        </Center>
      </VStack>

      <Box pt={{ base: '16px', md: '120px', xl: '150px' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
