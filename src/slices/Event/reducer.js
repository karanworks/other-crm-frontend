import { createSlice } from "@reduxjs/toolkit";
import {
  getAllEvents,
  getEvents,
  createEvent,
  removeEvent,
  updateEvent,
} from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  allEvents: [],
  leadEvents: [],
  error: "",
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getLeadEvents(state, action) {
      state.leadEvents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.allEvents = action.payload?.data.allEvents;
        state.error = "";
      }
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.leadEvents = action.payload?.data.leadEvents;
        state.error = "";
      }
    });

    builder.addCase(createEvent.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.leadEvents = [...state.leadEvents, action.payload.data];
        state.error = "";

        toast.success("Event has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateEvent.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        const updatedEventId = action.payload.data?.updatedEvent.id;

        if (action.payload.data?.updatedEvent.status === 0) {
          state.leadEvents = state.leadEvents.filter(
            (event) => event.id !== updatedEventId
          );
          state.error = "";

          toast.error("Event has been removed !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          state.leadEvents = state.leadEvents.map((event) => {
            if (event.id == updatedEventId) {
              event = action.payload.data.updatedEvent;
              return event;
            } else {
              return event;
            }
          });

          state.error = "";
          toast.success("Event details updated !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  },
});

export const { getLeadEvents } = eventSlice.actions;
export default eventSlice.reducer;
