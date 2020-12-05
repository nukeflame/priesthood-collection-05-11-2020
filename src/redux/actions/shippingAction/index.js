import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/shipping/";

export const fetchShipping = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API).then((res) => {
      dispatch({ type: actionTypes.FETCH_SHIPPING_PRODUCT, payload: res.data });
      resolve();
    });
  });
};

export const createShipping = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CREATE_SHIPPING_LOADING, payload: true });
  return new Promise((resolve) => {
    baseurl
      .post(API, data)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: actionTypes.CREATE_SHIPPING_PRODUCT,
            payload: res.data,
          });
        }
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.CREATE_SHIPPING_LOADING, payload: false });
      });
  });
};

export const findShipping = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API + Id).then((res) => {
      dispatch({
        type: actionTypes.FIND_LATEST_ORDER,
        payload: res.data,
      });
      resolve();
    });
  });
};

export const updateShipping = (data) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_SHIPPING_LOADING, payload: true });
  return new Promise((resolve) => {
    baseurl
      .put(API + data.shipId, data)
      .then((res) => {
        if (res.data.order) {
          //set current order no.
          localStorage.setItem("orNo", JSON.stringify(res.data.order.orderNo));
          dispatch({
            type: actionTypes.FIND_LATEST_ORDER,
            payload: res.data.order,
          });
        }
        if (res.data.shipping) {
          dispatch({
            type: actionTypes.CREATE_SHIPPING_PRODUCT,
            payload: res.data,
          });
        }
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.UPDATE_SHIPPING_LOADING, payload: false });
      });
  });
};
