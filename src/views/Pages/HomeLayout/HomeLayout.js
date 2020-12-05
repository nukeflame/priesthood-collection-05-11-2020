import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Footer } from "../Includes";
import $ from "jquery";
// import routes from "../../../routes/homeRoutes";
import {
  Homepage,
  CartList,
  CheckoutAddress,
  ShopCatalog,
  CheckoutSuccess,
  RouteContent,
  Blog,
  CreateAccount,
  ProductDetail,
  ProductStatus,
} from "../Sites";
import { ToastContainer } from "react-toastify";
import { getUserData, isLoggedIn } from "../../../config/auth";
import { fetchAuthUser } from "../../../redux/actions/userAction";
import { isNull } from "lodash";
import { fetchCartlist } from "../../../redux/actions/cartlistAction";
import { fetchShipping } from "../../../redux/actions/shippingAction";
import { fetchSettings } from "../../../redux/actions/settingAction";
import { fetchPosts } from "../../../redux/actions/postAction";
import loaderBg from "../../../assets/loader/arrow-loader.svg";
import { getSettingData, setSettingData } from "../../../config/helpers";

class HomeLayout extends Component {
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

    //get settings data local
    if (getSettingData()) {
      const x = getSettingData();
      for (let i = 0; i < x.length; i++) {
        const s = x[i];
        if (s.id) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              id: s.id,
            },
          }));
        }
        if (s.siteTitle) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteTitle: s.siteTitle,
            },
          }));
        }
        if (s.siteLogoUrl) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteLogoUrl: s.siteLogoUrl,
            },
          }));
        }
        if (s.miniLogoUrl) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              miniLogoUrl: s.miniLogoUrl,
            },
          }));
        }
        if (s.siteDescription) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteDescription: s.siteDescription,
            },
          }));
        }
        if (s.siteUrl) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteUrl: s.siteUrl,
            },
          }));
        }
        if (s.adminEmail) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              adminEmail: s.adminEmail,
            },
          }));
        }
        if (s.siteEmail) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteEmail: s.siteEmail,
            },
          }));
        }
        if (s.siteTelephone) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteTelephone: s.siteTelephone,
            },
          }));
        }
        if (s.instagramUrl) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              instagramUrl: s.instagramUrl,
            },
          }));
        }
        if (s.facebookUrl) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              facebookUrl: s.facebookUrl,
            },
          }));
        }
        if (s.pinterestUrl) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              pinterestUrl: s.pinterestUrl,
            },
          }));
        }
        if (s.footerDescription) {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              footerDescription: s.footerDescription,
            },
          }));
        }
      }
    }
  };

  redirectLocation = () => {
    const { history } = this.props;
    switch (history.location.pathname) {
      case "/cart":
        return <CartList {...this.props} />;
      case "/shop-catalog":
        return <ShopCatalog {...this.props} />;
      case "/checkout-address":
        return <CheckoutAddress {...this.props} />;
      case "/checkout-address/success":
        return <CheckoutSuccess {...this.props} />;
      case "/auth/create_account":
        return <CreateAccount {...this.props} />;
      case "/about":
        return <RouteContent {...this.props} about="about" />;
      case "/contact":
        return <RouteContent {...this.props} contact="contact" />;
      case "/blog":
        return <Blog {...this.props} blog="blog" />;
      case "/product-detail":
        return <ProductDetail {...this.props} />;
      case "/new/product":
        return <ProductStatus {...this.props} />;
      default:
        return <Homepage {...this.props} />;
    }
  };

  componentDidMount() {
    // init methods
    this.initMethods();
    //auth user
    if (isLoggedIn()) {
      let userData = getUserData() && getUserData();
      if (!isNull(userData)) {
        this.props.fetchAuthUser(userData.email).then(() => {
          this.props.fetchCartlist();
          this.props.fetchShipping();
          this.props.fetchPosts();
        });
      }
    }
    // fetch settings
    this.props.fetchSettings().then(() => {
      const { settings } = this.props;
      let a = [];
      a = [...a, { id: 1 }];
      for (let i = 0; i < settings.length; i++) {
        const s = settings[i];
        if (s.optionName === "siteTitle") {
          a = [...a, { siteTitle: s.optionValue }];
        } else if (s.optionName === "siteLogoUrl") {
          a = [...a, { siteLogoUrl: s.optionValue }];
        } else if (s.optionName === "miniLogoUrl") {
          a = [...a, { miniLogoUrl: s.optionValue }];
        } else if (s.optionName === "siteDescription") {
          a = [...a, { siteDescription: s.optionValue }];
        } else if (s.optionName === "siteUrl") {
          a = [...a, { siteUrl: s.optionValue }];
        } else if (s.optionName === "adminEmail") {
          a = [...a, { adminEmail: s.optionValue }];
        } else if (s.optionName === "siteEmail") {
          a = [...a, { siteEmail: s.optionValue }];
        } else if (s.optionName === "siteTelephone") {
          a = [...a, { siteTelephone: s.optionValue }];
        } else if (s.optionName === "instagramUrl") {
          a = [...a, { instagramUrl: s.optionValue }];
        } else if (s.optionName === "facebookUrl") {
          a = [...a, { facebookUrl: s.optionValue }];
        } else if (s.optionName === "pinterestUrl") {
          a = [...a, { pinterestUrl: s.optionValue }];
        } else if (s.optionName === "footerDescription") {
          a = [...a, { footerDescription: s.optionValue }];
        }
      }
      setSettingData(a);
    });
  }

  render() {
    const { settingsData } = this.state;
    const { uniLoader } = this.props;

    return (
      <div className="animated fadeIn homepage-wrapper">
        {uniLoader ? (
          <div className="loader-bg">
            <img src={loaderBg} alt="" />
          </div>
        ) : null}

        {/* header */}
        <Header {...this.props} settingsData={settingsData} />
        {/* Main data */}
        {this.redirectLocation()}
        {/* Footer */}
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
  uniLoader: state.pages.uniLoader,
});

const mapDispatchToProps = {
  fetchAuthUser,
  fetchCartlist,
  fetchShipping,
  fetchSettings,
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
