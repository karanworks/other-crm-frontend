import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPendingTasks as getPendingTasksApi } from "../../helpers/fakebackend_helper";

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
