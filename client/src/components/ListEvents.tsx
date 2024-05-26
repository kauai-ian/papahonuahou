

import { useEffect, useState } from "react";
import { deleteEvent, getEvent, editEvent } from "../api/events";
import EventForm, { EventProps } from "./EventForm";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

type ListEventProps = {
  eventIds: string[];
};

const ListEvents: React.FC<ListEventProps> = ({ eventIds }) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventData, setEditingEventData] = useState<EventProps | null>(
    null
  );

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
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
      } catch (error) {
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [eventIds]);

  // TODO: delete handler
  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  // TODO:  the edit mode
  const handleEdit = async (eventId: string) => {
    try {
      const response = await getEvent(eventId);
      if (response && response.data) {
        setEditingEventData(response.data);
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Failed to fetch event for editing:", error);
    }
  };

  const handleEditSubmit = async (updatedEvent: EventProps) => {
    try {
      await editEvent(updatedEvent._id, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
      setIsEditMode(false);
      setEditingEventData(null);
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

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
              <Button onClick={() => handleEdit(event._id)}>Edit</Button>
              <Button onClick={() => handleDelete(event._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
      <Modal isOpen={isEditMode} onClose={() => setIsEditMode(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingEventData && (
              <EventForm
                isEditMode={true}
                eventData={editingEventData}
                onClose={() => setIsEditMode(false)}
                onSubmit={handleEditSubmit}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListEvents;
