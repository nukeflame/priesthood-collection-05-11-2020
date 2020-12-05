import * as actionTypes from "../../actions/types";

const initState = {
  orders: [],
  userOrders: [],
  checkoutAddressLoad: false,
  addressData: "",
  paymentLoading: false,
  paymentData: "",
  latestOrder: "",
  findOrderLoading: false,
  checkoutErrors: {
    firstname: [],
    lastname: [],
    mobileNo: [],
    otherMobileNo: [],
    deliveryAddress: [],
    stateRegion: [],
    city: [],
    mpesaNo: [],
  },
  fetchOrderLoading: false,
  fetchingUserOrders: true,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case actionTypes.FIND_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };

    case actionTypes.FETCHING_USER_ORDERS:
      return {
        ...state,
        fetchingUserOrders: action.payload,
      };

    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case actionTypes.CHECKOUT_ADDRESS_LOADING:
      return {
        ...state,
        checkoutAddressLoad: action.payload,
      };

    case actionTypes.SAVE_CHECKOUT_ADDRESS:
      return {
        ...state,
        addressData: action.payload,
      };

    case actionTypes.CHECKOUT_ADDRESS_ERRORS:
      return {
        ...state,
        checkoutErrors: {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          mobileNo: action.payload.mobileNo,
          otherMobileNo: action.payload.otherMobileNo,
          deliveryAddress: action.payload.deliveryAddress,
          stateRegion: action.payload.stateRegion,
          city: action.payload.city,
          mpesaNo: action.payload.mpesaNo,
        },
      };

    case actionTypes.CLEAR_CHECKOUT_ADDRESS_ERRORS:
      return {
        ...state,
        checkoutErrors: {
          firstname: [],
          lastname: [],
          mobileNo: [],
          otherMobileNo: [],
          deliveryAddress: [],
          stateRegion: [],
          city: [],
          mpesaNo: [],
        },
      };

    case actionTypes.PAYMENT_LOADING:
      return {
        ...state,
        paymentLoading: action.payload,
      };

    case actionTypes.PAYMENT_DATA:
      return {
        ...state,
        paymentData: action.payload,
      };

    case actionTypes.FIND_LATEST_ORDER:
      return {
        ...state,
        latestOrder: action.payload,
      };

    case actionTypes.FIND_ORDER_LOADING:
      return {
        ...state,
        findOrderLoading: action.payload,
      };

    case actionTypes.FETCH_ORDER_LOADING:
      return {
        ...state,
        fetchOrderLoading: action.payload,
      };

    case actionTypes.DESTROY_ORDER:
      return {
        ...state,
        orders: state.orders.filter((s) => s.id !== action.payload),
      };

    default:
      return state;
  }
}
