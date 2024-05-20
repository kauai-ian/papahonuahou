import axios from "axios";
import { EventProps } from "../components/EventForm";

const ROOT = "http://localhost:3000/api/events";

type CreateEventData = Omit<EventProps, '_id'>;
type EditEventData = EventProps;


export const getEvent = async (_id: string) => {
    const response = await axios.get(`${ROOT}/${_id}`);
    return response.data;
};

export const createEvent = async (data: CreateEventData) => {
    const response = await axios.post(ROOT, data);
    return response.data
}

export const editEvent = async ( _id: string, data: EditEventData) => {
    const response = await axios.put(`${ROOT}/${_id}`, data)
    return response.data
}

export const deleteEvent = async ( _id: string) => {
    const response = await axios.delete(`${ROOT}/${_id}`)
    return response.data
}

export const getStatistics = async (filter: {eventType: string;
    eventStart: Date;
    eventEnd: Date;}) => {
    const response = await axios.post(`${ROOT}/statistics`, filter)
    return response.data
}