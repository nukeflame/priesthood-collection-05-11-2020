import { reject } from "lodash";
import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";

const API = "api/customers/";

export const fetchCustomers = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.FETCH_CUSTOMERS_LOADING, payload: true });
    baseurl
      .get(API)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_CUSTOMERS, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.FETCH_CUSTOMERS_LOADING, payload: false });
      });
  });
};

export const createCustomer = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.CREATE_CUSTOMER_LOADING, payload: true });
    baseurl
      .post(API, data)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_CUSTOMER,
          payload: res.data,
        });
        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.firstname) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    firstname: errData.firstname,
                  },
                });
              } else if (errData.lastname) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    lastname: errData.lastname,
                  },
                });
              } else if (errData.email) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    email: errData.email,
                  },
                });
              } else if (errData.password) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    password: errData.password,
                  },
                });
              } else if (errData.mobileNo) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    mobileNo: errData.mobileNo,
                  },
                });
              } else if (errData.otherMobileNo) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    otherMobileNo: errData.otherMobileNo,
                  },
                });
              } else if (errData.deliveryAddress) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    deliveryAddress: errData.deliveryAddress,
                  },
                });
              } else if (errData.stateRegion) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    stateRegion: errData.stateRegion,
                  },
                });
              } else if (errData.city) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    city: errData.city,
                  },
                });
              }

              //clear login errors
              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_CUSTOMER_ERRORS,
                  payload: true,
                });
              }, 5000);
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.CREATE_CUSTOMER_LOADING, payload: false });
      });
  });
};

export const findCustomer = (Id) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.get(API + Id).then((res) => {
      dispatch({
        type: actionTypes.FIND_CUSTOMER,
        payload: res.data,
      });
      resolve();
    });
  });
};

export const updateCustomer = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.UPDATE_CUSTOMER_LOADING, payload: true });
    baseurl
      .put(API + data.id, data)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_CUSTOMER,
          payload: res.data,
        });

        resolve();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data.errors;
              if (errData.firstname) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    firstname: errData.firstname,
                  },
                });
              } else if (errData.lastname) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    lastname: errData.lastname,
                  },
                });
              } else if (errData.email) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    email: errData.email,
                  },
                });
              } else if (errData.password) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    password: errData.password,
                  },
                });
              } else if (errData.mobileNo) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    mobileNo: errData.mobileNo,
                  },
                });
              } else if (errData.otherMobileNo) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    otherMobileNo: errData.otherMobileNo,
                  },
                });
              } else if (errData.deliveryAddress) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    deliveryAddress: errData.deliveryAddress,
                  },
                });
              } else if (errData.stateRegion) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    stateRegion: errData.stateRegion,
                  },
                });
              } else if (errData.city) {
                dispatch({
                  type: actionTypes.CUSTOMER_ERRORS,
                  payload: {
                    city: errData.city,
                  },
                });
              }

              //clear login errors
              setTimeout(() => {
                dispatch({
                  type: actionTypes.CLEAR_CUSTOMER_ERRORS,
                  payload: true,
                });
              }, 5000);
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.UPDATE_CUSTOMER_LOADING, payload: false });
      });
  });
};

export const deleteCustomer = (data) => (dispatch) => {
  return new Promise((resolve) => {
    // dispatch({ type: actionTypes.CREATE_CUSTOMER_LOADING, payload: true });
    baseurl.delete(API, data).then((res) => {
      // dispatch({
      //   type: actionTypes.CREATE_CUSTOMER,
      //   payload: res.data,
      // });

      resolve();
    });
    // .catch((error) => {
    //   if (error.response) {
    //     if (error.response.status) {
    //       if (error.response.status === 422) {
    //         const errData = error.response.data.errors;
    //         if (errData.firstname) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               firstname: errData.firstname,
    //             },
    //           });
    //         } else if (errData.lastname) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               lastname: errData.lastname,
    //             },
    //           });
    //         } else if (errData.email) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               email: errData.email,
    //             },
    //           });
    //         } else if (errData.password) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               password: errData.password,
    //             },
    //           });
    //         } else if (errData.mobileNo) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               mobileNo: errData.mobileNo,
    //             },
    //           });
    //         } else if (errData.otherMobileNo) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               otherMobileNo: errData.otherMobileNo,
    //             },
    //           });
    //         } else if (errData.deliveryAddress) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               deliveryAddress: errData.deliveryAddress,
    //             },
    //           });
    //         } else if (errData.stateRegion) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               stateRegion: errData.stateRegion,
    //             },
    //           });
    //         } else if (errData.city) {
    //           dispatch({
    //             type: actionTypes.CUSTOMER_ERRORS,
    //             payload: {
    //               city: errData.city,
    //             },
    //           });
    //         }

    //         //clear login errors
    //         setTimeout(() => {
    //           dispatch({
    //             type: actionTypes.CLEAR_CUSTOMER_ERRORS,
    //             payload: true,
    //           });
    //         }, 5000);
    //       }
    //     }
    //   }
    // })
    // .finally(() => {
    //   dispatch({ type: actionTypes.CREATE_CUSTOMER_LOADING, payload: false });
    // });
  });
};
