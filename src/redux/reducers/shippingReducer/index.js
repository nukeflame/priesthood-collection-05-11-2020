import * as actionTypes from "../../actions/types";

const initState = {
  shipping: {},
  createShipLoad: false,
  updateShipLoad: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SHIPPING_PRODUCT:
      return {
        ...state,
        shipping: action.payload,
      };

    case actionTypes.CREATE_SHIPPING_PRODUCT:
      return {
        ...state,
        shipping: action.payload,
      };

    case actionTypes.CREATE_SHIPPING_LOADING:
      return {
        ...state,
        createShipLoad: action.payload,
      };

    case actionTypes.UPDATE_SHIPPING_PRODUCT:
      return {
        ...state,
        shipping: action.payload,
      };

    case actionTypes.UPDATE_SHIPPING_LOADING:
      return {
        ...state,
        updateShipLoad: action.payload,
      };

    default:
      return state;
  }
}
