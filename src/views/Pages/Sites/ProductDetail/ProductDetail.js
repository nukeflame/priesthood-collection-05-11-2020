import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  ButtonDropdown,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";
import iconHeart from "../../../../assets/img/icons/icon-heart-01.png";
import chatListSvg from "../../../../assets/img/icons/chat.list.svg";
import classNames from "classnames";
import { Link } from "react-router-dom";
import $ from "jquery";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import { isEmpty, isNull } from "lodash";
import queryString from "query-string";
import {
  findProduct,
  setCartProduct,
} from "../../../../redux/actions/productAction";
import { toast } from "react-toastify";
import {
  createCartlist,
  fetchCartlist,
} from "../../../../redux/actions/cartlistAction";
import { fetchShipping } from "../../../../redux/actions/shippingAction";
import moment from "moment";

export class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetails: "",
      selectMedia: "",
      selectMediaId: "",
      dropdownOpen: false,
      activeTab: new Array(4).fill("1"),
      quantity: 1,
      qtyList: 20,
    };
  }

  formatHtml = (data) => {
    return { __html: data };
  };

  toggleDropdown() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  toggleTabs(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  handleChangeMedia = (e, t) => {
    e.preventDefault();
    this.setState({ selectMedia: t, selectMediaId: t.id });
  };
  initMethods = () => {
    let _thisSortList = $(".prd-detailsTab .sortby-list");
    let htmBody = $("html,body");
    $(_thisSortList).on("click", (e) => {
      $(_thisSortList).removeClass("active");
      if (e.currentTarget.className === "sortby-list btn-desc") {
        $(_thisSortList[0]).addClass("active");
        $(htmBody).animate(
          {
            scrollTop:
              $("div#productSpecifications").offset().top - parseInt(137.5),
          },
          "slow"
        );

        console.log($("div#productSpecifications").offset().top);
      }
      if (e.currentTarget.className === "sortby-list btn-spec") {
        $(_thisSortList[1]).addClass("active");
        $(htmBody).animate(
          {
            scrollTop:
              $("div#productSpecifications").offset().top - parseInt(75.5),
          },
          "slow"
        );
      }
      if (e.currentTarget.className === "sortby-list btn-delv") {
        $(_thisSortList[2]).addClass("active");
        $(htmBody).animate(
          {
            scrollTop: $("div#productSpecifications").offset().top,
          },
          "slow"
        );
      }
    });
  };

  addToCartItem = (e, p) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.createCartlist(p);
      this.props.history.push("/cart");
    } else {
      //to local storage
      this.props.setCartProduct(p);
    }
    toast.success(
      <div>
        <i className="fa fa-check pr-1"></i>
        <span className="ellips1">{p.productName}</span> added to cart.
      </div>,
      {
        className: "text-only text-white block",
        autoClose: 4000,
        position: "top-center",
      }
    );
  };

  buyNowItem = (e, p) => {
    e.preventDefault();
    const { cart, shipping, authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.createCartlist(p);
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
    } else {
      //to local storage
      this.props.setCartProduct(p);
    }
  };

  chamgeQtyDropdown = (e, q) => {
    e.preventDefault();
    this.setState({ quantity: q });
  };

  handleBtnWishlist = (e) => {
    e.preventDefault();
  };

  getFromArrival = () => {
    const date = moment().calendar("nextDay");
    return moment(date).format("dddd MMMM D");
  };

  componentDidMount() {
    // $("html, body").animate({ scrollTop: 0 }, 0);
    this.initMethods();
    // item description modal
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      if (params.p && params.pid) {
        this.props.findProduct(params.pid).then(() => {
          const p = this.props.product;
          this.setState({ productDetails: p });
          // this.setState({ selectMedia: "", detailProductMd: true });
        });
      }
    }
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.fetchCartlist();
      this.props.fetchShipping();
    }
  }

  render() {
    const { productDetails, selectMediaId } = this.state;

    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container ">
          <div className="homepage-breadcrumb">
            <Link to="/home" className="bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link">
              Computing
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link">
              Computers
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link">
              Networking Products
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link">
              Routers
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">
              E8372-155 WiFi 2 Mini 4G LTE Wireless Portable USB WiFi Modem
              Router Mobile WIFI Dongle Plug and Play Smart Home
            </span>
          </div>
        </div>
        <div className="container pt-3">
          <div className="row ">
            <section className="col-md-9" style={{ paddingRight: "10px" }}>
              <div className="card" style={{ height: "100%" }}>
                <div className="row">
                  <div className="col-md-5">
                    <div className="item-details">
                      <div className="item-details_box">
                        <div className="details_box-header">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            className="details_box-link"
                            target="blank"
                            rel="noopener noreffer"
                          >
                            {productDetails &&
                            productDetails.productThumb !== "" ? (
                              <img
                                data-src={
                                  imageUrl() +
                                  "/images/" +
                                  productDetails.productThumb
                                }
                                src={
                                  imageUrl() +
                                  "/images/" +
                                  productDetails.productThumb
                                }
                                className="item-image"
                                alt="product_image_name-Huawei-E8372-155 WiFi 2 Mini 4G LTE Wireless Portable USB WiFi Modem Router Mobile WIFI Dongle Plug and Play Smart Home-1"
                              />
                            ) : null}
                          </a>
                        </div>
                        <div className="details_box-footer">
                          <div className="showbtns">
                            {productDetails && productDetails.media.length
                              ? productDetails.media.map((t) => (
                                  <div
                                    key={t.id}
                                    className={
                                      "itm " +
                                      classNames({
                                        active: selectMediaId === t.id,
                                      })
                                    }
                                    onClick={(e) =>
                                      this.handleChangeMedia(e, t)
                                    }
                                  >
                                    <label>
                                      <img
                                        src={imageUrl() + "/images/" + t.name}
                                        alt=""
                                      />
                                    </label>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="pr-4">
                      <div className="description-panel">
                        <div className="description-textbox">
                          {/* eslint-disable-next-line */}
                          {/* <a className="tag _shipped">Shipped from abroad</a> */}
                          <h1 className="description-text">
                            {productDetails.productName}
                          </h1>
                        </div>
                        <form
                          method="post"
                          id="wishlist"
                          className="favourite"
                          data-action-type="add"
                          data-sku={productDetails.sku}
                          onSubmit={this.handleBtnWishlist}
                        >
                          <button type="submit" className="wishlist-btn">
                            <img src={iconHeart} alt="" />
                          </button>
                        </form>
                      </div>
                      <div className="description-body">
                        <div
                          className={
                            "brand " +
                            classNames({
                              hidden:
                                productDetails &&
                                isNull(productDetails.brandName),
                            })
                          }
                        >
                          Brand:{" "}
                          <Link to="/shop-catalog" className="_more">
                            {productDetails && productDetails.brandName}
                          </Link>
                          {" | "}
                          <a className="_more" href="minis-desktops/dell/">
                            Similar products from{" "}
                            {productDetails && productDetails.brandName}
                          </a>
                        </div>
                        <div className="rating">
                          <div className="stars _al">
                            <span className="icon-hide">4 out of 5</span>
                            <div className="in" style={{ width: "60%" }}></div>
                          </div>
                          {/* eslint-disable-next-line */}
                          <a href="#" className="-plxs _more">
                            119 ratings
                          </a>
                        </div>
                        <div className="-hr sale-price">
                          <span className="pr-titl"> Price:</span>
                          <span dir="ltr" className="-bprice">
                            KSh {formatMoney(productDetails.price)}
                          </span>
                          <div
                            className={
                              "old-price " +
                              classNames({
                                hidden:
                                  productDetails &&
                                  parseInt(productDetails.comparePrice) === 0,
                              })
                            }
                          >
                            <span dir="ltr" className="-tal">
                              KSh {formatMoney(productDetails.comparePrice)}
                            </span>
                            <span className="tag_dsct">27%</span>
                          </div>
                        </div>
                      </div>
                      <div className="description-var">
                        <span className="pr-titl">Variation:</span>
                        <div className="mt-3">
                          <Button disabled outline color="primary">
                            Standard
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <aside className="col-md-3" style={{ paddingLeft: "10px" }}>
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body">
                  <div className="p-section">
                    <span className="sec-price">
                      KSh {formatMoney(productDetails.price)}
                    </span>
                  </div>
                  <div className="info-section">
                    <span className="sec-info">
                      Shipping &amp; Import Fees Not included in the price yet.
                    </span>
                  </div>
                  <div className="delivery-message">
                    <span className="sec-deliv">
                      <b>Arrives:</b> Delivered between {this.getFromArrival()}{" "}
                      and Thursday 8 Oct.
                    </span>
                    <div className="sec-deliv">
                      <b>Return Policy:</b> Easy Return, Quick Refund
                    </div>
                  </div>
                  <div className="sec-availability">
                    {/* <span className="sec-avail text-success">In Stock</span> */}
                    <span className="sec-avail text-danger">
                      Only 20 left in stock - order soon.
                    </span>
                  </div>
                  <div className="sec-select-quantity">
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={() => {
                        this.toggleDropdown();
                      }}
                    >
                      <DropdownToggle caret size="sm">
                        Quantity: {this.state.quantity}{" "}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          className="active"
                          onClick={(e) => this.chamgeQtyDropdown(e, 1)}
                        >
                          1
                        </DropdownItem>
                        <DropdownItem
                          onClick={(e) => this.chamgeQtyDropdown(e, 2)}
                        >
                          2
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>
                  <div className="section-addcart">
                    <Button
                      type="button"
                      block
                      color="dark"
                      size="sm"
                      onClick={(e) => this.addToCartItem(e, productDetails)}
                    >
                      Add to cart
                    </Button>
                    <Button
                      type="button"
                      block
                      color="pink"
                      size="sm"
                      onClick={(e) => this.buyNowItem(e, productDetails)}
                    >
                      Buy Now
                    </Button>
                  </div>
                  <div className="section-buybox">
                    <table className="buybox-container">
                      <tbody>
                        <tr className="spacing-micro">
                          <td className="buybox-column">
                            <span className="buybox-label-span">
                              Ships from
                            </span>
                          </td>
                          <td className="buybox-column">
                            <span
                              className="buybox-content-col"
                              style={{
                                lineHeight: "1.3em",
                                maxHeight: "1.3em",
                              }}
                            >
                              <span className="span-offscreen">
                                Priesthood Collections
                              </span>
                            </span>
                          </td>
                        </tr>

                        <tr className="spacing-micro">
                          <td className="buybox-column">
                            <span className="buybox-label-span">Sold by</span>
                          </td>
                          <td className="buybox-column">
                            <span
                              className="uybox-content-col"
                              style={{
                                lineHeight: "1.3em",
                                maxHeight: "1.3em",
                              }}
                            >
                              <span className="span-offscreen">
                                <a
                                  href="/gp/help/seller/at-a-glance.html/ref=dp_merchant_link?ie=UTF8&amp;seller=A12115QSRA5J4Q&amp;isAmazonFulfilled=1"
                                  id="sellerProfileTriggerId"
                                >
                                  Celebrate Alive
                                </a>
                              </span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* product details */}
          <div className="row">
            <Col xs="12" md="12" className="mb-4">
              <div id="productInfo" className="pr-cs-info">
                <Nav tabs className="fixbard-tab">
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === "1"}
                      onClick={() => {
                        this.toggleTabs(0, "1");
                      }}
                      className="cs-tab-link"
                    >
                      <span className="cs-tab-name" title="Product Details">
                        Product Details
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === "2"}
                      onClick={() => {
                        this.toggleTabs(0, "2");
                      }}
                      className="cs-tab-link"
                    >
                      <span className="cs-tab-name" title="Product Details">
                        Customer Feedback
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]}>
                  <TabPane tabId="1">
                    <div className="fixbar-tab-nav">
                      <div className="prd-detailsTab">
                        <div className="sec-product-sort">
                          <div className="sortby-list btn-desc active">
                            Product Description
                          </div>
                          <div
                            className={
                              "sortby-list btn-spec " +
                              classNames({
                                hidden:
                                  productDetails &&
                                  isNull(productDetails.specifications),
                              })
                            }
                          >
                            Specifications
                          </div>
                          <div
                            className={
                              "sortby-list btn-delv " +
                              classNames({
                                hidden:
                                  productDetails &&
                                  isNull(productDetails.packaging),
                              })
                            }
                          >
                            Packing &amp; Delivery
                          </div>
                        </div>
                      </div>
                      <hr
                        style={{
                          marginTop: "0px",
                          marginLeft: "-15px",
                          marginRight: "-15px",
                          borderWidth: "2px",
                        }}
                      />
                    </div>
                    {productDetails && productDetails.description ? (
                      <div className="spec-detailinfo">
                        <div id="productDescprion">
                          <h3 className="spec-header pt-0">
                            Product Description
                          </h3>
                        </div>
                        <div
                          dangerouslySetInnerHTML={this.formatHtml(
                            productDetails && productDetails.description
                          )}
                        ></div>
                      </div>
                    ) : null}
                    {productDetails && productDetails.specifications ? (
                      <div className="spec-detailinfo">
                        <div id="productSpecifications">
                          <h3 className="spec-header">Specifications</h3>
                        </div>
                        <div
                          dangerouslySetInnerHTML={this.formatHtml(
                            productDetails && productDetails.specifications
                          )}
                        ></div>
                      </div>
                    ) : null}
                    {productDetails && productDetails.packaging ? (
                      <div className="spec-detailinfo">
                        <div id="productPacking">
                          <h3 className="spec-header">
                            Packing &amp; Delivery
                          </h3>
                        </div>
                        <div
                          dangerouslySetInnerHTML={this.formatHtml(
                            productDetails && productDetails.packaging
                          )}
                        ></div>
                      </div>
                    ) : null}
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="cst-feedbackContainer">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="no-fbck-block">
                            <img
                              src={chatListSvg}
                              width="84"
                              height="72"
                              alt=""
                            />
                            <p className="-fsP">
                              This product has no ratings yet.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.findProduct,
  authUser: state.users.auth,
  cart: state.cartlist.cartlist,
  shipping: state.shipping.shipping,
});

const mapDispatchToProps = {
  findProduct,
  createCartlist,
  setCartProduct,
  fetchCartlist,
  fetchShipping,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
