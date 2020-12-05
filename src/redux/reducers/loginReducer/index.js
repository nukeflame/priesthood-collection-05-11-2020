import * as actionTypes from "../../actions/types";

const initState = {
  loginLoading: false,
  loginErrors: "",
  logUser: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_LOADING:
      return {
        ...state,
        loginLoading: action.payload,
      };

    case actionTypes.LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload.loginErrors,
      };

    case actionTypes.LOGINED_USER:
      return {
        ...state,
        logUser: action.payload,
      };

    default:
      return state;
  }
}
