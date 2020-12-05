/**
 * Authentication package
 */

import Cookies from "js-cookie";

export const getToken = () => {
  var token = Cookies.get("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiO");
  var expiration = Cookies.get("CJhbGciOiJSUzI1NiJ9.eyJhdWQiO");

  if (!token || !expiration) {
    destroyToken();
    return false;
  }

  if (Date.now() > parseInt(expiration, 10)) {
    return false;
  } else {
    return token;
  }
};

export const isLoggedIn = () => {
  if (getToken()) {
    return true;
  }
  return;
};

export const setToken = (token, expiration) => {
  Cookies.set("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiO", token);
  Cookies.set("CJhbGciOiJSUzI1NiJ9.eyJhdWQiO", expiration);
  return true;
};

export const destroyToken = () => {
  Cookies.remove("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiO");
  Cookies.remove("CJhbGciOiJSUzI1NiJ9.eyJhdWQiO");
  Cookies.remove("xYkslpaZtRp");
};

export const clearConsole = () => {
  console.clear();
};

export const setUserData = (data) => {
  Cookies.set("xYkslpaZtRp", JSON.stringify(JSON.stringify(data)));
  return true;
};

export const getUserData = () => {
  let data = null;
  if (Cookies.get("xYkslpaZtRp")) {
    data = JSON.parse(JSON.parse(Cookies.get("xYkslpaZtRp")));
  }

  return data;
};
