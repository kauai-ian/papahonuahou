// form compoent for creating and editing events
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { EventProps, eventInitState } from "../context/eventsContext";
import { formatDate, parseDate } from "../utils/dateUtils";

type EventFormProps = {
  isEditMode?: boolean;
  eventData?: EventProps;
  onSubmit: (event: EventProps) => Promise<void>;
  isLoading: boolean;
};

const EventForm: React.FC<EventFormProps> = ({
  isEditMode = false,
  eventData = eventInitState,
  onSubmit,
  isLoading,
}) => {
  const [formState, setFormState] = useState<EventProps>(eventData);

  useEffect(() => {
    if (isEditMode && eventData._id) {
      setFormState({
        ...eventData,
        eventStart: formatDate(eventData.eventStart, "YYYY-MM-DTHH:mm"),
        eventEnd: formatDate(eventData.eventEnd, "YYYY-MM-DTHH:mm"),
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
    try {
      const formattedEvent = {
        ...formState,
        eventStart: parseDate(
          formState.eventStart,
          "YYYY-MM-DTHH:mm"
        ).toISOString(),
        eventEnd: parseDate(
          formState.eventEnd,
          "YYYY-MM-DTHH:mm"
        ).toISOString(),
      };
      await onSubmit(formattedEvent);
    } catch (error) {
      console.error("Error submitting event data", error);
    }
  };

  return (
    <>
      <h2>{isEditMode ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box>
            <FormLabel htmlFor="eventType">Event Type: </FormLabel>
            <Select
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
