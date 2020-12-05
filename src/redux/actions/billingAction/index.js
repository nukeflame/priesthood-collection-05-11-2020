import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/billing";

export const createBilling = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FIND_BILLING_LOADING, payload: true });
    baseurl
      .post(API, data)
      .then((res) => {
        if (res.data.billing) {
          dispatch({
            type: actionTypes.FIND_BILLING,
            payload: res.data.billing,
          });
        }
        if (res.data.order) {
          dispatch({
            type: actionTypes.FIND_LATEST_ORDER,
            payload: res.data.order,
          });
        }
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FIND_BILLING_LOADING, payload: false });
      });
  });
};

export const updateBilling = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FIND_BILLING_LOADING, payload: true });
    baseurl
      .put(API + "/" + data.billId, data)
      .then((res) => {
        if (res.data.billing) {
          dispatch({
            type: actionTypes.FIND_BILLING,
            payload: res.data.billing,
          });
        }
        if (res.data.order) {
          dispatch({
            type: actionTypes.FIND_LATEST_ORDER,
            payload: res.data.order,
          });
        }
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FIND_BILLING_LOADING, payload: false });
      });
  });
};
