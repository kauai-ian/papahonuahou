// display and handle days

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDate } from "../utils/dateUtils";
import EventList from "./EventList";
import { useDays } from "../hooks/useDays";
import { DayProps } from "../context/daysContext";
import { useEffect, useMemo } from "react";
import useEvents from "../hooks/useEvents";

const DayList = () => {
  const { days, selectDay, selectedDay } = useDays();
  const { events } = useEvents();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDayClick = (day: DayProps) => {
    selectDay(day);
    onOpen();
  };

  const handleClose = () => {
    selectDay(null);
    onClose();
  };

  const sortedDays = useMemo(() => {
    return [...days].sort(
      (a, b) => new Date(a.dayStart).getTime() - new Date(b.dayStart).getTime()
    );
  }, [days]);

  useEffect(() => {
    // TODO: ensure current day is first shown
    const today = new Date().toISOString().split("T")[0];
    const currentDay = days.find((day) => day.dayStart === today);
    if (currentDay) {
      selectDay(currentDay);
    }
  }, [days, selectDay]);

  console.log(selectedDay);
  return (
    <Box p={4}>
      {sortedDays.map((day) => {
        const dayEvents = events ?
        events.filter(
          (event) =>
            formatDate(event.eventStart, "YYYY-MM-DD") ===
            formatDate(day.dayStart, "YYYY-MM-DD")
        ): [];
        return (
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
            {dayEvents.length > 0 && (
              <Box mt={2}>
                <Text fontSize="sm">Events: </Text>
                {dayEvents.map((event) => (
                  <Text key={event._id} fontSize="sm">
                    - {event.eventType} {formatDate(event.eventStart, "h:mm A")}
                  </Text>
                ))}
              </Box>
            )}
          </Box>
        );
      })}

      {selectedDay && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Date: {formatDate(selectedDay.dayStart, "MM/DD/YYYY")}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EventList
                selectedDay={selectedDay.dayStart}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DayList;
