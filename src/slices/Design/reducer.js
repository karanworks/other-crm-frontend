import { createSlice, current } from "@reduxjs/toolkit";
import { getDesign, createDesign } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  designData: [],
  departments: [],
  design: [],
  alreadyExistsError: null,
  error: "",
  selectedIvrCampaignId: null,
  departmentNumbers: null,
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

    changeDepartment(state, action) {
      console.log(
        "results after changing department ->",
        current(state.designData)
      );

      const selectedCampaign = state.designData.ivrCampaigns.find(
        (campaign) => {
          return campaign.id === state.selectedIvrCampaignId;
        }
      );

      const numbers = selectedCampaign?.numbers
        .map((number) => {
          if (number.department === action.payload) {
            return { name: number.name, number: number.number };
          }
        })
        .filter((num) => num !== undefined);

      state.departmentNumbers = numbers;
      console.log("numbers for department inside changeDepartment ->", numbers);
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
export const { changeIvrCampaign, changeDepartment } = designSlice.actions;
