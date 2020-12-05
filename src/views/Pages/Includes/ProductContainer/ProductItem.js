import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import classNames from "classnames";

export default class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      productName: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      comparePrice: PropTypes.string.isRequired,
      media: PropTypes.array.isRequired,
      id: PropTypes.number.isRequired,
      productThumb: PropTypes.string.isRequired,
      detailProductModal: PropTypes.func,
      addToCartItem: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      imgSwitcherFlash: {
        flasher: "",
        current: 1,
        media: [],
      },
    };
  }

  imgSwitcherInc = (e) => {
    e.preventDefault();
    const { product } = this.props;
    // this.setState((prevState) => ({
    //   imgSwitcherFlash: {
    //     ...prevState.imgSwitcherFlash,
    //     media: product.media,
    //   },
    // }));

    let c = this.state.imgSwitcherFlash.current;
    const add = c + 1;
    if (c < product.media.length) {
      this.setState((prevState) => ({
        imgSwitcherFlash: {
          ...prevState.imgSwitcherFlash,
          current: add,
        },
      }));
    }
  };

  imgSwitcherDec = (e) => {
    e.preventDefault();
    let c = this.state.imgSwitcherFlash.current;
    const subt = c - 1;
    if (c > 1) {
      this.setState((prevState) => ({
        imgSwitcherFlash: {
          ...prevState.imgSwitcherFlash,
          current: subt,
        },
      }));
    }
  };

  imgSwitcherHover = () => {
    console.log("d");
  };

  render() {
    const { product, addToCartItem } = this.props;
    const { imgSwitcherFlash } = this.state;

    return (
      <Col md="3" className="pr-gallery">
        <div className="pr-gallery-box">
          <Link
            // to={`product-detail?${queryString.stringify({
            //   p: product.productName,
            //   pid: product.id,
            // })}`}
            to="#"
            // data-id={product.id}
            // rel="noopener noreferrer"
            // target="_blank"
          >
            <div
              className="pr-img-switch prdct-img-Switcher"
              data-name="imgSwitcher"
            >
              <div
                className="pr-img-switch__imgs"
                flasher-type="mainImage"
                data-image={imageUrl() + "/images/" + product.productThumb}
              >
                <img
                  src={imageUrl() + "/images/" + product.productThumb}
                  className="prdct-Switcher-item"
                  alt={product.id}
                  data-gt-img={product.id}
                />
              </div>
              <span
                className={
                  "pr-img-switcher__arrow-left " +
                  classNames({
                    "-show": product.media && product.media.length > 1,
                  })
                }
                data-id={product.id}
                onClick={this.imgSwitcherDec}
              >
                <i className="icon-arrow-left"></i>
              </span>
              <span
                className={
                  "pr-img-switcher__arrow-right " +
                  classNames({
                    "-show": product.media && product.media.length > 1,
                  })
                }
                data-id={product.id}
                onClick={this.imgSwitcherInc}
              >
                <i className="icon-arrow-right"></i>
              </span>
              {product.media && product.media.length > 1 ? (
                <div className="pr-img-switcher__br-wrapper">
                  <div className="pr-img-switcher__br-icon">
                    <span className="pr-img-switcher__icon-multi-img">
                      {imgSwitcherFlash.current}/
                      {product.media && product.media.length}
                    </span>
                    {/* <i className="pr-img-switcher__icon-video"></i> */}
                  </div>
                </div>
              ) : null}
            </div>
          </Link>
          <div
            className={
              "info__title " +
              classNames({ "mt-0": product.media && product.media.length > 1 })
            }
          >
            {/* <div className="tag_shiped">Shipped from abroad</div> */}
            <h4
              className="info-title-normal__outter ellips2"
              title={product.productName}
            >
              <Link
                to={`product-detail?${queryString.stringify({
                  p: product.productName,
                  pid: product.id,
                })}`}
                rel="noopener noreferrer"
                target="_blank"
                className="info-title-normal"
                title={product.productName}
                data-id={product.id}
                style={{ marginTop: "8px" }}
              >
                {product.productName}
              </Link>
            </h4>
            <div className="prc_tit">KSh {formatMoney(product.price)}</div>
            {product.comparePrice ? (
              <div className="s-prc-wrt">
                <div className="old">
                  KSh {formatMoney(product.comparePrice)}
                </div>
                <div className="tag_dsct">5%</div>
              </div>
            ) : null}

            <div className="pr-ft">
              <div
                className="ft-outer"
                data-add-cart={product.id}
                data-sku={product.sku}
              >
                <button
                  type="button"
                  className="btn btn-sm btn-primary btn-block"
                  onClick={(e) => addToCartItem(e, product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}
