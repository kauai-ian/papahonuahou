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
import { useMemo } from "react";
import useEvents from "../hooks/useEvents";
import calculateDuration from "../utils/duration";
import { capitalizeFirstLetter } from "../utils/capFirstLtr";

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
  // explanation: useMemo stores the computed result and only recalcs when a dep changes to reduce calcs on renders. As list of days grows, this will save on computation power.
  const sortedDays = useMemo(() => {
    return [...days].sort(
      (a, b) => new Date(a.dayStart).getTime() - new Date(b.dayStart).getTime()
    );
  }, [days]);

  // useEffect(() => {
  //   // TODO: not working. selects the current day if its in the list of days
  //   const today = new Date().toISOString().split("T")[0];
  //   const currentDay = days.find((day) => day.dayStart === today);
  //   if (currentDay) {
  //     selectDay(currentDay);
  //   }
  // }, [days, selectDay]);

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
        if (dayEvents.length === 0) {
          return null;
        }
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
            <Text fontSize="lg" color="teal.700">
              {formatDate(day.dayStart, "MM/DD")}
            </Text>
            {dayEvents.length > 0 && (
              <Box mt={2}>
                {dayEvents.map((event) => (
                  <Box
                    key={event._id}
                    display="flex"
                    gap="2rem"
                    border={"1px"}
                    borderColor="blue.200"
                  >
                    <Box
                      borderRight="1px"
                      borderColor="gray.300"
                      pr={8}
                      w={"95px"}
                    >
                      <Text fontSize="sm" color="teal">
                        {formatDate(event.eventStart, "h:mm A")}
                      </Text>
                    </Box>
                    <Box
                      borderRight="1px"
                      borderColor="gray.300"
                      pr={8}
                      w={"95px"}
                    >
                      <Text fontSize="sm">
                        {capitalizeFirstLetter(event.eventType)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm">
                        {(event.eventType === "sleep" ||
                          event.eventType === "nap") && (
                          <>
                            {calculateDuration(
                              event.eventStart,
                              event.eventEnd
                            )}{" "}
                            hours
                          </>
                        )}
                      </Text>
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
