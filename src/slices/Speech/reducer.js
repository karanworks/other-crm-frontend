import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getSpeeches, createSpeech, updateSpeech, removeSpeech } from "./thunk";

export const initialState = {
  speechesData: [],
  speeches: [],
  error: "",
  selectedIvrCampaignId: null,
  alreadyExistsError: null,
};

const speechSlice = createSlice({
  name: "speech",
  initialState,
  reducers: {
    changeIvrCampaign(state, action) {
      const selectedCampaign = state.speechesData.ivrCampaigns?.find(
        (campaign) => campaign.ivrCampaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedIvrCampaignId = selectedCampaign.id;

        const numbersOfIvrCamapaign = state.speechesData?.ivrCampaigns?.find(
          (campaign) => campaign.id === state.selectedIvrCampaignId
        );

        if (numbersOfIvrCamapaign && numbersOfIvrCamapaign.speeches) {
          state.speeches = numbersOfIvrCamapaign.speeches;
        } else {
          state.speeches = [];
        }
      } else {
        state.selectedIvrCampaignId = null;
        state.speeches = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpeeches.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.speechesData = action.payload.data;
        state.error = "";
      }
    });

    builder.addCase(createSpeech.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
      } else {
        if (action.payload.data.ivrCampaignId === state.selectedIvrCampaignId) {
          state.speeches = [...state.speeches, action.payload.data];
        } else {
          const newSpeech = action.payload.data;

          // Find the IVR campaign with the matching ID
          const ivrCampaignToUpdate = state.speechesData.ivrCampaigns.find(
            (campaign) => campaign.id === newSpeech.ivrCampaignId
          );

          if (ivrCampaignToUpdate) {
            // Update the speeches property of the found IVR campaign
            ivrCampaignToUpdate.speeches = [
              ...ivrCampaignToUpdate.speeches,
              newSpeech,
            ];

            // Update the state.speechesData with the modified IVR campaigns
            state.speechesData = {
              ...state.speechesData,
              ivrCampaigns: state.speechesData.ivrCampaigns.map((campaign) => {
                if (campaign.ivrCampaignId === newSpeech.ivrCampaignId) {
                  return ivrCampaignToUpdate;
                }
                return campaign;
              }),
            };
          }
        }

        // const ivrCampaignIndex = state.speechesData.ivrCampaigns.findIndex(
        //   (campaign) => campaign.id === state.selectedIvrCampaignId
        // );
        // if (ivrCampaignIndex !== -1) {
        //   // Create a new state object to trigger immutability handling
        //   state.speechesData = {
        //     ...state.speechesData,
        //     ivrCampaigns: [
        //       ...state.speechesData.ivrCampaigns.slice(0, ivrCampaignIndex),
        //       {
        //         ...state.speechesData.ivrCampaigns[ivrCampaignIndex],
        //         speeches: [
        //           ...state.speechesData.ivrCampaigns[ivrCampaignIndex].speeches,
        //           action.payload.data,
        //         ],
        //       },
        //       ...state.speechesData.ivrCampaigns.slice(ivrCampaignIndex + 1),
        //     ],
        //   };
        // }

        state.error = "";
        state.alreadyExistsError = null;

        toast.success("Speech has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateSpeech.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
      } else {
        state.speeches = state.speeches.map((speech) => {
          if (speech.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return speech;
          }
        });

        state.error = "";
        state.alreadyExistsError = null;
        toast.success("Speech has been updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeSpeech.fulfilled, (state, action) => {
      state.speeches = state.speeches.filter((speech) => {
        return speech.id !== action.payload.data.id;
      });

      state.error = "";

      toast.error("Speech has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export const { changeIvrCampaign } = speechSlice.actions;
export default speechSlice.reducer;
