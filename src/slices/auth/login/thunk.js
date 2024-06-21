//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postLogin } from "../../../helpers/fakebackend_helper";

import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import axios from "axios";

export const loginUser = (user, history) => async (dispatch) => {
  try {
    let response;

    response = postLogin({
      email: user.email,
      password: user.password,
    });

    var data = await response;

    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      var finallogin = JSON.stringify(data);
      finallogin = JSON.parse(finallogin);
      data = finallogin.data;
      if (finallogin.status === "success") {
        dispatch(loginSuccess(data));
        history("/home");
      } else {
        dispatch(apiError(finallogin));
      }
    }
  } catch (error) {
    console.log("error while logging in ", error);
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(logoutUserSuccess(true));
      })
      .catch((err) => {
        console.log("error while logging out", err);
      });
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
