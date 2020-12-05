import React, { Component } from "react";
import { Row, Col, Form, Button, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartProduct from "./CartProduct";
import { destroyCartlist } from "../../../../redux/actions/cartlistAction";
import {
  fetchCartlist,
  updateCartlist,
} from "../../../../redux/actions/cartlistAction";
import { fetchShipping } from "../../../../redux/actions/shippingAction";
import { formatMoney } from "../../../../config/helpers";
import { isNull } from "lodash";
// import loaderBg from "../../../../assets/loader/ajax-loader.gif";

class CartList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CartSubtotal: "",
      Total: "",
      couponCode: "",
      cartData: {
        SKU: "",
        Quantity: "",
        Price: "",
        DiscountRate: "",
        DiscountValue: "",
        Subtotal: "",
      },
    };
  }

  toCheckoutAddress = (e) => {
    e.preventDefault();
    const { cart, shipping } = this.props;
    if (cart.length > 0) {
      const data = {
        id: shipping.id,
        subTotal: shipping.subtotalAmount,
        total: shipping.totalAmount,
        shippingAmount: shipping.shippingAmount,
      };
      localStorage.setItem("checkData", JSON.stringify(JSON.stringify(data)));
      this.props.history.push("/checkout-address");
    }
  };

  toShoppingCatalog = (e) => {
    e.preventDefault();
    this.props.history.push("/shop-catalog");
  };

  deleteProduct = (e, p) => {
    e.preventDefault();
    this.props.destroyCartlist(p);
  };

  handleSubTotal = (s) => {
    const data = {
      SubTotal: s.SubTotal,
      Quantity: s.qty,
      cartId: s.pId,
    };
    this.props.updateCartlist(data);
  };

  handleCouponChange = (e) => {
    const { value } = e.target;
    this.setState({ couponCode: value });
  };

  handleCoupon = () => {
    // const { couponCode } = this.state;
  };

  componentDidMount() {
    // init methods
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.fetchCartlist();
      this.props.fetchShipping();
    }
  }

  render() {
    const { cartData, couponCode } = this.state;
    const { cart, shipping } = this.props;

    return (
      <div className="cartlist animated fadeIn">
        <div className="container">
          <div className="bread-crumb flex-w p-l-10 p-r-15 p-lr-0-lg">
            <Link to="/home" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i
                className="fa fa-angle-right m-l-9 m-r-10"
                aria-hidden="true"
              ></i>
            </Link>
            <Link to="/shop-catalog" className="stext-109 cl8 hov-cl1 trans-04">
              Shoping Catalog
              <i
                className="fa fa-angle-right m-l-9 m-r-10"
                aria-hidden="true"
              ></i>
            </Link>
            <span className="stext-109 cl4">Cart</span>
          </div>
          <h2>
            Cart <span className="small">({cart && cart.length} items)</span>
          </h2>
          <div>
            <Form>
              <Row>
                <Col md="9">
                  <div className="wrap-table-shopping-cart">
                    <table className="table-shopping-cart">
                      <thead>
                        <tr className="table_head">
                          <th className="column-1">Product</th>
                          <th className="column-2"></th>
                          <th className="column-3">Price</th>
                          <th className="column-4">Quantity</th>
                          <th className="column-5">Total</th>
                          <th className="column-6"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart && cart.length > 0 ? (
                          cart.map((c, i) => (
                            <CartProduct
                              key={i}
                              product={c}
                              cartData={cartData}
                              deleteProduct={(e, p) => this.deleteProduct(e, p)}
                              handleSubTotal={(s) => this.handleSubTotal(s)}
                              handleQuantityChanged={(e) =>
                                this.handleQuantityChanged(e)
                              }
                            />
                          ))
                        ) : (
                          <tr className="col-relative">
                            <td className="col-center">
                              Oops! Your shopping cart is empty.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Col>
                <Col md="3">
                  <div className="right-checkout">
                    <ul>
                      <li>
                        <span className="left">Subtotal</span>
                        <span className="right">
                          KSH{" "}
                          {cart && cart.length > 0
                            ? formatMoney(shipping.subtotalAmount)
                            : "0.00"}
                        </span>
                      </li>
                      <li>
                        <span className="left">Shipping</span>
                        <span className="right fs-12">Not include yet</span>
                      </li>
                      <li>
                        <span className="left">Discount</span>
                        <span className="right">0%</span>
                      </li>
                      <li className="last">
                        <span className="left">Total</span>
                        <span className="right">
                          KSH{" "}
                          {cart && cart.length > 0
                            ? formatMoney(shipping.totalAmount)
                            : "0.00"}
                        </span>
                      </li>
                    </ul>
                    <div>
                      <FormGroup className="flex">
                        <Input
                          type="text"
                          placeholder="Enter your coupon code"
                          className="form-control-xs"
                          value={couponCode}
                          name="couponCode"
                          onChange={(e) => this.handleCouponChange(e)}
                        />
                        <Button
                          size="sm"
                          color="secondary"
                          className="mb-3 text-uppercase"
                          disabled={cart && cart.length > 0 ? false : true}
                          onClick={this.handleCoupon}
                        >
                          Apply
                        </Button>
                      </FormGroup>
                    </div>
                    <div className="pb-3">
                      <Row>
                        <Col col="12">
                          <Button
                            type="button"
                            onClick={this.toCheckoutAddress}
                            block
                            color="dark"
                            className="mb-2 btn-square text-uppercase"
                            disabled={cart && cart.length > 0 ? false : true}
                          >
                            Checkout
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="12">
                          <Button
                            block
                            color="dark"
                            disabled={cart && cart.length > 0 ? false : true}
                            className="text-uppercase"
                            onClick={this.toShoppingCatalog}
                          >
                            Continue Shopping
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        {/* actions */}
        <section className="shop-services section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-rocket"></i>
                  <h4>Free shiping</h4>
                  <p>Orders over $100</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-reload"></i>
                  <h4>Free Return</h4>
                  <p>Within 30 days returns</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-lock"></i>
                  <h4>Sucure Payment</h4>
                  <p>100% secure payment</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-service">
                  <i className="ti-tag"></i>
                  <h4>Best Price</h4>
                  <p>Guaranteed price</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cartlist.cartlist,
  shipping: state.shipping.shipping,
  authUser: state.users.auth,
});

const mapDispatchToProps = {
  fetchCartlist,
  destroyCartlist,
  fetchShipping,
  updateCartlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
