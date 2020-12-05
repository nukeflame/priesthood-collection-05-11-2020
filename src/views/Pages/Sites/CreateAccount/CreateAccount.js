import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Button,
  FormText,
  FormFeedback,
  Input,
} from "reactstrap";
import { registerUser } from "../../../../redux/actions/registerAction";
import loaderSm from "../../../../assets/loader/sharp-sm.svg";
import { getCartList, formatMoney, imageUrl } from "../../../../config/helpers";
import { isNull } from "lodash";
// import { isLoggedIn } from "../../../../config/auth";
import {
  clearLoginErrors,
  logginUser,
} from "../../../../redux/actions/logginAction";
import {
  destroyCartProduct,
  clearCartProduct,
} from "../../../../redux/actions/productAction";
import { storeCartlist } from "../../../../redux/actions/cartlistAction";

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regData: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      loginData: {
        email: "",
        password: "",
      },
      totalAmount: "",
    };
  }

  handleChangeRegister = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      regData: {
        ...prevState.regData,
        [name]: value,
      },
    }));
  };

  handleChangeLogin = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      loginData: {
        ...prevState.loginData,
        [name]: value,
      },
    }));
  };

  handleForgotPswd = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/forgot-password");
  };

  handleSubmitRegister = (e) => {
    e.preventDefault();
    const { regData } = this.state;
    this.props.registerUser(regData).then(() => {
      this.resetData();
      this.props.history.push("/cart");
    });
  };

  resetData = () => {
    this.setState((prevState) => ({
      regData: {
        ...prevState.regData,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
    }));
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { loginData } = this.state;
    this.props.logginUser(loginData).then((res) => {
      this.clearLoginData();
      const { cart } = this.props;
      if (cart && cart.length > 0) {
        const data = {
          localCart: true,
          cart,
          email: res.email,
        };
        this.props.storeCartlist(data);
      }
      this.props.clearCartProduct();
      this.props.history.push("/cart");
    });
  };

  clearCartList = () => {
    this.setState({ totalAmount: "" });
    this.props.clearCartProduct();
  };

  removeCartItem = (e, d) => {
    e.preventDefault();
    const { totalAmount } = this.state;
    const m = parseInt(totalAmount) - d.TotalPrice;
    this.setState({ totalAmount: parseInt(m) });
    this.props.destroyCartProduct(d);
  };

  clearLoginData = () => {
    this.setState((prevState) => ({
      loginData: {
        ...prevState.loginData,
        email: "",
        password: "",
      },
    }));
  };

  handleChangeFocus = (e) => {
    e.preventDefault();
    const { loginErrors } = this.props;
    if (loginErrors) {
      this.props.clearLoginErrors();
    }
  };

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    //
    if (!isNull(getCartList())) {
      const list = getCartList();
      const TotalPrice = [];
      for (let i = 0; i < list.length; i++) {
        const l = list[i];
        TotalPrice.push(l.TotalPrice);
      }
      const totalAmount = TotalPrice.reduce((a, b) => a + b, 0);
      this.setState({ totalAmount, cart: list });
    }
    // if (isLoggedIn()) {
    //   this.props.history.push("/shop-catalog");
    // }
  }

  render() {
    const { regData, loginData, totalAmount } = this.state;
    const {
      loadingRegister,
      registerErrors,
      loginErrors,
      loginLoading,
      cart,
    } = this.props;

    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container">
          <div className="homepage-breadcrumb">
            <Link to="/home" className="bread-link bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">Create Account</span>
          </div>
        </div>
        <div className="container mt-4">
          <Row>
            <Col sm="8">
              <FormGroup row>
                <Col sm="6">
                  <h4 className="header-title">Create Account</h4>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <h5>Sign in account with Google</h5>
                            <button
                              type="submit"
                              className="btn btn-custom"
                              style={{ width: "100%" }}
                              disabled={loginLoading ? true : false}
                            >
                              {loginLoading ? (
                                <span>
                                  <img src={loaderSm} alt="" />
                                </span>
                              ) : (
                                <span>Google Sign up</span>
                              )}
                            </button>
                          </FormGroup>
                          <FormGroup>
                            <h5>Sign in account with Facebook</h5>
                            <button
                              type="submit"
                              className="btn btn-custom"
                              style={{ width: "100%" }}
                              disabled={loginLoading ? true : false}
                            >
                              {loginLoading ? (
                                <span>
                                  <img src={loaderSm} alt="" />
                                </span>
                              ) : (
                                <span>Google Sign up</span>
                              )}
                            </button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="6">
                  <h4 className="header-title">Already Have Account? Login</h4>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col sm="12">
                          <form
                            className="login-form"
                            onSubmit={(e) => this.handleLoginSubmit(e)}
                          >
                            <div className="form-group form-group-username">
                              <label htmlFor="login-username" className="ff-RM">
                                Email
                              </label>
                              <input
                                id="login-username"
                                type="email"
                                name="email"
                                className="form-control login-form-username form-control-xs"
                                placeholder="Your email"
                                autoFocus
                                value={loginData.email}
                                onChange={(e) => this.handleChangeLogin(e)}
                                // onFocus={(e) => this.handleChangeFocus(e)}
                                required
                              />
                            </div>
                            <div className="form-group form-group-password">
                              <label htmlFor="login-password" className="ff-RM">
                                Password
                              </label>
                              <input
                                id="login-password"
                                type="password"
                                name="password"
                                className="form-control login-form-password form-control-xs"
                                placeholder="Type password"
                                value={loginData.password}
                                onChange={(e) => this.handleChangeLogin(e)}
                                onFocus={(e) => this.handleChangeFocus(e)}
                                required
                              />
                              {loginErrors ? (
                                <span
                                  className="text-danger animated fadeIn"
                                  id="help-txt-password"
                                >
                                  {loginErrors}
                                </span>
                              ) : null}
                            </div>

                            <div className="row">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <button
                                    type="submit"
                                    className="btn btn-custom"
                                    style={{ width: "100%" }}
                                    disabled={loginLoading ? true : false}
                                  >
                                    {loginLoading ? (
                                      <span>
                                        <img src={loaderSm} alt="" />
                                      </span>
                                    ) : (
                                      <span>Sign in</span>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="login-form-reset-link">
                              <a
                                href="/auth/forgot-password"
                                onClick={(e) => this.handleForgotPswd(e)}
                              >
                                Did you forget your Password?
                              </a>
                            </div>
                          </form>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </FormGroup>
            </Col>
            <Col sm="4">
              <h4 className="header-title">Order Summary</h4>
              <Card className="right-card">
                <CardHeader className="py-2">
                  <span className="ff-RM fs-13">
                    Your Order{" "}
                    <span>
                      ({cart && cart.length}{" "}
                      {cart && cart.length > 1 ? "items" : "item"})
                    </span>
                  </span>
                  <span className="float-right">
                    <Button
                      color="link"
                      size="sm"
                      className="p-0 m-0"
                      onClick={this.clearCartList}
                    >
                      Clear
                    </Button>
                  </span>
                </CardHeader>
                <CardBody className="m-1">
                  <div className="order-list">
                    <div className="order-flow" style={{ maxHeight: "40vh" }}>
                      <ul className="shopping-list">
                        {cart && cart.length > 0 ? (
                          cart.map((c, i) => (
                            <li key={i}>
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                className="remove"
                                title="Remove this item"
                                onClick={(e) => this.removeCartItem(e, c)}
                              >
                                <i className="fa fa-remove"></i>
                              </a>
                              <span className="price">
                                Ksh {formatMoney(c.TotalPrice)}
                              </span>
                              <a
                                href={imageUrl() + "/images/" + c.ProductThumb}
                                className="cart-img"
                              >
                                <div className="cart-box-imag">
                                  <img
                                    src={
                                      imageUrl() + "/images/" + c.ProductThumb
                                    }
                                    alt=""
                                  />
                                </div>
                              </a>
                              <h4>
                                <span className="ellips2">{c.ProductName}</span>
                              </h4>
                              <p className="quantity">
                                {c.Quantity}x -{" "}
                                <span className="amount">
                                  {formatMoney(c.Price)}
                                </span>
                              </p>
                            </li>
                          ))
                        ) : (
                          <li
                            className="text-center fs-14"
                            style={{ border: "none" }}
                          >
                            Your Order is empty!
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="bottom">
                      <div className="right-checkout">
                        <ul>
                          <li>
                            <span className="left">Subtotal</span>
                            <span className="right">
                              KSH {formatMoney(totalAmount)}
                            </span>
                          </li>

                          <li>
                            <span className="left">Shipping Amount</span>
                            <span className="right">N/A</span>
                          </li>
                          <li className="last">
                            <span className="left">Total</span>
                            <span className="right">
                              KSH {formatMoney(totalAmount)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        {/* actions */}
        <section className="shop-services section mb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-rocket"></i>
                  <h4>Free shiping</h4>
                  <p>Orders over KES 10,000.00</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-reload"></i>
                  <h4>Free Return</h4>
                  <p>Within 30 days returns</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-lock"></i>
                  <h4>Sucure Payment</h4>
                  <p>100% secure payment</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-tag"></i>
                  <h4>Best Price</h4>
                  <p>Guaranteed price</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingRegister: state.register.loadingRegister,
  registerErrors: state.register.registerErrors,
  loginLoading: state.login.loginLoading,
  loginErrors: state.login.loginErrors,
  cart: state.products.localCart,
  authUser: state.users.auth,
});

const mapDispatchToProps = {
  logginUser,
  registerUser,
  destroyCartProduct,
  clearCartProduct,
  storeCartlist,
  clearLoginErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
