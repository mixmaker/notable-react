import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/prata';
import '@fontsource/montserrat';
import { mode } from '@chakra-ui/theme-tools';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: false,
  colors: {
    brand: {
      primary: '#6666ff',
      bgLight: '#f2f2ff',
      bgDark: '#44448022',
      secondaryBgLight: '#ebebff',
      secondaryBgDark: '#1e1e2e',
      tertiaryBgLight: '#c0c0c0',
      tertiaryBgDark: '#252530',
      textPrimaryLight: '',
      textPrimaryDark: '',
      textSecondaryLight: '#718096',
      textSecondaryDark: '#A0AEC0',
      // 50: '#f2f2ff',
      // 100: '#e9e9ff70',
      200: '#bfbfff',
      300: '#a6a6ff',
      400: '#8c8cff',
      500: '#7373ff',
      600: '#5959ff',
      // 700: '#4040ff',
      // 800: '#51518c32',
      // 900: '#44448022',
    },
  },
  fonts: {
    heading: `'Prata', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  // components: {
  //   Modal: {
  //     baseStyle: {
  //       dialog: props => ({
  //         // bg: mode('brand.primary', 'brand.secondaryBgDark'),
  //       }),
  //     },
  //   },
  // },
  styles: {
    global: props => ({
      body: {
        bg: mode('brand.50', 'brand.900')(props),
        transitionProperty: 'all',
        transitionDuration: '500ms',
      },
    }),
  },
});

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);
