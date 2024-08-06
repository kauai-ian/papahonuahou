import { FC, ReactNode, createContext, useEffect, useState } from "react";
import * as api from "../api/events";
import { formatDate } from "../utils/dateUtils";

export type EventProps = {
  _id: string;
  eventType: string;
  notes: string;
  eventStart: string;
  eventEnd: string;
  user: {
    _id: string;
    email: string;
    name: string;
    displayName: string;
  };
};

export const eventInitState: EventProps = {
  _id: "",
  eventType: "",
  notes: "",
  eventStart: "",
  eventEnd: "",
  user: {
    _id: "",
    email: "",
    name: "",
    displayName: "",
  },
};

export type EventsContextType = {
  events: EventProps[];
  isLoading: boolean;
  createEvent: (newEvent: EventProps) => Promise<void>;
  editEvent: (eventId: string, updatedEvent: EventProps) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  selectEvent: (event: EventProps | null) => void;
  selectedEvent: EventProps | null;
  fetchEventsForDay: (dayStart: string) => EventProps[];
};

const initState: EventsContextType = {
  events: [],
  isLoading: true,
  createEvent: async () => {},
  editEvent: async () => {},
  deleteEvent: async () => {},
  selectEvent: () => {},
  selectedEvent: null,
  fetchEventsForDay: () => [],
};

export const EventsContext = createContext<EventsContextType>(initState);

const EventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.listEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const createEvent = async (newEvent: EventProps)=> {
    try {
      const createdEvent = await api.createEvent(newEvent);
      setEvents((prev) => [...prev, createdEvent]);
    } catch (error) {
      console.error("Failed to create event", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editEvent = async (eventId: string, updatedEvent: EventProps) => {
    try {
      await api.editEvent(eventId, updatedEvent);
      setEvents((prev) =>
        prev.map((event) => (event._id === eventId ? updatedEvent : event))
      );
    } catch (error) {
      console.error("Failed to update event", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await api.deleteEvent(eventId);
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to delete event", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectEvent = (event: EventProps | null) => {
    setSelectedEvent(event);
  };

  const fetchEventsForDay = (dayStart: string): EventProps[] => {
    return events.filter(
      (event) => formatDate(event.eventStart, "YYYY-MM-DD") === dayStart
    );
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        createEvent,
        editEvent,
        deleteEvent,
        selectedEvent,
        selectEvent,
        fetchEventsForDay,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
