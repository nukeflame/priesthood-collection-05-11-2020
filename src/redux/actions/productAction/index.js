import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";
import { getCartList, setCartList } from "../../../config/helpers";
import { isNull } from "lodash";

const API = "api/products";

export const fetchProducts = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_PRODUCT, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING, payload: false });
      });
  });
};

export const findProduct = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API + "/" + Id).then((res) => {
      dispatch({ type: actionTypes.FIND_PRODUCT, payload: res.data });
      resolve();
    });
  });
};

export const createProduct = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING, payload: true });
    baseurl
      .post(API, data)
      .then((res) => {
        // dispatch({ type: actionTypes.CREATE_PRODUCT, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error && error.response) {
          if (error.response.status === 422) {
            if (error.response.data.errors) {
              const errRes = error.response.data.errors;
              if (errRes.productName) {
                dispatch({
                  type: actionTypes.PRODUCT_ERRORS,
                  payload: {
                    productName: errRes.productName,
                  },
                });
              } else if (errRes.category) {
                dispatch({
                  type: actionTypes.PRODUCT_ERRORS,
                  payload: {
                    category: errRes.category,
                  },
                });
              } else if (errRes.price) {
                dispatch({
                  type: actionTypes.PRODUCT_ERRORS,
                  payload: {
                    price: errRes.price,
                  },
                });
              } else if (errRes.brandName) {
                dispatch({
                  type: actionTypes.PRODUCT_ERRORS,
                  payload: {
                    brandName: errRes.brandName,
                  },
                });
              } else if (errRes.sku) {
                dispatch({
                  type: actionTypes.PRODUCT_ERRORS,
                  payload: {
                    sku: errRes.sku,
                  },
                });
              } else if (errRes.stock) {
                dispatch({
                  type: actionTypes.PRODUCT_ERRORS,
                  payload: {
                    stock: errRes.stock,
                  },
                });
              }

              //clear login errors
              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_PRODUCT_ERRORS,
                  payload: true,
                });
              }, 5000);
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING, payload: false });
      });
  });
};

export const updateProduct = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.patch(API + "/" + 1, data).then((res) => {
      resolve();
      // dispatch({ type: actionTypes.FETCH_PRODUCT, payload: res.data });
    });
  });
};

export const destroyProduct = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.delete(API + "/" + Id).then((res) => {
      dispatch({ type: actionTypes.DESTROY_PRODUCT, payload: res.data });
      resolve();
    });
  });
};

export const setCartProduct = (item) => (dispatch) => {
  let cartData = getCartList() !== null ? getCartList() : [];
  const dataItem = {
    SKU: item.sku,
    Media: item.media,
    Description: item.description,
    ProductName: item.productName,
    Price: item.price,
    Quantity: 1,
    TotalPrice: item.price,
    ProductThumb: item.productThumb,
  };

  if (cartData.length > 0) {
    const itemData = cartData.find((i) => i.SKU === dataItem.SKU);
    if (itemData) {
      // update item
      const newCartData = cartData.filter((p) => p.SKU !== itemData.SKU);
      const data = Object.assign({}, itemData, {
        Quantity: parseInt(itemData.Quantity) + 1,
        TotalPrice:
          parseInt(itemData.TotalPrice) * (parseInt(itemData.Quantity) + 1),
      });
      newCartData.unshift(data);
      setCartList(newCartData);
    } else {
      cartData.unshift(dataItem);
      setCartList(cartData);
      dispatch({ type: actionTypes.SET_CART_PRODUCT, payload: cartData });
    }
  } else {
    cartData.unshift(dataItem);
    setCartList(cartData);
    dispatch({ type: actionTypes.SET_CART_PRODUCT, payload: cartData });
  }
};

export const getCartProduct = () => (dispatch) => {
  if (!isNull(getCartList())) {
    dispatch({ type: actionTypes.GET_CART_PRODUCT, payload: getCartList() });
  }
};

export const destroyCartProduct = (item) => (dispatch) => {
  if (!isNull(getCartList())) {
    const list = getCartList();
    const newList = list.filter((f) => f.SKU !== item.SKU);
    setCartList(newList);
    dispatch({ type: actionTypes.DEL_CART_PRODUCT, payload: item });
  }
};

export const clearCartProduct = () => (dispatch) => {
  localStorage.removeItem("cart");
  dispatch({ type: actionTypes.CLEAR_CART_PRODUCT, payload: [] });
};

export const fetchProductSort = (s) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.LOAD_UNILOADER, payload: true });
    baseurl
      .post(API + "/sort", { sortBy: s })
      .then((res) => {
        console.log(res.data);
        // dispatch({ type: actionTypes.FETCH_PRODUCT, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.LOAD_UNILOADER, payload: false });
      });
  });
};
