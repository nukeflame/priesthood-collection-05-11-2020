import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";

class FeaturedBanner extends Component {
  static propTypes = {
    post: PropTypes.object,
  };

  render() {
    const { post } = this.props;

    return (
      <div className="col-4 banner-size-4">
        <Link
          to={`/shop-catalog?${queryString.stringify({
            ct: post.productInfo,
            sl: post.slug,
            pid: post.id,
            token: Math.random(1, 4),
          })}`}
          className="banner-wrap"
        >
          <div
            className="banner-wrap-img"
            style={{ paddingTop: "53.646%", width: "100%" }}
          >
            <img
              alt={post.productName}
              src={post.displayImage}
              srcSet={post.displayImage}
            />
            <img
              className="opc"
              src={post.displayImage}
              alt={post.productName}
            />
          </div>
        </Link>
      </div>
    );
  }
}

export default FeaturedBanner;
