import { Box, Spinner } from "@chakra-ui/react";
import { EventProps } from "../context/eventsContext";
import EventCard from "./EventCard";
import useEvents from "../hooks/useEvents";
import { formatDate } from "../utils/dateUtils";
import NewEventModal from "./NewEventModal";
import { useColorModeValue } from "@chakra-ui/react";



type ListEventProps = {
  selectedDay: string;
};
// displaying a list of events for the selected day and handling event selection.
const EventList: React.FC<ListEventProps> = ({ selectedDay }) => {
  const { events, selectedEvent, isLoading, selectEvent } = useEvents();
  const bgColor = useColorModeValue("gray.100", "gray.600");
  const hoverBgColor = useColorModeValue("gray.300", "blue.700");

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
            <Box key={event._id} p={4} m={2}
            borderRadius="lg"
            borderWidth="1px"
            bgColor={bgColor}
            // on hover use the useColormode value to change the background color
            _hover={{ bgColor: hoverBgColor }}
            >
              <EventCard {...event} />
             
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default EventList;
