import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCompletedTasks as getCompletedTasksApi } from "../../helpers/fakebackend_helper";

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
