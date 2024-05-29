import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../utils/dateUtils";
import { useDays } from "../hooks/useDays";
import EventList from "./EventList";
import useEvents from "../hooks/useEvents";
import { EventProps } from "../context/eventsContext";

// TODO: when the new event is submitted, the dates dont rerender to show the new event.

export const CalendarComponent: React.FC = () => {
  const { events, fetchEventsForDay } = useEvents();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { selectDay, selectedDay } = useDays();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dayEvents, setDayEvents] = useState<EventProps[]>([]);

  const handleDayClick = (date: Date) => {
    const formattedDate = formatDate(date, "YYYY-MM-DD");
    const eventsForDay = fetchEventsForDay(formattedDate);
    setDayEvents(eventsForDay);
    selectDay({_id: formattedDate, dayStart: formattedDate})
    onOpen();
  };

  const handleClose = () => {
    selectDay(null);
    setDayEvents([])
    onClose();
  };


  
  console.log(selectedDay);

  return (
    <Box
      border="1px solid #ccc"
      borderRadius="8px"
      p={4}
      boxShadow="md"
      bg="white"
    >
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setCurrentDate(value);
            handleDayClick(value);
          }
        }}
        value={currentDate}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const formattedDate = formatDate(date, "YYYY-MM-DD");
            const dayEvents = fetchEventsForDay(formattedDate);
            return dayEvents.length ? (
              <Box mt={2}>
                <p>{dayEvents.length} e</p>
              </Box>
          ) : null;
        }
        }}
        onClickDay={handleDayClick}
      />

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
