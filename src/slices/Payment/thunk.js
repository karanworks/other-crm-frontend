import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createPayment as createPaymentApi,
  removePayment as removePaymentApi,
  updatePayment as updatePaymentApi,
} from "../../helpers/fakebackend_helper";

// import {
//   getLeads as getLeadsApi,
//   createLead as createLeadApi,
//   removeLead as removeLeadApi,
//   updateLead as updateLeadApi,
//   createDropdown as createDropdownApi,
// } from "../../helpers/fakebackend_helper";

// export const getPayments = createAsyncThunk("payment/getPayments", async () => {
//   try {
//     const response = await getLeadsApi();

//     return response;
//   } catch (error) {
//     console.log("error inside get leads thunk", error);
//   }
// });

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data) => {
    try {
      const response = await createPaymentApi(data);
      return response;
    } catch (error) {
      console.log("error inside get payment thunk", error);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async (data) => {
    try {
      const response = await updatePaymentApi(data.listPaymentId, data.values);
      console.log("response while updating payment", response);
      return response;
    } catch (error) {
      console.log("error inside update payment thunk", error);
    }
  }
);

export const removePayment = createAsyncThunk(
  "payment/removePayment",
  async (paymentId) => {
    try {
      const response = await removePaymentApi(paymentId);

      return response;
    } catch (error) {
      console.log("error inside remove payment thunk", error);
    }
  }
);

// *****************************************************************
// *************************** DROPDOWNS ***************************
// *****************************************************************

export const createDropdown = createAsyncThunk(
  "leads/createDropdown",
  async (data) => {
    try {
      const response = await createDropdownApi(data);
      return response;
    } catch (error) {
      console.log("error inside create dropdown in lead thunk", error);
    }
  }
);
