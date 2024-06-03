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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  console.log(selectedDay);
  return (
    <Box>
      {sortedDays.map((day) => {
        const dayEvents = events
          ? events.filter(
              (event) =>
                formatDate(event.eventStart, "YYYY-MM-DD") ===
                formatDate(day.dayStart, "YYYY-MM-DD")
            )
          : [];
        return (
          <Box
            key={day._id}
            p={2}
            m={2}
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
                  <Box
                    key={event._id}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box flex="1">
                      <Text fontSize="sm">
                        {formatDate(event.eventStart, "h:mm A")}
                      </Text>
                    </Box>
                    <Box flex="1">
                      <Text fontSize="sm">{capitalizeFirstLetter(event.eventType)} </Text>
                    </Box>
                  </Box>
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
              <EventList selectedDay={selectedDay.dayStart} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DayList;
