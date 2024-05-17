import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPayments as getPaymentsApi,
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

export const getPayments = createAsyncThunk("payment/getPayments", async () => {
  try {
    const response = await getPaymentsApi();

    return response;
  } catch (error) {
    console.log("error inside get payments thunk", error);
  }
});

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data) => {
    console.log("DATA WHILE CREATING PAYMENT ->", data);
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
  async ({ paymentDate, paymentAmount, listPaymentId, listInvoiceId }) => {
    try {
      const response = await updatePaymentApi({
        paymentDate,
        paymentAmount,
        listPaymentId,
        listInvoiceId,
      });
      console.log("response while updating payment", response);
      return response;
    } catch (error) {
      console.log("error inside update payment thunk", error);
    }
  }
);

export const removePayment = createAsyncThunk(
  "payment/removePayment",
  async ({ listInvoiceId: invoiceId, listPaymentId: paymentId }) => {
    try {
      const response = await removePaymentApi({ invoiceId, paymentId });

      return response;
    } catch (error) {
      console.log("error inside remove payment thunk", error);
    }
  }
);
