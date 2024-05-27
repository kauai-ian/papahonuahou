import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { EventProps } from "../components/EventForm";
import * as api from "../api/events";

// TODO props defining, editmode

export type EventsContextType = {
  events: EventProps[];
  isLoading: boolean;
  createEvent: (newEvent: EventProps) => Promise<void>;
  editEvent: (eventId: string, updatedEvent: EventProps) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  setEditingEventData: (event: EventProps | null) => void;
  setIsEditMode: (isEdit: boolean) => void;
};

const initState: EventsContextType = {
  events: [],
  isLoading: true,
  createEvent: async () => {},
  editEvent: async () => {},
  deleteEvent: async () => {},
  setEditingEventData: () => {},
  setIsEditMode: () => {},
};

export const EventsContext = createContext<EventsContextType>(initState);

const EventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventData, setEditingEventData] = useState<EventProps | null>(
    null
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.listEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const createEvent = async (newEvent: EventProps) => {
    setLoading(true);
    try {
      const createdEvent = await api.createEvent(newEvent);
      setEvents((prev) => [...prev, createdEvent]);
    } catch (error) {
      console.error("Failed to create event", error);
    } finally {
      setLoading(false);
    }
  };

  const editEvent = async (eventId: string, updatedEvent: EventProps) => {
    setLoading(true);
    try {
      await api.editEvent(eventId, updatedEvent);
      setEvents((prev) =>
        prev.map((event) => (event._id === eventId ? updatedEvent : event))
      );
    } catch (error) {
      console.error("Failed to update event", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    setLoading(true);
    try {
      await api.deleteEvent(eventId);
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to delete event", error);
    } finally {
      setLoading(false);
    }
  };

  // todo fix this fetch.
  //   const fetchEvent = async () => {
  //     try {
  //       if (eventIds.length === 0) {
  //         setEvents([]);
  //         return;
  //       }
  //       const eventDetails = await Promise.all(
  //         eventIds.map((eventId) =>
  //           api.getEvent(eventId).catch((error) => {
  //             console.error(`Error fetching event with id ${eventId}`, error);
  //             return null;
  //           })
  //         )
  //       );
  //       const validEventDetails = eventDetails.filter(
  //         (detail): detail is { data: EventProps } => detail !== null
  //       );

  //       if (validEventDetails.length === 0) {
  //         setEvents([]);
  //         console.error("No Events to display");
  //       } else {
  //         setEvents(validEventDetails.map((detail) => detail.data));
  //       }
  //       console.log("eventdetails", eventDetails);
  //     } catch (error) {
  //       console.error("Error fetching event details", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchEvent();
  //   }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        createEvent,
        editEvent,
        deleteEvent,
        setEditingEventData,
        setIsEditMode,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
