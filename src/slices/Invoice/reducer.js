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
  error: "",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    // these actions are for instant updation of balance
    updateBalanceOnPaymentCreation(state, action) {
      console.log("invoice payload on payment ->", action.payload);

      const payment = action.payload.data;

      state.invoices = state.invoices.map((invoice) => {
        if (invoice.id === payment.invoiceId) {
          invoice.balance = invoice.balance - payment.paymentAmount;
          return invoice;
        } else {
          return invoice;
        }
      });
    },

    updateBalanceOnPaymentDeletion(state, action) {
      const payment = action.payload.data.deletedPayment;

      state.invoices = state.invoices.map((invoice) => {
        if (invoice.id === payment.invoiceId) {
          invoice.balance =
            parseInt(invoice.balance) + parseInt(payment.paymentAmount);
          return invoice;
        } else {
          return invoice;
        }
      });
    },

    updateBalanceOnPaymentUpdation(state, action) {
      const updatedBalance = action.payload.data.invoiceBalance;
      const updatedPayment = action.payload.data.updatedPayment;

      state.invoices = state.invoices.map((invoice) => {
        if (invoice.id === updatedPayment.invoiceId) {
          invoice.balance = updatedBalance;
          return invoice;
        } else {
          return invoice;
        }
      });
    },
  },
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

export const {
  updateBalanceOnPaymentCreation,
  updateBalanceOnPaymentDeletion,
  updateBalanceOnPaymentUpdation,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
