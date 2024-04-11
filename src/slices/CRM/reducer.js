import { createSlice } from "@reduxjs/toolkit";
import { createCrmFormData } from "./thunk";

export const initialState = {
  crmFormData: null,
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCrmFormData.fulfilled, (state, action) => {
      console.log("action payload in crm form data ->", action.payload);
      state.crmFormData = action.payload;
    });
  },
});

export default crmSlice.reducers;
