import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import ColorModeSwitcher from './components/ColorModeSwitcher';

const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      Kacky Eventpage
      <ColorModeSwitcher />
    </Box>
  </ChakraProvider>
);

export default App;
