import * as actionTypes from "../../actions/types";

const initState = {
  billings: [],
  latestBilling: {},
  billingLoad: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FIND_BILLING:
      return {
        ...state,
        latestBilling: action.payload,
      };

    case actionTypes.FIND_BILLING_LOADING:
      return {
        ...state,
        billingLoad: action.payload,
      };

    default:
      return state;
  }
}
