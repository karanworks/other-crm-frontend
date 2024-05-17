import { createSlice } from "@reduxjs/toolkit";
import {
  getPayments,
  createPayment,
  removePayment,
  updatePayment,
} from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  payments: [],
  error: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayments.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.payments = action.payload?.data.invoices;
        state.error = "";
      }
    });

    builder.addCase(createPayment.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        console.log("DATA AFTER CREATING PAYMENT ->", action.payload.data);
        state.payments = [...state.payments, action.payload.data];
        state.error = "";

        toast.success("Payment has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updatePayment.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        const updatedPaymentId = action.payload.data?.updatedPayment.id;

        state.payments = state.payments.map((payment) => {
          if (payment.id == updatedPaymentId) {
            payment = action.payload.data.updatedPayment;
            return payment;
          } else {
            return payment;
          }
        });

        state.error = "";
        toast.success("Payment details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removePayment.fulfilled, (state, action) => {
      const deletedPaymentId = action.payload.data.deletedPayment.id;
      state.payments = state.payments.filter(
        (payment) => payment.id !== deletedPaymentId
      );
      state.error = "";

      toast.error("Payment has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default paymentSlice.reducer;
