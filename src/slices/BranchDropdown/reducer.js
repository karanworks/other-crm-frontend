import { createSlice } from "@reduxjs/toolkit";
import { createBranchDropdown, getBranchDropdowns } from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  branchDropdowns: [],
};

const branchDropdownSlice = createSlice({
  name: "branchDropdown",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBranchDropdowns.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.branchDropdowns = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(createBranchDropdown.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.branchDropdowns = [...state.branchDropdowns, action.payload.data];
        state.error = "";

        toast.success("Branch Dropdown has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default branchDropdownSlice.reducer;
