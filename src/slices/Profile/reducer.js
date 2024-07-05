import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { changePassword } from "./thunk";

export const initialState = {
  error: null,
  success: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePassword.fulfilled, (state, action) => {
      if (action?.payload.status === "success") {
        state.success = true;
        toast.success("Password changed successfully !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        state.error = action?.payload.message;
      }
    });
  },
});

export default profileSlice.reducer;
