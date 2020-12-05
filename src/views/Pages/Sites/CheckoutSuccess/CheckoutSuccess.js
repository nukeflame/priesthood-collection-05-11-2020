import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardHeader, Button } from "reactstrap";
import { findAuthOrder } from "../../../../redux/actions/orderAction";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import $ from "jquery";

export class CheckoutSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goToOrders = () => {
    this.props.history.push("/account/customer?tab=my_orders");
  };

  parseMedia = (m) => {
    const media = JSON.parse(m);
    return media[0];
  };

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    //success order
    this.props.findAuthOrder();
  }

  render() {
    const { latestOrder } = this.props;
    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container">
          <div className="homepage-breadcrumb">
            <Link to="/homepage" className="bread-link bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link">
              Shoping Catalog
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">Checkout Success</span>
          </div>
          <h2 style={{ color: "#31c50dde" }}>
            Your Order has been received!, Thank you for your purchase!
          </h2>
        </div>
        <div className="container">
          <Row>
            <Col md="8">
              <div className="order-box">
                <h4 className="head-title">
                  Order No.{" "}
                  <span className="ff-RM">
                    {latestOrder && latestOrder.orderNo}
                  </span>
                </h4>
              </div>
              <div className="pt-4">
                <h4 className="header-title text-uppercase">Next steps</h4>
                <Card>
                  <CardBody>
                    <div>
                      <h4 className="ff-RM">1. Confirmation</h4>
                      <p className="fs-14 text-dark">
                        Congratulations! Your order was successfully submitted.
                        A confirmation Email has just been sent to you and our
                        customer service will contact you shortly to verify
                        order.
                      </p>
                    </div>
                    <div>
                      <h4 className="ff-RM">2. Shipping</h4>
                      <p className="fs-14 text-dark">
                        You order will be prepared for shipment once it is
                        confirmed. You will receive shipping updates soon.
                      </p>
                    </div>
                    <div>
                      <h4 className="ff-RM">2. My Account</h4>
                      <p className="fs-14 text-dark">
                        You can follow the status of your order clicking on "My
                        orders" in your account page
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="pt-2">
                <h4 className="header-title text-uppercase">
                  Track your order
                </h4>
                <Card>
                  <CardBody>
                    <div>
                      <p className="fs-14 text-dark mb-0">
                        You can track your order in :-
                      </p>
                      <p className="fs-14 text-dark mt-0 text-center">
                        <span className="ff-RM">
                          My Account <i className="fa fa-angle-right"></i>{" "}
                          Orders
                        </span>
                      </p>
                      <Button
                        type="button"
                        block
                        color="dark"
                        className="text-uppercase"
                        onClick={this.goToOrders}
                      >
                        Go to orders
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col md="4">
              <h4 className="header-title">Order Summary</h4>
              <Card className="right-card">
                <CardHeader className="py-2">
                  <span className="ff-RM fs-13">
                    Your Order{" "}
                    <span>
                      ({latestOrder && latestOrder.items.length} items)
                    </span>
                  </span>
                </CardHeader>
                <CardBody className="m-1">
                  <div className="order-list">
                    <div className="order-flow" style={{ maxHeight: "40vh" }}>
                      <ul className="shopping-list">
                        {latestOrder && latestOrder.items.length > 0
                          ? latestOrder.items.map((c) => (
                              <li key={c.id}>
                                <span className="price" style={{ left: "0px" }}>
                                  Ksh {formatMoney(c.TotalPrice)}
                                </span>
                                <a
                                  href={ imageUrl() + "/images/" + c.ProductThumb}
                                  className="cart-img"
                                >
                                  <div className="cart-box-imag">
                                    <img
                                      src={imageUrl() + "/images/" + c.ProductThumb}
                                      alt={c.ProductName}
                                    />
                                  </div>
                                </a>
                                <h4>
                                  <span>{c.ProductName}</span>
                                </h4>
                                <p className="quantity">
                                  {c.Quantity}x -{" "}
                                  <span className="amount">
                                    Ksh{formatMoney(c.Price)}
                                  </span>
                                </p>
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                    <div className="bottom">
                      <div className="right-checkout">
                        <ul>
                          <li>
                            <span className="left">Subtotal</span>
                            <span className="right">
                              Ksh{" "}
                              {formatMoney(
                                latestOrder &&
                                  latestOrder.shipping.subtotalAmount
                              )}
                            </span>
                          </li>
                          <li>
                            <span className="left">VAT</span>
                            <span className="right">
                              Ksh{" "}
                              {formatMoney(
                                latestOrder && latestOrder.billing.vat
                              )}
                            </span>
                          </li>
                          <li>
                            <span className="left">Shipping Amount</span>
                            <span className="right">
                              {latestOrder &&
                              latestOrder.shipping.shippingAmount
                                ? formatMoney(
                                    latestOrder.shipping.shippingAmount
                                  )
                                : "N/A"}
                            </span>
                          </li>
                          <li className="last">
                            <span className="left">Total</span>
                            <span className="right">
                              Ksh{" "}
                              {formatMoney(
                                latestOrder && latestOrder.shipping.totalAmount
                              )}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  latestOrder: state.orders.latestOrder,
});

const mapDispatchToProps = { findAuthOrder };

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccess);
