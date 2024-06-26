import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasks as getTasksApi,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
} from "../../helpers/fakebackend_helper";

export const getTasks = createAsyncThunk("tasks/getTasks", async (mobileNo) => {
  try {
    const response = await getTasksApi(mobileNo);

    return response;
  } catch (error) {
    console.log("error inside get tasks thunk", error);
  }
});

export const createTask = createAsyncThunk("tasks/createTask", async (data) => {
  try {
    const response = await createTaskApi(data);
    return response;
  } catch (error) {
    console.log("error inside get task thunk", error);
  }
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (data) => {
  try {
    console.log("UPDATED TASK THUNK ->", data);

    const response = await updateTaskApi(
      data.listTaskId,
      data.values,
      data.status
    );
    console.log("response while updating task", response);
    return response;
  } catch (error) {
    console.log("error inside update task thunk", error);
  }
});
