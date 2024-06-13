import { Box, Button, Text } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import { EventProps } from "../context/eventsContext";
import { formatDate } from "../utils/dateUtils";
import calculateDuration from "../utils/duration";
import { capitalizeFirstLetter } from "../utils/capFirstLtr";

// TODO work on the edit mode

const EventCard: React.FC<EventProps> = ({
  _id,
  eventType,
  notes,
  eventStart,
  eventEnd,
}) => {
  const { deleteEvent, selectEvent } = useEvents();

  const handleDelete = () => {
    deleteEvent(_id);
  };

  const handleEdit = () => {
    selectEvent({
      _id,
      eventType,
      notes,
      eventStart,
      eventEnd,
    });
  };

  return (
    <>
      <Text fontSize="lg" color="teal">
        {capitalizeFirstLetter(eventType)}
      </Text>
      <Text color="teal">Notes:</Text> <Text fontSize="sm"> {notes}</Text>
      <Text color="teal">Start Time:</Text>{" "}
      <Text fontSize="sm"> {formatDate(eventStart, "llll")}</Text>
      <Text color="teal">End Time:</Text>{" "}
      <Text fontSize="sm">{formatDate(eventEnd, "llll")}</Text>
      <Text color="teal">Duration:</Text>
      <Text fontSize="sm">
        {(eventType === "sleep" || eventType === "nap") && (
          <>{calculateDuration(eventStart, eventEnd)} hours</>
        )}
      </Text>
      <Box display="flex" justifyContent="center" gap={10}>
        <Button onClick={handleEdit} colorScheme="teal" mr={3}>
          Edit
        </Button>
        <Button onClick={handleDelete} color="red.400">
          Delete
        </Button>
      </Box>
    </>
  );
};
export default EventCard;
