// display details of a selected day
import React, { useEffect, useState } from "react";
import EventForm, { EventProps } from "./EventForm";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DayProps } from "./DayList";
import ListEvents from "./ListEvents";

export type DayDetailsProps = {
    day: DayProps;
    editingEventId: string | null;
    onClose: () => void;
    isOpen: boolean;
}

// dropdown that displays the day event list, and the date at the top
//receive ay object as props that contains the details of the selected day
// displays the date of the day and a list of events
//each event is a list item with its event type, notes, time start end
export const DayDetailsDropdown: React.FC<DayDetailsProps> = ({ day, editingEventId, onClose }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventData, setEditingEventData] = useState<EventProps | null>(null);
// check if id exists fetch event data corresponding to editingEventId
  useEffect(() => {
    setIsEditMode(!!editingEventId);
    if (editingEventId) {
      const eventData = day.events.find(
        event => event._id === editingEventId
      );
      setEditingEventData(eventData || null);
    }
  }, [editingEventId, day.events]); 

  const handleEditEvent = async (eventId: string) => {
    try {
      // find event using the data from the eventId
      const eventData = day.events.find(
        event => event._id === eventId
      );
      setEditingEventData(eventData || null);
      setIsEditMode(true);
    } catch (error) {
      console.error("Error finding event data:", error);
    }
  };

  return (
    <Menu>
      <MenuButton as="button">Day Details</MenuButton>
      <MenuList>
        <MenuItem onClick={onClose}>Close</MenuItem>
        <MenuItem>Date: {day.date}</MenuItem>
        <MenuItem>
          Events:
          <ul>
            {/* {TODO: make an array of event ids from the day} */}
            {ListEvents}
          </ul>
        </MenuItem>
      </MenuList>
      {/* Render EventForm as a modal */}
      <Modal isOpen={isEditMode} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditMode ? "Edit Event" : "Create Event"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEditMode && editingEventData ? (
              <EventForm
                isEditMode={true}
                eventData={editingEventData}
                onClose={onClose}
              />
            ) : (
              <EventForm isEditMode={false} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Menu>
  );
};
