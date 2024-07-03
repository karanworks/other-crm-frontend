import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPendingTasks as getPendingTasksApi,
  searchPendingTask as searchPendingTaskApi,
} from "../../helpers/fakebackend_helper";

export const getPendingTasks = createAsyncThunk(
  "pendingTasks/getPendingTasks",
  async () => {
    try {
      const response = await getPendingTasksApi();

      return response;
    } catch (error) {
      console.log("error inside get pending tasks thunk", error);
    }
  }
);

export const searchPendingTask = createAsyncThunk(
  "pendingTasks/searchPendingTask",
  async (searchQuery) => {
    try {
      const response = await searchPendingTaskApi(searchQuery);
      return response;
    } catch (error) {
      console.log("error inside search pending task thunk", error);
    }
  }
);
