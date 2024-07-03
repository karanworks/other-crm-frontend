import { createSlice } from "@reduxjs/toolkit";
import { getCompletedTasks, searchCompletedTask } from "./thunk";

export const initialState = {
  userData: null,
  completedTasks: [],
  searchedCompletedTasks: [],
  error: "",
};

const completedTasksSlice = createSlice({
  name: "completedTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompletedTasks.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.userData = action.payload.data;
        state.completedTasks = action.payload?.data.completedTasks;
        state.error = "";
      }
    });
    builder.addCase(searchCompletedTask.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.userData = action.payload.data;
        state.searchedCompletedTasks = action.payload?.data.completedTasks;
        state.error = "";
      }
    });
  },
});

export default completedTasksSlice.reducer;
