import React, { Component } from "react";
// import iconHeart from "../../../../assets/img/icons/icon-heart-01.png";
// import iconHeart2 from "../../../../assets/img/icons/icon-heart-02.png";
// import PropTypes from "prop-types";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import { Col } from "reactstrap";
import placeholderBg from "../../../../assets/avatar/placeholder.svg";

export default class ProductItem extends Component {
  // static propTypes = {
  //   product: PropTypes.shape({
  //     productName: PropTypes.string.isRequired,
  //     price: PropTypes.number.isRequired,
  //     avatar: PropTypes.string.isRequired,
  //     media: PropTypes.array.isRequired,
  //     description: PropTypes.string.isRequired,
  //     discount: PropTypes.number.isRequired,
  //     inventory: PropTypes.number.isRequired
  //   }).isRequired,
  //   detailProductModal: PropTypes.func.isRequired
  // };

  formatHtml = (data) => {
    return { __html: data };
  };

  render() {
    const { detailProductModal, addToCartItem, product } = this.props;

    return (
      <Col sm={6} md={3} lg={3} className="isotope-item women">
        <div className="single-product">
          <div className="product-img">
            {/* eslint-disable-next-line */}
            <a
              href={`shop-catalog/?description='${product.productName}'`}
              onClick={(e) => detailProductModal(e, product)}
              style={{ width: "210px", height: "210px" }}
            >
              {product.productThumb !== "" ? (
                <img
                  className="default-img"
                  src={imageUrl() + "/images/" + product.productThumb}
                  alt={product.productName}
                />
              ) : (
                <img className="default-img" src={placeholderBg} alt="" />
              )}
            </a>
            <div className="button-head">
              <div className="product-action">
                {/* eslint-disable-next-line */}
                <a
                  data-toggle="modal"
                  title="Quick View"
                  href="#"
                  onClick={(e) => detailProductModal(e, product)}
                >
                  <i className="icon-eye"></i>
                  <span>Quick View</span>
                </a>
                <a title="Wishlist" href="/">
                  <i className="icon-heart "></i>
                  <span>Add to Wishlist</span>
                </a>
              </div>
              <div className="product-action-2">
                {/* eslint-disable-next-line */}
                <a
                  href="#"
                  title="Add to cart"
                  onClick={(e) => addToCartItem(e, product)}
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="pdtitle1">{product.brandName}</div>
            {/* eslint-disable-next-line */}
            <a
              className="pdtitle2"
              title={product.productName}
              href="#"
              onClick={(e) => detailProductModal(e, product)}
            >
              {product.productName}
            </a>
            <a
              className="pdtitle3"
              target="_blank"
              rel="noopener noreferrer"
              href="/target-success-solid-women-round-neck-blue-t-shirt/p/itmff19d183c3562?pid=TSHFS732KTWXFRYR&amp;lid=LSTTSHFS732KTWXFRYRQBCQZB&amp;marketplace=FLIPKART&amp;srno=s_1_13&amp;otracker=AS_Query_TrendingAutoSuggest_5_0_na_na_na&amp;otracker1=AS_Query_TrendingAutoSuggest_5_0_na_na_na&amp;fm=SEARCH&amp;iid=04a833b1-50f9-4835-ae56-efde55af8f6d.TSHFS732KTWXFRYR.SEARCH&amp;ppt=sp&amp;ppn=sp&amp;ssid=6zed4r34n40000001591653746830&amp;qH=04ad3bdbbe706182"
            >
              <div className="price-container">
                <div className="prod-price">
                  Ksh {formatMoney(product.price)}
                </div>
                <div className="price-disc">
                  Ksh 238,995.00{" "}
                  <div className="price-discpercent">
                    <span>103% off</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Col>
    );
  }
}
