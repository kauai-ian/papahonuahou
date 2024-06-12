import axios from "axios";

const ROOT = import.meta.env.VITE_ROOT;
console.log("API Root URL:", ROOT);

export const listDays = async () => {
  const response = await axios.get(`${ROOT}/days`);
  console.log("response", response.data);
  return response.data;
};

export const getDay = async (_id: string) => {
  const response = await axios.get(`${ROOT}/days/${_id}`);
  return response.data;
};
