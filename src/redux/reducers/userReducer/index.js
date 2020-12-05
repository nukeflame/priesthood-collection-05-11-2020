import * as actionTypes from "../../actions/types";

const initState = {
  auth: null,
  users: [],
  networkError: true,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return {
        ...state,
        auth: action.payload,
      };

    case actionTypes.NETWORK_ERROR:
      return {
        ...state,
        networkError: action.payload,
      };

    default:
      return state;
  }
}
