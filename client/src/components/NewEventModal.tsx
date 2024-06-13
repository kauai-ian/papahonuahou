import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import EventForm from "./EventForm";
import { EventProps } from "../context/eventsContext";

export type NewEventProps = {
  isOpen: boolean;
  onClose: () => void;
  eventData?: EventProps;
  eventType?: string;
  isEditMode?: boolean;
};

const NewEventModal: React.FC<NewEventProps> = ({
  isOpen,
  onClose,
  eventData,
  eventType,
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
          <ModalCloseButton />
          <ModalBody>
            <EventForm
              isEditMode={isEditMode}
              eventData={eventData}
              eventType={eventType}
              onCancel={handleCancel}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewEventModal;
