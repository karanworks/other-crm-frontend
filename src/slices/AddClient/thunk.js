import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getClients as getClientsApi,
  createClient as createClientApi,
  updateClient as updateClientApi,
  createDropdown as createDropdownApi,
  clientAlreadyExist as clientAlreadyExistApi,
  searchClient as searchClientApi,
} from "../../helpers/fakebackend_helper";

export const clientAlreadyExist = createAsyncThunk(
  "clients/clientAlreadyExist",
  async (mobileNo) => {
    try {
      const response = await clientAlreadyExistApi(mobileNo);

      return response;
    } catch (error) {
      console.log("error inside clients already exist thunk", error);
    }
  }
);

export const getClients = createAsyncThunk("clients/getClients", async () => {
  try {
    const response = await getClientsApi();

    return response;
  } catch (error) {
    console.log("error inside get clients thunk", error);
  }
});

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (data) => {
    try {
      const response = await createClientApi(data);
      return response;
    } catch (error) {
      console.log("error inside create client thunk", error);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (data) => {
    try {
      const response = await updateClientApi(
        data.listClientId,
        data.values,
        data.status
      );
      return response;
    } catch (error) {
      console.log("error inside update client thunk", error);
    }
  }
);

export const searchClient = createAsyncThunk(
  "clients/searchClient",
  async (searchQuery) => {
    try {
      const response = await searchClientApi(searchQuery);
      return response;
    } catch (error) {
      console.log("error inside search client thunk", error);
    }
  }
);

// *****************************************************************
// *************************** DROPDOWNS ***************************
// *****************************************************************

export const createDropdown = createAsyncThunk(
  "leads/createDropdown",
  async (data) => {
    try {
      const response = await createDropdownApi(data);
      return response;
    } catch (error) {
      console.log("error inside create dropdown in lead thunk", error);
    }
  }
);
