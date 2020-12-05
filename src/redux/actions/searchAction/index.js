import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

export const fetchSearchItems = (q) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.post("api/searchProducts", q).then((res) => {
      if (res.data.products) {
        dispatch({
          type: actionTypes.FETCH_PRODUCT,
          payload: res.data.products,
        });

        dispatch({
          type: actionTypes.SEARCH_PRODUCT_QUERY,
          payload: res.data.searchQuery,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PRODUCT,
          payload: res.data.results,
        });

        dispatch({
          type: actionTypes.SEARCH_PROMO_PRODUCT_QUERY,
          payload: res.data.searchQuery,
        });
      }

      resolve();
    });
  });
};
