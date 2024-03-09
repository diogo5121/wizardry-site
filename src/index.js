import React from 'react';
import ReactDOM from 'react-dom/client';
import Routering from './Routes/routes';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from "react-ga4";
const root = ReactDOM.createRoot(document.getElementById('root'));

ReactGA.initialize('G-PRSP3SEJQR'); // Substitua pelo seu ID de acompanhamento
ReactGA.send({ hitType: "pageview", page: window.location.pathname });


root.render(
  <React.StrictMode>
    <ChakraProvider>
      <HelmetProvider>
        <Routering />
      </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>
);

