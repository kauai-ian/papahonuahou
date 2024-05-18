import {
  createEvent,
  editEvent,
  deleteEvent,
  getStatistics,
} from "../api/events";
import { listDays, getDay } from "../api/days";

export const testAPI = async () => {
  try {
    const newEvent = await createEvent({
      eventType: "sleep",
      notes: "Night sleep",
      eventStart: "2024-05-01T22:00:00Z",
      eventEnd: "2024-05-02T06:00:00Z",
      _id: "6647851f3e87c58c031588c6",
    });
    console.log("createEvent response:", newEvent);

    const newEvent2 = await createEvent({
        eventType: "sleep",
        notes: "Night sleep",
        eventStart: "2024-05-03T22:00:00Z",
        eventEnd: "2024-05-04T06:00:00Z",
        _id: "6647851f3e87c58c031588c7",
      });
      console.log("createEvent response:", newEvent2);

      const newEvent3 = await createEvent({
        eventType: "sleep",
        notes: "Night sleep",
        eventStart: "2024-05-04T22:00:00Z",
        eventEnd: "2024-05-05T06:00:00Z",
        _id: "6647851f3e87c58c031588c9",
      });
      console.log("createEvent response:", newEvent3);

    const updatedEvent = await editEvent("6647851f3e87c58c031588c9", {
      eventType: "sleep",
      notes: "Updated night sleep",
      eventStart: "2024-05-01T23:00:00Z",
      eventEnd: "2024-05-02T07:00:00Z",
    });
    console.log("editEvent response:", updatedEvent);

    const deleteResponse = await deleteEvent("6647851f3e87c58c031588c9");
    console.log("deleteEvent response:", deleteResponse);

    const statistics = await getStatistics({
      eventType: "sleep",
      eventStart: new Date("2023-05-01T00:00:00Z"),
      eventEnd: new Date("2024-05-20T23:59:59Z"),
    });
    console.log("getStatistics response:", statistics);

    const days = await listDays();
    console.log("listDays response:", days);

    const day = await getDay("664785013e87c58c031588bb");
    console.log("getDay response:", day);
  } catch (error) {
    console.error("API test error:", error);
  }
};


