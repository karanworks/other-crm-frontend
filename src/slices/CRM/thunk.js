import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCrmFormData as createCrmFormDataApi,
  getCRMData as getCRMDataApi,
} from "../../helpers/fakebackend_helper";

export const getCRMData = createAsyncThunk("crm/getCRMData", async (values) => {
  try {
    const response = await getCRMDataApi();
    return response;
  } catch (error) {
    console.log("error in get crm data thunk ->", error);
  }
});
export const createCrmFormData = createAsyncThunk(
  "crm/createCrmFormData",
  async (values) => {
    try {
      console.log("values while creating form data in thunk ->", values);
      const response = await createCrmFormDataApi(values);
      return response;
    } catch (error) {
      console.log("error in create crm form data thunk ->", error);
    }
  }
);
