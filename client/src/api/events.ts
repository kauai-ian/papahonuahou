import axios from "axios";

const ROOT = "http://localhost:3000/api/events";

export const createEvent = async (eventData: {
    eventType: string; notes: string; eventStart: string; eventEnd: string; _id: string;
}) => {
    const response = await axios.post(ROOT, eventData);
    return response.data
}

export const editEvent = async ( _id: string, eventData: {eventType: string; notes: string; eventStart: string; eventEnd: string;}) => {
    const response = await axios.put(`${ROOT}/${_id}`, eventData)
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