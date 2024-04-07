import { createSlice } from "@reduxjs/toolkit";
import {
  getMenus,
  getMenusByRole,
  getRoles,
  createRole,
  removeRole,
  updateRole,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  roles: [],
  menus: [],
  menusByRole: [],
};

const rolesSlice = createSlice({
  name: "mapping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload?.data;
    });
    builder.addCase(getMenus.fulfilled, (state, action) => {
      state.menus = action.payload?.data;
    });
    builder.addCase(getMenusByRole.fulfilled, (state, action) => {
      state.menusByRole = action.payload?.data;
    });

    builder.addCase(createRole.fulfilled, (state, action) => {
      state.roles = [...state.roles, action.payload.data];

      toast.success("Role has been added !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(updateRole.fulfilled, (state, action) => {
      const updatedRoleId = action.payload.data.id;

      state.roles = state.roles.map((role) => {
        if (role.id == updatedRoleId) {
          role = action.payload.data;
          return role;
        } else {
          return role;
        }
      });

      toast.success("Role name updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    builder.addCase(removeRole.fulfilled, (state, action) => {
      const deletedRoleId = action.payload.data.id;
      state.roles = state.roles.filter((role) => role.id !== deletedRoleId);

      toast.error("Role has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default rolesSlice.reducer;
