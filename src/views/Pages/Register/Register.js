import React, { Component } from "react";
import { Row, Col, FormText, FormFeedback, Input } from "reactstrap";
import { ToastContainer } from "react-toastify";
import splitImage from "../../../assets/img/split.jpg";
import iconBrand from "../../../assets/img/brand/logo-black.svg";
import loaderSm from "../../../assets/loader/sharp-sm.svg";
import {
  registerUser,
  fetchUserOtp,
  updateReguser,
} from "../../../redux/actions/registerAction";
import { connect } from "react-redux";
import queryString from "query-string";
import { isEmpty } from "lodash";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regData: {
        userId: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
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

  handleHome = (e) => {
    e.preventDefault();
    this.props.history.push("/home");
  };

  handleForgotPswd = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/forgot-password");
  };

  handleSignIn = (e) => {
    e.preventDefault();
    this.props.history.push("/auth/login");
  };

  handleSubmitRegister = (e) => {
    e.preventDefault();
    const { regData } = this.state;
    if (regData.userId) {
      this.props.updateReguser(regData).then(() => {
        const { regUser } = this.props;
        this.props.history.push(
          `/auth/verify-email?${queryString.stringify({
            arb: regUser.verifyUser.token,
          })}`
        );
      });
    } else {
      this.props.registerUser(regData).then(() => {
        const { regUser } = this.props;
        this.props.history.push(
          `/auth/verify-email?${queryString.stringify({
            arb: regUser.verifyUser.token,
          })}`
        );
      });
    }

    this.setState((prevState) => ({
      regData: {
        ...prevState.regData,
        userId: "",
      },
    }));
  };

  handleKeyDown = () => {};

  componentDidMount() {
    //query url
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      if (params.arb) {
        this.props.fetchUserOtp(params.arb).then(() => {
          const { regUser } = this.props;
          this.setState((prevState) => ({
            regData: {
              ...prevState.regData,
              firstname: regUser.firstname,
              lastname: regUser.lastname,
              email: regUser.email,
              userId: regUser.verifyUser.user_id,
            },
          }));
        });
      }
    }
  }

  render() {
    const { regData } = this.state;
    const { loadingRegister, registerErrors } = this.props;

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
                    onClick={(e) => this.handleSignIn(e)}
                  >
                    Sign in
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
              <h1 className="split-head">Create account</h1>
              <form
                className="login-form"
                onSubmit={(e) => this.handleSubmitRegister(e)}
              >
                <Row>
                  <Col md="6">
                    <div className="form-group form-group-username">
                      <label htmlFor="firstname" className="ff-RM">
                        Firstname
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={regData.firstname}
                        className="form-control login-form-username form-control-xs"
                        autoFocus
                        autoComplete="off"
                        onChange={(e) => this.handleChangeRegister(e)}
                        // onKeyDown={(e) => this.handleKeyDown(e, registerErrors)}
                        required
                      />
                      {registerErrors.firstname &&
                      registerErrors.firstname.length > 0 ? (
                        <span
                          className="text-danger animated fadeIn"
                          id="help-txt-username"
                        >
                          {registerErrors.firstname}
                        </span>
                      ) : null}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group form-group-username">
                      <label htmlFor="lastname" className="ff-RM">
                        Lastname
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={regData.lastname}
                        className="form-control login-form-username form-control-xs"
                        autoComplete="off"
                        onChange={(e) => this.handleChangeRegister(e)}
                        // onKeyDown={this.handleKeyDown("lastname")}
                        required
                      />
                      {registerErrors.lastname &&
                      registerErrors.lastname.length > 0 ? (
                        <span
                          className="text-danger animated fadeIn"
                          id="help-txt-username"
                        >
                          {registerErrors.lastname}
                        </span>
                      ) : null}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group form-group-password">
                      <label htmlFor="login-email" className="ff-RM">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        name="email"
                        invalid={
                          registerErrors.email &&
                          registerErrors.email.length > 0
                            ? true
                            : false
                        }
                        // onKeyDown={this.handleKeyDown(registerErrors)}
                        className="login-form-password form-control-xs"
                        value={regData.email}
                        autoComplete="on"
                        onChange={(e) => this.handleChangeRegister(e)}
                        required
                      />
                      <FormFeedback className="text-danger animated fadeIn fs-13">
                        {registerErrors.email}
                      </FormFeedback>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group form-group-password">
                      <label htmlFor="login-password" className="ff-RM">
                        Password
                      </label>
                      <input
                        id="login-password"
                        type="password"
                        name="password"
                        value={regData.password}
                        className="form-control login-form-password form-control-xs"
                        autoComplete="off"
                        onChange={(e) => this.handleChangeRegister(e)}
                        // onKeyDown={this.handleKeyDown("password")}
                        required
                      />
                      <FormText>
                        Passwords must be at least 6 characters.
                      </FormText>
                      {registerErrors.password &&
                      registerErrors.password.length > 0 ? (
                        <span
                          className="text-danger animated fadeIn"
                          id="help-txt-username"
                        >
                          {registerErrors.password}
                        </span>
                      ) : null}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group form-group-password">
                      <label htmlFor="confirm-password" className="ff-RM">
                        Re-enter Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        name="password_confirmation"
                        value={regData.password_confirmation}
                        className="form-control login-form-password form-control-xs"
                        autoComplete="off"
                        onChange={(e) => this.handleChangeRegister(e)}
                        // onKeyDown={this.handleKeyDown("password_confirmation")}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-custom"
                        style={{ width: "100%" }}
                      >
                        {loadingRegister ? (
                          <span>
                            <img src={loaderSm} alt="" />
                          </span>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <FormText>
                      By creating an account, you agree to Priesthood Shopping's
                      Conditions of Use and Privacy Notice.
                    </FormText>
                  </div>
                </div>
                <div className="login-form-reset-link">
                  <a
                    href="/auth/forgot-password"
                    onClick={(e) => this.handleSignIn(e)}
                  >
                    Already have an account, Sign In?
                  </a>
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
});

const mapDispatchToProps = {
  registerUser,
  fetchUserOtp,
  updateReguser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
