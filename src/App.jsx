/* eslint-disable react/jsx-no-constructed-context-values */
// React
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// UI
import { Box } from '@chakra-ui/react';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Cookies
import Cookies from 'universal-cookie';

// API
import { eventLiveState } from './api/api';

// Context
import AuthContext from './context/AuthContext';
import EventContext from './context/EventContext';
// Navigation
import Header from './components/Header/Header';

// Views - Dashboard
import Dashboard from './views/Dashboard/Dashboard';
import PreEvent from './views/Dashboard/PreEvent';
import EventEnd from './views/Dashboard/EventEnd';
import OffSeason from './views/Dashboard/OffSeason';

// Views - Navigation routes
import Schedule from './views/Schedule/Schedule';
import Hunting from './views/Hunting/Hunting';
import Profile from './views/Profile/Profile';
import Glance from './views/Glance/Glance';

// Views - Leaderboard
import Leaderboard from './views/Leaderboard/Leaderboard';
import WRHolders from './views/WRHolders/WRHolders';

// Views - Streamer Info
import StreamerInfo from './views/StreamerInfo/StreamerInfo';

// Views - Admin
import AdminIndex from './views/Admin/AdminIndex';
import EventManager from './views/Admin/EventManager';
import WRManager from './views/Admin/WRManager';
import MapManager from './views/Admin/MapManager';

const cookies = new Cookies();

const queryClient = new QueryClient();

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [authentication, setAuthentication] = useState({
    isLoggedIn: (cookies.get('token') || '') !== '',
    token: cookies.get('token') || '',
    expires: cookies.get('expires') || '',
  });

  const [event, setEvent] = useState({
    isLive: 'over',
    name: '',
    type: '',
    edition: 0,
  });

  const EventSwitcher = ({ event }) => {
    switch (event.isLive) {
      case 'active':
        return <Dashboard />;
      case 'post':
        return <EventEnd />;
      case 'offseason':
        return <OffSeason />;
      default:
        return <PreEvent />;
    }
  };

  useEffect(() => {
    eventLiveState().then(data => {
      setEvent({
        isLive: data.status,
        type: (data.type || 'e').toLowerCase(),
        edition: data.edition || '',
      });
      setIsSuccess(true); // Indicate loading completion
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <EventContext.Provider value={{ event, setEvent }}>
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
          <Box textAlign='center'>
            <Routes>
              <Route path='/' element={<Header>Header</Header>}>
                <Route
                  index
                  element={isSuccess ? <EventSwitcher event={event} /> : null}
                />
                <Route path='schedule' element={<Schedule />} />
                <Route path='hunting' element={<Hunting />} />
                <Route path='wrs' element={<WRHolders />} />
                <Route path='leaderboard' element={<Leaderboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='glance' element={<Glance />} />
                <Route path='/kackend' element={<AdminIndex />} />
                <Route path='/kackend/events' element={<EventManager />} />
                <Route path='/kackend/wrs' element={<WRManager />} />
                <Route path='/kackend/maps' element={<MapManager />} />
                <Route path='/streamerstuff' element={<StreamerInfo />} />
                <Route path='*' element={<div>Nothing here</div>} />
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
