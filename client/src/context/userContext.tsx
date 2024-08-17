// user context
// The goal of this context is to manage the user state - like who is the current user and the token for authentication.

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { createContext } from "vm";

export type User = {
  sub: string;
  email: string;
  name: string;
  displayName: string;
  joined: string;
  bio: string;
  profileImage: string;
  connections: [];
};

export type UserContextType = {
  currentUser: User | undefined;
};

const initUserState = {
  currentUser: undefined,
};

export const userContext = createContext(initUserState);

// user provider
// The user provider will be the component that wraps the entire application. It will provide the user state to all the components in the application.
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const {
    user: auth0User,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
};
// import from useAuth0

// is loading user state

// users that are not the current user

// token from jwt stored in state

// create user

// update current user

// delete current user

// get current user by id

// get token

// useeffect to rerender authloading, authenticated and auth user  use the sub from the user to get the user from the database
