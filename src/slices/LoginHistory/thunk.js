import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginHistoryData as loginHistoryDataApi,
  loginHistoryGet as loginHistoryGetApi,
} from "../../helpers/fakebackend_helper";

export const loginHistoryGet = createAsyncThunk(
  "loginHistory/loginHistoryGet",
  async () => {
    try {
      const response = await loginHistoryGetApi();
      return response;
    } catch (error) {
      console.log("erorr in side login history get thunk", error);
    }
  }
);
export const loginHistoryData = createAsyncThunk(
  "loginHistory/loginHistoryData",
  async (campaignIds) => {
    try {
      const response = await loginHistoryDataApi(campaignIds);
      return response;
    } catch (error) {
      console.log("erorr in side login history data thunk", error);
    }
  }
);
