import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import EventForm from "./EventForm";
import useEvents from "../hooks/useEvents";
import {EventProps} from "../context/eventsContext"

export type NewEventProps = {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
};

const NewEventModal: React.FC<NewEventProps> = ({ isOpen, onClose, onEventCreated }) => {
  const { createEvent, isLoading } = useEvents();

  const handleSubmit = async (newEvent: EventProps) => {
    await createEvent(newEvent);
    onEventCreated();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventForm
              isEditMode={false}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewEventModal;
