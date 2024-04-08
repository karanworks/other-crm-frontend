import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCrmField as createCrmFieldApi,
  getCrmConfigurationData as getCrmConfigurationDataApi,
  updateCrmField as updateCrmFieldApi,
  removeCrmField as removeCrmFieldApi,
} from "../../helpers/fakebackend_helper";

export const getCrmConfigurationData = createAsyncThunk(
  "crmConfiguration/getCrmConfigurationData",
  async () => {
    try {
      const response = await getCrmConfigurationDataApi();
      return response;
    } catch (error) {
      console.log("error inside getCrmConfigurationData thunk", error);
    }
  }
);

export const createCrmField = createAsyncThunk(
  "crmConfiguration/createCrmField",
  async ({ selectedCampaignId, values }) => {
    try {
      const response = await createCrmFieldApi(selectedCampaignId, values);

      return response;
    } catch (error) {
      console.log("error inside create crmfield thunk", error);
    }
  }
);

export const updateCrmField = createAsyncThunk(
  "crmConfiguration/updateCrmField",
  async ({ selectedCampaignId, listCrmFieldId, values }) => {
    try {
      const response = await updateCrmFieldApi(
        selectedCampaignId,
        listCrmFieldId,
        values
      );
      console.log("thunk resopnse after updating crm field ->", response);
      return response;
    } catch (error) {
      console.log("error inside update campaign thunk", error);
    }
  }
);

export const removeCrmField = createAsyncThunk(
  "crmConfiguration/removeCrmField",
  async ({ selectedCampaignId, listCrmFieldId }) => {
    try {
      const response = await removeCrmFieldApi(
        selectedCampaignId,
        listCrmFieldId
      );

      return response;
    } catch (error) {
      console.log("error inside remove campaign thunk", error);
    }
  }
);
