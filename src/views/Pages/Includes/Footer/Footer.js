import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

class Footer extends Component {
  static propTypes = {
    settingsData: PropTypes.object.isRequired,
  };

  render() {
    const { settingsData } = this.props;
    return (
      <footer className="bg3 p-t-75 p-b-32">
        <div className="container">
          <Row>
            <Col sm="6" className="pb-3">
              <h4 className="logo-name">
                {settingsData && settingsData.siteTitle}
              </h4>

              <p className="cl0 fs-13">
                {settingsData && settingsData.footerDescription}
              </p>
            </Col>
            <Col sm="6">
              <Row>
                <Col sm="6">
                  <h4 className="cl0">Get in touch</h4>

                  <p className="stext-107 cl7 size-201">
                    Any questions? Let us know:- Email{" "}
                    {settingsData && settingsData.siteEmail} or call us on{" "}
                    {settingsData && settingsData.siteTelephone}
                  </p>
                  <div className="p-t-27">
                    <a
                      href={settingsData && settingsData.facebookUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>

                    <a
                      href={settingsData && settingsData.instagramUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>

                    <a
                      href={settingsData && settingsData.pinterestUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
                    >
                      <i className="fa fa-pinterest-p"></i>
                    </a>
                  </div>
                </Col>
                <Col sm="6">
                  <h4 className="cl0 pb-3">Newsletter</h4>

                  <form>
                    <div className="wrap-input1 w-full p-b-4">
                      <input
                        className="input1 bg-none plh1 stext-107 cl7"
                        type="text"
                        name="email"
                        placeholder="email@example.com"
                      />
                      <div className="focus-input1 trans-04"></div>
                    </div>

                    <div className="p-t-18">
                      <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="p-t-40 ">
            <div className="flex-c-m flex-w p-b-18 hidden">
              <a href="/" className="m-all-1">
                <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
              </a>

              <a href="/" className="m-all-1">
                <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
              </a>

              <a href="/" className="m-all-1">
                <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
              </a>

              <a href="/" className="m-all-1">
                <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
              </a>

              <a href="/" className="m-all-1">
                <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
              </a>
            </div>

            <p className="stext-107 cl6 txt-center">
              Copyright &copy; 2019 - {new Date().getFullYear()} All rights
              reserved | Made with by NuekLabs &amp; distributed by Epsotech
              Solutions
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
