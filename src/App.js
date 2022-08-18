import React from 'react';
import { Box } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/Dashboard';
import SpreadSheet from './views/Spreadsheet/Spreadsheet';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Box textAlign="center">
      <Routes>
        <Route path="/" element={<Header>Header</Header>}>
          <Route index element={<Dashboard />} />
          <Route path="spreadsheet" element={<SpreadSheet />} />
          <Route path="leaderboard" element={<div>Leaderboard</div>} />

          <Route path="profile" element={<div>Profile</div>} />

          <Route path="*" element={<div>Nothing here</div>} />
        </Route>
      </Routes>
    </Box>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
