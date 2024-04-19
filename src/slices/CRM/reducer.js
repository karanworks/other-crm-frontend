import { createSlice } from "@reduxjs/toolkit";
import { createCrmFormData, getCRMData } from "./thunk";

export const initialState = {
  crmFormData: null,
  error: "",
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCRMData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.crmFormData = action.payload;
        state.error = "";
      }
    });
    builder.addCase(createCrmFormData.fulfilled, (state, action) => {
      state.crmFormData = action.payload;
      state.error = "";
    });
  },
});

export default crmSlice.reducers;
