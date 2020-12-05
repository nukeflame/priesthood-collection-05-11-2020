import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import backArrowIcon from "../../../../assets/icons/back-arrow-icon.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCities } from "../../../../redux/actions/cityAction";
import { fetchRegions } from "../../../../redux/actions/regionAction";
import { userChangePassword } from "../../../../redux/actions/userAction";

class EditCustomerAccount extends Component {
  static propTypes = {
    editAccountToggle: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      customerData: {
        firstname: "",
        lastname: "",
        mobileNo: "",
        otherMobileNo: "",
        email: "",
        deliveryAddress: "",
        deliveryAddress2: "",
        currentPswd: "",
        newPswd: "",
        confirmPswd: "",
      },
    };
  }

  handleChangeCust = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      customerData: {
        ...prevState.customerData,
        [name]: value,
      },
    }));
  };

  saveAccountInfo = (e) => {
    e.preventDefault();
    console.log(e);
  };

  saveChangePassword = (e) => {
    e.preventDefault();
    const { customerData } = this.state;
    const data = {
      current_password: customerData.currentPswd,
      password_confirmation: customerData.confirmPswd,
      password: customerData.newPswd,
    };

    this.props.userChangePassword(data);
  };

  componentDidMount() {
    this.props.fetchCities();
    this.props.fetchRegions();
  }

  render() {
    const {
      editAccountToggle,
      customer,
      isChangePswd,
      cities,
      regions,
    } = this.props;
    const { customerData } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <div className="edCustomerAc">
              <ListGroup className="ac-menu">
                <ListGroupItem>
                  <h2 className="ac-heading">
                    <Button
                      type="button"
                      color="link"
                      className="accBack-btn"
                      onClick={(e) => editAccountToggle(e)}
                    >
                      <img
                        src={backArrowIcon}
                        alt=""
                        style={{ width: "1.5em", height: "1.5em" }}
                      />
                    </Button>
                    <div className="ml-4" style={{ lineHeight: "20px" }}>
                      {!isChangePswd
                        ? "Account Information"
                        : "Change your password"}
                    </div>
                  </h2>
                </ListGroupItem>
                {isChangePswd ? (
                  <>
                    <ListGroupItem>
                      <FormGroup className="edCustomerAc-form mb-0" row>
                        <Col md="6">
                          <Label htmlFor="currentPswd">Current password</Label>
                          <Input
                            type="password"
                            value={customerData.currentPswd}
                            name="currentPswd"
                            onChange={(e) => this.handleChangeCust(e)}
                            className="form-control-xs"
                            id="currentPswd"
                          />
                          <div className="pt-2">
                            <Link to="/" className="pb-0">
                              Forgot password?
                            </Link>
                          </div>
                        </Col>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>{/* intentionaly blank*/}</ListGroupItem>
                    <ListGroupItem>
                      <FormGroup className="edCustomerAc-form" row>
                        <Col md="6">
                          <Label htmlFor="newPswd">New password</Label>
                          <Input
                            type="password"
                            value={customerData.newPswd}
                            name="newPswd"
                            onChange={(e) => this.handleChangeCust(e)}
                            className="form-control-xs"
                            id="newPswd"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="edCustomerAc-form" row>
                        <Col md="6">
                          <Label htmlFor="confirmPswd">Confirm password</Label>
                          <Input
                            type="password"
                            value={customerData.confirmPswd}
                            name="confirmPswd"
                            onChange={(e) => this.handleChangeCust(e)}
                            className="form-control-xs"
                            id="confirmPswd"
                          />
                        </Col>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>{/* intentionaly blank*/}</ListGroupItem>
                    <ListGroupItem>
                      <span className="ac-span">
                        Changing your password will log you out of all your
                        active sessions except the one you’re using at this time
                      </span>
                    </ListGroupItem>
                    <ListGroupItem style={{ borderBottom: "0px" }}>
                      <FormGroup className="edCustomerAc-form mb-0">
                        <Button
                          type="button"
                          color="primary"
                          className="ff-RM text-white"
                          onClick={(e) => this.saveChangePassword(e)}
                        >
                          Save
                        </Button>
                      </FormGroup>
                    </ListGroupItem>
                  </>
                ) : (
                  <>
                    <ListGroupItem>
                      <FormGroup className="edCustomerAc-form" row>
                        <Col md="6">
                          <Label htmlFor="firstname">Firstname</Label>
                          <Input
                            type="text"
                            value={customerData.firstname}
                            name="firstname"
                            onChange={(e) => this.handleChangeCust(e)}
                            className="form-control-xs"
                            id="firstname"
                          />
                        </Col>
                        <Col md="6">
                          <Label htmlFor="lastname">Lastname</Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            value={customerData.lastname}
                            name="lastname"
                            onChange={(e) => this.handleChangeCust(e)}
                            id="lastname"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="edCustomerAc-form" row>
                        <Col md="6">
                          <Label htmlFor="mobileNo"> Mobile Number </Label>
                          <div className="d-flex-row">
                            <Input
                              type="text"
                              className="form-control-xs"
                              style={{
                                width: "60px",
                                marginRight: "4px",
                                textAlign: "right",
                              }}
                              disabled
                              defaultValue="+254"
                              id="mobileNoL"
                            />
                            <Input
                              type="number"
                              placeholder="700412127"
                              className="form-control-xs"
                              id="mobileNo"
                              name="mobileNo"
                              value={customerData.mobileNo}
                              onChange={(e) => this.handleChangeCust(e)}
                            />
                          </div>
                        </Col>
                        <Col md="6">
                          <Label htmlFor="otherMobileNo">
                            Other Mobile Number
                            <small className="optional"> (Optional) </small>
                          </Label>
                          <div className="d-flex-row">
                            <Input
                              type="text"
                              className="form-control-xs"
                              style={{
                                width: "60px",
                                marginRight: "4px",
                                textAlign: "right",
                              }}
                              disabled
                              defaultValue="+254"
                              id="otherMobileNoL"
                            />
                            <Input
                              type="number"
                              placeholder="700412127"
                              className="form-control-xs"
                              id="otherMobileNo"
                              name="otherMobileNo"
                              value={customerData.otherMobileNo}
                              onChange={(e) => this.handleChangeCust(e)}
                            />
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup className="edCustomerAc-form">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          id="email"
                          name="email"
                          value={customerData.email}
                          onChange={(e) => this.handleChangeCust(e)}
                        />
                      </FormGroup>
                      <FormGroup className="edCustomerAc-form">
                        <Label htmlFor="deliveryAddress">
                          Delivery Address
                        </Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          placeholder="Street Name / Building / Apartment No. / Floor"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          value={customerData.deliveryAddress}
                          onChange={(e) => this.handleChangeCust(e)}
                        />
                      </FormGroup>
                      <FormGroup className="edCustomerAc-form">
                        <Label htmlFor="deliveryAddress2">
                          Address 2
                          <small className="optional"> (Optional) </small>
                        </Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          id="deliveryAddress2"
                          name="deliveryAddress2"
                          value={customerData.deliveryAddress2}
                          onChange={(e) => this.handleChangeCust(e)}
                        />
                      </FormGroup>
                      <FormGroup className="edCustomerAc-form" row>
                        <Col md="6">
                          <Label htmlFor="stateRegion">State / Region</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="stateRegion"
                            name="stateRegion"
                            onChange={(e) => this.handleChangeCust(e)}
                          >
                            {regions && regions.length > 0 ? (
                              regions.map((r) => (
                                <option value={r.id} key={r.id}>
                                  {r.name}
                                </option>
                              ))
                            ) : (
                              <option value disabled>
                                No records found.
                              </option>
                            )}
                          </Input>
                        </Col>
                        <Col md="6">
                          <Label htmlFor="city"> City </Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="city"
                            name="city"
                            onChange={(e) => this.handleChangeCust(e)}
                          >
                            {cities && cities.length > 0 ? (
                              cities.map((c) => (
                                <option value={c.id} key={c.id}>
                                  {c.name}
                                </option>
                              ))
                            ) : (
                              <option value disabled>
                                No records found.
                              </option>
                            )}
                          </Input>
                        </Col>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem style={{ borderBottom: "0px" }}>
                      <FormGroup className="edCustomerAc-form mb-0">
                        <Button
                          type="button"
                          color="primary"
                          className="ff-RM text-white"
                          onClick={(e) => this.saveAccountInfo(e)}
                        >
                          Save
                        </Button>
                      </FormGroup>
                    </ListGroupItem>
                  </>
                )}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.cities.cities,
  regions: state.regions.regions,
});

const mapDispatchToProps = {
  fetchCities,
  fetchRegions,
  userChangePassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCustomerAccount);
