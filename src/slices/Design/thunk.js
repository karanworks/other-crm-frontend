import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDesign as getDesignApi,
  createDesign as createDesignApi,
  removeDesign as removeDesignApi,
  updateDesign as updateDesignApi,
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
    console.log("parent id while creating design ->", parentId);
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

export const updateDesign = createAsyncThunk(
  "design/updateDesign",
  async ({ listDesignId, audioText }) => {
    try {
      console.log(
        "DATA RECEIVED IN UPDATION THUNK ->",
        listDesignId,
        audioText
      );
      const response = await updateDesignApi({
        designId: listDesignId,
        audioText,
      });
      console.log("response while updating design", response);
      return response;
    } catch (error) {
      console.log("error inside update design thunk", error);
    }
  }
);

export const removeDesign = createAsyncThunk(
  "design/removeDesign",
  async (listDesignId) => {
    try {
      const response = await removeDesignApi({ designId: listDesignId });

      return response;
    } catch (error) {
      console.log("error inside get ivr design thunk", error);
    }
  }
);
