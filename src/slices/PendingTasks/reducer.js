import { createSlice } from "@reduxjs/toolkit";
import { getPendingTasks, searchPendingTask } from "./thunk";

export const initialState = {
  userData: null,
  pendingTasks: [],
  searchedPendingTasks: [],
  error: "",
};

const pendingTasksSlice = createSlice({
  name: "pendingTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPendingTasks.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.userData = action.payload.data;
        state.pendingTasks = action.payload?.data.pendingTasks;
        state.error = "";
      }
    });

    builder.addCase(searchPendingTask.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.searchedPendingTasks = action.payload?.data.pendingTasks;
        state.error = "";
      }
    });
  },
});

export default pendingTasksSlice.reducer;
