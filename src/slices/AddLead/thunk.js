import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getLeads as getLeadsApi,
  createLead as createLeadApi,
  removeLead as removeLeadApi,
  updateLead as updateLeadApi,
} from "../../helpers/fakebackend_helper";

import {
  getCampaigns as getCampaignsApi,
  createCampaign as createCampaignApi,
  removeCampaign as removeCampaignApi,
  updateCampaign as updateCampaignApi,
} from "../../helpers/fakebackend_helper";

export const getLeads = createAsyncThunk("leads/getLeads", async () => {
  try {
    const response = await getLeadsApi();

    return response;
  } catch (error) {
    console.log("error inside get leads thunk", error);
  }
});

export const createLead = createAsyncThunk("leads/createLead", async (data) => {
  try {
    const response = await createLeadApi(data);
    return response;
  } catch (error) {
    console.log("error inside get lead thunk", error);
  }
});

export const updateLead = createAsyncThunk("leads/updateLead", async (data) => {
  try {
    const response = await updateLeadApi(data.listLeadId, data.values);
    console.log("response while updating lead", response);
    return response;
  } catch (error) {
    console.log("error inside update lead thunk", error);
  }
});

export const removeLead = createAsyncThunk(
  "leads/removeLead",
  async (leadId) => {
    try {
      const response = await removeLeadApi(leadId);

      return response;
    } catch (error) {
      console.log("error inside remove lead thunk", error);
    }
  }
);
