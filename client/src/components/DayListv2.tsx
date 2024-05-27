// list all days 

import { useEffect, useState } from "react";
import {
  Box,
  
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { listDays } from "../api/days";
import { formatDate } from "../utils/date";
import EventCard from "./EventCard";
import useEvents from "../hooks/useEvents";

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
  const { events, isLoading } = useEvents()

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await listDays();
        const sortedDays = response.data.sort(
          (a: DayProps, b: DayProps) =>
            new Date(a.dayStart).getTime() - new Date(b.dayStart).getTime()
        );
        setDays(sortedDays);
      } catch (error) {
        console.error("error fetching days", error);
      } 
    };
    fetchDays();
  }, []);

  const handleDayClick = (day: DayProps) => {
    setSelectedDay(day);
    onOpen();
  };

  const handleClose = () => {
    setSelectedDay(null);
    onClose();
  };
  console.log(selectedDay);
  return (
    <Box p={4}>
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
                <Text fontSize="lg">{formatDate(day.dayStart, "MM/DD")}</Text>
              </Box>
            ))}
          </SimpleGrid>

      {selectedDay && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Date: {formatDate(selectedDay.dayStart, "MM/DD/YYYY")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {isLoading ? (
                <Spinner />
              ) : (
                events
                  .filter(
                    (event) =>
                      new Date(event.eventStart).toDateString() ===
                      new Date(selectedDay.dayStart).toDateString()
                  )
                  .map((event) => <EventCard key={event._id} {...event} />)
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DayList;
