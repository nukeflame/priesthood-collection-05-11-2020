import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/cartlist";

export const fetchCartlist = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API).then((res) => {
      dispatch({
        type: actionTypes.FETCH_CARTLIST,
        payload: res.data,
      });
      resolve();
    });
  });
};

export const createCartlist = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.post(API, data).then((res) => {
      console.log(res.data);
      // if (res.data) {
      //   dispatch({
      //     type: actionTypes.CREATE_CARTLIST,
      //     payload: res.data,
      //   });
      // }
      resolve();
    });
  });
};

export const storeCartlist = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.post("api/cartlistStore", data).then((res) => {
      if (res.data.cartlist) {
        dispatch({
          type: actionTypes.CREATE_CARTLIST,
          payload: res.data.cartlist,
        });
      }
      resolve();
    });
  });
};

export const updateCartlist = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.put(API + "/" + data.cartId, data).then((res) => {
      if (res.data) {
        dispatch({
          type: actionTypes.CREATE_SHIPPING_PRODUCT,
          payload: res.data,
        });
      }
      resolve();
    });
  });
};

export const destroyCartlist = (item) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.delete(`${API}/${item.id}`).then((res) => {
      if (res.data.cartlist) {
        dispatch({
          type: actionTypes.DESTROY_CARTLIST,
          payload: res.data.cartlist,
        });
      }
      if (res.data.shipping) {
        dispatch({
          type: actionTypes.UPDATE_SHIPPING_PRODUCT,
          payload: res.data.shipping,
        });
      }
      resolve();
    });
  });
};
