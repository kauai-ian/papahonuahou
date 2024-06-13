import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../utils/dateUtils";
import { useDays } from "../hooks/useDays";
import EventList from "./EventList";
import useEvents from "../hooks/useEvents";
import { EventProps } from "../context/eventsContext";
import Calendar from "react-calendar";
import styled from "styled-components";
import "../Calendar.css";

const CustomCalendar = styled(Calendar)`
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  /* button styles  */
  button {
    background-color: transparent;
    border: none;
    color: #2c7a7b;
    cursor: pointer;
    font-size: 18px;
    outline: none;
    padding: 8px;
    transition: color 0.3s ease;

    &:hover {
      color: orange;
    }

    &:disabled {
      color: #bfbfbf;
      cursor: default;
    }
  }
  /*  active day styles */
  .react-calendar__tile--active {
    background-color: #4fd1c5;
    color: #ffffff;
  }
  /* custom tile styles */
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
// TODO: when the new event is submitted, the dates dont rerender to show the new event.

export const CalendarComponent: React.FC = () => {
  const { fetchEventsForDay } = useEvents();
  const { selectDay, selectedDay } = useDays();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setDayEvents] = useState<EventProps[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleDayClick = (date: Date) => {
    const formattedDate = formatDate(date, "YYYY-MM-DD");
    const eventsForDay = fetchEventsForDay(formattedDate);
    setDayEvents(eventsForDay);
    selectDay({ _id: formattedDate, dayStart: formattedDate });
    onOpen();
  };

  const handleClose = () => {
    selectDay(null);
    setDayEvents([]);
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
      <CustomCalendar
        calendarType="gregory"
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
            return dayEvents.length > 0 ? (
              <Box m={0} p={0} fontSize="3xl" color="grey">
                {" "}
                .
              </Box>
            ) : (
              <Box m={0} p={0} fontSize="3xl" color="white" opacity="0">
                {" "}
                .
              </Box>
            );
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
              <EventList selectedDay={selectedDay.dayStart} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
