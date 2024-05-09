import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDesign as getDesignApi,
  createDesign as createDesignApi,
} from "../../helpers/fakebackend_helper";

export const getDesign = createAsyncThunk("design/getDesign", async () => {
  try {
    const response = await getDesignApi();
    return response;
  } catch (error) {
    console.log("error inside get ivr design thunk", error);
  }
});

export const createDesign = createAsyncThunk(
  "design/createDesign",
  async ({ audioText, ivrCampaignId, key, parentId, number }) => {
    try {
      const response = await createDesignApi(
        audioText,
        ivrCampaignId,
        key,
        parentId,
        number
      );
      return response;
    } catch (error) {
      console.log("error inside get ivr design thunk", error);
    }
  }
);
