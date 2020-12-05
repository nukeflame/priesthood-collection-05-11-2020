import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { imageUrl } from "../../../config/helpers";
// import PropTypes from "prop-types";

class ArticleWishlist extends Component {
  static propTypes = {
    // order: PropTypes.object.isRequired,
    // parseDate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <article className="wish-art">
        {/* eslint-disable-next-line */}
        <a href="#" className="-pas">
          <img
            src={`${imageUrl()}/images/HHZkA36pruqDA1NwpqDmQo6FeR8LTnIm.jpg`}
            className="-wish-img"
            width="104"
            height="104"
            alt="Universal"
          />
        </a>
        <div className="wish-title">
          {/* eslint-disable-next-line */}
          <Link to="/" className="-w-link">
            Universal Smart TV, Android Box Wireless Keyboard/Remote keypad with
            Mouse Touchpad - Black
          </Link>
          <div className="-w-actual-price">
            <p className="-p_tag">KSh 1,200</p>
            <span className="tag _dsct">20%</span>
          </div>
          <p className="-w-disct-price">KSh 1,500</p>
        </div>
        <div className="wish-btns">
          <Button type="button" className="-bt-lin" color="dark">
            Buy Now
          </Button>
          <div className="fm-btm">
            <Button type="button" className="-bt-lin" color="default">
              <i className="fa fa-trash"></i> Remove
            </Button>
          </div>
        </div>
      </article>
    );
  }
}

export default ArticleWishlist;
