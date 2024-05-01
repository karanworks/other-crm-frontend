import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getIVRCampaigns as getIVRCampaignsApi,
  createIVRCampaign as createIVRCampaignApi,
  removeIVRCampaign as removeIVRCampaignApi,
  updateIVRCampaign as updateIVRCampaignApi,
} from "../../helpers/fakebackend_helper";

export const getIVRCampaigns = createAsyncThunk(
  "ivrCampaigns/getIVRCampaigns",
  async () => {
    try {
      const response = await getIVRCampaignsApi();
      return response;
    } catch (error) {
      console.log("error inside get campaigns thunk", error);
    }
  }
);

export const createIVRCampaign = createAsyncThunk(
  "ivrCampaigns/createIVRCampaigns",
  async (data) => {
    try {
      const response = await createIVRCampaignApi(data);
      return response;
    } catch (error) {
      console.log("error inside get campgaigns thunk", error);
    }
  }
);

export const updateIVRCampaign = createAsyncThunk(
  "ivrCampaigns/updateIVRCampaign",
  async (data) => {
    try {
      const response = await updateIVRCampaignApi(
        data.listCampaignId,
        data.values
      );
      console.log("response while updating campaign", response);
      return response;
    } catch (error) {
      console.log("error inside update campaign thunk", error);
    }
  }
);

export const removeIVRCampaign = createAsyncThunk(
  "ivrCampaigns/removeIVRCampaign",
  async (ivrCampaignId) => {
    try {
      const response = await removeIVRCampaignApi(ivrCampaignId);

      return response.data.deletedCampaign;
    } catch (error) {
      console.log("error inside remove campaign thunk", error);
    }
  }
);
