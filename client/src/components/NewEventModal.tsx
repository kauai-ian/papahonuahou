import React, { useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import EventForm, { EventProps } from "./EventForm";
import useEvents from "../hooks/useEvents";

export type NewEventProps = {
  // TODO: write the oncreateevent function
  isOpen: boolean;
  onClose: () => void;
};
// TODO Cleanup the code and refactor so that the event form shows?
const NewEventModal: React.FC<NewEventProps> = ({ isOpen, onClose }) => {
  const { createEvent, isLoading } = useEvents();
  const initialRef = useRef(null);

  const handleSubmit = async (newEvent: EventProps) => {
    await createEvent(newEvent);
    onClose();
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
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
