import React from 'react';
import { Box } from '@chakra-ui/react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Dashboard from './views/Dashboard/Dashboard';

const App = () => (
  <Box textAlign="center">
    <Routes>
      <Route path="/" element={<Header>Header</Header>}>
        <Route index element={<Dashboard />} />
        <Route path="spreadsheet" element={<div>Spreadsheet</div>} />
        <Route path="leaderboard" element={<div>Leaderboard</div>} />

        <Route path="profile" element={<div>Profile</div>} />

        <Route path="*" element={<div>Nothing here</div>} />
      </Route>
    </Routes>
  </Box>
);

export default App;
