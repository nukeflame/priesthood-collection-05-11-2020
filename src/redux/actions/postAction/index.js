import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/posts/";

export const fetchPosts = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCH_POST_LOADING, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_POST, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCH_POST_LOADING, payload: false });
      });
  });
};

export const findPost = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API + Id).then((res) => {
      dispatch({ type: actionTypes.LATEST_POST, payload: res.data });
      resolve();
    });
  });
};

export const newPost = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.CREATE_POST_LOADING, payload: true });
    baseurl
      .post(API, data)
      .then((res) => {
        dispatch({ type: actionTypes.CREATE_POST, payload: res.data });
        dispatch({ type: actionTypes.LATEST_POST, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.title) {
                dispatch({
                  type: actionTypes.FETCH_POST_ERRORS,
                  payload: {
                    title: errData.title,
                  },
                });
              } else if (errData.slug) {
                dispatch({
                  type: actionTypes.FETCH_POST_ERRORS,
                  payload: {
                    slug: errData.slug,
                  },
                });
              }

              //clear login errors
              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_POST_ERRORS,
                  payload: true,
                });
              }, 5000);
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.CREATE_POST_LOADING, payload: false });
      });
  });
};

export const updatePost = (data) => (dispatch) => {
  return new Promise((resolve) => {
    // dispatch({ type: actionTypes.CREATE_POST_LOADING, payload: true });
    baseurl.put(API + data.postId, data).then((res) => {
      resolve();
    });
  });
};

export const getPromoProduct = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get("api/getPromoProduct").then((res) => {
      dispatch({ type: actionTypes.FETCH_PROMO_PRODUCTS, payload: res.data });
      resolve();
    });
  });
};

export const createPromoProduct = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.SAVING_PROMO_LOADING, payload: true });
    baseurl
      .post("api/storePromoProduct", data)
      .then((res) => {
        dispatch({ type: actionTypes.CREATE_POST, payload: res.data });
        dispatch({ type: actionTypes.LATEST_POST, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.infoName) {
                dispatch({
                  type: actionTypes.PROMO_PRODUCTS_ERRORS,
                  payload: {
                    infoName: errData.infoName,
                  },
                });
              } else if (errData.infoPrice) {
                dispatch({
                  type: actionTypes.PROMO_PRODUCTS_ERRORS,
                  payload: {
                    infoPrice: errData.infoPrice,
                  },
                });
              } else if (errData.infoTags) {
                dispatch({
                  type: actionTypes.PROMO_PRODUCTS_ERRORS,
                  payload: {
                    infoTags: errData.infoTags,
                  },
                });
              } else if (errData.products) {
                dispatch({
                  type: actionTypes.PROMO_PRODUCTS_ERRORS,
                  payload: {
                    products: errData.products,
                  },
                });
              } else if (errData.pInfo) {
                dispatch({
                  type: actionTypes.PROMO_PRODUCTS_ERRORS,
                  payload: {
                    pInfo: errData.pInfo,
                  },
                });
              }

              //clear login errors
              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_PROMO_PRODUCTS_ERRORS,
                  payload: true,
                });
              }, 5000);
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.SAVING_PROMO_LOADING, payload: false });
      });
  });
};

export const updatePromoProduct = (formData, Id) => (dispatch) => {
  return new Promise((resolve) => {
    // dispatch({ type: actionTypes.SAVING_PROMO_LOADING, payload: true });
    baseurl.put(`api/updatePromoProduct/${Id}`, formData).then((res) => {
      resolve();
    });
    // .finally(() => {
    //   dispatch({ type: actionTypes.SAVING_PROMO_LOADING, payload: false });
    // });
  });
};

export const getHomepagePosts = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get("api/getHomepagePosts").then((res) => {
      dispatch({ type: actionTypes.FETCH_HOMEPAGE_POST, payload: res.data });
      resolve();
    });
  });
};

export const getSliderPosts = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get("api/getSliderPosts").then((res) => {
      dispatch({ type: actionTypes.FETCH_SLIDER_POSTS, payload: res.data });
      resolve();
    });
  });
};

export const getfeaturedPosts = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get("api/getfeaturedPosts").then((res) => {
      dispatch({ type: actionTypes.FETCH_FEATURED_POSTS, payload: res.data });
      resolve();
    });
  });
};

export const findOfferProducts = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(`api/getOfferProducts/${Id}`).then((res) => {
      dispatch({ type: actionTypes.FIND_SLIDER_POST, payload: res.data });
      resolve();
    });
  });
};

export const destroyPromoProduct = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.delete(`api/promoProduct/${Id}`).then((res) => {
      dispatch({ type: actionTypes.LATEST_POST, payload: res.data });
      resolve();
    });
  });
};
