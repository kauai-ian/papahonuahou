import { Box, Spinner } from "@chakra-ui/react";
import { EventProps } from "../context/eventsContext";
import EventCard from "./EventCard";
import useEvents from "../hooks/useEvents";
import { formatDate } from "../utils/dateUtils";
import NewEventModal from "./NewEventModal";

type ListEventProps = {
  selectedDay: string;
};
// displaying a list of events for the selected day and handling event selection.
const EventList: React.FC<ListEventProps> = ({ selectedDay }) => {
  const { events, selectedEvent, isLoading, selectEvent } = useEvents();

  const filteredEvents: EventProps[] = events.filter(
    (event: EventProps) =>
      formatDate(event.eventStart, "YYYY-MM-DD") ===
      formatDate(selectedDay, "YYYY-MM-DD")
  );

  const handleCancel = () => {
    selectEvent(null);
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
          <NewEventModal
            isOpen={!!selectedEvent}
            onClose={handleCancel}
            eventData={selectedEvent}
            isEditMode={true} // brings up the event form modal
          />
        ) : isLoading ? (
          <Spinner />
        ) : filteredEvents.length === 0 ? (
          <p>No events to display.</p>
        ) : (
          filteredEvents.map((event) => (
            <Box key={event._id}>
              <EventCard {...event} />
             
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default EventList;
