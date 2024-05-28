import { Button } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import { EventProps } from "../context/eventsContext";
import { formatDate } from "../utils/dateUtils";

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
      <p>Event Type: {eventType}</p>
      <p>Notes: {notes}</p>
      <p>Start Time: {formatDate(eventStart, "llll")}</p>
      <p>End Time: {formatDate(eventEnd, "llll")}</p>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
};
export default EventCard;
