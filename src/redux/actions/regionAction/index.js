import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/regions";

export const fetchRegions = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API).then((res) => {
      dispatch({ type: actionTypes.FETCH_STATE_REGIONS, payload: res.data });
      resolve();
    });
  });
};

export const showRegions = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API + "/" + data.Id).then((res) => {
      dispatch({ type: actionTypes.SHOW_STATE_REGIONS, payload: res.data });
      resolve();
    });
  });
};
