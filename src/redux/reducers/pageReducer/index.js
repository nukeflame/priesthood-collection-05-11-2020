import * as actionTypes from "../../actions/types";

const initState = {
  pages: [],
  loadingPages: false,
  loadingPublish: false,
  uniLoader: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PAGES:
      return {
        ...state,
        pages: action.payload,
      };

    case actionTypes.FETCH_POST_LOADING:
      return {
        ...state,
        loadingPages: action.payload,
      };

    case actionTypes.CREATE_PAGE_LOADING:
      return {
        ...state,
        loadingPublish: action.payload,
      };

    case actionTypes.CREATE_PAGE:
      return {
        ...state,
        pages: [action.payload, ...state.pages],
      };

    case actionTypes.LOAD_UNILOADER:
      return {
        ...state,
        uniLoader: action.payload,
      };

    default:
      return state;
  }
}
