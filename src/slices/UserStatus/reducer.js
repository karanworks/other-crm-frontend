import { createSlice } from "@reduxjs/toolkit";
import { getMonitoringData, monitoringGet } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  monitoringData: [],
  campaignUsers: null,
  error: "",
};
const monitoringSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(monitoringGet.fulfilled, (state, action) => {
      console.log("monitoring slice ->", action);

      if (action?.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.campaignUsers = action.payload.data.users;
        state.error = "";
      }
    });
    builder.addCase(getMonitoringData.fulfilled, (state, action) => {
      state.campaignUsers = action.payload.data.users;
      state.error = "";
    });
  },
});

export default monitoringSlice.reducer;
