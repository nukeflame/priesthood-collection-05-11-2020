import * as actionTypes from "../../actions/types";

const initState = {
  cities: [],
  fetchingCities: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CITIES:
      return {
        ...state,
        cities: action.payload,
      };

    case actionTypes.FETCHING_CITIES:
      return {
        ...state,
        fetchingCities: action.payload,
      };

    default:
      return state;
  }
}
