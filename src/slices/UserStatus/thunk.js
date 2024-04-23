import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMonitoringData as getMonitoringDataApi,
  monitoringGet as monitoringGetApi,
} from "../../helpers/fakebackend_helper";

export const monitoringGet = createAsyncThunk(
  "userStatus/monitoringGet",
  async () => {
    try {
      const response = await monitoringGetApi();
      return response;
    } catch (error) {
      console.log("error inside getmonitoringdata thunk", error);
    }
  }
);
export const getMonitoringData = createAsyncThunk(
  "userStatus/getMonitoringData",
  async (selectedCampaigns) => {
    try {
      const response = await getMonitoringDataApi(selectedCampaigns);
      return response;
    } catch (error) {
      console.log("error inside getmonitoringdata thunk", error);
    }
  }
);
