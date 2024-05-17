import { createSlice } from "@reduxjs/toolkit";
import {
  getInvoices,
  createInvoice,
  removeInvoice,
  updateInvoice,
} from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  invoices: [],
  // payments: [],
  error: "",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvoices.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.invoices = action.payload?.data.invoices;
        state.error = "";
      }
    });

    builder.addCase(createInvoice.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.invoices = [...state.invoices, action.payload.data];
        state.error = "";

        toast.success("Invoice has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        const updatedInvoiceId = action.payload.data?.updatedInvoice?.id;

        state.invoices = state.invoices.map((invoice) => {
          if (invoice.id == updatedInvoiceId) {
            invoice = action.payload.data.updatedInvoice;
            return invoice;
          } else {
            return invoice;
          }
        });

        state.error = "";
        toast.success("Invoice details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeInvoice.fulfilled, (state, action) => {
      const deletedInvoiceId = action.payload.data.deletedInvoice.id;
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== deletedInvoiceId
      );

      state.error = "";

      toast.error("Invoice has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default invoiceSlice.reducer;
