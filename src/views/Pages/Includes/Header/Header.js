import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";
import { destroyToken, getUserData } from "../../../../config/auth";
import { getCartProduct } from "../../../../redux/actions/productAction";
import { isNull } from "lodash";
import { fetchSearchItems } from "../../../../redux/actions/searchAction";
import Autocomplete from "./AutoComplete";
import queryString from "query-string";
import PropTypes from "prop-types";
import { logoutUser } from "../../../../redux/actions/logginAction";

class Header extends Component {
  static propTypes = {
    settingsData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pathname: null,
      userData: null,
    };
  }

  handleMyAccount = (e) => {
    const { authUser } = this.props;
    if (authUser) {
      e.preventDefault();
    }
  };

  handleLogout = () => {
    this.props.logoutUser().then = () => {
      destroyToken();
    };
    this.props.history.push("/auth/login");
  };

  toCartList = (e) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (authUser) {
      this.props.history.push("/cart");
    } else {
      this.props.history.push("/auth/create_account");
    }
  };

  toMyOrders = (e) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (authUser) {
      this.props.history.push(
        `/account/customer?${queryString.stringify({ tab: "my_orders" })}`
      );
    } else {
      this.props.history.push("/auth/login");
    }
  };

  toMySavedItems = (e) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (authUser) {
      this.props.history.push(
        `/account/customer?${queryString.stringify({ tab: "wishlist" })}`
      );
    } else {
      this.props.history.push("/auth/login");
    }
  };

  initMethods = () => {
    this.setState({ pathname: this.props.history.location.pathname });
    this.props.getCartProduct();
  };

  componentDidMount() {
    this.initMethods();
    //auth user
    if (!isNull(getUserData())) {
      this.setState({ userData: getUserData() });
    }
  }

  render() {
    const { pathname, userData } = this.state;
    const { cartList, authUser, localCart, settingsData } = this.props;

    return (
      <React.Fragment>
        <header className="header-v4">
          {/* Header desktop */}
          <div className="container-menu-desktop">
            {/* Topbar */}
            <div className="top-bar">
              <div className="content-topbar flex-sb-m h-full container">
                <div className="left-top-bar">
                  <strong>Call: </strong>{" "}
                  {settingsData && settingsData.siteTelephone} &nbsp; &nbsp;
                  <strong> Email: </strong>
                  <span className="pl-1">
                    {settingsData && settingsData.siteEmail}
                  </span>
                </div>

                <div className="right-top-bar">
                  <a href="/" className="right-top-bar-link">
                    Help &amp; FAQs
                  </a>

                  <div className="sub-menu-wrapper">
                    <a
                      href="/auth/login"
                      className={
                        "right-top-bar-link " +
                        classNames({ topbarhover: authUser })
                      }
                      onClick={(e) => this.handleMyAccount(e)}
                    >
                      {authUser ? (
                        <span>
                          Hi, <b>{authUser.firstname}</b>
                        </span>
                      ) : (
                        <span>My Account</span>
                      )}
                    </a>
                    <div
                      className={
                        "sub-menu-topbar " +
                        classNames({ hidden: authUser === null })
                      }
                    >
                      <ul className="sub-menu-list">
                        {authUser && userData && userData.accessPortal ? (
                          <li>
                            <Link to="/dashboard">Go To Dashboard</Link>
                          </li>
                        ) : null}
                        {pathname !== "/account/customer" ? (
                          <>
                            <li>
                              <Link to="/account/customer?tab=my_account">
                                My Account
                              </Link>
                            </li>
                            <li>
                              {/* eslint-disable-next-line */}
                              <a href="#" onClick={this.toMyOrders}>
                                My Orders
                              </a>
                            </li>
                            <li>
                              {/* eslint-disable-next-line */}
                              <a href="#" onClick={this.toMySavedItems}>
                                Saved Items
                              </a>
                            </li>
                          </>
                        ) : null}
                        <li>
                          <a
                            href="/auth/login"
                            onClick={(e) => this.handleLogout(e)}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* eslint-disable-next-line */}
                  <a href="#" className="right-top-bar-link">
                    EN
                  </a>
                  {/* eslint-disable-next-line */}
                  <a href="#" className="right-top-bar-link">
                    KES
                  </a>
                </div>
              </div>
            </div>
            <div className="wrap-menu-desktop">
              <nav className="limiter-menu-desktop container">
                {/*  Logo desktop		 */}
                <Link to="/home" className="logo">
                  <span className="logo-text">
                    <span className="b">
                      {settingsData && settingsData.siteTitle}
                    </span>
                  </span>
                  {/* <img src={logo01} alt="IMG-LOGO" /> */}
                </Link>
                {/*  Menu desktop */}
                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li>
                      <NavLink to="/home" exact activeClassName="active-menu">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/shop-catalog"
                        exact
                        activeClassName="active-menu"
                      >
                        Shop
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink to="/blog" exact activeClassName="active-menu">
                        Blog
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="/about" exact activeClassName="active-menu">
                        About
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/*  header icons */}
                <div className="head-icons wrap-icon-header flex-w flex-r-m">
                  {/* search bar */}
                  <Autocomplete
                    {...this.props}
                    suggestions={[
                      "White",
                      "Black",
                      "Green",
                      "Blue",
                      "Yellow",
                      "Red",
                      "Alligator",
                      "Bask",
                      "Crocodilian",
                      "Death Roll",
                      "Eggs",
                      "Jaws",
                      "Reptile",
                      "Solitary",
                      "Tail",
                      "Wetlands",
                      "alien",
                      "shark",
                      "ahl",
                    ]}
                  />
                  {/* cart icon */}
                  <NavLink
                    to="/cart"
                    exact
                    activeClassName="active-menu"
                    data-notify={
                      authUser ? cartList && cartList.length : localCart.length
                    }
                    className={
                      "icon-header-item icon-header-noti " +
                      classNames({
                        "icon-noti-cart": authUser
                          ? cartList && !cartList.length
                          : !localCart.length,
                      })
                    }
                    id="cartCount"
                    onClick={this.toCartList}
                  >
                    <i className="zmdi zmdi-shopping-cart"></i>
                  </NavLink>
                  {/* wishlist icon */}
                  <NavLink
                    to="#"
                    exact
                    activeClassName="active-menu"
                    className="icon-header-item icon-header-noti icon-noti-cart"
                    data-notify="0"
                    onClick={this.toMySavedItems}
                  >
                    <i className="zmdi zmdi-favorite-outline"></i>
                  </NavLink>
                </div>
              </nav>
            </div>
          </div>

          {/* Header Mobile */}
          <div className="wrap-header-mobile">
            {/*  Logo moblie */}
            <div className="logo-mobile">
              <Link to="/home" className="logo pt-3">
                <span className="logo-text">
                  <span className="b">Priesthood</span> Collection
                </span>
              </Link>
            </div>

            {/* Icon header */}
            <div className="wrap-icon-header flex-w flex-r-m m-r-15">
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                <i className="zmdi zmdi-search"></i>
              </div>

              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                data-notify="2"
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>

              <a
                href="/"
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
                data-notify="0"
              >
                <i className="zmdi zmdi-favorite-outline"></i>
              </a>
            </div>

            {/* Button show menu  */}
            <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </div>
          </div>

          {/* Menu Mobile */}
          <div className="menu-mobile">
            <ul className="topbar-mobile">
              <li>
                <div className="left-top-bar">
                  Free shipping for standard order over $100
                </div>
              </li>

              <li>
                <div className="right-top-bar flex-w h-full">
                  <a href="/" className="flex-c-m p-lr-10 trans-04">
                    Help &amp; FAQs
                  </a>

                  <a href="/" className="flex-c-m p-lr-10 trans-04">
                    My Account
                  </a>

                  <a href="/" className="flex-c-m p-lr-10 trans-04">
                    EN
                  </a>

                  <a href="/" className="flex-c-m p-lr-10 trans-04">
                    USD
                  </a>
                </div>
              </li>
            </ul>

            <ul className="main-menu-m">
              <li>
                <a href="index.html">Home</a>
                <span className="arrow-main-menu-m">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
              </li>

              <li>
                <a href="product.html">Shop</a>
              </li>

              <li>
                <a
                  href="shoping-cart.html"
                  className="label1 rs1"
                  data-label1="hot"
                >
                  Features
                </a>
              </li>

              <li>
                <a href="blog.html">Blog</a>
              </li>

              <li>
                <a href="about.html">About</a>
              </li>

              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cartList: state.cartlist.cartlist,
  localCart: state.products.localCart,
  authUser: state.users.auth,
});

const mapDispatchToProps = {
  getCartProduct,
  fetchSearchItems,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
