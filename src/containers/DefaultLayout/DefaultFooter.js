import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span className="fs-13">
          <a href="/">eShop</a> &copy; 2019 - {new Date().getFullYear()}{" "}
          nuekLabs.
        </span>
        <span className="ml-auto fs-13">
          Powered by <a href="/">Epsotech Solutions</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
