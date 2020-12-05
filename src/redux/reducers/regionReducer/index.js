import * as actionTypes from "../../actions/types";

const initState = {
  regions: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_STATE_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };

    case actionTypes.SHOW_STATE_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };

    default:
      return state;
  }
}
