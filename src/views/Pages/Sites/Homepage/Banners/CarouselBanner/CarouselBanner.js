import React, { Component } from "react";
import Slider from "react-slick";
import lsideArrow from "../../../../../../assets/img/left-arrow.svg";
import rsideArrow from "../../../../../../assets/img/right-arrow.svg";
import { Button } from "reactstrap";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import queryString from "query-string";

class CarouselBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  nextSlideArrow = () => {
    this.slider.slickNext();
  };

  prevSlideArrow = () => {
    this.slider.slickPrev();
  };

  render() {
    const { homepagePost } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      lazyLoad: "progressive",
      pauseOnHover: false,
      pauseOnFocus: false,
      // autoplaySpeed: 5000,
      cssEase: "linear",
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       infinite: true,
      //       dots: true,
      //     },
      //   },
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       initialSlide: 1,
      //     },
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     },
      //   },
      // ],
    };

    return (
      <div className="wrap-slick" data-id={homepagePost.id}>
        <div className="slider-carousl">
          <Slider
            ref={(c) => (this.slider = c)}
            {...settings}
            className="wrapper-slider"
          >
            {homepagePost.promoProducts &&
            homepagePost.promoProducts.length > 0 ? (
              homepagePost.promoProducts.map((p) => (
                <div
                  className="slider-boxer"
                  style={{ width: "1335px" }}
                  key={p.id}
                >
                  <div className="slider-boxer-wrap">
                    <Link
                      to={`/shop-catalog?${queryString.stringify({
                        ct: p.productInfo,
                        sl: p.slug,
                        pid: p.id,
                        token: Math.random(1, 4),
                      })}`}
                      className="slider-boxer-anchor"
                    >
                      <div
                        className="boxer-anchor"
                        style={{ width: "100%", height: "280px" }}
                      >
                        {isEmpty(p.displayImage) ? (
                          <img
                            className="carousl-imageplace "
                            alt={p.productName}
                            src={p.displayImage}
                            srcSet={p.displayImage}
                          />
                        ) : (
                          <img
                            className="carousl-image"
                            alt={p.productName}
                            src={p.displayImage}
                            srcSet={p.displayImage}
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="slider-boxer" style={{ width: "1335px" }}>
                <div className="slider-boxer-wrap">
                  <Link to={`/`} className="slider-boxer-anchor">
                    <div
                      className="boxer-anchor"
                      style={{ width: "100%", height: "280px" }}
                    >
                      <img
                        className="carousl-imageplace "
                        alt={"p.productName"}
                        src={"p.displayImage"}
                        srcSet={"p.displayImage"}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </Slider>
          <div className="side-arrow left">
            <Button type="button" color="link" onClick={this.nextSlideArrow}>
              <img src={rsideArrow} alt="" />
            </Button>
          </div>
          <div className="side-arrow right">
            <Button type="button" color="link" onClick={this.prevSlideArrow}>
              <img src={lsideArrow} alt="" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CarouselBanner;
