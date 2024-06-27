import { createSlice, current } from "@reduxjs/toolkit";
import {
  getClients,
  createClient,
  updateClient,
  createDropdown,
  clientAlreadyExist,
} from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  userData: null,
  clients: [],
  tasks: [], // tasks are being used in invoice page
  dropdowns: [],
  error: "",
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    updateTasks(state, action) {
      const selectedClient = state.clients.find(
        (client) => client.id === action.payload
      );

      state.tasks = selectedClient.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clientAlreadyExist.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.error = "";
      }
    });
    builder.addCase(getClients.fulfilled, (state, action) => {
      console.log("CLIENTS HERE ->", action.payload);

      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.userData = action.payload.data;
        state.clients = action.payload?.data.clients;
        state.dropdowns = action.payload.data.dropdowns;
        state.error = "";
      }
    });

    builder.addCase(createClient.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.clients = [...state.clients, action.payload.data];
        state.error = "";

        toast.success("Client has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateClient.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        const updatedClientId = action.payload.data?.updatedClient.id;

        if (action.payload.data?.updatedClient.status === 0) {
          state.clients = state.clients.filter(
            (client) => client.id !== updatedClientId
          );
          state.error = "";

          toast.error("Client has been removed !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          state.clients = state.clients.map((client) => {
            if (client.id == updatedClientId) {
              client = action.payload.data.updatedClient;
              return client;
            } else {
              return client;
            }
          });

          state.alreadyExistsError = null;
          state.error = "";
          toast.success("Client details updated !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });

    // *****************************************************************
    // *************************** DROPDOWNS ***************************
    // *****************************************************************

    builder.addCase(createDropdown.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.dropdowns = [...state.dropdowns, action.payload.data];
        state.error = "";

        toast.success("Dropdown has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export const { updateTasks } = clientSlice.actions;
export default clientSlice.reducer;
