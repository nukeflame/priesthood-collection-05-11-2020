import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";
import { toast } from "react-toastify";

const API = "api/users/";
const customToastId = "WEbODYzooA4q";

export const fetchAuthUser = (email) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.USER_LOADING, payload: true });
    baseurl
      .get(API + email)
      .then((res) => {
        dispatch({ type: actionTypes.AUTH_USER, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error && error.response) {
          if (error.response.status) {
            // const errRes = error.response.status;
          } else {
            toast.error("Something went wrong, Please try again later!", {
              toastId: customToastId,
            });
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.USER_LOADING, payload: false });
      });
  });
};

export const userChangePassword = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.post(API + "password", data).then((res) => {
      console.log(res.data);
      resolve();
    });
  }).catch((error) => {
    console.error(error.response.status);
    if (error && error.response) {
      if (error.response.status === 422) {
        if (error.response.data.errors) {
          const errRes = error.response.data.errors;
          console.log(errRes);
        }
      }
    }
  });
};

export const checkNetworkError = (check) => (dispatch) => {
  return new Promise.resolve(() => {
    dispatch({ type: actionTypes.NETWORK_ERROR, payload: check });
  });
};
