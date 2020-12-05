import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";

export class CheckoutSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
  }

  render() {
    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container">
          <div className="homepage-breadcrumb">
            <Link to="/homepage" className="bread-link bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link">
              Shoping Catalog
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">Checkout Success</span>
          </div>
          <h2>
            Cart <span className="small">l</span>
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccess);
