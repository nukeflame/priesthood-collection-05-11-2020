import * as actionTypes from "../../actions/types";

const initState = {
  products: [],
  localCart: [],
  fetchProductLoad: false,
  findProduct: "",
  productErrors: {
    productName: [],
    price: [],
    sku: [],
    stock: [],
    category: [],
    barcode: [],
    brandName: [],
    description: [],
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        fetchProductLoad: action.payload,
      };

    case actionTypes.FETCH_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case actionTypes.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case actionTypes.PRODUCT_ERRORS:
      return {
        ...state,
        productErrors: {
          productName: action.payload.productName,
          price: action.payload.price,
          sku: action.payload.sku,
          stock: action.payload.stock,
          category: action.payload.category,
          brandName: action.payload.brandName,
          description: action.payload.description,
        },
      };

    case actionTypes.CLEAR_PRODUCT_ERRORS:
      return {
        ...state,
        productErrors: action.payload
          ? {
              productName: [],
              price: [],
              sku: [],
              stock: [],
              category: [],
              barcode: [],
              brandName: [],
              description: [],
            }
          : null,
      };

    case actionTypes.SET_CART_PRODUCT:
      return {
        ...state,
        localCart: [...state.localCart, action.payload],
      };

    case actionTypes.GET_CART_PRODUCT:
      return {
        ...state,
        localCart: action.payload,
      };

    case actionTypes.DEL_CART_PRODUCT:
      return {
        ...state,
        localCart: state.localCart.filter((f) => f.SKU !== action.payload.SKU),
      };

    case actionTypes.CLEAR_CART_PRODUCT:
      return {
        ...state,
        localCart: action.payload,
      };

    case actionTypes.FIND_PRODUCT:
      return {
        ...state,
        findProduct: action.payload,
      };

    case actionTypes.DESTROY_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}
