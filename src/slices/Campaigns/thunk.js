import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCampaigns as getCampaignsApi,
  createCampaign as createCampaignApi,
  removeCampaign as removeCampaignApi,
  udpateCampaign as udpateCampaignApi,
} from "../../helpers/fakebackend_helper";
import { getLoggedinUser } from "../../helpers/api_helper";

const loggedInUser = getLoggedinUser();

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
      const response = await createCampaignApi(loggedInUser.data.id, data);

      return response;
    } catch (error) {
      console.log("error inside get campgaigns thunk", error);
    }
  }
);

export const removeCampaign = createAsyncThunk(
  "campaigns/removeCampaign",
  async (campaignId) => {
    try {
      const response = await removeCampaignApi(
        loggedInUser.data.id,
        campaignId
      );

      return response.data.deletedCampaign;
    } catch (error) {
      console.log("error inside remove campaign thunk", error);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "campaigns/udpateCampaign",
  async (data) => {
    try {
      const response = await udpateCampaignApi(
        loggedInUser.data.id,
        data.listCampaignId,
        data.values
      );

      return response;
    } catch (error) {
      console.log("error inside update campaign thunk", error);
    }
  }
);
