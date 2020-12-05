import * as actionTypes from "../../actions/types";

const initState = {
  loadingRegister: false,
  regUser: "",
  loadingVerify: false,
  registerErrors: {
    firstname: [],
    lastname: [],
    email: [],
    password: [],
    password_confirmation: [],
  },
  verifiedErrors: {
    verified: [],
    error: [],
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_LOADING:
      return {
        ...state,
        loadingRegister: action.payload,
      };

    case actionTypes.REGISTER_ERRORS:
      return {
        ...state,
        registerErrors: {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          password: action.payload.password,
          password_confirmation: action.payload.password_confirmation,
        },
      };

    case actionTypes.CLEAR_REGISTER_ERRORS:
      return {
        ...state,
        registerErrors: action.payload
          ? { firstname: [], lastname: [], email: [], password: [] }
          : null,
      };

    case actionTypes.REGISTERD_USER:
      return {
        ...state,
        regUser: action.payload,
      };

    case actionTypes.VERIFED_USER:
      return {
        ...state,
        verifiedErrors: {
          verified: action.payload.verified,
          error: action.payload.error,
        },
      };

    case actionTypes.VERIFY_LOADING:
      return {
        ...state,
        loadingVerify: action.payload,
      };

    default:
      return state;
  }
}
