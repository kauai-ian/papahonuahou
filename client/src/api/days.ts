import axios from "axios";

const ROOT = "http://localhost:3000/api/days";

export const listDays = async () => {
    const response = await axios.get(ROOT);
    return response.data
}

export const getDay = async (_id: string) => {
    const response = await axios.get(`${ROOT}/${_id}`);
    return response.data
}