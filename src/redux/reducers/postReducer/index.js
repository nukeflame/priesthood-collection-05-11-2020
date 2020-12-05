import * as actionTypes from "../../actions/types";

const initState = {
  posts: [],
  loadingPosts: false,
  latestPost: {},
  postErrors: { title: [], slug: [] },
  newPostLoad: false,
  promoProducts: [],
  sliderPosts: [],
  feauturedPosts: [],
  homepagePost: {},
  offerPost: {},
  promoProductsErrors: {
    infoName: [],
    infoPrice: [],
    infoTags: [],
    infoFile: [],
    pInfo: [],
    products: [],
  },
  savingPromoProduct: false,
  updatePostLoad: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_POST:
      return {
        ...state,
        posts: action.payload,
      };

    case actionTypes.FETCH_POST_LOADING:
      return {
        ...state,
        loadingPosts: action.payload,
      };

    case actionTypes.LATEST_POST:
      return {
        ...state,
        latestPost: action.payload,
      };

    case actionTypes.CREATE_POST_LOADING:
      return {
        ...state,
        newPostLoad: action.payload,
      };

    case actionTypes.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case actionTypes.FETCH_PROMO_PRODUCTS:
      return {
        ...state,
        promoProducts: action.payload,
      };

    case actionTypes.FETCH_POST_ERRORS:
      return {
        ...state,
        postErrors: {
          title: action.payload.title,
          slug: action.payload.slug,
        },
      };

    case actionTypes.CLEAR_POST_ERRORS:
      return {
        ...state,
        postErrors: {
          title: [],
          slug: [],
        },
      };

    case actionTypes.FETCH_SLIDER_POSTS:
      return {
        ...state,
        sliderPosts: action.payload,
      };

    case actionTypes.FETCH_FEATURED_POSTS:
      return {
        ...state,
        feauturedPosts: action.payload,
      };

    case actionTypes.FETCH_HOMEPAGE_POST:
      return {
        ...state,
        homepagePost: action.payload,
      };

    case actionTypes.FIND_SLIDER_POST:
      return {
        ...state,
        offerPost: action.payload,
      };

    case actionTypes.PROMO_PRODUCTS_ERRORS:
      return {
        ...state,
        promoProductsErrors: {
          infoName: action.payload.infoName,
          infoPrice: action.payload.infoPrice,
          infoTags: action.payload.infoTags,
          infoFile: action.payload.infoFile,
          pInfo: action.payload.pInfo,
          products: action.payload.products,
        },
      };

    case actionTypes.CLEAR_PROMO_PRODUCTS_ERRORS:
      return {
        ...state,
        promoProductsErrors: {
          infoName: [],
          infoPrice: [],
          infoTags: [],
          infoFile: [],
          pInfo: [],
          products: [],
        },
      };

    case actionTypes.SAVING_PROMO_LOADING:
      return {
        ...state,
        savingPromoProduct: action.payload,
      };

    default:
      return state;
  }
}
