import { ChakraBaseProvider, ColorModeScript, extendTheme, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraBaseProvider 
    theme={
      extendTheme({
        initialColorMode: "system",
        useSystemColorMode: false,
      })
    }
    >
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <App />
    </ChakraBaseProvider>
  </StrictMode>
);
