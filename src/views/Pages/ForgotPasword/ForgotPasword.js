import React, { Component } from "react";
import splitImage from "../../../assets/img/split.jpg";
import iconBrand from "../../../assets/img/brand/logo-white.svg";
import { Input } from "reactstrap";

class ForgotPasword extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleHome = (e) => {
    e.preventDefault();
    this.props.history.push("/homepage");
  };

  handleForgotPswd = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/forgot-password");
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/register");
  };
  handleSignIn = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/login");
  };

  render() {
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
                  <a href="/homepage" onClick={(e) => this.handleHome(e)}>
                    Homepage
                  </a>
                </li>
                <li>
                  <a
                    href="/auth/register"
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
                  <h6>Epsotech</h6>
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
              <form>
                <div className="form-section text-left">
                  <h3 className="mt-3 f-s-26 color-black">
                    Forgot your account password?
                  </h3>
                  <p>Please enter your previous email adress</p>
                </div>
                <div className="form-section">
                  <div className="form-group">
                    <label forHtml="email" className="color-black ff-RM">
                      Email Address
                    </label>
                    <Input
                      className="form-control-xs"
                      id="email"
                      type="text"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-sm btn-custom btn-block"
                    >
                      GET NEW PASSWORD
                    </button>
                  </div>

                  <div className="login-form-reset-link">
                    <a
                      href="/auth/forgot-password"
                      onClick={(e) => this.handleSignIn(e)}
                    >
                      Already have an account, Sign In?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasword;
