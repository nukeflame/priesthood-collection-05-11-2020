import * as actionTypes from "../../actions/types";

const initState = {
  settings: [],
  updateSettingsLoad: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };

    case actionTypes.UPDATE_SETTINGS_LOAD:
      return {
        ...state,
        updateSettingsLoad: action.payload,
      };

    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: state.settings.map((s) => {
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
