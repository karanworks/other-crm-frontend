import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEvents as getEventsApi,
  getAllEvents as getAllEventsApi,
  createEvent as createEventApi,
  removeEvent as removeEventApi,
  updateEvent as updateEventApi,
} from "../../helpers/fakebackend_helper";

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async () => {
    try {
      const response = await getAllEventsApi();
      console.log("ALL EVENTS RESPONSE ->", response);

      return response;
    } catch (error) {
      console.log("error inside get events thunk", error);
    }
  }
);
export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (taskId) => {
    try {
      const response = await getEventsApi(taskId);

      return response;
    } catch (error) {
      console.log("error inside get events thunk", error);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data) => {
    try {
      const response = await createEventApi(data);

      return response;
    } catch (error) {
      console.log("error inside get event thunk", error);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventName, eventDate, listEventId: eventId, status }) => {
    try {
      const response = await updateEventApi({
        eventName,
        eventDate,
        eventId,
        status,
      });

      return response;
    } catch (error) {
      console.log("error inside update event thunk", error);
    }
  }
);

// export const removeEvent = createAsyncThunk(
//   "report/removeEvent",
//   async (listEventId) => {
//     try {
//       const response = await removeEventApi(listEventId);

//       return response;
//     } catch (error) {
//       console.log("error inside remove event thunk", error);
//     }
//   }
// );
