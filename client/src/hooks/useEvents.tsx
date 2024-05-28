import { useContext } from "react";
import { EventsContext } from "../context/eventsContext";
//manages state for events, handling event selection, and submission



const useEvents = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return context;
};
export default useEvents;
