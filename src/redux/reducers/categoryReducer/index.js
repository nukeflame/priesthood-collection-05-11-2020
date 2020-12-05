import * as actionTypes from "../../actions/types";

const initState = {
  categories: [],
  createCategoryLoad: false,
  categoryErrors: {
    catName: [],
    slug: [],
  },
  categoriesLoad: true,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };

    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case actionTypes.CREATING_CATEGORY:
      return {
        ...state,
        createCategoryLoad: action.payload,
      };

    case actionTypes.FETCHING_CATEGORY:
      return {
        ...state,
        categoriesLoad: action.payload,
      };

    case actionTypes.CATEGORY_ERRORS:
      return {
        ...state,
        categoryErrors: {
          catName: action.payload.catName,
          slug: action.payload.slug,
        },
      };

    case actionTypes.CLEAR_CATEGORY_ERRORS:
      return {
        ...state,
        categoryErrors: action.payload
          ? {
              catName: [],
              slug: [],
            }
          : null,
      };

    default:
      return state;
  }
}
