import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/settings/";

export const fetchSettings = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API).then((res) => {
      dispatch({ type: actionTypes.FETCH_SETTINGS, payload: res.data });
      resolve();
    });
  });
};

export const createSettings = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.post(API, data).then((res) => {
      dispatch({ type: actionTypes.UPDATE_SETTINGS, payload: res.data });
      resolve();
    });
  });
};

export const updateSettings = (data) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_SETTINGS_LOAD, payload: true });
  return new Promise((resolve) => {
    baseurl
      .put(API + data.id, data)
      .then((res) => {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            const l = res.data[i];
            dispatch({ type: actionTypes.UPDATE_SETTINGS, payload: l });
          }
        }
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.UPDATE_SETTINGS_LOAD, payload: false });
      });
  });
};
