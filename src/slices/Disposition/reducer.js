import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getDispositions,
  createDisposition,
  updateDisposition,
  removeDisposition,
} from "./thunk";

export const initialState = {
  dispositionsData: null,
  dispositions: null,
  error: "",
  selectedCampaignId: null, //added this line later
  alreadyExistsError: null,
};

const dispositionSlice = createSlice({
  name: "disposition",
  initialState,
  reducers: {
    changeCampaign(state, action) {
      const selectedCampaign = state.dispositionsData.campaigns?.find(
        (campaign) => campaign.campaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedCampaignId = selectedCampaign.id;

        const dispositionsOfCamapaign = state.dispositionsData?.campaigns?.find(
          (campaign) => campaign.id === state.selectedCampaignId
        );

        if (dispositionsOfCamapaign && dispositionsOfCamapaign.dispositions) {
          state.dispositions = dispositionsOfCamapaign.dispositions;
        } else {
          state.dispositions = []; // Set an empty array if Dispositions are missing
        }
      } else {
        state.selectedCampaignId = null; // Set selectedCampaignId to null if campaign is not found
        state.dispositions = []; // Set Dispositions to empty array if disposition is not found
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDispositions.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.dispositionsData = action.payload.data;
        state.error = "";
      }
    });

    builder.addCase(createDisposition.fulfilled, (state, action) => {
      state.dispositions = [...state.dispositions, action.payload.data];

      const campaignIndex = state.dispositionsData.campaigns.findIndex(
        (campaign) => campaign.id === state.selectedCampaignId
      );
      if (campaignIndex !== -1) {
        state.dispositionsData = {
          ...state.dispositionsData,
          campaigns: [
            ...state.dispositionsData.campaigns.slice(0, campaignIndex),
            {
              ...state.dispositionsData.campaigns[campaignIndex],
              dispositions: [
                ...state.dispositionsData.campaigns[campaignIndex].dispositions,
                action.payload.data,
              ],
            },
            ...state.dispositionsData.campaigns.slice(campaignIndex + 1),
          ],
        };
      }

      state.error = "";

      toast.success("Disposition has been added !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(updateDisposition.fulfilled, (state, action) => {
      state.dispositions = state.dispositions.map((disposition) => {
        if (disposition.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return disposition;
        }
      });

      state.error = "";

      toast.success("Disposition has been updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(removeDisposition.fulfilled, (state, action) => {
      state.dispositions = state.dispositions.filter((disposition) => {
        return disposition.id !== action.payload.data.id;
      });

      state.error = "";

      toast.error("Disposition has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export const { changeCampaign } = dispositionSlice.actions;
export default dispositionSlice.reducer;
