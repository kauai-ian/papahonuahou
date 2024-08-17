import axios from "axios";
import { EventProps } from "../context/eventsContext";

const ROOT = import.meta.env.VITE_ROOT + "/events";

type CreateEventData = Omit<EventProps, "_id">;
type EditEventData = EventProps;

export const listEvents = async (token: string) => {
  const response = await axios.get(`${ROOT}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getEvent = async (_id: string, token: string) => {
  const response = await axios.get(`${ROOT}/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createEvent = async (data: CreateEventData, token: string) => {
  const response = await axios.post(ROOT, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editEvent = async (
  _id: string,
  data: EditEventData,
  token: string
) => {
  const response = await axios.put(`${ROOT}/${_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (_id: string, token: string) => {
  const response = await axios.delete(`${ROOT}/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getStatistics = async (
  filter: {
    eventTypes: string[];
    eventStart: Date;
    eventEnd: Date;
  },
  token: string
) => {
  try {
    const response = await axios.post(`${ROOT}/statistics`, filter, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getStatistics API call:", error);
    throw error;
  }
};
