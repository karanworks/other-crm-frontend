import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPayments as getPaymentsApi,
  createPayment as createPaymentApi,
  removePayment as removePaymentApi,
  updatePayment as updatePaymentApi,
} from "../../helpers/fakebackend_helper";

import {
  updateBalanceOnPaymentCreation,
  updateBalanceOnPaymentDeletion,
  updateBalanceOnPaymentUpdation,
} from "../Invoice/reducer";

export const getPayments = createAsyncThunk(
  "payment/getPayments",
  async ({ invoiceId }) => {
    try {
      const response = await getPaymentsApi(invoiceId);

      return response;
    } catch (error) {
      console.log("error inside get payments thunk", error);
    }
  }
);

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (data, { dispatch }) => {
    try {
      const response = await createPaymentApi(data);

      if (response.status === "success") {
        dispatch(updateBalanceOnPaymentCreation(response));
      }

      return response;
    } catch (error) {
      console.log("error inside get payment thunk", error);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async (
    { paymentDate, paymentAmount, listPaymentId, listInvoiceId, status },
    { dispatch }
  ) => {
    try {
      const response = await updatePaymentApi({
        paymentDate,
        paymentAmount,
        listPaymentId,
        listInvoiceId,
        status,
      });

      if (response.status === "success") {
        dispatch(updateBalanceOnPaymentUpdation(response));
      }

      return response;
    } catch (error) {
      console.log("error inside update payment thunk", error);
    }
  }
);

export const removePayment = createAsyncThunk(
  "payment/removePayment",
  async (
    { listInvoiceId: invoiceId, listPaymentId: paymentId },
    { dispatch }
  ) => {
    try {
      const response = await removePaymentApi({ invoiceId, paymentId });

      if (response.status === "success") {
        dispatch(updateBalanceOnPaymentDeletion(response));
      }

      return response;
    } catch (error) {
      console.log("error inside remove payment thunk", error);
    }
  }
);
