import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers as getUsersApi,
  createUser as createUserApi,
  removeUser as removeUserApi,
  updateUser as updateUserApi,
} from "../../helpers/fakebackend_helper";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await getUsersApi();
    return response;
  } catch (error) {
    console.log("error inside getUsers thunk", error);
  }
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (values) => {
    try {
      const response = await createUserApi(values);

      return response;
    } catch (error) {
      console.log("error inside getUsers thunk", error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, values }) => {
    try {
      const response = await updateUserApi(userId, values);
      console.log("response after udpating user ->", response);
      return response;
    } catch (error) {
      console.log("error inside remove user thunk", error);
    }
  }
);

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async ({ userId }) => {
    try {
      const response = await removeUserApi(userId);

      return response.data.deletedUser;
    } catch (error) {
      console.log("error inside remove user thunk", error);
    }
  }
);
