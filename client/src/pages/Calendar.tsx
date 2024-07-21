import React, { useState } from "react";
import NewEventModal from "../components/NewEventModal";
import { Box, Button, Center, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { CalendarComponent } from "../components/CalendarComponent";

const CalendarPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventType, setEventType] = useState("");

  const handleOpenForm = (type: string) => {
    setEventType(type); // Open  modal and pass  event type to  form
    onOpen();
  };

  return (
    <Center flexDir="column">
      <Box display="flex" justifyContent="" textAlign="left" m={2}>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Events Calendar
        </p>
      </Box>
      <Center mt="8" mb="8">
        <CalendarComponent />
      </Center>
      <SimpleGrid spacing={4} m={2} flexDir='column' columns={{ base: 1, md: 2, lg: 2 }}>
        <Button onClick={() => handleOpenForm("sleep")} bg="teal.400" color="white">
          Create Sleep Event
        </Button>
        <Button onClick={() => handleOpenForm("nap")} bg="teal.400" color="white">
          Create Nap Event
        </Button>
        <Button onClick={() => handleOpenForm("meal")} bg="teal.400" color="white">
          Create Meal Event
        </Button>
        <Button onClick={() => handleOpenForm("diaper")} bg="teal.400" color="white">
          Create Diaper Event
        </Button>
      </SimpleGrid>
      <NewEventModal
        isOpen={isOpen}
        onClose={onClose}
        eventType={eventType}
      />
    </Center>
  );
};

export default CalendarPage;
