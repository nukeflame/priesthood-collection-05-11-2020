import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";
// import { toast } from "react-toastify";

const API = "api/addresses/";

export const findAddress = (Id) => (dispatch) => {
  dispatch({ type: actionTypes.FIND_ORDER_LOADING, payload: true });
  return new Promise((resolve) => {
    baseurl.get(API + Id).then((res) => {
      dispatch({ type: actionTypes.FIND_ADDRESS, payload: res.data });
      resolve();
    });
  }).finally(() => {
    dispatch({ type: actionTypes.FIND_ORDER_LOADING, payload: false });
  });
};

export const saveCheckoutAddress = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.CHECKOUT_ADDRESS_LOADING, payload: true });
    baseurl
      .post(API, data)
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_CHECKOUT_ADDRESS,
          payload: res.data,
        });
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.firstname) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    firstname: errData.firstname,
                  },
                });
              } else if (errData.lastname) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    lastname: errData.lastname,
                  },
                });
              } else if (errData.mobileNo) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    mobileNo: errData.mobileNo,
                  },
                });
              } else if (errData.otherMobileNo) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    otherMobileNo: errData.otherMobileNo,
                  },
                });
              } else if (errData.deliveryAddress) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    deliveryAddress: errData.deliveryAddress,
                  },
                });
              } else if (errData.stateRegion) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    stateRegion: errData.stateRegion,
                  },
                });
              } else if (errData.city) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    city: errData.city,
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
            }
          }
        }
      })
      .finally(() => {
        dispatch({
          type: actionTypes.CHECKOUT_ADDRESS_LOADING,
          payload: false,
        });
      });
  });
};

export const updateCheckoutAddress = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.CHECKOUT_ADDRESS_LOADING, payload: true });
    baseurl
      .put(API + data.id, data)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_CHECKOUT_ADDRESS,
          payload: res.data,
        });
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.firstname) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    firstname: errData.firstname,
                  },
                });
              } else if (errData.lastname) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    lastname: errData.lastname,
                  },
                });
              } else if (errData.mobileNo) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    mobileNo: errData.mobileNo,
                  },
                });
              } else if (errData.otherMobileNo) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    otherMobileNo: errData.otherMobileNo,
                  },
                });
              } else if (errData.deliveryAddress) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    deliveryAddress: errData.deliveryAddress,
                  },
                });
              } else if (errData.stateRegion) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    stateRegion: errData.stateRegion,
                  },
                });
              } else if (errData.city) {
                dispatch({
                  type: actionTypes.CHECKOUT_ADDRESS_ERRORS,
                  payload: {
                    city: errData.city,
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
            }
          }
        }
      })
      .finally(() => {
        dispatch({
          type: actionTypes.CHECKOUT_ADDRESS_LOADING,
          payload: false,
        });
      });
  });
};
