import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/orderStatus/";

export const fetchOrderStatus = () => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API).then((res) => {
      dispatch({
        type: actionTypes.FETCH_ORDERS_STATUS,
        payload: res.data,
      });
      resolve();
    });
  });
};
