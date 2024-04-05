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
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      state.campaigns = action.payload?.data.campaigns;
    });

    builder.addCase(createCampaign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
      } else {
        state.campaigns = [...state.campaigns, action.payload.data];
        state.alreadyExistsError = null;

        toast.success("Campaign has been added !", {
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

      toast.error("Campaign has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(updateCampaign.fulfilled, (state, action) => {
      const updatedUserId = action.payload.id;
      state.campaigns = state.campaigns.map((user) => {
        if (user.id == updatedUserId) {
          user = action.payload;
          return user;
        } else {
          return user;
        }
      });

      toast.success("Campaign details updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default campaignSlice.reducer;
