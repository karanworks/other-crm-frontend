import { createSlice } from "@reduxjs/toolkit";
import { getDesign } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  designData: [],
  alreadyExistsError: null,
  error: "",
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        console.log("ivr design payload from api ->", action.payload.data);
        state.designData = action.payload?.data;
        state.error = "";
      }
    });
  },
});

export default designSlice.reducer;
