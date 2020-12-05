import * as actionTypes from "../../actions/types";

const initState = {
  customers: [],
  createCustomerLoad: false,
  fetchCustomerLoad: false,
  updateCustomerLoad: false,
  customerErrors: {
    firstname: [],
    lastname: [],
    email: [],
    password: [],
    mobileNo: [],
    otherMobileNo: [],
    deliveryAddress: [],
    stateRegion: [],
    city: [],
  },
  findCustomer: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };

    case actionTypes.FETCH_CUSTOMERS_LOADING:
      return {
        ...state,
        fetchCustomerLoad: action.payload,
      };

    case actionTypes.FIND_CUSTOMER:
      return {
        ...state,
        findCustomer: action.payload,
      };

    case actionTypes.CREATE_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers],
      };

    case actionTypes.CREATE_CUSTOMER_LOADING:
      return {
        ...state,
        createCustomerLoad: action.payload,
      };

    case actionTypes.CUSTOMER_ERRORS:
      return {
        ...state,
        customerErrors: {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          password: action.payload.password,
          mobileNo: action.payload.mobileNo,
          otherMobileNo: action.payload.otherMobileNo,
          deliveryAddress: action.payload.deliveryAddress,
          stateRegion: action.payload.stateRegion,
          city: action.payload.city,
        },
      };

    case actionTypes.CLEAR_CUSTOMER_ERRORS:
      return {
        ...state,
        customerErrors: {
          firstname: [],
          lastname: [],
          email: [],
          password: [],
          mobileNo: [],
          otherMobileNo: [],
          deliveryAddress: [],
          stateRegion: [],
          city: [],
        },
      };

    case actionTypes.UPDATE_CUSTOMER_LOADING:
      return {
        ...state,
        updateCustomerLoad: action.payload,
      };

    case actionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((s) => {
          if (s.id === action.payload.id) {
            return Object.assign({}, s, action.payload);
          }
          return s;
        }),
      };

    default:
      return state;
  }
}
