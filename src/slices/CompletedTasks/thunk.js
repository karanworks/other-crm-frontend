import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCompletedTasks as getCompletedTasksApi,
  searchCompletedTask as searchCompletedTaskApi,
} from "../../helpers/fakebackend_helper";

export const getCompletedTasks = createAsyncThunk(
  "completedTasks/getCompletedTasks",
  async () => {
    try {
      const response = await getCompletedTasksApi();

      return response;
    } catch (error) {
      console.log("error inside get completed tasks thunk", error);
    }
  }
);

export const searchCompletedTask = createAsyncThunk(
  "completedTasks/searchCompletedTask",
  async (searchQuery) => {
    try {
      const response = await searchCompletedTaskApi(searchQuery);
      return response;
    } catch (error) {
      console.log("error inside search completed task thunk", error);
    }
  }
);
