// users api with create, read, update, delete operations
import axios from "axios";
const ROOT = import.meta.env.VITE_ROOT;
import { User } from "@auth0/auth0-react";


// // add authentication to the api calls
// axios.interceptors.request.use(
//   (config) => {
//     const token = // TODO: get the access token from Auth0
//     config.headers.Authorization = `Bearer ${token}`; // success callback
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// create a new user
export const createUser = async (data: User) => {
  const response = await axios.post(`${ROOT}/users`, data);
  return response.data;
};

// update a user
export const updateUser = async (sub: string, data: User, token: string) => {
  const response = await axios.put(`${ROOT}/users/${sub}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// get user by id
export const getUser = async (sub: string, token: string) => {
  const response = await axios.get(`${ROOT}/users/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// delete a user
export const deleteUser = async (sub: string, token: string) => {
  const response = await axios.delete(`$ROOT/users/${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// get all users
export const listUsers = async () => {
  const response = await axios.get(`${ROOT}/users`);
  return response.data;
};

// TODO: should i add data in the parameters for getUser and deleteUser? Would it be undefined?
