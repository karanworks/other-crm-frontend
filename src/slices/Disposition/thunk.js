import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDispositions as getDispositionsApi,
  createDisposition as createDispositionApi,
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
