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
      setError(null) // reset error
      try {
        if (eventIds.length === 0) {
          setEvents([]);
          return;
        }
        const eventDetails = await Promise.all(
          eventIds.map((eventId) =>
            getEvent(eventId).catch((error) => {
              console.error(`Error fetching event with id ${eventId}`, error);
              return null;
            })
          )
        );
        // filter null responses
        const validEventDetails = eventDetails.filter(
          (detail): detail is { data: EventProps } => detail !== null
        );

        if (validEventDetails.length === 0) {
          setEvents([]);
          setError("No Events to display");
        } else {
          setEvents(validEventDetails.map((detail) => detail.data));
        }
        console.log("eventdetails", eventDetails);
        // TODO: figure out why fetching event details is not working
      } catch (error) {
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [eventIds]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : events.length === 0 ? (
        <p>No events to display.</p>
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
