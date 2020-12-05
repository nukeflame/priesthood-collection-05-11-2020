import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import $ from "jquery";
import { Header, Footer } from "../../Includes";
import { ToastContainer } from "react-toastify";
import { isNull } from "lodash";
import { isLoggedIn, getUserData } from "../../../../config/auth";
import { fetchAuthUser } from "../../../../redux/actions/userAction";
import { fetchCartlist } from "../../../../redux/actions/cartlistAction";
import { fetchShipping } from "../../../../redux/actions/shippingAction";
import { fetchSettings } from "../../../../redux/actions/settingAction";
import { findOfferProducts } from "../../../../redux/actions/postAction";
import queryString from "query-string";

class OffersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsData: {
        id: 1,
        siteTitle: "",
        siteUrl: "",
        siteDescription: "",
        siteLogoUrl: "",
        miniLogoUrl: "",
        adminEmail: "",
        siteEmail: "",
        siteTelephone: "",
        instagramUrl: "",
        facebookUrl: "",
        pinterestUrl: "",
        footerDescription: "",
      },
    };
  }

  initMethods = () => {
    // [ Scroll to Top  ]
    let windowH = $(window).height() / 2;
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > windowH) {
        $("#scrollToTopBtn").css("display", "flex");
      } else {
        $("#scrollToTopBtn").css("display", "none");
      }
    });
    $("#scrollToTopBtn").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
    // [ Fixed Header ]
    let headerDesktop = $(".container-menu-desktop");
    let wrapMenu = $(".wrap-menu-desktop");

    if ($(".top-bar").length > 0) {
      var posWrapHeader = $(".top-bar").height();
    } else {
      posWrapHeader = 0;
    }

    if ($(window).scrollTop() > posWrapHeader) {
      $(headerDesktop).addClass("fix-menu-desktop");
      $(wrapMenu).css("top", 0);
    } else {
      $(headerDesktop).removeClass("fix-menu-desktop");
      $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
    }

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass("fix-menu-desktop");
        $(wrapMenu).css("top", 0);
      } else {
        $(headerDesktop).removeClass("fix-menu-desktop");
        $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
      }
    });
  };

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    // init methods
    this.initMethods();
    //auth user
    if (isLoggedIn()) {
      let userData = getUserData() && getUserData();
      if (!isNull(userData)) {
        this.props.fetchAuthUser(userData.email).then(() => {
          this.props.fetchCartlist();
          this.props.fetchShipping();
        });
      }
    }
    // settings
    this.props.fetchSettings().then(() => {
      const { settings } = this.props;
      for (let i = 0; i < settings.length; i++) {
        const s = settings[i];
        if (s.optionName === "siteTitle") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteTitle: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteLogoUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteLogoUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "miniLogoUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              miniLogoUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteDescription") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteDescription: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "adminEmail") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              adminEmail: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteEmail") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteEmail: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteTelephone") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteTelephone: s.optionValue,
            },
          }));
        } else if (s.optionName === "instagramUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              instagramUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "facebookUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              facebookUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "pinterestUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              pinterestUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "footerDescription") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              footerDescription: s.optionValue,
            },
          }));
        }
      }
    });
    //fetch post
    const params = this.props.match.params;
    this.props.findOfferProducts(params.name);
  }

  render() {
    const { settingsData } = this.state;
    const { offerPost } = this.props;

    return (
      <div className="animated fadeIn homepage-wrapper">
        {/* header */}
        <Header {...this.props} />
        <div className="wrapper-component animated fadeIn">
          <div className="container">
            <div className="homepage-breadcrumb">
              <Link to="/home" className="bread-link bread-link">
                Home
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </Link>
              <Link to="/shop-catalog" className="bread-link">
                Shoping Catalog
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </Link>
              <span className="active">Offers List</span>
            </div>
            <h2 className="text-center">
              {offerPost.title}
              <div className="text-muted fs-13">
                {offerPost.promoProducts && offerPost.promoProducts.length}{" "}
                Items
              </div>
            </h2>
          </div>
          <div className="container mt-3">
            <div className="bg-white">
              <Row>
                {offerPost.promoProducts && offerPost.promoProducts.length > 0
                  ? offerPost.promoProducts.map((product) => (
                      <Col sm={3} className="offer-box" key={product.id}>
                        <Link
                          to={`/shop-catalog?${queryString.stringify({
                            ct: product.productInfo,
                            sl: product.slug,
                            token: Math.random(1, 4),
                          })}`}
                          title={product.productPrice}
                          className="offer-box-link"
                        >
                          <div
                            className="footer-panel1"
                            style={{ height: "200px" }}
                          >
                            <div
                              className="itemimage-box"
                              style={{ height: "200px", width: "200px" }}
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
                      </Col>
                    ))
                  : null}
              </Row>
            </div>
          </div>
        </div>
        <Footer {...this.props} settingsData={settingsData} />
        {/*  Back to top */}
        <div className="btn-back-to-top" id="scrollToTopBtn">
          <span className="symbol-btn-back-to-top">
            <i className="zmdi zmdi-chevron-up"></i>
          </span>
        </div>
        {/* toastify */}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.users.auth,
  settings: state.settings.settings,
  offerPost: state.posts.offerPost,
});

const mapDispatchToProps = {
  fetchAuthUser,
  fetchCartlist,
  fetchShipping,
  fetchSettings,
  findOfferProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
