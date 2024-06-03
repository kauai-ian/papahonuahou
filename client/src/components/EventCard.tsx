import { Box, Button } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import { EventProps } from "../context/eventsContext";
import { formatDate } from "../utils/dateUtils";
import { Statistic } from "./EventStatistics";

// TODO work on the edit mode
type EventCardProps = EventProps & {
  statistics: Statistic | null;
}


const EventCard: React.FC<EventCardProps> = ({
  _id,
  eventType,
  notes,
  eventStart,
  eventEnd,
  statistics
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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <>
      <p>{capitalizeFirstLetter(eventType)}</p>
      <p>Notes: {notes}</p>
      <p>Start Time: {formatDate(eventStart, "llll")}</p>
      <p>End Time: {formatDate(eventEnd, "llll")}</p>
      {/* {statistics && (
        <div>
          {eventType === "sleep" && (
            <>
              <p>Total Sleep Time: {statistics.totalSleepTime}</p>
            </>
          )}
          {eventType === "nap" && (
            <>
              <p>Total Nap Time: {statistics.totalNapTime}</p>
            </>
          )}
          
        </div>
      )} */}
      <Box display="flex" justifyContent="center" gap="30px">
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button></Box>
    </>
  );
};
export default EventCard;
