import React, { useState } from "react";
import NewEventModal from "../components/NewEventModal";
import { Box, Button, Center } from "@chakra-ui/react";
import { CalendarComponent } from "../components/CalendarComponent";
import DayList from "../components/DayListv2";

const CalendarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Center flexDir="column">
      <Box display='flex' justifyContent="" textAlign='left' m={2}>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Events Calendar</p>
      </Box>
      <Box m={2}>
        <Button onClick={openModal} bg="teal.400" color='white'>Create New Event</Button>
        <NewEventModal isOpen={isModalOpen} onClose={closeModal} />
      </Box>
      
      <Center mt="8" mb="8">
        <CalendarComponent />
      </Center>

      <Box
        mb="2"
        w={["90%", "70%", "50%", "30%"]}
        maxHeight="calc(100vh - 300px)"
        overflowY="auto"
      >
        <DayList />
      </Box>
    </Center>
  );
};

export default CalendarPage;
