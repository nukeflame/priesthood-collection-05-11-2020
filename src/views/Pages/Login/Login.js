import React, { Component } from "react";
import splitImage from "../../../assets/img/split.jpg";
import iconBrand from "../../../assets/img/brand/logo-white.svg";
import loaderSm from "../../../assets/loader/sharp-sm.svg";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import {
  logginUser,
  clearLoginErrors,
} from "../../../redux/actions/logginAction";
import queryString from "query-string";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginData: {
        email: "",
        password: "",
      },
    };
  }

  handleChangeLogin = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      loginData: {
        ...prevState.loginData,
        [name]: value,
      },
    }));
  };

  handleHome = (e) => {
    e.preventDefault();
    this.props.history.push("/home");
  };

  handleForgotPswd = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/forgot-password");
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/register");
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { loginData } = this.state;
    this.props.logginUser(loginData).then((data) => {
      const { logUser } = this.props;
      if (logUser !== "") {
        this.props.history.push(
          `/auth/verify-email?${queryString.stringify({
            arb: logUser.verifyUser !== null ? logUser.verifyUser.token : null,
          })}`
        );
      } else if (data.accessPortal === 1) {
        return this.props.history.push("/dashboard");
      } else {
        return this.props.history.push("/account/customer");
      }
    });
    this.clearLoginData();
  };

  clearLoginData = () => {
    this.setState((prevState) => ({
      loginData: {
        ...prevState.loginData,
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

  render() {
    const { loginData } = this.state;
    const { loginLoading, loginErrors } = this.props;

    return (
      <div className="page-login animated fadeIn">
        <div className="split-wrapper">
          <div
            className="split-sidebar"
            style={{ backgroundImage: "url(" + splitImage + ")" }}
          >
            <div className="split-sidebar-inner">
              <h1>Priesthood Shopping</h1>
              <ul>
                <li>
                   {/* eslint-disable-next-line */}
                  <a href="#" onClick={(e) => this.handleHome(e)}>
                    Homepage
                  </a>
                </li>
                <li>
                  {/* eslint-disable-next-line */}
                  <a
                    href="#"
                    onClick={(e) => this.handleRegister(e)}
                  >
                    Register now
                  </a>
                </li>
                <li>Products</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className="account-footer">
              <div className="acc-footer-box">
                <div className="acc-footer-brand">
                  <img src={iconBrand} alt="" />
                </div>
                <div className="acc-footer-text">
                  <h6>Nueklabs</h6>
                  <small>
                    Asphyxia Technologies &copy; 2016 -{" "}
                    {new Date().getFullYear()}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="split-content">
            <div className="split-content-inner">
              <h1 className="split-head">Welcome Back</h1>
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
                    onFocus={(e) => this.handleChangeFocus(e)}
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
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.login.loginLoading,
  logUser: state.login.logUser,
  loginErrors: state.login.loginErrors,
});

const mapDispatchToProps = {
  logginUser,
  clearLoginErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
