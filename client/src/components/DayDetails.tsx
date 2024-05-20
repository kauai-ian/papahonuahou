// display details of a selected day
import React, { useEffect, useState } from "react";
import EventForm, { EventProps } from "./EventForm";
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
import { formatDate } from "../utils/date";
import { getEvent } from "../api/events";

export type DayDetailsProps = {
  day: DayProps;
  editingEventId: string | null;
  onClose: () => void;
  isOpen: boolean;
};

// dropdown that displays the day event list, and the date at the top
//receive ay object as props that contains the details of the selected day
// displays the date of the day and a list of events
//each event is a list item with its event type, notes, time start end
export const DayDetailsDropdown: React.FC<DayDetailsProps> = ({
  day,
  editingEventId,
  onClose,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventData, setEditingEventData] = useState<EventProps | null>(
    null
  );
  // check if id exists fetch event data corresponding to editingEventId
  useEffect(() => {
    setIsEditMode(!!editingEventId);
    const fetchEventData = async () => {
      if (editingEventId) {
        const eventData = await getEvent(editingEventId);
        setEditingEventData(eventData || null);
      }
    };
    fetchEventData();
  }, [editingEventId]);
  // console.log("day.events", day.events)
  //   // get events for rendering
  //   const validEventIds = day.events
  //     .map((event) => event._id)
  //     .filter((id): id is string => id !== undefined);
  // console.log("valid event ids", validEventIds)
  return (
    <div>
      <h2>Day Details</h2>
      <p>Date: {formatDate(day.dayStart, "MM/DD/YYYY")}</p>
      <div>
        Events:
        <ListEvents eventIds={day.events} />
      </div>
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
    </div>
  );
};
