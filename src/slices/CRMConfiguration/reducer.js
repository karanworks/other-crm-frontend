import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  getCrmConfigurationData,
  createCrmField,
  updateCrmField,
  removeCrmField,
} from "./thunk";

export const initialState = {
  crmConfigurationData: [],
  crmFields: null,
  alreadyExistsError: null,
  selectedCampaignId: null,
  error: "",
};

const crmConfigurationSlice = createSlice({
  name: "crmConfiguration",
  initialState,
  reducers: {
    changeCampaign(state, action) {
      const selectedCampaign = state.crmConfigurationData.campaigns?.find(
        (campaign) => campaign.campaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedCampaignId = selectedCampaign.id;

        const crmFieldsOfCampaign = state.crmConfigurationData?.campaigns?.find(
          (campaign) => campaign.id === state.selectedCampaignId
        );

        if (crmFieldsOfCampaign && crmFieldsOfCampaign.crmFields) {
          state.crmFields = crmFieldsOfCampaign.crmFields.sort(
            (a, b) => a.position - b.position
          );
        } else {
          state.crmFields = []; // Set an empty array if CRM fields are missing
        }
      } else {
        state.selectedCampaignId = null; // Set selectedCampaignId to null if campaign is not found
        state.crmFields = []; // Set crmFields to empty array if campaign is not found
      }
    },

    checkPositionLength(state, action) {
      console.log("action payload for position ->", action.payload);
      if (action.payload > state.crmFields.length + 1) {
        state.alreadyExistsError = `CRM Field position should not be more than ${
          state.crmFields.length + 1
        }`;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCrmConfigurationData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.crmConfigurationData = action.payload.data;
        state.error = "";
      }
    });

    builder.addCase(createCrmField.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else if (action.payload.status === "positions-updated") {
        state.crmFields = action.payload.data;
        state.alreadyExistsError = null;
        state.error = "";
      } else {
        state.crmFields = [...state.crmFields, action.payload.data];

        state.error = "";

        toast.success("CRM Field added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateCrmField.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.crmFields = action.payload.data;
        state.alreadyExistsError = null;
        state.error = "";

        toast.success("Crm Field updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeCrmField.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.crmFields = action.payload.data;
        state.alreadyExistsError = null;
        state.error = "";

        toast.error("CRM Field removed !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export const { changeCampaign, checkPositionLength } =
  crmConfigurationSlice.actions;
export default crmConfigurationSlice.reducer;
