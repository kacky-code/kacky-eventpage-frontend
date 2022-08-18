import React from 'react';
import { Box } from '@chakra-ui/react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/Dashboard';
import SpreadSheet from './views/Spreadsheet/Spreadsheet';
import Profile from './views/Profile/Profile';

const App = () => (
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
);

export default App;
