import { createSlice } from "@reduxjs/toolkit";
import { getUsers, createUser, removeUser, updateUser } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  users: [], // list of all users
  alreadyRegisteredError: null, // if user with same email, mobile number already registered
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.users = action.payload?.data.users;
        state.error = "";
      }
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.users = [...state.users, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("User has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;
      state.users = state.users.filter((user) => user.id !== deletedUserId);
      state.error = "";
      toast.error("User has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedUserId = action.payload.data.updatedUser.id;
        state.users = state.users.map((user) => {
          if (user.id == updatedUserId) {
            user = action.payload.data.updatedUser;
            return user;
          } else {
            return user;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("User details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default usersSlice.reducer;
