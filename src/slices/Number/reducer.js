import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getNumbers, createNumber, updateNumber, removeNumber } from "./thunk";
import { getMailDetails } from "../../helpers/fakebackend_helper";

export const initialState = {
  numbersData: [],
  numbers: [],
  error: "",
  selectedIvrCampaignId: null,
  alreadyExistsError: null,
};

const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    changeIvrCampaign(state, action) {
      const selectedCampaign = state.numbersData.ivrCampaigns?.find(
        (campaign) => campaign.ivrCampaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedIvrCampaignId = selectedCampaign.id;

        const numbersOfIvrCamapaign = state.numbersData?.ivrCampaigns?.find(
          (campaign) => campaign.id === state.selectedIvrCampaignId
        );

        if (numbersOfIvrCamapaign && numbersOfIvrCamapaign.numbers) {
          state.numbers = numbersOfIvrCamapaign.numbers;
        } else {
          state.numbers = [];
        }
      } else {
        state.selectedIvrCampaignId = null;
        state.numbers = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNumbers.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.numbersData = action.payload.data;
        console.log("numbers data format ->", action.payload.data);
        state.error = "";
      }
    });

    builder.addCase(createNumber.fulfilled, (state, action) => {
      console.log(
        "action payload while creating number ->",
        action.payload.data
      );

      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
      } else {
        state.numbers = [...state.numbers, action.payload.data];

        const ivrCampaignIndex = state.numbersData.ivrCampaigns.findIndex(
          (campaign) => campaign.id === state.selectedIvrCampaignId
        );
        if (ivrCampaignIndex !== -1) {
          // Create a new state object to trigger immutability handling
          state.numbersData = {
            ...state.numbersData,
            ivrCampaigns: [
              ...state.numbersData.ivrCampaigns.slice(0, ivrCampaignIndex),
              {
                ...state.numbersData.ivrCampaigns[ivrCampaignIndex],
                numbers: [
                  ...state.numbersData.ivrCampaigns[ivrCampaignIndex].numbers,
                  action.payload.data,
                ],
              },
              ...state.numbersData.ivrCampaigns.slice(ivrCampaignIndex + 1),
            ],
          };
        }

        state.error = "";
        state.alreadyExistsError = null;

        toast.success("Number has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateNumber.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
      } else {
        state.numbers = state.numbers.map((number) => {
          if (number.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return number;
          }
        });

        state.error = "";
        state.alreadyExistsError = null;
        toast.success("Number has been updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeNumber.fulfilled, (state, action) => {
      state.numbers = state.numbers.filter((number) => {
        return number.id !== action.payload.data.id;
      });

      state.error = "";

      toast.error("Number has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export const { changeIvrCampaign } = numberSlice.actions;
export default numberSlice.reducer;
