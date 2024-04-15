import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDispositions as getDispositionsApi,
  createDisposition as createDispositionApi,
  updateDisposition as updateDispositionApi,
  removeDisposition as removeDispositionApi,
} from "../../helpers/fakebackend_helper";

export const createDisposition = createAsyncThunk(
  "disposition/createDisposition",
  async ({ selectedCampaignId, dispositionName, options }) => {
    try {
      const response = await createDispositionApi({
        campaignId: selectedCampaignId,
        dispositionName,
        options,
      });

      console.log("create disposition reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in create dispositions thunk", error);
    }
  }
);
export const updateDisposition = createAsyncThunk(
  "disposition/updateDisposition",
  async ({
    selectedCampaignId,
    listDispositionId,
    dispositionName,
    options,
  }) => {
    try {
      const response = await updateDispositionApi({
        campaignId: selectedCampaignId,
        dispositionId: listDispositionId,
        dispositionName,
        options,
      });

      console.log("update disposition reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in update dispositions thunk", error);
    }
  }
);
export const removeDisposition = createAsyncThunk(
  "disposition/removeDisposition",
  async ({ selectedCampaignId, listDispositionId }) => {
    try {
      const response = await removeDispositionApi({
        campaignId: selectedCampaignId,
        dispositionId: listDispositionId,
      });

      return response;
    } catch (error) {
      console.log("error in delete dispositions thunk", error);
    }
  }
);
export const getDispositions = createAsyncThunk(
  "disposition/getDipositions",
  async () => {
    try {
      const response = await getDispositionsApi();

      console.log("get dispositions reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in get dispositions thunk", error);
    }
  }
);
