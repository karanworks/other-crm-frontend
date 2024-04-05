import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers as getUsersApi,
  createUser as createUserApi,
  removeUser as removeUserApi,
  updateUser as updateUserApi,
} from "../../helpers/fakebackend_helper";
import { getLoggedinUser } from "../../helpers/api_helper";

const loggedInUser = getLoggedinUser();

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await getUsersApi(loggedInUser.data.id);
    return response;
  } catch (error) {
    console.log("error inside getUsers thunk", error);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (data) => {
  try {
    const response = await createUserApi(loggedInUser.data.id, data);

    return response;
  } catch (error) {
    console.log("error inside getUsers thunk", error);
  }
});

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId) => {
    try {
      const response = await removeUserApi(loggedInUser.data.id, userId);

      return response.data.deletedUser;
    } catch (error) {
      console.log("error inside remove user thunk", error);
    }
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  try {
    const response = await updateUserApi(
      loggedInUser.data.id,
      data.listUserId,
      data.values
    );
    return response;
  } catch (error) {
    console.log("error inside remove user thunk", error);
  }
});
