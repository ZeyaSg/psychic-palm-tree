import type { Event, User } from "./types";
import {
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  removeAuthenticatedUserToken,
  storeAuthenticatedUserToken,
} from "./auth";

const API_URL = import.meta.env.VITE_API_URL;
// Fetch all events
export const fetchEvents = async (): Promise<Event[]> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Fetch a event given its id
export const fetchEventById = async (id: string): Promise<Event> => {
  const response = await fetch(`${API_URL}/events/${id}?`);
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// Delete an event by id
export const deleteEvent = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// Create an event
export const createEvent = async (
  name: string,
  location?: string,
  dateOfEvent?: string,
): Promise<Event> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, location, dateOfEvent }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// // Edit a event
// export const editEvent = async (
//   id: string,
//   title: string,
//   image?: string,
// ): Promise<Event> => {
//   const token = getAuthenticatedUserToken();

//   const response = await fetch(`${API_URL}/events/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ title, image }),
//   });
//   const responseJson = await response.json();

//   if (!response.ok) {
//     handleError(response, responseJson.message);
//   }

//   return responseJson.data;
// };

// Login, store the token, and return the user
export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;
  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  // You can send a request to the server to perform server-side logout
  // Here we just clear the token
  removeAuthenticatedUserToken();
};

// Register a new user
export const register = async (
  username: string,
  password: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
};

const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    removeAuthenticatedUserToken();
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`,
  );
};
