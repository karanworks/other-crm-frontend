import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNumbers as getNumbersApi,
  createNumber as createNumberApi,
  updateNumber as updateNumberApi,
  removeNumber as removeNumberApi,
} from "../../helpers/fakebackend_helper";

export const createNumber = createAsyncThunk(
  "number/createNumber",
  async ({ selectedIvrCampaignId, name, number, department }) => {
    try {
      const response = await createNumberApi({
        ivrCampaignId: selectedIvrCampaignId,
        name,
        number,
        department,
      });

      console.log("create number reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in create number thunk", error);
    }
  }
);
export const updateNumber = createAsyncThunk(
  "number/updateNumber",
  async ({ selectedIvrCampaignId, listNumberId, name, number, department }) => {
    try {
      const response = await updateNumberApi({
        ivrCampaignId: selectedIvrCampaignId,
        numberId: listNumberId,
        name,
        number,
        department,
      });

      console.log("update number reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in update number thunk", error);
    }
  }
);
export const removeNumber = createAsyncThunk(
  "number/removeNumber",
  async ({ selectedIvrCampaignId, listNumberId }) => {
    try {
      const response = await removeNumberApi({
        ivrCampaignId: selectedIvrCampaignId,
        numberId: listNumberId,
      });

      return response;
    } catch (error) {
      console.log("error in delete number thunk", error);
    }
  }
);
export const getNumbers = createAsyncThunk("number/getNumbers", async () => {
  try {
    const response = await getNumbersApi();

    console.log("get numbers reponse in thunk ->", response);
    return response;
  } catch (error) {
    console.log("error in get numbers thunk", error);
  }
});
