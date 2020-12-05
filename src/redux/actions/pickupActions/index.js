import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/pickup_locations";

export const showPickupRegion = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.SHOWING_PICKUP_LOCATION, payload: true });
    baseurl
      .post(API + "/showLocation", data)
      .then((res) => {
        dispatch({ type: actionTypes.SHOW_PICKUP_LOCATION, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.SHOWING_PICKUP_LOCATION, payload: false });
      });
  });
};

export const setPickupRegion = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.SETTING_PICKUP_LOCATION, payload: true });
    baseurl
      .post(API + "/setLocation", data)
      .then((res) => {
        dispatch({ type: actionTypes.USER_PICKUP_LOCATION, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.SETTING_PICKUP_LOCATION, payload: false });
      });
  });
};
