import { createSlice } from "@reduxjs/toolkit";
import {
  getCampaigns,
  createCampaign,
  removeCampaign,
  updateCampaign,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  campaigns: [],
  alreadyExistsError: null,
  error: "",
  lastActiveTime: "",
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.campaigns = action.payload?.data.campaigns;
        state.lastActiveTime = action.payload?.data.lastActiveTime;
        state.error = "";
      }
    });

    builder.addCase(createCampaign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.campaigns = [...state.campaigns, action.payload.data];
        state.alreadyExistsError = null;
        state.error = "";

        toast.success("Campaign has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateCampaign.fulfilled, (state, action) => {
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
        toast.success("Campaign details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeCampaign.fulfilled, (state, action) => {
      const deletedCampaignId = action.payload.id;
      state.campaigns = state.campaigns.filter(
        (campaign) => campaign.id !== deletedCampaignId
      );

      state.error = "";

      toast.error("Campaign has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default campaignSlice.reducer;
