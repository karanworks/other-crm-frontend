import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCrmFormData as createCrmFormDataApi } from "../../helpers/fakebackend_helper";

export const createCrmFormData = createAsyncThunk(
  "crm/createCrmFormData",
  async (values) => {
    try {
      const response = await createCrmFormDataApi(values);
      return response;
    } catch (error) {
      console.log("error in create crm form data thunk ->", error);
    }
  }
);
