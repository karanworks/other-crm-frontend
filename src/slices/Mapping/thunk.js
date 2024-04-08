import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMenus as getMenusApi,
  getMenusByRole as getMenusByRoleApi,
  changePermission as changePermissionApi,
  getRoles as getRolesApi,
  createRole as createRoleApi,
  removeRole as removeRoleApi,
  updateRole as updateRoleApi,
} from "../../helpers/fakebackend_helper";

export const getMenus = createAsyncThunk("mapping/getMenus", async () => {
  try {
    const response = await getMenusApi();
    console.log("get menus response ->", response);
    return response;
  } catch (error) {
    console.log("error inside get menus thunk", error);
  }
});
export const getMenusByRole = createAsyncThunk(
  "mapping/getMenusByRole",
  async (roleId) => {
    try {
      const response = await getMenusByRoleApi(roleId);
      console.log("get menus by role response ->", response);
      return response;
    } catch (error) {
      console.log("error inside get menus by role thunk", error);
    }
  }
);
export const changePermission = createAsyncThunk(
  "mapping/changePermission",
  async ({ menuId, subMenuId, roleId }) => {
    try {
      const response = await changePermissionApi({ menuId, subMenuId, roleId });
      console.log("change permission response ->", response);
      return response;
    } catch (error) {
      console.log("error inside change permission thunk", error);
    }
  }
);

export const getRoles = createAsyncThunk("mapping/getRoles", async () => {
  try {
    const response = await getRolesApi();
    console.log("roles response ->", response);
    return response;
  } catch (error) {
    console.log("error inside get roles thunk", error);
  }
});

export const createRole = createAsyncThunk(
  "mapping/createRole",
  async (data) => {
    try {
      const response = await createRoleApi(data);

      return response;
    } catch (error) {
      console.log("error inside create Role thunk", error);
    }
  }
);

export const updateRole = createAsyncThunk(
  "mapping/updateRole",
  async ({ roleId, values }) => {
    try {
      const response = await updateRoleApi(roleId, values);

      console.log("reponse in thunk after updating role", response);

      return response;
    } catch (error) {
      console.log("error inside update role  thunk", error);
    }
  }
);

export const removeRole = createAsyncThunk(
  "roles/removeRole",
  async (roleId) => {
    try {
      const response = await removeRoleApi(roleId);

      return response;
    } catch (error) {
      console.log("error inside remove role thunk", error);
    }
  }
);
