import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/categories/";

export const fetchCategory = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCHING_CATEGORY, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_CATEGORY, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCHING_CATEGORY, payload: false });
      });
  });
};

export const createCategory = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CREATING_CATEGORY, payload: true });
  return new Promise((resolve) => {
    baseurl
      .post(API, data)
      .then((res) => {
        dispatch({ type: actionTypes.CREATE_CATEGORY, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.catName) {
                dispatch({
                  type: actionTypes.CATEGORY_ERRORS,
                  payload: {
                    catName: errData.catName,
                  },
                });
              } else if (errData.slug) {
                dispatch({
                  type: actionTypes.CATEGORY_ERRORS,
                  payload: {
                    slug: errData.slug,
                  },
                });
              }

              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_CATEGORY_ERRORS,
                  payload: true,
                });
              }, 5000);
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.CREATING_CATEGORY, payload: false });
      });
  });
};

export const findCategoryProduct = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API + Id).then((res) => {
      // dispatch({ type: actionTypes.FETCH_PRODUCT, payload: res.data });
      resolve();
    });
  });
};
