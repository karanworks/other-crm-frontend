import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDesign as getDesignApi } from "../../helpers/fakebackend_helper";

export const getDesign = createAsyncThunk("design/getIvrDesign", async () => {
  try {
    const response = await getDesignApi();
    return response;
  } catch (error) {
    console.log("error inside get ivr design thunk", error);
  }
});
