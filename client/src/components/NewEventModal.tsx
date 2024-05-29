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
import { EventProps } from "../context/eventsContext";

export type NewEventProps = {
  isOpen: boolean;
  onClose: () => void;
  eventData?: EventProps;
  isEditMode?: boolean;
};

const NewEventModal: React.FC<NewEventProps> = ({
  isOpen,
  onClose,
  eventData,
  isEditMode = false,
}) => {
  const handleCancel = () => {
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
              isEditMode={isEditMode}
              eventData={eventData}
              onCancel={handleCancel}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewEventModal;
