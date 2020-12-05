import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Col, Row, Button } from "reactstrap";
import BoxPanel from "./BoxPanel";
import { findOrder } from "../../../../redux/actions/orderAction";
import queryString from "query-string";

class ProductStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toMyOrders = (e) => {
    e.preventDefault();
    const { order } = this.props;
    this.props.history.push(
      "/account/customer?" +
        queryString.stringify({ order: order.orderNo, tab: "my_orders" })
    );
  };

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);

    //fetch order
    const search = this.props.location.search;
    if (search) {
      const params = queryString.parse(search);
      if (params.status) {
        this.props.findOrder(params.status);
      }
    }
  }

  render() {
    const { order } = this.props;

    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container">
          <div className="homepage-breadcrumb">
            <Link to="/home" className="bread-link bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">Product Status</span>
          </div>
          <h2 className="fs-14" style={{ color: "#000" }}>
            <i className="icon-check"></i>
            <span> Payment Status:</span>{" "}
            <span className="text-success">
              {order && order.status ? order.status.name : "--"}
            </span>
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <Col md="6">
              <div
                className="card text-white dark-red mt-3"
                // style={{ width: "550px" }}
              >
                <div className="card-body">
                  <p className="white-text text-justify m-0 fs-15">
                    {order
                      ? order.billing.errDesc
                        ? order.billing.errDesc
                        : "--"
                      : null}
                    {/* Your provider has indicated that there are insufficient
                    funds on the account to complete the transaction. We
                    recommend that you try again, or use a different payment
                    method. */}
                  </p>
                </div>
              </div>
              <Row>
                <Col md="6">
                  <div className="pb-3">
                    <Button
                      type="button"
                      className="btn-square"
                      color="primary"
                      block
                      onClick={(e) => this.toMyOrders(e)}
                    >
                      <span className="ff-RM text-white">
                        <i className="fa fa-cart-arrow-down"></i> View Order
                      </span>
                    </Button>
                  </div>
                </Col>
                <Col md="6">
                  <div className="pb-3">
                    <Button
                      type="button"
                      className="btn-square"
                      color="warning"
                      block
                    >
                      <i className="fa fa-money"></i> Pay now
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md="12">
              <section className="sec-product">
                <BoxPanel
                  key={"post.id"}
                  {...this.props}
                  // post={post}
                  // toOfferList={(e, p) => this.toOfferList(e, p)}
                />
              </section>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.orders.latestOrder,
});

const mapDispatchToProps = {
  findOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductStatus);
