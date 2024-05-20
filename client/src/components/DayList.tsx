// list all days

import { useEffect, useState } from "react";
import { DayDetailsDropdown } from "./DayDetails";
import {
  Box,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { listDays } from "../api/days";
import { formatDate } from "../utils/date";

export type DayProps = {
  _id: string;
  dayStart: string;
  events: string[];
};
// fetch the list of events from backend using useEffect hook. Display loading message. Render list of events with buttons to edit

const DayList = () => {
  const [days, setDays] = useState<DayProps[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayProps | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDays();
        const sortedDays = response.data.sort((a: DayProps, b: DayProps) => 
        new Date(a.dayStart).getTime() - new Date(b.dayStart).getTime())
        setDays(sortedDays);
      } catch (error) {
        setError("error fetching days");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDayClick = (day: DayProps) => {
    setSelectedDay(day);
    onOpen();
  };

  const handleCloseDropdown = () => {
    setSelectedDay(null);
    onClose();
  };
  console.log(days);
  return (
    <Box p={4}>
      <Text fontSize="lg" mb={4}>
        Day List
      </Text>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={6}>
          {days.map((day) => (
            <Box
              key={day._id}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => handleDayClick(day)}
            >
              <Text fontSize="lg">{formatDate(day.dayStart, 'MM/DD')}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {selectedDay && (
        <DayDetailsDropdown
          day={selectedDay}
          editingEventId={null}
          onClose={handleCloseDropdown}
          isOpen={isOpen}
        />
      )}
    </Box>
  );
};

export default DayList;
