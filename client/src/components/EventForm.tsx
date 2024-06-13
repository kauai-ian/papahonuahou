// form compoent for creating and editing events
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { EventProps, eventInitState } from "../context/eventsContext";
import { formatDate, parseDate } from "../utils/dateUtils";
import useEvents from "../hooks/useEvents";
import { capitalizeFirstLetter } from "../utils/capFirstLtr";

type EventFormProps = {
  isEditMode?: boolean;
  eventData?: EventProps;
  eventType?: string;
  onCancel: () => void;
};

const EventForm: React.FC<EventFormProps> = ({
  isEditMode = false,
  eventData = eventInitState,
  eventType = "",
  onCancel,
}) => {
  const { createEvent, editEvent, isLoading } = useEvents();
  const [formState, setFormState] = useState<EventProps>({
    ...eventData,
    eventType: eventType || eventData.eventType,
  });

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
      if (isEditMode && formState._id) {
        await editEvent(formState._id, formattedEvent);
      } else {
        await createEvent(formattedEvent);
      }
      onCancel();
    } catch (error) {
      console.error("Error submitting event data", error);
    }
  };

  return (
    <>
      <h2 style={{ fontWeight: "bold" }}>
        {isEditMode ? "Edit Event" : "Create Event"}
      </h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box>
            <FormLabel htmlFor="eventType" color="teal">
              Event Type:{" "}
            </FormLabel>
            <Text>{capitalizeFirstLetter(formState.eventType)}</Text>
          </Box>
          <Box>
            <FormLabel htmlFor="notes" color="teal">
              Notes:{" "}
            </FormLabel>
            <Textarea
              id="notes"
              name="notes"
              value={formState.notes}
              onChange={handleChange}
            ></Textarea>
          </Box>
          <Box>
            <FormLabel htmlFor="eventStart" color="teal">
              Event Start:{" "}
            </FormLabel>
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
            <FormLabel htmlFor="eventEnd" color="teal">
              Event End:{" "}
            </FormLabel>
            <Input
              type="datetime-local"
              id="eventEnd"
              name="eventEnd"
              value={formState.eventEnd}
              onChange={handleChange}
              required
            />
          </Box>
          <Box display="flex" justifyContent="center" gap={10} mt={4}>
            <Button type="submit" disabled={isLoading}>
              {isEditMode ? "Update Event" : "Create Event"}
            </Button>
            <Button onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export default EventForm;
