import { createSlice } from "@reduxjs/toolkit";
import {
  getDispositions,
  createDisposition,
  updateDisposition,
  removeDisposition,
} from "./thunk";

export const initialState = {
  dispositionsData: null,
  dispositions: null,
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
    builder.addCase(createDisposition.fulfilled, (state, action) => {
      console.log(
        "disposition payload in create disposition reducer ->",
        action.payload
      );
      state.dispositions = [...state.dispositions, action.payload.data];
    });
    builder.addCase(updateDisposition.fulfilled, (state, action) => {
      console.log(
        "disposition payload in update disposition reducer ->",
        action.payload
      );
    });
    builder.addCase(removeDisposition.fulfilled, (state, action) => {
      console.log(
        "disposition payload in remove disposition reducer ->",
        action.payload
      );

      state.dispositions = state.dispositions.filter((disposition) => {
        return disposition.id !== action.payload.data.id;
      });
    });
    builder.addCase(getDispositions.fulfilled, (state, action) => {
      console.log(
        "disposition payload in get position reducer ->",
        action.payload
      );
      state.dispositionsData = action.payload.data;
    });
  },
});

export const { changeCampaign } = dispositionSlice.actions;
export default dispositionSlice.reducer;
