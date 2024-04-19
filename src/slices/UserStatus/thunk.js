import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMonitoringData as getMonitoringDataApi,
  monitoringGet as monitoringGetApi,
} from "../../helpers/fakebackend_helper";

export const monitoringGet = createAsyncThunk(
  "monitoring/monitoringGet",
  async () => {
    try {
      console.log("yes yes monitoring is being called");
      const response = await monitoringGetApi();
      return response;
    } catch (error) {
      console.log("error inside getmonitoringdata thunk", error);
    }
  }
);
export const getMonitoringData = createAsyncThunk(
  "monitoring/getMonitoringData",
  async (selectedCampaigns) => {
    try {
      const response = await getMonitoringDataApi(selectedCampaigns);
      return response;
    } catch (error) {
      console.log("error inside getmonitoringdata thunk", error);
    }
  }
);
