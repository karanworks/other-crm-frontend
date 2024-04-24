import { createSlice } from "@reduxjs/toolkit";
import { loginHistoryGet, loginHistoryData } from "./thunk";

export const initialState = {
  campaignUsers: null,
  error: "",
};

const loginHistoryDataSlice = createSlice({
  name: "loginHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginHistoryGet.fulfilled, (state, action) => {
      if (action?.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        // state.campaignUsers = action.payload.data.users;
        state.error = "";
      }
    });
    builder.addCase(loginHistoryData.fulfilled, (state, action) => {
      state.campaignUsers = action.payload.data.users;
      state.error = "";
    });
  },
});

export default loginHistoryDataSlice.reducer;
