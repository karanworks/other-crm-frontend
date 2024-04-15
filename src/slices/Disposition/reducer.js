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

      toast.success("Disposition has been added !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(updateDisposition.fulfilled, (state, action) => {
      console.log(
        "disposition payload in update disposition reducer ->",
        action.payload
      );

      state.dispositions = state.dispositions.map((disposition) => {
        if (disposition.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return disposition;
        }
      });

      toast.success("Disposition has been updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(removeDisposition.fulfilled, (state, action) => {
      console.log(
        "disposition payload in remove disposition reducer ->",
        action.payload
      );

      state.dispositions = state.dispositions.filter((disposition) => {
        return disposition.id !== action.payload.data.id;
      });

      toast.error("Disposition has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
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
