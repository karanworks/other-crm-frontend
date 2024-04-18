import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMonitoringData as getMonitoringDataApi } from "../../helpers/fakebackend_helper";

export const getMonitoringData = createAsyncThunk(
  "monitoring/getMonitoringData",
  async (selectedCampaigns) => {
    try {
      const response = await getMonitoringDataApi(selectedCampaigns);
      console.log("response from monitoring api inside thunk ->", response);
      return response;
    } catch (error) {
      console.log("error inside getmonitoringdata thunk", error);
    }
  }
);
