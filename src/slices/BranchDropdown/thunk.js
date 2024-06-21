import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createBranchDropdown as createBranchDropdownApi,
  getBranchDropdowns as getBranchDropdownsApi,
} from "../../helpers/fakebackend_helper";

export const getBranchDropdowns = createAsyncThunk(
  "branchDropdowns/getBranchDropdowns",
  async () => {
    try {
      const response = await getBranchDropdownsApi();
      return response;
    } catch (error) {
      console.log("error inside get branch dropdown thunk", error);
    }
  }
);
export const createBranchDropdown = createAsyncThunk(
  "branchDropdowns/createBranchDropdown",
  async ({ branchName }) => {
    try {
      const response = await createBranchDropdownApi(branchName);

      return response;
    } catch (error) {
      console.log("error inside create branch dropdown thunk", error);
    }
  }
);
