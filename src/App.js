/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route } from 'react-router-dom';

import Cookies from 'universal-cookie';
import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/Dashboard';
import SpreadSheet from './views/Spreadsheet/Spreadsheet';
import Profile from './views/Profile/Profile';
import AuthContext from './context/AuthContext';

const cookies = new Cookies();

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState(cookies.get('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(token !== '');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, token, setToken }}
      >
        <Box textAlign="center">
          <Routes>
            <Route path="/" element={<Header>Header</Header>}>
              <Route index element={<Dashboard />} />
              <Route path="spreadsheet" element={<SpreadSheet />} />
              <Route path="leaderboard" element={<div>Leaderboard</div>} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<div>Nothing here</div>} />
            </Route>
          </Routes>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
