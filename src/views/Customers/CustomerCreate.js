import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import loaderSm from "../../assets/loader/sharp-sm.svg";
import classNames from "classnames";
import { fetchCities } from "../../redux/actions/cityAction";
import { fetchRegions } from "../../redux/actions/regionAction";
import { createCustomer } from "../../redux/actions/customerAction";
import { toast } from "react-toastify";

class CustomerCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPswdEye: false,
      customerData: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        mobileNo: "",
        otherMobileNo: "",
        deliveryAddress: "",
        stateRegion: "",
        city: "",
        hasNews: true,
        accessPortal: false,
      },
      createCustomerLoad: false,
    };
  }

  handleCustomerChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      customerData: {
        ...prevState.customerData,
        [name]: value,
      },
    }));
  };

  handleSaveCustomer = (e) => {
    e.preventDefault();
    const { customerData } = this.state;
    this.props.createCustomer(customerData).then(() => {
      toast(
        <div>
          <i className="fa fa-check"></i> Customer saved successfully!
        </div>,
        {
          className: "text-only text-dark",
          autoClose: 4000,
          position: "bottom-left",
        }
      );
    });
  };

  showPswd = () => {
    const { showPswdEye } = this.state;
    this.setState({ showPswdEye: !showPswdEye });
  };

  handleCustomerCheck = (e) => {
    const { name, checked } = e.target;
    this.setState((prevState) => ({
      customerData: {
        ...prevState.customerData,
        [name]: checked,
      },
    }));
  };

  componentDidMount() {
    this.props.fetchCities();
    this.props.fetchRegions();
  }

  render() {
    const { customerData, showPswdEye } = this.state;
    const { cities, regions, createCustomerLoad, customerErrors } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <h5 className="dashb-title">
              <i className="cui-people"></i> Add Customer
            </h5>
            <div className="dashb-wrapper mb-0">
              <Row>
                <Col md={12}>
                  <p>Create a brand new customer and add them to this site.</p>
                  <div
                    id="setting-error-settings_updated"
                    className="notice notice-success settings-error is-dismissible hidden"
                  >
                    <p>
                      <strong>Settings saved.</strong>
                    </p>
                    <button type="button" className="notice-dismiss">
                      <span className="screen-reader-text">
                        Dismiss this notice.
                      </span>
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="dashb-cards mt-2">
              <Row>
                <Col md={8}>
                  <Card>
                    <CardBody>
                      <FormGroup row>
                        <Col md={6}>
                          <Label htmlFor="firstname">Firstname</Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            placeholder="Jane"
                            id="firstname"
                            name="firstname"
                            value={customerData.firstname}
                            onChange={this.handleCustomerChange}
                          />
                          {customerErrors.firstname &&
                          customerErrors.firstname.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.firstname}
                            </span>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label htmlFor="lastname">Lastname</Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            placeholder="Doe"
                            id="lastname"
                            name="lastname"
                            value={customerData.lastname}
                            onChange={this.handleCustomerChange}
                          />
                          {customerErrors.lastname &&
                          customerErrors.lastname.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.lastname}
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={6}>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            type="email"
                            className="form-control-xs"
                            placeholder="Your Email"
                            id="email"
                            name="email"
                            value={customerData.email}
                            onChange={this.handleCustomerChange}
                          />
                          {customerErrors.email &&
                          customerErrors.email.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.email}
                            </span>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label htmlFor="password">Password</Label>
                          <InputGroup>
                            <Input
                              type={showPswdEye ? "text" : "password"}
                              id="password"
                              placeholder="Type Password"
                              className="form-control-xs"
                              name="password"
                              value={customerData.password}
                              onChange={this.handleCustomerChange}
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                type="button"
                                color="secondary"
                                outline
                                onClick={this.showPswd}
                              >
                                <i
                                  className={
                                    "fa fa-eye-slash " +
                                    classNames({
                                      "icon-eye": showPswdEye,
                                    })
                                  }
                                ></i>
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                          {customerErrors.password &&
                          customerErrors.password.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.password}
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={6}>
                          <Label htmlFor="mobileNo">Mobile Number</Label>
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
                              onChange={this.handleCustomerChange}
                            />
                          </div>
                          {customerErrors.mobileNo &&
                          customerErrors.mobileNo.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.mobileNo}
                            </span>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label htmlFor="otherMobileNo">
                            Other Mobile Number
                            <small className="optional">(Optional)</small>
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
                              onChange={this.handleCustomerChange}
                            />
                          </div>
                          {customerErrors.otherMobileNo &&
                          customerErrors.otherMobileNo.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.otherMobileNo}
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={12}>
                          <Label htmlFor="deliveryAddress">
                            Delivery Address
                          </Label>
                          <Input
                            type="textarea"
                            className="form-control-xs"
                            placeholder="Street Name / Building / Apartment No. / Floor"
                            id="deliveryAddress"
                            name="deliveryAddress"
                            value={customerData.deliveryAddress}
                            onChange={this.handleCustomerChange}
                          />
                          {customerErrors.deliveryAddress &&
                          customerErrors.deliveryAddress.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.deliveryAddress}
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={6}>
                          <Label htmlFor="stateRegion">State/Region</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="stateRegion"
                            name="stateRegion"
                            onChange={this.handleCustomerChange}
                            defaultValue={1}
                          >
                            <option value disabled>
                              -- Select region --
                            </option>
                            {regions && regions.length > 0 ? (
                              regions.map((r) => (
                                <option value={r.id} key={r.id}>
                                  {r.name}
                                </option>
                              ))
                            ) : (
                              <option value> Records not found.</option>
                            )}
                          </Input>
                          {customerErrors.stateRegion &&
                          customerErrors.stateRegion.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.stateRegion}
                            </span>
                          ) : null}
                        </Col>
                        <Col md={6}>
                          <Label htmlFor="city">City</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="city"
                            name="city"
                            onChange={this.handleCustomerChange}
                            defaultValue={1}
                          >
                            <option value disabled>
                              -- Select city --
                            </option>
                            {cities && cities.length > 0 ? (
                              cities.map((c) => (
                                <option value={c.id} key={c.id}>
                                  {c.name}
                                </option>
                              ))
                            ) : (
                              <option value> Records not found.</option>
                            )}
                          </Input>
                          {customerErrors.city &&
                          customerErrors.city.length > 0 ? (
                            <span
                              className="text-danger animated fadeIn"
                              id="help-txt-username"
                            >
                              {customerErrors.city}
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={6}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="accessPortal"
                              name="accessPortal"
                              value={customerData.accessPortal}
                              checked={customerData.accessPortal ? true : false}
                              onChange={this.handleCustomerCheck}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="accessPortal"
                            >
                              Can Access Portal
                            </label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="hasNews"
                              name="hasNews"
                              checked={customerData.hasNews ? true : false}
                              value={customerData.hasNews}
                              onChange={this.handleCustomerCheck}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="hasNews"
                            >
                              Has News
                            </label>
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mb-0">
                        <Col md={3}>
                          <Button
                            type="button"
                            className="mt-2 mb-0"
                            color="dark"
                            onClick={(e) => this.handleSaveCustomer(e)}
                          >
                            {createCustomerLoad ? (
                              <span>
                                Processing <img src={loaderSm} alt="" />
                              </span>
                            ) : (
                              <span>
                                Save Customer <i className="fa fa-plus"></i>
                              </span>
                            )}
                          </Button>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
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
  customerErrors: state.customers.customerErrors,
  createCustomerLoad: state.customers.createCustomerLoad,
});

const mapDispatchToProps = { fetchCities, fetchRegions, createCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreate);
