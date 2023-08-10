/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  useColorMode,
} from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route } from 'react-router-dom';

import Cookies from 'universal-cookie';

import { eventLiveState } from './api/api';

import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/Dashboard';
import Schedule from './views/Schedule/Schedule';
import Hunting from './views/Hunting/Hunting';
import Profile from './views/Profile/Profile';

import AuthContext from './context/AuthContext';
import EventContext from './context/EventContext';
import EventEnd from './views/Dashboard/EventEnd';
import PreEvent from './views/Dashboard/PreEvent';
import Leaderboard from './views/Leaderboard/Leaderboard';
import Glance from './views/Glance/Glance';
import WRHolders from './views/WRHolders/WRHolders';

import AdminIndex from './views/Admin/AdminIndex';
import EventManager from './views/Admin/EventManager';
import WRManager from './views/Admin/WRManager';
import MapManager from './views/Admin/MapManager';
import StreamerInfo from './views/StreamerInfo/StreamerInfo';
import ThemeContext from './context/ThemeContext';
import {
  getCurrentBG,
  getCurrentBGGradient,
} from './components/Header/Theming/BackgroundColors';
import baseTheme from './assets/theme/baseTheme';

const cookies = new Cookies();

const queryClient = new QueryClient();

const App = () => {
  const [authentication, setAuthentication] = useState({
    isLoggedIn: (cookies.get('token') || '') !== '',
    token: cookies.get('token') || '',
    expires: cookies.get('expires') || '',
  });

  const { colorMode } = useColorMode();

  const [currentTheme, setCurrentTheme] = useState({
    mode: colorMode,
    themename: getCurrentBG(),
    gradient: getCurrentBGGradient(),
  });

  const [event, setEvent] = useState({
    isLive: 'over',
    name: '',
    type: '',
    edition: 0,
  });

  useEffect(() => {
    eventLiveState().then(data => {
      setEvent({
        isLive: data.status,
        type: (data.type || 'e').toLowerCase(),
        edition: data.edition || '',
      });
    });
  }, []);

  return (
    <>
      <ColorModeScript />
      <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
        <ChakraProvider theme={baseTheme}>
          <QueryClientProvider client={queryClient}>
            <EventContext.Provider value={{ event, setEvent }}>
              <AuthContext.Provider
                value={{ authentication, setAuthentication }}
              >
                <Box textAlign="center">
                  <Routes>
                    <Route path="/" element={<Header>Header</Header>}>
                      <Route
                        index
                        element={
                          event.isLive === 'active' ? (
                            <Dashboard />
                          ) : event.isLive === 'post' ? (
                            <EventEnd />
                          ) : (
                            <PreEvent />
                          )
                        }
                      />
                      <Route path="schedule" element={<Schedule />} />
                      <Route path="hunting" element={<Hunting />} />
                      <Route path="wrs" element={<WRHolders />} />
                      <Route path="leaderboard" element={<Leaderboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="glance" element={<Glance />} />
                      <Route path="/kackend" element={<AdminIndex />} />
                      <Route
                        path="/kackend/events"
                        element={<EventManager />}
                      />
                      <Route path="/kackend/wrs" element={<WRManager />} />
                      <Route path="/kackend/maps" element={<MapManager />} />
                      <Route path="/streamerstuff" element={<StreamerInfo />} />
                      <Route path="*" element={<div>Nothing here</div>} />
                    </Route>
                  </Routes>
                </Box>
                <ReactQueryDevtools initialIsOpen={false} />
              </AuthContext.Provider>
            </EventContext.Provider>
          </QueryClientProvider>
        </ChakraProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
