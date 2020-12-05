import baseurl from "../../../config/auth/baseUrl";
import * as actionTypes from "../types";
import { setUserData, setToken } from "../../../config/auth";

const API = "api/register/";
const API_LOGIN = "api/login";

export const registerUser = (regData) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.REGISTER_LOADING, payload: true });
    baseurl
      .post('api/register', regData)
      .then((res) => {
        dispatch({ type: actionTypes.REGISTERD_USER, payload: res.data });
        resolve();
      })
      .catch((error) => {
        if (error && error.response) {
          if (error.response.status === 422) {
            if (error.response.data.errors) {
              const errRes = error.response.data.errors;
              if (errRes.firstname) {
                dispatch({
                  type: actionTypes.REGISTER_ERRORS,
                  payload: {
                    firstname: errRes.firstname,
                  },
                });
              } else if (errRes.lastname) {
                dispatch({
                  type: actionTypes.REGISTER_ERRORS,
                  payload: {
                    lastname: errRes.lastname,
                  },
                });
              } else if (errRes.email) {
                dispatch({
                  type: actionTypes.REGISTER_ERRORS,
                  payload: {
                    email: errRes.email,
                  },
                });
              } else if (errRes.password) {
                dispatch({
                  type: actionTypes.REGISTER_ERRORS,
                  payload: {
                    password: errRes.password,
                  },
                });
              } else if (errRes.password_confirmation) {
                dispatch({
                  type: actionTypes.REGISTER_ERRORS,
                  payload: {
                    password_confirmation: errRes.password_confirmation,
                  },
                });
              }
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.REGISTER_LOADING, payload: false });
      });
  });
};

export const updateReguser = (regData) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: actionTypes.REGISTER_LOADING, payload: true });
    baseurl
      .put(API + "user/" + regData.userId, regData)
      .then((res) => {
        dispatch({ type: actionTypes.REGISTERD_USER, payload: res.data });
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.REGISTER_LOADING, payload: false });
      });
  });
};

export const fetchUserOtp = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = { token: data };
    baseurl
      .post(API + "authenticate", token)
      .then((res) => {
        dispatch({ type: actionTypes.REGISTERD_USER, payload: res.data });
        resolve();
      })
      .catch((error) => reject(error));
  });
};

export const updateOtp = (data) => (dispatch) => {
  return new Promise((resolve) => {
    baseurl.put(API + data.id, data).then((res) => {
      dispatch({ type: actionTypes.REGISTERD_USER, payload: res.data });
      resolve();
    });
  });
};

export const verifyUserOtp = (data) => (dispatch) => {
  dispatch({ type: actionTypes.VERIFY_LOADING, payload: true });
  return new Promise((resolve, reject) => {
    baseurl
      .post(API + "verifyUser", data)
      .then((res) => {
        const check = Boolean(
          setToken(res.data.access_token, res.data.expires_in + Date.now())
        );
        //redirect to user
        if (check) {
          baseurl.get(API_LOGIN).then((res) => {
            const data = res.data;
            setUserData(data);
            resolve();
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            if (error.response.status === 422) {
              const errData = error.response.data;
              if (errData.verified) {
                dispatch({
                  type: actionTypes.VERIFED_USER,
                  payload: { verified: errData.verified },
                });
                reject();
              } else if (errData.error) {
                dispatch({
                  type: actionTypes.VERIFED_USER,
                  payload: { error: errData.error },
                });
              }
            }
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.VERIFY_LOADING, payload: false });
      });
  });
};

export const clearRegisterErrors = (data) => (dispatch) => {
  return new Promise((resolve) => {
    resolve();
  });
};

export const clearVerifiedErrors = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({
      type: actionTypes.VERIFED_USER,
      payload: { error: [], verified: [] },
    });
    resolve();
  });
};
