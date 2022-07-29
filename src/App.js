import React from 'react';
import { Box } from '@chakra-ui/react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';

const App = () => (
  <Box textAlign="center">
    <Routes>
      <Route path="/" element={<Header>Header</Header>}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="spreadsheet" element={<div>Spreadsheet</div>} />
        <Route path="leaderboard" element={<div>Leaderboard</div>} />

        <Route path="profile" element={<div>Profile</div>} />

        <Route path="*" element={<div>Nothing here</div>} />
      </Route>
    </Routes>
  </Box>
);

export default App;
