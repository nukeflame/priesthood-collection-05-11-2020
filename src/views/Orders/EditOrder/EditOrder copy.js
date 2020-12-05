import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Table,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import keGif from "../../../assets/img/ke.gif";

class EditOrder extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="cui-basket-loaded"></i> Edit Order
            </h5>
            <div className="dashb-wrapper mb-1">
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <h5 className="dashb-title">
                        Order # 1234 details <br />
                        <small className="text-muted">
                          Payment via Mpesa. Customer IP: 12.6.7.8
                        </small>
                      </h5>
                      <div className="dashb-wrapper mb-1">
                        <h5>General Details</h5>
                      </div>

                      <FormGroup row>
                        <Col md="6">
                          <FormGroup>
                            <Label className="text-muted">Order Date:</Label>
                            <Input
                              type="text"
                              value="2016-09-19 12:30 pm"
                              className="form-control-xs"
                              disabled
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label className="text-muted">Order Status:</Label>
                            <Input
                              type="text"
                              value="AWAITING FULFILMENT"
                              className="form-control-xs"
                              disabled
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label className="text-muted">Customer:</Label>
                            <Input type="select" className="form-control-xs">
                              <option>John Doe</option>
                              <option>Elizabeth Chieni Doe</option>
                            </Input>
                          </FormGroup>

                          <FormGroup row>
                            {/* <Col md="9">
                              <FormGroup>
                                <Label className="text-muted">
                                  Order Actions:
                                </Label>
                                <Input
                                  type="select"
                                  className="form-control-xs"
                                >
                                  <option>Resend Order Emails</option>
                                  <option>Customer Invoice</option>
                                </Input>
                              </FormGroup>
                            </Col> */}
                            <Col md="9">
                              <InputGroup>
                                <Input
                                  type="email"
                                  id="input2-group2"
                                  name="input2-group2"
                                  placeholder="Email"
                                />
                                <InputGroupAddon addonType="append">
                                  <Button type="button" color="primary">
                                    Submit
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <Label className="text-muted">Order Status:</Label>
                            <Input
                              type="text"
                              value="AWAITING FULFILMENT"
                              className="form-control-xs"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col md="12">
                          <FormGroup>
                            <Label className="text-muted">Customer:</Label>
                            <Input type="select" className="form-control-xs">
                              <option>John Doe</option>
                              <option>Elizabeth Chieni Doe</option>
                            </Input>
                          </FormGroup>
                        </Col> */}
                        <Col md="12">
                          <Table
                            cellSpacing="0"
                            responsive
                            className="tbl-admin"
                          >
                            <tbody>
                              <tr id="order_Row_30">
                                <td colSpan="13">
                                  <div className="collapsible-inner quickview cf">
                                    <section className="qview-view-orders cf">
                                      <h2 className="hide-visually">
                                        Order #100
                                      </h2>
                                      <article className="qview-billing">
                                        <div className="qview-heading">
                                          <h3>Billing </h3>
                                          {/* <button
                                            type="button"
                                            className="btn btn-secondary qview-copy-button"
                                            data-clipboard-alert="qview-billingaddress-100"
                                            data-clipboard-text="ken peters"
                                            title="Copy address to clipboard"
                                          >
                                            <i className="icon icon-copy"></i>
                                            Copy
                                          </button> */}
                                        </div>
                                        <div className="qview-colgroup-wrapper qview-order-details">
                                          <div className="qview-col">
                                            <dl className="dl-horizontal">
                                              <dt>
                                                <span className="hide-visually">
                                                  Customer Details{" "}
                                                </span>
                                              </dt>
                                              <dd>
                                                <div
                                                  id="qview-billingaddress-100"
                                                  className="qview-address"
                                                >
                                                  ken peters
                                                  <br />
                                                  mombasa
                                                  <br />
                                                  mombasa, coast 80001000
                                                  <br />
                                                </div>
                                              </dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  Country{" "}
                                                </span>
                                                <img
                                                  src={keGif}
                                                  alt=""
                                                  align="right"
                                                  className="qview-flag"
                                                  title="Kenya"
                                                />
                                              </dt>
                                              <dd>Kenya</dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  Phone number{" "}
                                                </span>
                                                <i
                                                  className="icon icon-phone medium"
                                                  title="Phone number"
                                                ></i>
                                              </dt>
                                              <dd>+254740271085</dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  Email{" "}
                                                </span>
                                                <i
                                                  className="icon icon-envelope medium"
                                                  title="Email"
                                                ></i>
                                              </dt>
                                              <dd>
                                                <a href="mailto:petersk@gmail.com">
                                                  petersk@gmail.com
                                                </a>
                                              </dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  Date Ordered{" "}
                                                </span>
                                                <i
                                                  className="fa fa-calendar medium"
                                                  title="Date Ordered"
                                                ></i>
                                              </dt>
                                              <dd>24 Apr 2020 08:23:19</dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  IP Address{" "}
                                                </span>
                                                <i
                                                  className="fa fa-ip medium"
                                                  title="IP Address"
                                                ></i>
                                              </dt>
                                              <dd>
                                                <a
                                                  href="http://whatismyipaddress.com/ip/105.58.203.240"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  105.58.203.240
                                                </a>
                                              </dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  Order Source{" "}
                                                </span>
                                                <i
                                                  className="ciconui-basket medium"
                                                  title="Order Source"
                                                ></i>
                                              </dt>
                                              <dd>priesthood (Manual Order)</dd>
                                              <dt>
                                                <span className="hide-visually">
                                                  Payment Method{" "}
                                                </span>
                                                <i
                                                  className="fa fa-credit-card medium"
                                                  title="Payment Method"
                                                ></i>
                                              </dt>
                                              <dd>Mpesa</dd>

                                              <dt>
                                                <span className="hide-visually">
                                                  Tax Provider{" "}
                                                </span>
                                                <img
                                                  className="icon"
                                                  src="./tax-icon.svg"
                                                  alt="Tax Provider"
                                                />
                                              </dt>
                                              <dd>Manual Tax</dd>
                                            </dl>
                                          </div>
                                        </div>
                                      </article>
                                      <section className="qview-shipping-destination cf">
                                        <div className="cf">
                                          <article>
                                            <div className="qview-heading order order-status">
                                              <h3>
                                                {/* <!-- <span className="status order-8"></span> --> */}
                                                Shipping{" "}
                                              </h3>
                                              {/* <button
                                                type="button"
                                                className="btn btn-secondary qview-copy-button"
                                                data-clipboard-alert="qview-shippingaddress-1"
                                                data-clipboard-text="ken peters"
                                                title="Copy address to clipboard"
                                              >
                                                <i className="icon icon-copy"></i>
                                                Copy
                                              </button> */}
                                            </div>
                                            <div className="qview-colgroup-wrapper qview-order-details">
                                              <div className="qview-col">
                                                <dl className="dl-horizontal">
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Customer Details
                                                    </span>
                                                  </dt>
                                                  <dd>
                                                    <div
                                                      id="qview-shippingaddress-1"
                                                      className="qview-address"
                                                    >
                                                      ken peters
                                                      <br />
                                                      mombasa
                                                      <br />
                                                      mombasa, coast 80001000
                                                      <br />
                                                    </div>
                                                  </dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Country
                                                    </span>
                                                    <img
                                                      src="./ke.gif"
                                                      align="right"
                                                      className="qview-flag"
                                                      alt=""
                                                    />
                                                  </dt>
                                                  <dd>Kenya</dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Phone number
                                                    </span>
                                                    <i
                                                      className="icon icon-phone medium"
                                                      title="Phone number"
                                                    ></i>
                                                  </dt>
                                                  <dd>N/A </dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Email
                                                    </span>
                                                    <i
                                                      className="icon icon-envelope medium"
                                                      title="Email"
                                                    ></i>
                                                  </dt>
                                                  <dd>
                                                    <a href="mailto:petersk@gmail.com">
                                                      petersk@gmail.com
                                                    </a>
                                                  </dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Shipping Zone{" "}
                                                    </span>
                                                    <i
                                                      className="icon icon-globe medium"
                                                      title="Shipping Zone"
                                                    ></i>
                                                  </dt>
                                                  <dd>
                                                    <a href="https://priesthood.mybigcommerce.com/manage/settings/shipping/zone/1">
                                                      Kenya
                                                    </a>
                                                  </dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Shipping method
                                                    </span>
                                                    <i
                                                      className="icon icon-truck medium"
                                                      title="Shipping method"
                                                    ></i>
                                                  </dt>
                                                  <dd>No Shipping Method </dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Shipping Price
                                                    </span>
                                                    <i
                                                      className="icon icon-dollar medium"
                                                      title="Shipping Price"
                                                    ></i>
                                                  </dt>
                                                  <dd>KES0.00</dd>
                                                  <dt>
                                                    <span className="hide-visually">
                                                      Shipping Date
                                                    </span>
                                                    <i
                                                      className="icon icon-date medium"
                                                      title="Shipping Date"
                                                    ></i>
                                                  </dt>
                                                  <dd>24th Apr 2020</dd>
                                                </dl>
                                              </div>
                                            </div>
                                          </article>

                                          <article className="qview-order-items">
                                            <h3 className="qview-heading">
                                              Order <strong>1 item</strong>
                                            </h3>
                                            <div className="qview-colgroup-wrapper qview-order-details">
                                              <div className="shipment-status cf">
                                                <dl></dl>
                                              </div>
                                              <div className="qview-col">
                                                <dl className="qview-product">
                                                  <dt className="hide-visually">
                                                    Product Quantity x Product
                                                    Name{" "}
                                                  </dt>
                                                  <dd className="qview-product-name">
                                                    <span className="note">
                                                      1 x{" "}
                                                    </span>
                                                    Product a
                                                  </dd>
                                                  <dt className="hide-visually">
                                                    Product Total
                                                  </dt>
                                                  <dd className="qview-product-total">
                                                    KES3.00
                                                  </dd>
                                                  <dt className="hide-visually">
                                                    Product Sku{" "}
                                                  </dt>
                                                  <dd>
                                                    <span className="note">
                                                      uor
                                                    </span>
                                                  </dd>
                                                </dl>
                                              </div>
                                            </div>
                                            <div className="qview-colgroup-wrapper qview-create-shipment">
                                              <div className="qview-col">
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary create-shipment-trigger shipTrigger"
                                                  data-prompt="order_details_ship_button"
                                                  data-source="manual"
                                                  data-order-id="100"
                                                  data-address-id="1"
                                                >
                                                  <i className="icon icon-truck"></i>
                                                  Ship Items
                                                </button>
                                              </div>
                                            </div>
                                            <div className="qview-order-total">
                                              <h3 className="qview-heading">
                                                <span className="hide-visually">
                                                  Order Summary
                                                </span>
                                              </h3>
                                              <dl className="cf">
                                                <dt>Subtotal</dt>
                                                <dd>KES3.00</dd>
                                                <dt>Shipping</dt>
                                                <dd>KES0.00</dd>
                                                <dt className="grand-total">
                                                  Grand Total
                                                </dt>
                                                <dd className="grand-total">
                                                  KES3.00
                                                </dd>
                                              </dl>
                                            </div>
                                          </article>
                                        </div>
                                      </section>
                                    </section>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
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

export default EditOrder;
