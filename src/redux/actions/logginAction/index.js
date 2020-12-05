import baseurl from "../../../config/auth/baseUrl";
import { setToken, setUserData } from "../../../config/auth";
import * as actionTypes from "../types";
import Axios from "axios";
import { API_URL } from "../../../config/auth/appRoutes";
import { toast } from "react-toastify";

const API = "api/login";
const customToastId = "lsbOYzooA4q";

export const logginUser = (loginData) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.LOGIN_LOADING, payload: true });
    Axios.post(`${API_URL}api/loginAuth`, loginData)
      .then((res) => {
        if (res.data.errorCode === 401) {
          dispatch({ type: actionTypes.LOGINED_USER, payload: res.data.user });
          resolve(res.data);
        }
        const check = Boolean(
          setToken(res.data.access_token, res.data.expires_in + Date.now())
        );
        // redirect to user
        if (check) {
          baseurl.get(API).then((res) => {
            const data = res.data;
            setUserData(data);
            resolve(data);
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            const errRes = error.response.status;
            if (errRes === 401) {
              dispatch({
                type: actionTypes.LOGIN_ERRORS,
                payload: {
                  loginErrors: error.response.data.message,
                },
              });
            }
          }
        } else {
          toast.error("Something went wrong, Please try again later!", {
            toastId: customToastId,
            className: "text-only",
          });
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.LOGIN_LOADING, payload: false });
      });
  });
};

export const logoutUser = () => () => {
  return new Promise((resolve) => {
    baseurl.get("api/logout").then((res) => {
      console.log(res.data);
      // resolve(res.data);
    });
  });
};

export const clearLoginErrors = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_ERRORS,
    payload: { loginErrors: "" },
  });
};
