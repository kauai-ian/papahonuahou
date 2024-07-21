import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import EventsProvider from "./context/eventsContext.tsx";
import { DaysProvider } from "./context/daysContext.tsx";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DaysProvider>
      <EventsProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </EventsProvider>
    </DaysProvider>
  </React.StrictMode>
);

