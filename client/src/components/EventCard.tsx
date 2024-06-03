import { Button } from "@chakra-ui/react";
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

  return (
    <>
      <p>Event Type: {eventType}</p>
      <p>Notes: {notes}</p>
      <p>Start Time: {formatDate(eventStart, "llll")}</p>
      <p>End Time: {formatDate(eventEnd, "llll")}</p>
      {statistics && (
        <div>
          <p>Total Events: {statistics.totalEvents}</p>
          {eventType === "sleep" && (
            <>
              <p>Total Sleep Time: {statistics.totalSleepTime}</p>
              <p>Total Sleep Events: {statistics.totalSleepEvents}</p>
            </>
          )}
          {eventType === "nap" && (
            <>
              <p>Total Nap Time: {statistics.totalNapTime}</p>
              <p>Total Nap Events: {statistics.totalNapEvents}</p>
            </>
          )}
          {eventType === "meal" && (
            <p>Total Meal Events: {statistics.totalMealEvents}</p>
          )}
        </div>
      )}
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
};
export default EventCard;
