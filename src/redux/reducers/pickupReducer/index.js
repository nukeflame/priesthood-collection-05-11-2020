import * as actionTypes from "../../actions/types";

const initState = {
  pickupLocations: [],
  showingPickups: false,
  userPickupLocation: {},
  settingPickLoc: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.SHOW_PICKUP_LOCATION:
      return {
        ...state,
        pickupLocations: action.payload,
      };

    case actionTypes.SHOWING_PICKUP_LOCATION:
      return {
        ...state,
        showingPickups: action.payload,
      };

    case actionTypes.USER_PICKUP_LOCATION:
      return {
        ...state,
        userPickupLocation: action.payload,
      };

    case actionTypes.SETTING_PICKUP_LOCATION:
      return {
        ...state,
        settingPickLoc: action.payload,
      };

    default:
      return state;
  }
}
