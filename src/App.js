import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { CustomerRoutes, PrivateRoutes } from "./routes/authRoutes";
import history from "./config/history";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-table/react-table.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// HomeLayout Routes
const HomeLayout = React.lazy(() => import("./views/Pages/HomeLayout"));
const CheckoutAdress = React.lazy(() => import("./views/Pages/HomeLayout"));
const CheckoutSuccess = React.lazy(() => import("./views/Pages/HomeLayout"));
const Cart = React.lazy(() => import("./views/Pages/HomeLayout"));
const CreateAccount = React.lazy(() => import("./views/Pages/HomeLayout"));
const ShopCatalog = React.lazy(() => import("./views/Pages/HomeLayout"));
const OffersList = React.lazy(() => import("./views/Pages/Sites/OffersList"));
const ProductDetail = React.lazy(() => import("./views/Pages/HomeLayout"));

const Blog = React.lazy(() => import("./views/Pages/HomeLayout"));
const About = React.lazy(() => import("./views/Pages/HomeLayout"));
const Contact = React.lazy(() => import("./views/Pages/HomeLayout"));

// customer
const CustomerAccount = React.lazy(() =>
  import("./views/Pages/CustomerAccount")
);
const CustomerOrder = React.lazy(() => import("./views/Pages/CustomerOrder"));
const ProductStatus = React.lazy(() => import("./views/Pages/HomeLayout"));

//Auth Routes
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const VerifyEmail = React.lazy(() => import("./views/Pages/VerifyEmail"));
const ForgotPasword = React.lazy(() => import("./views/Pages/ForgotPasword"));

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={loading()}>
          <Switch>
            {/* Auth Routes */}
            <Route
              exact
              path="/auth/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/auth/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/auth/forgot-password"
              name="ForgotPasword Page"
              render={(props) => <ForgotPasword {...props} />}
            />
            <Route
              exact
              path="/auth/verify-email"
              name="VerifyEmail Page"
              render={(props) => <VerifyEmail {...props} />}
            />
            {/* HomeLayout routes */}
            <Route
              exact
              path="/home"
              name="Home"
              component={(props) => <HomeLayout {...props} />}
            />
            <Route
              exact
              path="/cart"
              name="Cart"
              render={(props) => <Cart {...props} />}
            />
            <Route
              exact
              path="/auth/create_account"
              name="CreateAccount"
              component={(props) => <CreateAccount {...props} />}
            />
            <Route
              exact
              path="/shop-catalog/:query?"
              name="ShopCatalog"
              component={(props) => <ShopCatalog {...props} />}
            />
            <Route
              exact
              path="/product-detail/:query?"
              name="ProductDetail"
              component={(props) => <ProductDetail {...props} />}
            />
            <Route
              exact
              path="/offers-list/:name"
              name="OffersList"
              component={(props) => <OffersList {...props} />}
            />
            <Route
              exact
              path="/blog"
              name="Blog"
              component={(props) => <Blog {...props} />}
            />
            <Route
              exact
              path="/about"
              name="About"
              component={(props) => <About {...props} />}
            />
            <Route
              exact
              path="/contact"
              name="Contact"
              component={(props) => <Contact {...props} />}
            />
            {/* Customr account */}
            <CustomerRoutes
              exact
              path="/account/customer"
              name="CustomerAccount"
              component={(props) => <CustomerAccount {...props} />}
            />
            <CustomerRoutes
              exact
              path="/checkout-address"
              name="Checkout Address"
              component={(props) => <CheckoutAdress {...props} />}
            />
            <CustomerRoutes
              exact
              path="/checkout-address/success"
              name="Checkout Success"
              component={(props) => <CheckoutSuccess {...props} />}
            />
            <CustomerRoutes
              exact
              path="/customer/order/:orderNo"
              name="CustomerOrder"
              component={(props) => <CustomerOrder {...props} />}
            />
            <Route
              exact
              path="/new/product/:query?"
              name="ProductStatus"
              component={(props) => <ProductStatus {...props} />}
            />

            {/* Dashboard Routes */}
            <PrivateRoutes
              path="/"
              name="Home"
              component={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
