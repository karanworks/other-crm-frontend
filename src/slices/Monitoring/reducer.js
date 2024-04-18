import { createSlice } from "@reduxjs/toolkit";
import { getMonitoringData } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  monitoringData: [],
  campaignUsers: null,
};
const monitoringSlice = createSlice({
  name: "monitoring",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMonitoringData.fulfilled, (state, action) => {
      console.log("monitroring data ->", action.payload);
      state.campaignUsers = action.payload.data.users;
    });
  },
});

export default monitoringSlice.reducer;
