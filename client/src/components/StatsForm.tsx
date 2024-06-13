import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import StatisticsComponent from "./EventStatistics";

const StatisticsForm: React.FC = () => {
  const [eventType, setEventType] = useState<string>("sleep");
  const [eventStart, setEventStart] = useState<string>("");
  const [eventEnd, setEventEnd] = useState<string>("");
  const [queryParams, setQueryParams] = useState<{
    eventTypes: string[];
    eventStart: Date;
    eventEnd: Date;
  } | null>(null);

  // handlesubmit if there is a start and end, then set the params to that
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventStart && eventEnd) {
      setQueryParams({
        eventTypes: [],
        eventStart: new Date(eventStart),
        eventEnd: new Date(eventEnd),
      });
    }
  };
  return (
    <Center>
      <Box w={["90%", "70%", "50%", "30%"]}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="eventType">
              <FormLabel>Event Type</FormLabel>
              <Select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="sleep">Sleep</option>
                <option value="nap">Nap</option>
                <option value="meal">Meal</option>
              </Select>
            </FormControl>
            <FormControl id="eventStart">
              <FormLabel>Event Start</FormLabel>
              <Input
                type="date"
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl id="eventEnd">
              <FormLabel>Event End</FormLabel>
              <Input
                type="date"
                value={eventEnd}
                onChange={(e) => setEventEnd(e.target.value)}
              ></Input>
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Fetch Statistics
            </Button>
          </Stack>
        </form>
        {queryParams && <StatisticsComponent filter={queryParams} />}
      </Box>
    </Center>
  );
};

export default StatisticsForm;
