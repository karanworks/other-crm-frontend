import { createSlice } from "@reduxjs/toolkit";
import {
  getLeads,
  createLead,
  removeLead,
  updateLead,
  createDropdown,
} from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  leads: [],
  dropdowns: [],
  error: "",
};

const leadSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getLeads.fulfilled, (state, action) => {
    //   if (action.payload.status === "failure") {
    //     state.error = action.payload.message;
    //   } else {
    //     state.leads = action.payload?.data.leads;
    //     state.dropdowns = action.payload.data.dropdowns;
    //     state.error = "";
    //   }
    // });

    builder.addCase(createLead.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.leads = [...state.leads, action.payload.data];
        state.error = "";

        toast.success("Lead has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateLead.fulfilled, (state, action) => {
      console.log("action payload while updating", action.payload);

      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        const updatedLeadId = action.payload.data?.updatedLead.id;

        state.leads = state.leads.map((lead) => {
          if (lead.id == updatedLeadId) {
            lead = action.payload.data.updatedLead;
            return lead;
          } else {
            return lead;
          }
        });

        state.alreadyExistsError = null;
        state.error = "";
        toast.success("Lead details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeLead.fulfilled, (state, action) => {
      const deletedLeadId = action.payload.data.deletedLead.id;
      state.leads = state.leads.filter((lead) => lead.id !== deletedLeadId);
      state.error = "";

      toast.error("Lead has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    // *****************************************************************
    // *************************** DROPDOWNS ***************************
    // *****************************************************************

    builder.addCase(createDropdown.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.dropdowns = [...state.dropdowns, action.payload.data];
        state.error = "";

        toast.success("Dropdown has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default leadSlice.reducer;
