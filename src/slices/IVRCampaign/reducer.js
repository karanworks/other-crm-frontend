import { createSlice } from "@reduxjs/toolkit";
import {
  getIVRCampaigns,
  createIVRCampaign,
  removeIVRCampaign,
  updateIVRCampaign,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  ivrCampaigns: [],
  alreadyExistsError: null,
  error: "",
  lastActiveTime: "",
};

const ivrCampaignSlice = createSlice({
  name: "ivrCampaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIVRCampaigns.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.ivrCampaigns = action.payload?.data.ivrCampaigns;
        state.lastActiveTime = action.payload?.data.lastActiveTime;
        state.error = "";
      }
    });

    builder.addCase(createIVRCampaign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.ivrCampaigns = [...state.ivrCampaigns, action.payload.data];
        state.alreadyExistsError = null;
        state.error = "";

        toast.success("IVR Campaign has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateIVRCampaign.fulfilled, (state, action) => {
      console.log("action payload while updating", action.payload);

      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        const updatedCampaignId = action.payload.data?.updatedCampaign.id;

        state.ivrCampaigns = state.ivrCampaigns.map((campaign) => {
          if (campaign.id == updatedCampaignId) {
            campaign = action.payload.data.updatedCampaign;
            return campaign;
          } else {
            return campaign;
          }
        });

        state.alreadyExistsError = null;
        state.error = "";
        toast.success("IVR Campaign details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeIVRCampaign.fulfilled, (state, action) => {
      const deletedCampaignId = action.payload.id;
      state.ivrCampaigns = state.ivrCampaigns.filter(
        (campaign) => campaign.id !== deletedCampaignId
      );

      state.error = "";

      toast.error("IVR Campaign has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default ivrCampaignSlice.reducer;
