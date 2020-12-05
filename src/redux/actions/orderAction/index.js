import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";
import { toast } from "react-toastify";

const API = "api/orders/";
const API_PAYMENT = "api/payment";

export const fetchOrders = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCH_ORDER_LOADING, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_ORDERS,
          payload: res.data,
        });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCH_ORDER_LOADING, payload: false });
      });
  });
};

export const findOrder = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FIND_ORDER_LOADING, payload: true });
    baseurl.get(API + Id).then((res) => {
      dispatch({ type: actionTypes.FIND_LATEST_ORDER, payload: res.data });
      resolve();
    });
  }).finally(() => {
    dispatch({ type: actionTypes.FIND_ORDER_LOADING, payload: false });
  });
};

export const findUserOrders = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCHING_USER_ORDERS, payload: true });
    baseurl
      .post(API + "showOrder", data)
      .then((res) => {
        dispatch({ type: actionTypes.FIND_USER_ORDERS, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCHING_USER_ORDERS, payload: false });
      });
  });
};

export const destroydOrder = (Ids) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.delete(API + Ids).then((res) => {
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          const d = res.data[i];
          dispatch({ type: actionTypes.DESTROY_ORDER, payload: d.id });
        }
      }
      resolve();
    });
  }).finally(() => {
    dispatch({ type: actionTypes.FIND_ORDER_LOADING, payload: false });
  });
};

export const findAuthOrder = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get("api/authOrder").then((res) => {
      if (res.data.order) {
        dispatch({
          type: actionTypes.FIND_LATEST_ORDER,
          payload: res.data.order,
        });
      }
      if (res.data.cartlist) {
        dispatch({
          type: actionTypes.FETCH_PROCESSED_CARTLIST,
          payload: res.data.cartlist,
        });
      }
      resolve();
    });
  });
};

export const orderPayNow = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.PAYMENT_LOADING, payload: true });
    baseurl
      .post(`${API_PAYMENT}/stk/push`, data)
      .then((res) => {
        if (res.data.order) {
          dispatch({
            type: actionTypes.FIND_LATEST_ORDER,
            payload: res.data.order,
          });
        }
        if (res.data.results) {
          dispatch({
            type: actionTypes.PAYMENT_DATA,
            payload: res.data,
          });
        }
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.mpesaNo) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    mpesaNo: errData.mpesaNo,
                  },
                });
              }
              //clear login errors
              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_CHECKOUT_ADDRESS_ERRORS,
                  payload: true,
                });
              }, 5000);
            } else if (error.response.status === 404) {
              const Err404 = error.response.data;
              if (Err404.errorOccured) {
                toast.error(Err404.errorOccured, {
                  className: "text-only",
                });
              }
            } else if (error.response.status === 500) {
              const err500 = error.response.data;
              if (err500) {
                toast.error(
                  "Unable to connect service provider, Please try again.",
                  {
                    className: "text-only",
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                  }
                );
              }
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.PAYMENT_LOADING, payload: false });
      });
  });
};
