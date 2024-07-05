import { createAsyncThunk } from "@reduxjs/toolkit";

import { changePassword as changePasswordApi } from "../../helpers/fakebackend_helper";

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (data) => {
    try {
      const response = await changePasswordApi(data);

      return response;
    } catch (error) {
      console.log("error inside change password thunk", error);
    }
  }
);
