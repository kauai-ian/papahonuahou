import EventForm from "../components/EventForm";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { EventProps } from "../context/eventsContext";

type ListEventProps = {
  selectedDay: string;
  onEventEdit: () => void;
};
// displaying a list of events for the selected day and handling event selection. 
const EventList: React.FC<ListEventProps> = ({ selectedDay, onEventEdit }) => {
  const { events, selectedEvent, isLoading, editEvent, selectEvent } = useEvents();
  

  const filteredEvents = events.filter(
    (event: EventProps) => new Date(event.eventStart).toDateString() === new Date(selectedDay).toDateString()
  );




  return (
    <><Box>
      {isLoading ? (
        <Spinner />
      ) : filteredEvents.length === 0 ? (
        <p>No events to display.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <p>Event Type: {event.eventType}</p>
              <p>Notes: {event.notes}</p>
              <p>Start Time: {event.eventStart}</p>
              <p>End Time: {event.eventEnd}</p>
              <Button onClick={() => handleEdit(event._id)}>Edit</Button>
              <Button onClick={() => handleDelete(event._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
      </Box>
      <Button onClick={toggleCreateEventModal}>Create Event</Button>
      <Modal
        isOpen={isCreateEventModalOpen}
        onClose={() => setCreateEventModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventForm
              onClose={() => setCreateEventModalOpen(false)}
              onSubmit={handleCreateEvent}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditMode} onClose={() => setIsEditMode(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingEventData && (
              <EventForm
                isEditMode={true}
                eventData={editingEventData}
                onClose={() => setIsEditMode(false)}
                onSubmit={isEditMode ? handleEditSubmit : handleCreateEvent}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default EventList;
