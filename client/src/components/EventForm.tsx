// form compoent for creating and editing events
// TODO: fix the date / string type issues
// TODO work on the edit button rendering the form modal
import { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

type EventFormProps = {
  isEditMode?: boolean;
  eventData?: EventProps;
  onSubmit: (event: EventProps) => void;
  isLoading: boolean;
};

export type EventProps = {
  _id: string;
  eventType: string;
  notes: string;
  eventStart: string;
  eventEnd: string;
};

const eventInitState: EventProps = {
  _id: "",
  eventType: "",
  notes: "",
  eventStart: "",
  eventEnd: "",
};

const EventForm: React.FC<EventFormProps> = ({
  isEditMode = false,
  eventData = eventInitState,
  onSubmit,
  isLoading,
}) => {
  const [formState, setFormState] = useState<EventProps>(eventData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && eventData._id) {
      setFormState({
        ...eventData,
        eventStart: formatDate(eventData.eventStart, "YYYY-MM-DDTHH:mm"),
        eventEnd: formatDate(eventData.eventEnd, "YYYY-MM-DDTHH:mm"),
      });
    }
  }, [isEditMode, eventData]);

  // handlechange takes in the target and destructures the name and value then adds the data to the event data state
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({ ...prevData, [name]: value }));
  };

  // handleSubmit is async to try edit event or create event and then navitgate to events page
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(formState);
    } catch (err) {
      setError("Error submitting event data");
    }
  };

  return (
    <>
      <h2>{isEditMode ? "Edit Event" : "Create Event"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box>
            <FormLabel htmlFor="eventType">Event Type: </FormLabel>
            <Select
              defaultValue="sleep"
              id="eventType"
              name="eventType"
              value={formState.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select event type</option>
              <option value="sleep">Sleep</option>
              <option value="nap">Nap</option>
              <option value="meal">Meal</option>
            </Select>
          </Box>
          <Box>
            <FormLabel htmlFor="notes">Notes: </FormLabel>
            <Textarea
              id="notes"
              name="notes"
              value={formState.notes}
              onChange={handleChange}
            ></Textarea>
          </Box>
          <Box>
            <FormLabel htmlFor="eventStart">Event Start: </FormLabel>
            <Input
              type="datetime-local"
              id="eventStart"
              name="eventStart"
              value={formState.eventStart}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <FormLabel htmlFor="eventEnd">Event End: </FormLabel>
            <Input
              type="datetime-local"
              id="eventEnd"
              name="eventEnd"
              value={formState.eventEnd}
              onChange={handleChange}
              required
            />
          </Box>
          <Button type="submit" disabled={isLoading}>
            {isEditMode ? "Update Event" : "Create Event"}
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default EventForm;
