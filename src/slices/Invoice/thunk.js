import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInvoices as getInvoicesApi,
  createInvoice as createInvoiceApi,
  removeInvoice as removeInvoiceApi,
  updateInvoice as updateInvoiceApi,
} from "../../helpers/fakebackend_helper";

export const getInvoices = createAsyncThunk("invoice/getInvoices", async () => {
  try {
    const response = await getInvoicesApi();
    return response;
  } catch (error) {
    console.log("error inside get invoices thunk", error);
  }
});

export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (data) => {
    try {
      const response = await createInvoiceApi(data);
      return response;
    } catch (error) {
      console.log("error inside get invoice thunk", error);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (data) => {
    try {
      const response = await updateInvoiceApi(data.listInvoiceId, data.values);
      return response;
    } catch (error) {
      console.log("error inside update invoice thunk", error);
    }
  }
);

export const removeInvoice = createAsyncThunk(
  "invoice/removeInvoice",
  async (invoiceId) => {
    try {
      const response = await removeInvoiceApi(invoiceId);

      return response;
    } catch (error) {
      console.log("error inside remove invoice thunk", error);
    }
  }
);
