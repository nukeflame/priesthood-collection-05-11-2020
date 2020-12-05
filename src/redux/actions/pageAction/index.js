import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/pages/";

export const fetchPages = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCH_POST_LOADING, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_PAGES, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCH_POST_LOADING, payload: false });
      });
  });
};

export const savePage = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.CREATE_PAGE_LOADING, payload: true });
    baseurl
      .post(API, data)
      .then((res) => {
        // dispatch({ type: actionTypes.FETCH_POST, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error && error.response) {
          if (error.response.status) {
            // const errRes = error.response.status;
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.CREATE_PAGE_LOADING, payload: false });
      });
  });
};
