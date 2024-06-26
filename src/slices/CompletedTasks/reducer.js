import { createSlice } from "@reduxjs/toolkit";
import { getCompletedTasks } from "./thunk";

export const initialState = {
  userData: null,
  completedTasks: [],
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
  },
});

export default completedTasksSlice.reducer;
