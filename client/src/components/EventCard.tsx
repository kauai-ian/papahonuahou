import { Button } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import { EventProps } from "./EventForm";

// TODO work on the edit mode

const EventCard: React.FC<EventProps> = ({
  _id,
  eventType,
  notes,
  eventStart,
  eventEnd,
}) => {
    const { deleteEvent, editEvent } = useEvents();

    const handleDelete = () => {
        deleteEvent(_id);
      };
    
      const handleEdit = () => {
        editEvent(_id, {
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
      <p>Start Time: {eventStart}</p>
      <p>End Time: {eventEnd}</p>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
};
export default EventCard;
