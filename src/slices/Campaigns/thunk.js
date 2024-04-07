import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCampaigns as getCampaignsApi,
  createCampaign as createCampaignApi,
  removeCampaign as removeCampaignApi,
  updateCampaign as updateCampaignApi,
} from "../../helpers/fakebackend_helper";

export const getCampaigns = createAsyncThunk(
  "campaigns/getCampaigns",
  async () => {
    try {
      const response = await getCampaignsApi();
      return response;
    } catch (error) {
      console.log("error inside get campaigns thunk", error);
    }
  }
);

export const createCampaign = createAsyncThunk(
  "campaigns/createCampaigns",
  async (data) => {
    try {
      const response = await createCampaignApi(data);

      return response;
    } catch (error) {
      console.log("error inside get campgaigns thunk", error);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "campaigns/udpateCampaign",
  async (data) => {
    try {
      const response = await updateCampaignApi(
        data.listCampaignId,
        data.values
      );

      return response;
    } catch (error) {
      console.log("error inside update campaign thunk", error);
    }
  }
);

export const removeCampaign = createAsyncThunk(
  "campaigns/removeCampaign",
  async (campaignId) => {
    try {
      const response = await removeCampaignApi(campaignId);

      return response.data.deletedCampaign;
    } catch (error) {
      console.log("error inside remove campaign thunk", error);
    }
  }
);
