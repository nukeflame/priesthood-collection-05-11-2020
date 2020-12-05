/**
|--------------------------------------------------
| Default Store
|--------------------------------------------------
*/
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
//
import loginReducer from "../reducers/loginReducer";
import registerReducer from "../reducers/registerReducer";
import userReducer from "../reducers/userReducer";
import productReducer from "../reducers/productReducer";
import pageReducer from "../reducers/pageReducer";
import postReducer from "../reducers/postReducer";
import orderReducer from "../reducers/orderReducer";
import categoryReducer from "../reducers/categoryReducer";
import cartlistReducer from "../reducers/cartlistReducer";
import shippingReducer from "../reducers/shippingReducer";
import addressReducer from "../reducers/addressReducer";
import settingReducer from "../reducers/settingReducer";
import customerReducer from "../reducers/customerReducer";
import cityReducer from "../reducers/cityReducer";
import regionReducer from "../reducers/regionReducer";
import orderStatusReducer from "../reducers/orderStatusReducer";
import billingReducer from "../reducers/billingReducer";
import searchReducer from "../reducers/searchReducer";
import pickupReducer from "../reducers/pickupReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  users: userReducer,
  products: productReducer,
  pages: pageReducer,
  posts: postReducer,
  orders: orderReducer,
  categories: categoryReducer,
  cartlist: cartlistReducer,
  shipping: shippingReducer,
  address: addressReducer,
  settings: settingReducer,
  customers: customerReducer,
  cities: cityReducer,
  regions: regionReducer,
  orderStatus: orderStatusReducer,
  billing: billingReducer,
  search: searchReducer,
  pickups: pickupReducer,
});

const initState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
