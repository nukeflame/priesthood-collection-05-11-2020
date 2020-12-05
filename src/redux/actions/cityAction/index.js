import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/cities/";

export const fetchCities = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCHING_CITIES, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_CITIES, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCHING_CITIES, payload: false });
      });
  });
};
