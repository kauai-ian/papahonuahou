// maps over a list of event ids from the dayList and returns a list

import { useEffect, useState } from "react";
import { EventProps } from "./EventForm";
import { getEvent } from "../api/events";
import { Spinner } from "@chakra-ui/react";

type ListEventProps = {
  eventIds: string[];
};

const ListEvents: React.FC<ListEventProps> = ({ eventIds }) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useeffect to fetch events from the ids given.
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventDetails = await Promise.all(
          eventIds.map((eventId) => getEvent(eventId))
        );
        setEvents(eventDetails.map((detail) => detail.data));
        console.log("eventdetails",eventDetails)
      } catch (error) {
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };
    if (eventIds.length > 0) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [eventIds]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <p>Event Type: {event.eventType}</p>
              <p>Notes: {event.notes}</p>
              <p>Start Time: {event.eventStart}</p>
              <p>End Time: {event.eventEnd}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListEvents;
