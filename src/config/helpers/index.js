/**
 * Helpers
 */

import { IMAGE_URL } from "../auth/appRoutes";
import Cookies from "js-cookie";
import { forEach } from "lodash";

export const formatMoney = (n, c, d, t) => {
  let j = "";
  c = isNaN((c = Math.abs(c))) ? 2 : c;
  d = d === undefined ? "." : d;
  t = t === undefined ? "," : t;
  let s = n < 0 ? "-" : "";
  let i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c))));
  j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
};

export const setCartList = (list) => {
  localStorage.setItem("cart", JSON.stringify(list));
};

export const getCartList = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export const imageUrl = () => {
  return IMAGE_URL;
};

export const setSettingData = (data) => {
  Cookies.set("s_data", JSON.stringify(data));
};

export const getSettingData = () => {
  if (Cookies.get("s_data")) {
    return JSON.parse(Cookies.get("s_data"));
  }
  return;
};
