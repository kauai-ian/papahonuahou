import EventForm from "../components/EventForm";
import { Box, Spinner } from "@chakra-ui/react";
import { EventProps } from "../context/eventsContext";
import EventCard from "./EventCard";
import useEvents from "../hooks/useEvents";
import { formatDate } from "../utils/dateUtils";

type ListEventProps = {
  selectedDay: string;
  onEventEdit: () => void;
};
// displaying a list of events for the selected day and handling event selection.
const EventList: React.FC<ListEventProps> = ({ selectedDay, onEventEdit }) => {
  const { events, selectedEvent, isLoading, editEvent, selectEvent } =
    useEvents();

  const filteredEvents: EventProps[] = events.filter(
    (event: EventProps) =>
      formatDate(event.eventStart, "YYYY-MM-DD") ===
      formatDate(selectedDay, "YYYY-MM-DD")
  );

  const handleEditSubmit = async (updatedEvent: EventProps) => {
    if (selectedEvent && selectedEvent._id) {
      await editEvent(selectedEvent._id, updatedEvent);
      selectEvent(null);
      onEventEdit();
    }
  };

  return (
    <>
      <Box
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        cursor="pointer"
        _hover={{ bg: "gray.100" }}
      >
        {selectedEvent ? (
          <EventForm
            isEditMode={true} // brings up the eventform modal
            eventData={selectedEvent}
            onSubmit={handleEditSubmit}
            isLoading={isLoading}
          />
        ) : isLoading ? (
          <Spinner />
        ) : filteredEvents.length === 0 ? (
          <p>No events to display.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event._id} {...event} />
          ))
        )}
      </Box>
    </>
  );
};

export default EventList;
