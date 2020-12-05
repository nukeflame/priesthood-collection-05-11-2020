import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, ListGroupItem, Card, CardBody, Row, Col } from "reactstrap";
import backArrowIcon from "../../../../assets/icons/back-arrow-icon.svg";
import { isEmpty } from "lodash";
import queryString from "query-string";
import { findOrder } from "../../../../redux/actions/orderAction";
import { connect } from "react-redux";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import moment from "moment";
import { Link } from "react-router-dom";

class OrderDetails extends Component {
  static propTypes = {
    checkOrderToggle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      orderInfo: "",
    };
  }

  parseDate = (t) => {
    return moment(t).format("DD-MM-YYYY hh:mm:s a");
  };

  componentDidMount() {
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      if (params.order) {
        this.props.findOrder(params.order);
      }
    }
  }

  render() {
    const { checkOrderToggle, order } = this.props;

    return (
      <React.Fragment>
        <ListGroupItem>
          <h2 className="ac-heading">
            <Button
              type="button"
              color="link"
              className="accBack-btn"
              onClick={(e) => checkOrderToggle(e)}
            >
              <img
                src={backArrowIcon}
                alt=""
                style={{ width: "1.5em", height: "1.5em" }}
              />
            </Button>
            <div className="ml-4" style={{ lineHeight: "20px" }}>
              Order Details
            </div>
          </h2>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col md="4">
              <span className="ff-RM">DELIVERY INFORMATION}</span>
              <div>
                <span className="ac-span">
                  {/* {JSON.stringify(order.shipping && order.address)} */}
                  Delivery Method :-{" "}
                  {order.shipping &&
                  order.shipping.shippingMethod === "homeDelivery"
                    ? "Home Delivery"
                    : "Pick up Delivery"}{" "}
                  <br />
                  Delivery Address :-
                  <br />
                  <span>
                    {order.shipping &&
                    order.shipping.shippingMethod === "homeDelivery"
                      ? order.address && order.address.delivery_address
                      : order.pickups && order.pickups.address}{" "}
                    {/* Kennedy Peters <br />
                    254740271085 <br />
                    Changamwe,Mombasa Changamwe elshadai KiliShhop,Chaani
                    Mombasa Chaani chiefs Office Mlolongo Road Seaview near
                    Kipevu Primary School, Cellphone: 254706644261
                    <br />
                    Changamwe, Mombasa */}
                  </span>
                  {/* {JSON.stringify(order.address.firstname)} */}
                </span>
              </div>
            </Col>
            <Col md="4">
              <span className="ff-RM">Order No. {order.orderNo}</span>
              <div>
                <span className="ac-span">
                  {order.items && order.items.length > 0
                    ? order.items.length > 1
                      ? order.items.length + " Items"
                      : order.items.length + " Item"
                    : null}{" "}
                  <br />
                  Placed on {this.parseDate(order.createdAt)}
                  <br />
                  Total:{" "}
                  <span className="ff-RM text-primary">
                    KSh {formatMoney(order.total)}
                  </span>
                  <br />
                  <p className="article-status fs-13 text-dark pt-1">
                    ORDER CANCELLED - PAYMENT UNSUCCESSFUL
                  </p>
                </span>
              </div>
            </Col>
            <Col md="4">
              <span className="ff-RM">PAYMENT INFORMATION</span>
              <div>
                <span className="ac-span">
                  Payment Method - M-PESA <br />
                  Payment - Online Payment{" "}
                  <span className="text-warning">(Unpaid)</span> <br />
                  <br />
                  Goods Amount: KSh 11,599 <br />
                  Shipping Fee: KSh 400 <br />
                  Goods Discount: -KSh 100 <br />
                  Grand Total: KSh {formatMoney(order.total)}
                </span>
              </div>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem style={{ borderBottom: "0px" }}>
          <span className="text-uppercase">Order Items</span>
          <div>
            {order.items && order.items.length > 0
              ? order.items.map((i) => (
                  <Card className="article-order" key={i.id}>
                    <CardBody>
                      <div className="article-box">
                        <img
                          src={imageUrl() + "/images/" + i.ProductThumb}
                          className="article-image"
                          width="104"
                          height="104"
                          alt={"dd"}
                        />
                        <div className="article-title">
                          <h2>{i.ProductName}</h2>
                          <p className="article-par">Quantity: {i.Quantity}</p>
                          <p className="article-status fs-13">
                            KSh {formatMoney(i.Price)}
                          </p>
                        </div>
                        <Link
                          to={`/account/customer?${queryString.stringify({
                            tab: "my_orders",
                            order: order.orderNo,
                            package_history: true,
                          })}`}
                          className="article-more"
                        >
                          See Package Status
                        </Link>
                        {/* <div>
                          <Button type="button" color="dark" size="sm">
                            Buy Again
                          </Button>
                        </div> */}
                      </div>
                    </CardBody>
                  </Card>
                ))
              : null}{" "}
          </div>
        </ListGroupItem>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.orders.latestOrder,
  orderLoading: state.orders.findOrderLoading,
});

const mapDispatchToProps = {
  findOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
