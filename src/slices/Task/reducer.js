import { createSlice } from "@reduxjs/toolkit";

import { getTasks, createTask, updateTask } from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  userData: null,
  tasks: [],
  error: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        console.log("TASKS HERE ->", action?.payload.data);

        state.userData = action.payload.data;
        state.tasks = action.payload?.data.tasks;
        state.error = "";
      }
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        state.tasks = [...state.tasks, action.payload.data];
        state.error = "";

        toast.success("Task has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        const updatedTaskId = action.payload.data?.updatedTask.id;

        if (action.payload.data?.updatedTask.status === 0) {
          state.tasks = state.tasks.filter((task) => task.id !== updatedTaskId);
          state.error = "";

          toast.error("Task has been removed !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          state.tasks = state.tasks.map((task) => {
            if (task.id == updatedTaskId) {
              task = action.payload.data.updatedTask;
              return task;
            } else {
              return task;
            }
          });

          state.alreadyExistsError = null;
          state.error = "";
          toast.success("Task details updated !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  },
});

export default taskSlice.reducer;
