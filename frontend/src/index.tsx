import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { customTheme } from './chakra/custom.theme';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <ApolloProvider client={client}>
        <ChakraProvider theme={customTheme}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChakraProvider>
      </ApolloProvider>
    );
  } catch (error) {
    console.error('Error creating root:', error);
  }
} else {
  console.error('Root container not found');
}