import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import EventsProvider from "./context/eventsContext.tsx";
import { DaysProvider } from "./context/daysContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DaysProvider>
      <EventsProvider>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </EventsProvider>
    </DaysProvider>
  </React.StrictMode>
);
