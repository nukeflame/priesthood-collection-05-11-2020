import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import loaderSm from "../../assets/loader/sharp-sm.svg";
import classNames from "classnames";
import {
  findCustomer,
  updateCustomer,
} from "../../redux/actions/customerAction";
import { isNull } from "lodash";
import { toast } from "react-toastify";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPswdEye: false,
      customerData: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        mobileNo: "",
        otherMobileNo: "",
        deliveryAddress: "",
        stateRegion: "",
        city: "",
        hasNews: false,
        accessPortal: false,
        addressId: "",
      },
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

  handleCustomerCheck = (e) => {
    const { name, checked } = e.target;
    this.setState((prevState) => ({
      customerData: {
        ...prevState.customerData,
        [name]: checked,
      },
    }));
  };

  showPswd = () => {
    const { showPswdEye } = this.state;
    this.setState({ showPswdEye: !showPswdEye });
  };

  handleUpdateCustomer = (e) => {
    e.preventDefault();
    const { customerData } = this.state;
    this.props.updateCustomer(customerData).then(() => {
      toast(
        <div>
          <i className="fa fa-check"></i> Customer update successfully!
        </div>,
        {
          className: "text-only text-dark",
          autoClose: 4000,
          position: "bottom-left",
        }
      );
      this.props.history.push("/customers");
    });
  };

  componentDidMount() {
    this.props.findCustomer(this.props.match.params.id).then(() => {
      const { customer } = this.props;
      const mbNo = customer.mobileNo ? Number(customer.mobileNo.slice(4)) : "";
      const otherMbNo = customer.otherMobileNo
        ? Number(customer.otherMobileNo.slice(4))
        : "";

      this.setState((prevState) => ({
        customerData: {
          ...prevState.customerData,
          id: customer.id,
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email,
          mobileNo: mbNo,
          otherMobileNo: otherMbNo,
          deliveryAddress: customer.deliveryAddress,
          city: !isNull(customer.city) ? customer.city.id.toString() : null,
          stateRegion: !isNull(customer.region)
            ? customer.region.id.toString()
            : null,
          hasNews: customer.hasNews,
          accessPortal: customer.accessPortal,
          addressId: customer.addressId,
        },
      }));
    });
  }

  render() {
    const { customerData, showPswdEye } = this.state;
    const { updateCustomerLoad, customerErrors } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <h5 className="dashb-title">
              <i className="cui-people"></i> Edit Customer
            </h5>
            <div className="dashb-wrapper mb-0">
              <Row>
                <Col md={8}>
                  <p>Edit customer information and orders.</p>
                </Col>
              </Row>
            </div>
            <div className="dashb-cards mt-2">
              <Row>
                <Col md={8}>
                  <Card>
                    <CardBody>
                      <h5 className="ff-RM">Personal Details</h5>
                      <FormGroup row>
                        <Col md="6">
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
                        <Col md="6">
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
                        <Col md="6">
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
                        <Col md="6">
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
                        <Col md="6">
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
                        <Col md="6">
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
                      <h5 className="ff-RM">Address Details</h5>
                      <FormGroup row>
                        <Col md="12">
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
                        <Col md="6">
                          <Label htmlFor="stateRegion">State/Region</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="stateRegion"
                            name="stateRegion"
                            onChange={this.handleCustomerChange}
                          >
                            <option value="1">Nairobi</option>
                            <option value="2">Mombasa</option>
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
                        <Col md="6">
                          <Label htmlFor="city">City</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="city"
                            name="city"
                            onChange={this.handleCustomerChange}
                          >
                            <option value="1">Nairobi</option>
                            <option value="2">Mombasa</option>
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
                            onClick={(e) => this.handleUpdateCustomer(e)}
                          >
                            {updateCustomerLoad ? (
                              <span>
                                Processing <img src={loaderSm} alt="" />
                              </span>
                            ) : (
                              <span>
                                Update Customer <i className="fa fa-check"></i>
                              </span>
                            )}
                          </Button>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={4} className="hidden">
                  <Card className="mb-2">
                    <CardBody>
                      <h5 className="ff-RM">History</h5>
                      <Row>
                        <Col md={6}>
                          <p>First seen</p>
                          <p>First seen</p>
                        </Col>
                        <Col md={6}>
                          <p>First seen</p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Card className="card-accent-primary">
                    <CardHeader>Card with accent</CardHeader>
                    <CardBody>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis
                      nisl ut aliquip ex ea commodo consequat.
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
  customer: state.customers.findCustomer,
  cities: state.cities.cities,
  regions: state.regions.regions,
  customerErrors: state.customers.customerErrors,
  updateCustomerLoad: state.customers.updateCustomerLoad,
});

const mapDispatchToProps = { findCustomer, updateCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
