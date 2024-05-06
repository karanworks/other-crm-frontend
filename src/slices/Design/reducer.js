import { createSlice } from "@reduxjs/toolkit";
import { getDesign, createDesign } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  designData: [],
  departments: [],
  design: [],
  alreadyExistsError: null,
  error: "",
  selectedIvrCampaignId: null,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    changeIvrCampaign(state, action) {
      const selectedCampaign = state.designData.ivrCampaigns?.find(
        (campaign) => campaign.ivrCampaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedIvrCampaignId = selectedCampaign.id;

        const numbersOfIvrCamapaign = state.designData?.ivrCampaigns?.find(
          (campaign) => campaign.id === state.selectedIvrCampaignId
        );

        if (numbersOfIvrCamapaign && numbersOfIvrCamapaign.numbers) {
          state.numbers = numbersOfIvrCamapaign.numbers;

          const departments = numbersOfIvrCamapaign.numbers.map((number) => {
            return number.department;
          });

          const uniqueDepartments = departments.filter(
            (department, index, self) => index === self.indexOf(department)
          );

          state.departments = uniqueDepartments;
        } else {
          state.departments = [];
        }
      } else {
        state.selectedIvrCampaignId = null;
        state.departments = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.designData = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(createDesign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.design = [...state.design, action.payload.data];
        state.alreadyExistsError = null;
        state.error = "";

        toast.success("IVR Design has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default designSlice.reducer;
export const { changeIvrCampaign } = designSlice.actions;
