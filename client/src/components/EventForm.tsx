// form compoent for creating and editing events
// TODO: fix the date / string type issues
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/date";
import { getEvent, createEvent, editEvent } from "../api/events";

type EventFormProps = {
  isEditMode?: boolean;
  eventData?: EventProps;
  onClose: () => void;
};

export type EventProps = {
  _id?: string;
  eventType: string;
  notes: string;
  eventStart: string;
  eventEnd: string;
};

const eventInitState: EventProps = {
  eventType: "",
  notes: "",
  eventStart: "",
  eventEnd: "",
};

const EventForm: React.FC<EventFormProps> = ({ isEditMode = false }) => {
  const [eventData, setEventdata] = useState<EventProps>(eventInitState);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { _id } = useParams<{ _id: string }>();

  // useEffect
  // if editmode and id are truthy, then loading is true, getthe event by id, set the event date to the object
  useEffect(() => {
    if (isEditMode && _id) {
      setLoading(true);
      getEvent(_id)
        try {((event: EventProps) => {
          setEventdata({
            _id: event._id,
            eventType: event.eventType,
            notes: event.notes,
            eventStart: formatDate(event.eventStart, "YYYY-MM-DDTHH:mm"),
            eventEnd: formatDate(event.eventEnd, "YYYY-MM-DDTHH:mm"),
          });
        })}
        catch (error) {(() => setError("Error fetching event data"))}
        finally {(() => setLoading(false));
    }
}
  }, [isEditMode, _id]);

  // handlechange takes in the target and destructures the name and value then adds the data to the event data state
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEventdata((prevData) => ({ ...prevData, [name]: value }));
  };

  // handleSubmit is async to try edit event or create event and then navitgate to events page
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && _id) {
        await editEvent(_id, eventData);
      } else {
        await createEvent(eventData);
      }
    } catch (err) {
      setError("Error submitting event data");
    } finally {
      setLoading(false);
      eventInitState;
    }
  };

  return (
    <>
    {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
      <h2>{isEditMode ? "Edit Event" : "Create Event"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={eventData.eventType}
            onChange={handleChange}
            required
          >
            <option value="">Select event type</option>
            <option value="sleep">Sleep</option>
            <option value="nap">Nap</option>
            <option value="meal">Meal</option>
          </select>
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={eventData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="eventStart">Event Start</label>
          <input
            type="datetime-local"
            id="eventStart"
            name="eventStart"
            value={eventData.eventStart}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eventEnd">Event End</label>
          <input
            type="datetime-local"
            id="eventEnd"
            name="eventEnd"
            value={eventData.eventEnd}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isEditMode ? "Update Event" : "Create Event"}
        </button>
      </form>
      </>
)}
    </>
  );
};

export default EventForm;
