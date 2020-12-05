import * as actionTypes from "../../actions/types";

const initState = {
  query: "",
  promo: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_PRODUCT_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case actionTypes.SEARCH_PROMO_PRODUCT_QUERY:
      return {
        ...state,
        promo: action.payload,
      };

    default:
      return state;
  }
}
