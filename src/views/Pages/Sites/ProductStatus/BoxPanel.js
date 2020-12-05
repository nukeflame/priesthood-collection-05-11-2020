import React, { Component } from "react";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import Slider from "react-slick";
import lsideArrow from "../../../../assets/img/left-arrow.svg";
import rsideArrow from "../../../../assets/img/right-arrow.svg";
import classNames from "classnames";
import { Link } from "react-router-dom";
import queryString from "query-string";

class BoxPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "Recomended Products",
        promoProducts: [
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
          {
            displayImage:
              "http://localhost:8001/storage/assets/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg",
          },
        ],
      },
    };
  }

  toOfferList = () => {};

  render() {
    const { post } = this.state;
    const settings = {
      dots: false,
      infinite: false,
      speed: 600,
      slidesToShow:
        post.promoProducts && post.promoProducts.length > 6
          ? 6
          : post.promoProducts.length,
      slidesToScroll: 1,
      autoplay: false,
      lazyLoad: "progressive",
    };

    return (
      <div>
        <Card className="home-products">
          <CardHeader>
            <h2 className="pr-title">{post.title}</h2>
            <div
              className="card-header-actions hidden"
              // className={
              //   "card-header-actions " +
              //   classNames({
              //     hidden: post.promoProducts && post.promoProducts.length < 6,
              //   })
              // }
            >
              <Button
                type="button"
                color="primary"
                size="sm"
                className="btn-square"
                onClick={(e) => this.toOfferList(e, post)}
              >
                View all
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Slider
              key={post.id}
              ref={(c) => (this.slider = c)}
              {...settings}
              className="product-panel"
            >
              {post.promoProducts && post.promoProducts.length > 0
                ? post.promoProducts.map((product, i) => (
                    <div className="body" key={i} style={{ width: "195px" }}>
                      <div>
                        <Link
                          to={`/shop-catalog?${queryString.stringify({
                            ct: product.productInfo,
                            sl: product.slug,
                            pid: product.id,
                            token: Math.random(1, 4),
                          })}`}
                          title={product.productPrice}
                        >
                          <div
                            className="footer-panel1"
                            style={{ height: "150px" }}
                          >
                            <div
                              className="itemimage-box"
                              style={{ height: "150px", width: "150px" }}
                            >
                              <img
                                className="image-item"
                                alt={product.productName}
                                src={product.displayImage}
                                srcSet={product.displayImage}
                              />
                            </div>
                          </div>
                          <div className="footer-panel2">
                            {product.productName}
                          </div>
                          <div className="footer-panel3">
                            {product.productPrice}
                          </div>
                          <div className="footer-panel4">
                            {product.productInfo}
                          </div>
                          <div className="footer-panel5"></div>
                        </Link>
                      </div>
                    </div>
                  ))
                : null}
            </Slider>
            {/* // */}
            {/* {post.promoProducts && post.promoProducts.length > 6 ? (
              <>
                <div className="side-arrow left">
                  <Button
                    type="button"
                    color="link"
                    onClick={(e) => this.nextSlideArrow(e)}
                  >
                    <img src={rsideArrow} alt="" />
                  </Button>
                </div>
                <div className="side-arrow right">
                  <Button
                    type="button"
                    color="link"
                    onClick={(e) => this.prevSlideArrow(e)}
                  >
                    <img src={lsideArrow} alt="" />
                  </Button>
                </div>
              </>
            ) : null} */}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoxPanel;
