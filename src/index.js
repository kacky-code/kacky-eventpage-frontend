import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import theme from './assets/theme/theme';
import themeAprilFirst from './assets/theme/themeAprilFirst';
import '@fontsource/oswald/200.css';
import '@fontsource/oswald/300.css';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/500.css';
import '@fontsource/oswald/600.css';
import '@fontsource/oswald/700.css';

import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const todayDate = new Date();
const isAprilFirst = new Date("2023-04-02 00:00:00") > todayDate && todayDate > new Date("2023-04-01 00:00:00");

root.render(
  <StrictMode>
    <BrowserRouter>
      {localStorage.setItem('chakra-ui-color-mode', 'dark')}
      <ColorModeScript />

      <ChakraProvider theme={isAprilFirst ? themeAprilFirst : theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
