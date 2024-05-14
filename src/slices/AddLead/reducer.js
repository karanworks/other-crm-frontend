import { createSlice } from "@reduxjs/toolkit";
import { getLeads, createLead, removeLead, updateLead } from "./thunk";

// import {
//   getCampaigns,
//   createCampaign,
//   removeCampaign,
//   updateCampaign,
// } from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  leads: [],
  alreadyExistsError: null,
  error: "",
};

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeads.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.campaigns = action.payload?.data.campaigns;
        state.error = "";
      }
    });

    builder.addCase(createLead.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.campaigns = [...state.campaigns, action.payload.data];
        state.alreadyExistsError = null;
        state.error = "";

        toast.success("Lead has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateLead.fulfilled, (state, action) => {
      console.log("action payload while updating", action.payload);

      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        const updatedCampaignId = action.payload.data?.updatedCampaign.id;

        state.campaigns = state.campaigns.map((campaign) => {
          if (campaign.id == updatedCampaignId) {
            campaign = action.payload.data.updatedCampaign;
            return campaign;
          } else {
            return campaign;
          }
        });

        state.alreadyExistsError = null;
        state.error = "";
        toast.success("Lead details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeLead.fulfilled, (state, action) => {
      const deletedCampaignId = action.payload.id;
      state.campaigns = state.campaigns.filter(
        (campaign) => campaign.id !== deletedCampaignId
      );

      state.error = "";

      toast.error("Lead has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default leadSlice.reducer;
