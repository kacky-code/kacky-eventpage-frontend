/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route } from 'react-router-dom';
import { DateTime } from 'luxon';

import Cookies from 'universal-cookie';
import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/Dashboard';
import Schedule from './views/Schedule/Schedule';
import Hunting from './views/Hunting/Hunting';
import Profile from './views/Profile/Profile';

import AuthContext from './context/AuthContext';
import EventContext from './context/EventContext';
import EventEnd from './views/Dashboard/EventEnd';

const cookies = new Cookies();

const queryClient = new QueryClient();

const App = () => {
  const [authentication, setAuthentication] = useState({
    isLoggedIn: (cookies.get('token') || '') !== '',
    token: cookies.get('token') || '',
  });

  const now = DateTime.now();
  const start = DateTime.fromISO('2022-08-19T18:00:00+02:00');
  const end = DateTime.fromISO('2022-09-18T22:00:00+02:00');
  const eventIsLive = () => !!(start < now && end > now);

  const [event, setEvent] = useState({
    isLive: eventIsLive(),
    name: 'Kacky Reloaded 3',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <EventContext.Provider value={{ event, setEvent }}>
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
          <Box textAlign="center">
            <Routes>
              <Route path="/" element={<Header>Header</Header>}>
                <Route
                  index
                  element={event.isLive ? <Dashboard /> : <EventEnd />}
                />
                <Route path="schedule" element={<Schedule />} />
                <Route path="hunting" element={<Hunting />} />
                <Route path="leaderboard" element={<div>Leaderboard</div>} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<div>Nothing here</div>} />
              </Route>
            </Routes>
          </Box>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContext.Provider>
      </EventContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
