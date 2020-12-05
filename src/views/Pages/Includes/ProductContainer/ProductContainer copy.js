import React, { Component } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import iconClose from "../../../../assets/img/icons/icon_close.svg";
import ProductItem from "./ProductItem";
import {
  setCartProduct,
  findProduct,
} from "../../../../redux/actions/productAction";
import { connect } from "react-redux";
import iconHeart from "../../../../assets/img/icons/icon-heart-01.png";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import classNames from "classnames";
import { Link } from "react-router-dom";
import $ from "jquery";
import { isNull, isEmpty } from "lodash";
import { createCartlist } from "../../../../redux/actions/cartlistAction";
import queryString from "query-string";

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: "",
      detailProductMd: false,
      buyNowMd: false,
      selectMedia: "",
      selectMediaId: "",
    };
  }

  detailProductModal = (e, p) => {
    e.preventDefault();
    this.props.history.push(
      `/shop-catalog?${queryString.stringify({
        description: p.productName,
        pId: p.id,
      })}`
    );
    this.setState({ productDetails: p });
    this.setState({ selectMedia: "", detailProductMd: true });
    $(".single-product .button-head").addClass("b0");
  };

  closeProductModal = (e) => {
    e.preventDefault();
    this.props.history.push("/shop-catalog");
    this.setState({ selectMedia: "", detailProductMd: false });
    $(".single-product .button-head").removeClass("b0");
  };

  buyNowModal = () => {
    const { buyNowMd } = this.state;
    this.setState({ buyNowMd: !buyNowMd });
  };

  addToCartItem = (e, p) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.createCartlist(p);
    } else {
      this.props.setCartProduct(p);
    }
  };

  viewCartCheckout = () => {
    const { productDetails } = this.state;
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.createCartlist(productDetails);
    } else {
      this.props.setCartProduct(productDetails);
    }
    this.props.history.push("/cart");
  };

  continueShopping = () => {
    this.setState({ buyNowMd: false });
    const { productDetails } = this.state;
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.createCartlist(productDetails);
    } else {
      this.props.setCartProduct(productDetails);
    }
    this.props.history.push("/shop-catalog");
  };

  addToCart = (e) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (authUser) {
      const { productDetails } = this.state;
      if (productDetails !== "") {
        this.props.setCartProduct(productDetails);
      }
      const { buyNowMd } = this.state;
      this.setState({ detailProductMd: false, buyNowMd: !buyNowMd });
    } else {
      this.props.history.push("/auth/login");
    }
  };

  handleBtnWishlist = (e) => {
    e.preventDefault();
  };

  formatHtml = (data) => {
    return { __html: data };
  };

  handleChangeMedia = (e, t) => {
    e.preventDefault();
    this.setState({ selectMedia: t, selectMediaId: t.id });
  };

  componentDidMount() {
    //item description modal
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      if (params.description) {
        this.props.findProduct(params.pId).then(() => {
          const p = this.props.product;
          this.setState({ productDetails: p });
          this.setState({ selectMedia: "", detailProductMd: true });
        });
      }
    }
  }

  render() {
    const { products } = this.props;
    const {
      buyNowMd,
      productDetails,
      detailProductMd,
      selectMedia,
      selectMediaId,
    } = this.state;

    return (
      <React.Fragment>
        {products && products.length > 0
          ? products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                detailProductModal={(e, p) => this.detailProductModal(e, p)}
                addToCartItem={(e, p) => this.addToCartItem(e, p)}
              />
            ))
          : null}

        {/* Details Product Modal */}
        <Modal
          isOpen={detailProductMd}
          toggle={this.detailProductModal}
          fade={false}
          scrollable={false}
          size="xl"
          className={this.props.className}
          modalClassName="modal_stretch animated fadeIn "
        >
          <ModalHeader className="buy-name mb-0" style={{ zIndex: "2000" }}>
            <span className="pl-2">Item Description</span>
            <span className="buy-title">
              <Button
                color="link"
                className="modal-close-x"
                onClick={this.closeProductModal}
              >
                <img src={iconClose} className="close-img" alt="" />
              </Button>
            </span>
          </ModalHeader>
          <ModalBody className="mr-0">
            <div className="modal-fluid">
              <Row>
                <Col sm={4} md={4}>
                  <div className="item-details">
                    <div className="item-details_box">
                      <div className="details_box-header">
                        {productDetails &&
                        productDetails.productThumb !== "" ? (
                          <a
                            href={
                              imageUrl() +
                              "/images/" +
                              productDetails.productThumb
                            }
                            className="details_box-link"
                            target="blank"
                            rel="noopener noreffer"
                          >
                            {selectMedia !== "" ? (
                              <img
                                src={imageUrl() + "/images/" + selectMedia.name}
                                alt=""
                                className="item-image"
                              />
                            ) : (
                              <img
                                src={
                                  imageUrl() +
                                  "/images/" +
                                  productDetails.productThumb
                                }
                                className="item-image"
                                alt=""
                              />
                            )}
                          </a>
                        ) : null}
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
                                  onClick={(e) => this.handleChangeMedia(e, t)}
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
                </Col>
                <Col sm={8} md={8}>
                  <div className="pr-4">
                    <div className="description-panel">
                      <div className="description-textbox">
                        <h1 className="description-text">
                          {productDetails && productDetails.productName}
                        </h1>
                      </div>
                      <form
                        method="post"
                        id="wishlist"
                        className="favourite"
                        data-action-type="add"
                        data-sku="DE168EL1ATDKENAFAMZ"
                        data-track-onsubmit="wishlist"
                        data-invalid-pop-id="3"
                        onSubmit={this.handleBtnWishlist}
                      >
                        <button type="submit" className="wishlist-btn">
                          <img src={iconHeart} alt="" />
                        </button>
                      </form>
                    </div>
                    <div className="description-panel">
                      <div className="description-textbox">
                        <h3
                          className="description-text"
                          dangerouslySetInnerHTML={this.formatHtml(
                            productDetails && productDetails.description
                          )}
                        ></h3>
                      </div>
                    </div>
                    <div className="description-body">
                      <div className="brand">
                        Brand:{" "}
                        <Link to="/shop-catalog" className="_more">
                          {productDetails && productDetails.brand}
                        </Link>
                        {/* {" | "} */}
                        {/* <a
                          className="_more"
                          href="https://www.jumia.co.ke/minis-desktops/dell/"
                        >
                          Similar products from DELL
                        </a> */}
                      </div>
                      <div className="rating">
                        <div className="stars _al">
                          <span className="icon-hide">4 out of 5</span>
                          <div className="in" style={{ width: "40%" }}></div>
                        </div>
                        <a href="/" className="-plxs _more">
                          (1 rating)
                        </a>
                      </div>
                      <div className="-hr sale-price">
                        <span dir="ltr" className="-bprice">
                          KSh{" "}
                          {formatMoney(productDetails && productDetails.price)}
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
                            KSh{" "}
                            {formatMoney(
                              productDetails && productDetails.comparePrice
                            )}
                          </span>
                          <span className="tag_dsct">27%</span>
                        </div>
                      </div>
                    </div>
                    <div className="description-addcart">
                      <Row>
                        <Col sm="6">
                          <Button
                            type="button"
                            block
                            color="warning"
                            size="lg"
                            onClick={this.addToCart}
                          >
                            Buy Now
                          </Button>
                        </Col>
                        <Col sm="6">
                          <Button
                            type="button"
                            block
                            color="dark"
                            size="lg"
                            onClick={this.addToCart}
                          >
                            Add to cart
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    <hr />
                    <div className="pb-2">
                      <h5 className="ff-RM">
                        <u>Product Details</u>
                      </h5>
                      <div
                        dangerouslySetInnerHTML={this.formatHtml(
                          productDetails && productDetails.specifications
                        )}
                      ></div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        {/* Buy Now Modal */}
        <Modal
          isOpen={buyNowMd}
          toggle={this.buyNowModal}
          fade={false}
          scrollable={false}
          className={this.props.className}
          style={{ top: "22%" }}
          modalClassName="modal_stretch animated fadeIn top10"
        >
          <ModalHeader className="buy-name" style={{ zIndex: "2000" }}>
            <span className="buy-title">
              <span className="buy-success">Success!</span>
              <Button
                type="button"
                color="link"
                className="modal-close-x"
                onClick={this.buyNowModal}
              >
                <img src={iconClose} alt="" />
              </Button>
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="pb-2">
              <p className="p-details">
                {productDetails && productDetails.productName}
              </p>
            </div>

            <Row className="buy-footer">
              <Col md="6">
                <Button color="secondary" onClick={this.continueShopping}>
                  Continue Shopping
                </Button>
              </Col>
              <Col md="6">
                <Button color="dark" onClick={this.viewCartCheckout}>
                  View Cart and Check out
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cartList: state.cartlist.cartlist,
  authUser: state.users.auth,
  product: state.products.findProduct,
});

const mapDispatchToProps = {
  setCartProduct,
  createCartlist,
  findProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
