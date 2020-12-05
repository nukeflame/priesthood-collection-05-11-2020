import * as actionTypes from "../../actions/types";

const initState = {
  orderStatus: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_STATUS:
      return {
        ...state,
        orderStatus: action.payload,
      };

    default:
      return state;
  }
}
