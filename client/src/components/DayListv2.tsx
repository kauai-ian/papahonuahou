// display and handle days

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDate } from "../utils/dateUtils";
import EventList from "./EventList";
import { useDays } from "../hooks/useDays";
import { DayProps } from "../context/daysContext";

const DayList = () => {
  const { days, selectDay, selectedDay } = useDays();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDayClick = (day: DayProps) => {
    selectDay(day);
    onOpen();
  };

  const handleClose = () => {
    selectDay(null);
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
            <ModalHeader>
              Date: {formatDate(selectedDay.dayStart, "MM/DD/YYYY")}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EventList
                selectedDay={selectedDay.dayStart}
                onEventEdit={onOpen}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default DayList;
