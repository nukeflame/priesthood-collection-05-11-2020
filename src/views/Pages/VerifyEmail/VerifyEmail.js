import React, { Component } from "react";
import { FormText, Button, Input, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import splitImage from "../../../assets/img/split.jpg";
import iconBrand from "../../../assets/img/brand/logo-white.svg";
import loaderSm from "../../../assets/loader/sharp-sm.svg";
import {
  registerUser,
  fetchUserOtp,
  updateOtp,
  verifyUserOtp,
  clearVerifiedErrors,
} from "../../../redux/actions/registerAction";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import queryString from "query-string";
import { toast } from "react-toastify";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regData: {
        otpNo: "",
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      regData: {
        ...prevState.regData,
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

  handleResendOtp = (e) => {
    e.preventDefault();
    const { regUser } = this.props;
    const data = {
      id: regUser.verifyUser.id,
      user: regUser,
    };

    this.props.updateOtp(data).then(() => {
      toast(
        <div className="text-dark">
          <i className="fa fa-check-circle fs-16"></i> A new code has been sent
          to your email.
        </div>,
        {
          className: "text-only",
          autoClose: 5000,
        }
      );
    });
  };

  handleSubmitVerify = (e) => {
    e.preventDefault();
    const { regData } = this.state;
    const { regUser } = this.props;
    const data = {
      otpNo: regData.otpNo,
      token: regUser.verifyUser.token,
    };

    this.props.verifyUserOtp(data).then(() => {
      this.props.history.push("/account/customer");
    });
  };

  handleVerifyRegister = (e) => {
    e.preventDefault();
    const { regUser } = this.props;
    this.props.history.push(
      `/auth/register?${queryString.stringify({
        arb: regUser.verifyUser.token,
      })}`
    );
  };

  verKeyFocus = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      regData: {
        ...prevState.regData,
        otpNo: "",
      },
    }));
    this.props.clearVerifiedErrors();
  };

  componentDidMount() {
    //query url
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      if (params.arb) {
        this.props
          .fetchUserOtp(params.arb)
          .catch(() => this.props.history.push("/auth/register"));
      } else {
        this.props.history.push("/auth/register");
      }
    }
  }

  render() {
    const { regUser, verifiedErrors, loadingVerify } = this.props;

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
                  <Link to="auth/login">Sign in</Link>
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
                  <h6>nuekLabs</h6>
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
              <form
                className="login-form"
                onSubmit={(e) => this.handleSubmitVerify(e)}
              >
                <div className="form-section">
                  <h3 className="mt-3 f-s-26 color-black text-center">
                    Verify email address
                  </h3>
                  <p className="fs-13 text-left">
                    To verify your email, we've sent a One Time Password (OTP)
                    to <b>{!isEmpty(regUser) ? regUser.email : "-"}</b>
                    <Button
                      type="button"
                      color="link"
                      onClick={(e) => this.handleVerifyRegister(e)}
                      style={{ padding: "0px 5px" }}
                    >
                      (Change)
                    </Button>
                  </p>
                </div>
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="otpNo" className="color-black ff-RM">
                      Enter OTP
                    </label>
                    <Input
                      className="form-control-xs"
                      id="otpNo"
                      type="number"
                      name="otpNo"
                      autoFocus
                      onChange={(e) => this.handleChange(e)}
                      required
                      invalid={
                        verifiedErrors.error && verifiedErrors.error.length
                          ? true
                          : false
                      }
                      onFocus={(e) => this.verKeyFocus(e)}
                    />
                    <FormFeedback className="fs-13">
                      {verifiedErrors.error && verifiedErrors.error.length
                        ? verifiedErrors.error
                        : null}
                    </FormFeedback>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-sm btn-custom btn-block"
                    >
                      {loadingVerify ? (
                        <span>
                          Create your account <img src={loaderSm} alt="" />
                        </span>
                      ) : (
                        <span>Create your account </span>
                      )}
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <FormText>
                        By creating an account, you agree to Priesthood
                        Shopping's Conditions of Use and Privacy Notice.
                      </FormText>
                    </div>
                  </div>

                  <div className="login-form-reset-link">
                    {/* eslint-disable-next-line */}
                    <a href="#" onClick={(e) => this.handleResendOtp(e)}>
                      Resend OTP
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* toastify */}
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingRegister: state.register.loadingRegister,
  registerErrors: state.register.registerErrors,
  regUser: state.register.regUser,
  verifiedErrors: state.register.verifiedErrors,
  loadingVerify: state.register.loadingVerify,
});

const mapDispatchToProps = {
  updateOtp,
  registerUser,
  fetchUserOtp,
  verifyUserOtp,
  clearVerifiedErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
