import React, { useState } from "react";
import DayList from "../components/DayListv2";
import NewEventModal from "../components/NewEventModal";
import { Button } from "@chakra-ui/react";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setUpdateKey] = useState(0); // to trigger rerender dayslist when new event created

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEventCreated = () => {
    setUpdateKey(prevKey => prevKey + 1); // update key to trigger rerender
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page.</p>
      <div>
      <Button onClick={openModal}>Create New Event</Button>
        <NewEventModal isOpen={isModalOpen} onClose={closeModal} onEventCreated={handleEventCreated} />
      </div>
      <DayList />
    </div>
  );
};

export default Home;
