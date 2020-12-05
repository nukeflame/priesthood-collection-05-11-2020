import * as actionTypes from "../../actions/types";

const initState = {
  cartlist: [],
  processedCartlist: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CARTLIST:
      return {
        ...state,
        cartlist: action.payload,
      };

    case actionTypes.FETCH_PROCESSED_CARTLIST:
      return {
        ...state,
        processedCartlist: action.payload,
      };

    case actionTypes.CREATE_CARTLIST:
      return { ...state, cartlist: [...state.cartlist, action.payload] };

    case actionTypes.DESTROY_CARTLIST:
      return {
        ...state,
        cartlist: state.cartlist.filter((i) => i.id !== action.payload.id),
      };

    default:
      return state;
  }
}
