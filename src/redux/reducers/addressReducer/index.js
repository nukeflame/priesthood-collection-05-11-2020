import * as actionTypes from "../../actions/types";

const initState = {
  addressData: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FIND_ADDRESS:
      return {
        ...state,
        addressData: action.payload,
      };

    case actionTypes.SAVE_CHECKOUT_ADDRESS:
      return {
        ...state,
        addressData: action.payload,
      };

    case actionTypes.UPDATE_CHECKOUT_ADDRESS:
      return {
        ...state,
        addressData: action.payload,
      };

    default:
      return state;
  }
}
