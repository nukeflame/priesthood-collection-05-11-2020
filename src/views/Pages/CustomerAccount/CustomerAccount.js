import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  TabContent,
  TabPane,
  Button,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn, getUserData } from "../../../config/auth";
import { fetchCartlist } from "../../../redux/actions/cartlistAction";
import { fetchAuthUser } from "../../../redux/actions/userAction";
import { fetchShipping } from "../../../redux/actions/shippingAction";
import { isNull, isEmpty } from "lodash";
import { findUserOrders } from "../../../redux/actions/orderAction";
import moment from "moment";
import { findCustomer } from "../../../redux/actions/customerAction";
import queryString from "query-string";
import { fetchSettings } from "../../../redux/actions/settingAction";
import { setSettingData, getSettingData } from "../../../config/helpers";
import $ from "jquery";
import { Footer, Header } from "../Includes";
import emptyOrderIcon from "../../../assets/icons/empty-order.png";
import emptyReviewIcon from "../../../assets/icons/orderEmpty.png";
import loaderBg from "../../../assets/loader/ajax-loader.gif";
import ArticleWishlist from "./ArticleWishlist";
import { ArticleOrder, EditCustomerAccount, OrderDetails } from "./Mods";

class CustomerAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      editAccount: false,
      isChangePswd: false,
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
      customerData: {
        firstname: "",
        currentPswd: "",
        confirmPswd: "",
        newPswd: "",
      },
      checkOrder: false,
    };
  }

  parseDate = (t) => {
    return moment(t).format("DD-MM-YYYY hh:mm:s a");
  };

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

  toggleTabs = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
    // tab
    const link = "/account/customer?";
    if (tab === 0) {
      this.props.history.push(
        link + queryString.stringify({ tab: "my_account" })
      );
    } else if (tab === 1) {
      this.props.history.push(
        link + queryString.stringify({ tab: "my_orders" })
      );
    } else if (tab === 2) {
      this.props.history.push(
        link + queryString.stringify({ tab: "wishlist" })
      );
    } else if (tab === 3) {
      this.props.history.push(
        link + queryString.stringify({ tab: "my_reviews_ratings" })
      );
    } else if (tab === 4) {
      this.props.history.push(
        link + queryString.stringify({ tab: "my_subscriptions" })
      );
    } else if (tab === 5) {
      this.props.history.push(
        link + queryString.stringify({ tab: "personal_information" })
      );
    } else if (tab === 6) {
      this.props.history.push(
        link + queryString.stringify({ tab: "change_password" })
      );
    } else if (tab === 7) {
      this.props.history.push(
        link + queryString.stringify({ tab: "addresses" })
      );
    } else if (tab === 8) {
      this.props.history.push(
        link + queryString.stringify({ tab: "profile_settings" })
      );
    } else if (tab === 9) {
      this.props.history.push(
        link + queryString.stringify({ tab: "update_email" })
      );
    }
  };

  contShopping = (e) => {
    e.preventDefault();
    this.props.history.push("/shop-catalog");
  };
  handleDisAccount = (e) => {
    e.preventDefault();
  };
  handleEditAccount = (e) => {
    e.preventDefault();
    this.editAccountToggle();
    this.props.history.push(
      `/account/customer?${queryString.stringify({ edit: true })}`
    );
  };

  handleChangePswd = (e) => {
    e.preventDefault();
    this.editAccountToggle();
    this.setState({ isChangePswd: true });
    this.props.history.push(
      `/account/customer?${queryString.stringify({
        edit: true,
        password: true,
      })}`
    );
  };

  editAccountToggle = () => {
    const { editAccount } = this.state;
    this.setState({ editAccount: !editAccount, isChangePswd: false });
    this.props.history.push("/account/customer");
  };

  saveChangePassword = (e) => {
    e.preventDefault();
    const { customerData } = this.state;
    const data = {
      currentPswd: customerData.currentPswd,
      confirmPswd: customerData.confirmPswd,
      newPswd: customerData.newPswd,
    };

    console.log(data);
  };

  toCheckOrder = (e) => {
    $("html, body").animate({ scrollTop: 0 }, 0);
    this.setState({ checkOrder: true });
  };

  checkOrderToggle = (e) => {
    //  checkOrderToggle;
    this.setState({ checkOrder: false });
    this.props.history.push(
      "/account/customer?" + queryString.stringify({ tab: "my_orders" })
    );
  };

  componentDidMount() {
    // init methods
    this.initMethods();
    if (isLoggedIn()) {
      let userData = getUserData() && getUserData();
      if (!isNull(userData)) {
        this.props.fetchAuthUser(userData.email).then(() => {
          const { authUser } = this.props;
          if (isNull(authUser)) {
            this.props.history.push("/home");
          } else {
            this.props.findCustomer(authUser.id);
            this.props.fetchCartlist();
            this.props.fetchShipping();
            this.props.findUserOrders({ userEmail: userData.email });
          }
        });
      }
    }

    //search category
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      if (params.edit) {
        this.setState({ editAccount: true });
      }
      if (params.password) {
        this.setState({ isChangePswd: true });
      }
      if (params.order) {
        this.setState({ checkOrder: true });
      }

      //tab]
      if (params.tab) {
        const tabName = params.tab;
        let tabId = 0;
        if (tabName === "my_account") {
          tabId = 0;
        } else if (tabName === "my_orders") {
          tabId = 1;
        } else if (tabName === "wishlist") {
          tabId = 2;
        } else if (tabName === "my_reviews_ratings") {
          tabId = 3;
        } else if (tabName === "my_subscriptions") {
          tabId = 4;
        } else if (tabName === "personal_information") {
          tabId = 5;
        } else if (tabName === "change_password") {
          tabId = 6;
        } else if (tabName === "addresses") {
          tabId = 7;
        } else if (tabName === "profile_settings") {
          tabId = 8;
        } else if (tabName === "profile_settings") {
          tabId = 9;
        }

        this.setState({ activeTab: tabId });
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
    const {
      activeTab,
      editAccount,
      settingsData,
      isChangePswd,
      customerData,
      checkOrder,
    } = this.state;
    const { userOrders, customer, fetchingUserOrders } = this.props;

    const myOrders = userOrders.filter((o) => o.id < 10);

    const AccountDetails = () => (
      <div>
        <Row>
          <Col md={12}>
            <Card
              style={{
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              <CardBody
                style={{
                  padding: "0",
                }}
              >
                <ListGroup className="ac-menu">
                  <ListGroupItem>
                    <h2 className="ac-heading">
                      <span>Your Account</span>
                    </h2>
                  </ListGroupItem>
                  <ListGroupItem>
                    <span className="ac-span">
                      See information about your account, your default shipping
                      address, newsletter account subscriptions and archive of
                      your data, or learn about your account deactivation
                      options
                    </span>
                  </ListGroupItem>
                  <ListGroupItem>
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="ac-link"
                      onClick={(e) => this.handleEditAccount(e)}
                    >
                      <div className="ac-col">
                        <Row>
                          <Col md="6">
                            <div>
                              <h6>Firstname</h6>
                              <div>
                                <span className="ac-small">
                                  {!isEmpty(customer)
                                    ? customer.firstname
                                    : null}
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <h6>Lastname</h6>
                              <div>
                                <span className="ac-small">
                                  {!isEmpty(customer)
                                    ? customer.lastname
                                    : null}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="edit-arrow">
                        <i className="fa fa-angle-right" />
                      </div>
                    </a>
                  </ListGroupItem>
                  <ListGroupItem>
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="ac-link"
                      onClick={(e) => this.handleEditAccount(e)}
                    >
                      <div className="ac-col">
                        <Row>
                          <Col md="6">
                            <div>
                              <h6>Phone</h6>
                              <div>
                                <span className="ac-small">
                                  {!isEmpty(customer)
                                    ? customer.mobileNo
                                    : null}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="edit-arrow">
                        <i className="fa fa-angle-right" />
                      </div>
                    </a>
                  </ListGroupItem>
                  <ListGroupItem>
                    {/* eslint-disable-next-line */}
                    <a href="#" className="ac-link">
                      <div className="ac-col">
                        <Row>
                          <Col md="6">
                            <div>
                              <h6>Email</h6>
                              <div>
                                <span className="ac-small">
                                  {!isEmpty(customer) ? customer.email : null}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="edit-arrow">
                        <i className="fa fa-angle-right" />
                      </div>
                    </a>
                  </ListGroupItem>
                  <ListGroupItem>
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="ac-link"
                      onClick={(e) => this.handleChangePswd(e)}
                    >
                      <div className="ac-col">
                        <Row>
                          <Col md="6">
                            <div>
                              <h6>Change your password</h6>
                              <div>
                                <span className="ac-small ac-span">
                                  Change your password at anytime.
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="edit-arrow">
                        <i className="fa fa-angle-right" />
                      </div>
                    </a>
                  </ListGroupItem>
                  <ListGroupItem>
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="ac-link"
                      onClick={(e) => this.handleDisAccount(e)}
                      style={{ cursor: "default" }}
                    >
                      <div className="ac-col">
                        <Row>
                          <Col md="6">
                            <div>
                              <h6>Adress Book</h6>
                              <small>Default shipping address</small>
                              <div className="pt-0">
                                <span className="ac-small">
                                  {!isEmpty(customer) ? (
                                    <>
                                      {customer.firstname} {customer.lastname}
                                      <br />
                                      {customer.deliveryAddress} <br />
                                      {customer.region.name}
                                      {", "}
                                      {customer.city.name}
                                      <br />
                                      {customer.mobileNo} <br />
                                    </>
                                  ) : null}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </a>
                  </ListGroupItem>
                  <ListGroupItem style={{ borderBottom: "0px" }}>
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="ac-link"
                      style={{ cursor: "default" }}
                      onClick={(e) => this.handleDisAccount(e)}
                    >
                      <div className="ac-col">
                        <Row>
                          <Col md="6">
                            <div>
                              <h6>Newsletter Subscriptions</h6>
                              <div className="pt-2">
                                <span className="ac-small">
                                  You are currently not subscribed to any of our
                                  newsletters.
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </a>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );

    return (
      <div className="animated fadeIn homepage-wrapper">
        {/* header */}
        <Header {...this.props} settingsData={settingsData} />
        {/* <!-- Product --> */}
        <section className="customer-account">
          <div className="container customer-account-wrapper">
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={4}>
                    <Card>
                      <ListGroup id="list-tab" role="tablist">
                        <ListGroupItem
                          onClick={() => this.toggleTabs(0)}
                          action
                          active={activeTab === 0}
                        >
                          <span>
                            <i className="zmdi zmdi-home"></i>
                          </span>
                          <span>My Account</span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(1)}
                          action
                          active={activeTab === 1}
                        >
                          <span>
                            <i className="zmdi zmdi-shopping-cart"></i>
                          </span>
                          <span>My Orders</span>
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                    <Card>
                      <ListGroup id="list-tab" role="tablist">
                        <ListGroupItem
                          onClick={() => this.toggleTabs(2)}
                          action
                          active={activeTab === 2}
                        >
                          <span>
                            <i className="zmdi zmdi-favorite-outline"></i>
                          </span>
                          <span>My Wishlist</span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(3)}
                          action
                          active={activeTab === 3}
                        >
                          <span>
                            <i className="zmdi zmdi-comment-outline"></i>
                          </span>
                          <span>My Reviews &amp; Ratings</span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(4)}
                          action
                          active={activeTab === 4}
                        >
                          <span>
                            <i className="zmdi zmdi-comment-outline"></i>
                          </span>
                          <span>My Subscriptions</span>
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                    <Card>
                      <ListGroup id="list-tab" role="tablist">
                        <ListGroupItem
                          onClick={() => this.toggleTabs(5)}
                          action
                          active={activeTab === 5}
                        >
                          <span>
                            <i className="zmdi zmdi-favorite-outline"></i>
                          </span>
                          <span>Personal Information</span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(6)}
                          action
                          active={activeTab === 6}
                        >
                          <span>
                            <i className="zmdi zmdi-lock"></i>
                          </span>
                          <span>Change Password </span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(7)}
                          action
                          active={activeTab === 7}
                        >
                          <span>
                            <i className="zmdi zmdi-pin"></i>
                          </span>
                          <span>Addresses</span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(8)}
                          action
                          active={activeTab === 8}
                        >
                          <span>
                            <i className="fa fa-user"></i>
                          </span>
                          <span>Profile Settings</span>
                        </ListGroupItem>
                        <ListGroupItem
                          onClick={() => this.toggleTabs(9)}
                          action
                          active={activeTab === 9}
                        >
                          <span>
                            <i className="fa fa-mail"></i>
                          </span>
                          <span>Update Email/Mobile</span>
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                    <Card>
                      <ListGroup id="list-tab" role="tablist">
                        <ListGroupItem
                          onClick={() => this.toggleTabs(10)}
                          action
                          active={activeTab === 10}
                        >
                          <span>
                            <i
                              className="fa fa-power-off"
                              style={{ fontSize: "15px" }}
                            ></i>
                          </span>
                          <span>Logout</span>
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col md={8}>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId={0}>
                        {editAccount ? (
                          <EditCustomerAccount
                            {...this.props}
                            customer={customer}
                            isChangePswd={isChangePswd}
                            editAccountToggle={this.editAccountToggle}
                          />
                        ) : (
                          <AccountDetails />
                        )}
                      </TabPane>
                      <TabPane tabId={1} className="tab-orders">
                        <Row>
                          <Col md={12}>
                            <Card
                              style={{
                                border: "none",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              <CardBody
                                style={{
                                  padding: "0",
                                }}
                              >
                                <ListGroup className="ac-menu">
                                  {!checkOrder ? (
                                    <>
                                      <ListGroupItem>
                                        <h2 className="ac-heading">
                                          <span>Your Orders</span>
                                        </h2>
                                      </ListGroupItem>
                                      <ListGroupItem
                                        style={{ borderBottom: "0px" }}
                                      >
                                        {userOrders && userOrders.length > 0 ? (
                                          <h6 className="fs-14 text-muted">
                                            Your orderd items total{" "}
                                            <small className="ff-RM text-muted">
                                              ({userOrders.length})
                                            </small>
                                          </h6>
                                        ) : null}
                                        <div className="order-wrapbox">
                                          {fetchingUserOrders ? (
                                            <div
                                              className="empty-orders"
                                              style={{
                                                margin: "8rem auto",
                                                minHeight: "0px",
                                              }}
                                            >
                                              <div className="col-empty">
                                                <img
                                                  src={loaderBg}
                                                  alt="Loading..."
                                                  className="mt-5"
                                                />
                                              </div>
                                            </div>
                                          ) : myOrders &&
                                            myOrders.length > 0 ? (
                                            myOrders.map((order) => (
                                              <ArticleOrder
                                                {...this.props}
                                                key={order.id}
                                                order={order}
                                                toCheckOrder={(e) =>
                                                  this.toCheckOrder(e)
                                                }
                                                parseDate={(t) =>
                                                  this.parseDate(t)
                                                }
                                              />
                                            ))
                                          ) : (
                                            <div className="empty-orders">
                                              <div className="col-empty">
                                                <img
                                                  className="colimage"
                                                  src={emptyOrderIcon}
                                                  height="100"
                                                  width="100"
                                                  alt="Empty Icon"
                                                />
                                                <h2 className="coltitle">
                                                  You have placed no orders yet!
                                                </h2>
                                                <p className="colpar">
                                                  All your orders will be saved
                                                  here for you to access their
                                                  state anytime.
                                                </p>
                                                <Button
                                                  color="dark"
                                                  size="sm"
                                                  onClick={this.contShopping}
                                                >
                                                  Continue Shopping
                                                </Button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <Pagination aria-label="Page navigation example">
                                          <PaginationItem>
                                            <PaginationLink first href="#" />
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink previous href="#" />
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink href="#">
                                              1
                                            </PaginationLink>
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink href="#">
                                              2
                                            </PaginationLink>
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink href="#">
                                              3
                                            </PaginationLink>
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink href="#">
                                              4
                                            </PaginationLink>
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink href="#">
                                              5
                                            </PaginationLink>
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink next href="#" />
                                          </PaginationItem>
                                          <PaginationItem>
                                            <PaginationLink last href="#" />
                                          </PaginationItem>
                                        </Pagination>
                                      </ListGroupItem>
                                    </>
                                  ) : (
                                    <OrderDetails
                                      {...this.props}
                                      checkOrderToggle={this.checkOrderToggle}
                                    />
                                  )}
                                </ListGroup>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId={2}>
                        <Row>
                          <Col md={12}>
                            <Card
                              style={{
                                border: "none",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              <CardBody
                                style={{
                                  padding: "0",
                                }}
                              >
                                <ListGroup className="ac-menu">
                                  <ListGroupItem>
                                    <h2 className="ac-heading">
                                      <span>Wishlist Items</span>
                                    </h2>
                                  </ListGroupItem>
                                  <ListGroupItem
                                    style={{ borderBottom: "0px" }}
                                  >
                                    {userOrders && userOrders.length > 0 ? (
                                      <h6 className="fs-14 text-muted">
                                        Your wishlist items total{" "}
                                        <small className="ff-RM text-muted">
                                          ({userOrders.length})
                                        </small>
                                      </h6>
                                    ) : null}
                                    <div className="wishlist-wrapbox">
                                      <ArticleWishlist />
                                    </div>
                                  </ListGroupItem>
                                </ListGroup>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId={3}>
                        <Row>
                          <Col md={12}>
                            <Card
                              style={{
                                border: "none",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              <CardBody
                                style={{
                                  padding: "0",
                                }}
                              >
                                <ListGroup className="ac-menu">
                                  <ListGroupItem>
                                    <h2 className="ac-heading">
                                      <span>Reviews &amp; Ratings</span>
                                    </h2>
                                  </ListGroupItem>
                                  <ListGroupItem
                                    style={{ borderBottom: "0px" }}
                                  >
                                    <div className="order-wrapbox">
                                      <div className="empty-orders">
                                        <div className="col-empty">
                                          <img
                                            className="colimage"
                                            src={emptyReviewIcon}
                                            height="100"
                                            width="100"
                                            alt="Empty Icon"
                                          />
                                          <h2 className="coltitle">
                                            You have no orders waiting for
                                            feedback
                                          </h2>
                                          <p className="colpar">
                                            After getting your products
                                            delivered, you will be able to rate
                                            and review them. Your feedback will
                                            be published on the product page to
                                            help our users get the best shopping
                                            experience!
                                          </p>
                                          <Button
                                            color="dark"
                                            size="sm"
                                            onClick={this.contShopping}
                                          >
                                            Continue Shopping
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </ListGroupItem>
                                </ListGroup>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId={4}>
                        <p>
                          Irure enim occaecat labore sit qui aliquip
                          reprehenderit amet velit. Deserunt ullamco ex elit
                          nostrud ut dolore nisi officia magna sit occaecat
                          laboris sunt dolor. Nisi eu minim cillum occaecat aute
                          est cupidatat aliqua labore aute occaecat ea aliquip
                          sunt amet. Aute mollit dolor ut exercitation irure
                          commodo non amet consectetur quis amet culpa. Quis
                          ullamco nisi amet qui aute irure eu. Magna labore
                          dolor quis ex labore id nostrud deserunt dolor eiusmod
                          eu pariatur culpa mollit in irure.
                        </p>
                      </TabPane>
                      <TabPane tabId={5}>
                        <p>
                          Irure enim occaecat labore sit qui aliquip
                          reprehenderit amet velit. Deserunt ullamco ex elit
                          nostrud ut dolore nisi officia magna sit occaecat
                          laboris sunt dolor. Nisi eu minim cillum occaecat aute
                          est cupidatat aliqua labore aute occaecat ea aliquip
                          sunt amet. Aute mollit dolor ut exercitation irure
                          commodo non amet consectetur quis amet culpa. Quis
                          ullamco nisi amet qui aute irure eu. Magna labore
                          dolor quis ex labore id nostrud deserunt dolor eiusmod
                          eu pariatur culpa mollit in irure.
                        </p>
                      </TabPane>
                      <TabPane tabId={6}>
                        <div className="animated fadeIn">
                          <Row>
                            <Col md="12">
                              <div className="edCustomerAc">
                                <ListGroup className="ac-menu">
                                  <ListGroupItem>
                                    <h2 className="ac-heading">
                                      <div style={{ lineHeight: "20px" }}>
                                        Change your password
                                      </div>
                                    </h2>
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <FormGroup
                                      className="edCustomerAc-form mb-0"
                                      row
                                    >
                                      <Col md="6">
                                        <Label htmlFor="currentPswd1">
                                          Current password
                                        </Label>
                                        <Input
                                          type="password"
                                          value={customerData.currentPswd}
                                          name="currentPswd"
                                          onChange={(e) =>
                                            this.handleChangeCust(e)
                                          }
                                          className="form-control-xs"
                                          id="currentPswd1"
                                        />
                                        <div className="pt-2">
                                          <Link to="/" className="pb-0">
                                            Forgot password?
                                          </Link>
                                        </div>
                                      </Col>
                                    </FormGroup>
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    {/* intentionaly blank*/}
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <FormGroup
                                      className="edCustomerAc-form"
                                      row
                                    >
                                      <Col md="6">
                                        <Label htmlFor="newPswd1">
                                          New password
                                        </Label>
                                        <Input
                                          type="password"
                                          value={customerData.newPswd}
                                          name="newPswd"
                                          onChange={(e) =>
                                            this.handleChangeCust(e)
                                          }
                                          className="form-control-xs"
                                          id="newPswd1"
                                        />
                                      </Col>
                                    </FormGroup>
                                    <FormGroup
                                      className="edCustomerAc-form"
                                      row
                                    >
                                      <Col md="6">
                                        <Label htmlFor="confirmPswd1">
                                          Confirm password
                                        </Label>
                                        <Input
                                          type="password"
                                          value={customerData.confirmPswd}
                                          name="confirmPswd"
                                          onChange={(e) =>
                                            this.handleChangeCust(e)
                                          }
                                          className="form-control-xs"
                                          id="confirmPswd1"
                                        />
                                      </Col>
                                    </FormGroup>
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    {/* intentionaly blank*/}
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <span className="ac-span">
                                      Changing your password will log you out of
                                      all your active sessions except the one
                                      you’re using at this time
                                    </span>
                                  </ListGroupItem>
                                  <ListGroupItem
                                    style={{ borderBottom: "0px" }}
                                  >
                                    <FormGroup className="edCustomerAc-form mb-0">
                                      <Button
                                        type="button"
                                        color="primary"
                                        className="ff-RM text-white"
                                        onClick={(e) =>
                                          this.saveChangePassword(e)
                                        }
                                      >
                                        Save
                                      </Button>
                                    </FormGroup>
                                  </ListGroupItem>
                                </ListGroup>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </TabPane>
                      <TabPane tabId={7}>
                        <Row>
                          <Col md={12}>
                            <Card
                              style={{
                                border: "none",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              <CardBody
                                style={{
                                  padding: "0",
                                }}
                              >
                                <ListGroup className="ac-menu">
                                  <ListGroupItem>
                                    <h2 className="ac-heading">
                                      <span>Addresses</span>
                                    </h2>
                                    <Button
                                      type="button"
                                      color="link"
                                      className="m-0 p-0 float-right"
                                      size="sm"
                                    >
                                      <i className="fa fa-plus"></i> Add Address
                                    </Button>
                                  </ListGroupItem>
                                  <ListGroupItem
                                    style={{ borderBottom: "0px" }}
                                  >
                                    <Row>
                                      <Col md="6">
                                        <Card className="address-wrapper">
                                          <CardBody className="pt-0">
                                            <p className="text-success pt-3 pb-2">
                                              <i className="fa fa-check-circle"></i>{" "}
                                              Default Address
                                            </p>
                                            <p>Kennedy Peters</p>
                                            <p>254740271085</p>
                                            <p>
                                              Changamwe,Mombasa Changamwe
                                              elshadai KiliShhop,Chaani Mombasa
                                              Chaani chiefs Office Mlolongo Road
                                              Seaview near Kipevu Primary
                                              School, Cellphone: 254706644261
                                            </p>
                                            <p>Changamwe, Mombasa</p>
                                            <p>Kenya</p>
                                          </CardBody>
                                        </Card>
                                      </Col>
                                      <Col md="6">
                                        <Card className="address-wrapper">
                                          <CardBody>
                                            <p>Kennedy Peters</p>
                                            <p>254740271085</p>
                                            <p>
                                              Changamwe,Mombasa Changamwe
                                              elshadai KiliShhop,Chaani Mombasa
                                              Chaani chiefs Office Mlolongo Road
                                              Seaview near Kipevu Primary
                                              School, Cellphone: 254706644261
                                            </p>
                                            <p>Changamwe, Mombasa</p>
                                            <p>Kenya</p>
                                          </CardBody>
                                        </Card>
                                      </Col>
                                      <Col md="6">
                                        <Card className="address-wrapper">
                                          <CardBody>
                                            <p>Kennedy Peters</p>
                                            <p>254740271085</p>
                                            <p>
                                              Changamwe,Mombasa Changamwe
                                              elshadai KiliShhop,Chaani Mombasa
                                              Chaani chiefs Office Mlolongo Road
                                              Seaview near Kipevu Primary
                                              School, Cellphone: 254706644261
                                            </p>
                                            <p>Changamwe, Mombasa</p>
                                            <p>Kenya</p>
                                          </CardBody>
                                        </Card>
                                      </Col>
                                    </Row>
                                  </ListGroupItem>
                                </ListGroup>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId={8}>
                        <p>
                          Irure enim occaecat labore sit qui aliquip
                          reprehenderit amet velit. Deserunt ullamco ex elit
                          nostrud ut dolore nisi officia magna sit occaecat
                          laboris sunt dolor. Nisi eu minim cillum occaecat aute
                          est cupidatat aliqua labore aute occaecat ea aliquip
                          sunt amet. Aute mollit dolor ut exercitation irure
                          commodo non amet consectetur quis amet culpa. Quis
                          ullamco nisi amet qui aute irure eu. Magna labore
                          dolor quis ex labore id nostrud deserunt dolor eiusmod
                          eu pariatur culpa mollit in irure.
                        </p>
                      </TabPane>
                      <TabPane tabId={9}>
                        <p>
                          Irure enim occaecat labore sit qui aliquip
                          reprehenderit amet velit. Deserunt ullamco ex elit
                          nostrud ut dolore nisi officia magna sit occaecat
                          laboris sunt dolor. Nisi eu minim cillum occaecat aute
                          est cupidatat aliqua labore aute occaecat ea aliquip
                          sunt amet. Aute mollit dolor ut exercitation irure
                          commodo non amet consectetur quis amet culpa. Quis
                          ullamco nisi amet qui aute irure eu. Magna labore
                          dolor quis ex labore id nostrud deserunt dolor eiusmod
                          eu pariatur culpa mollit in irure.
                        </p>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        {/* Footer */}
        <Footer {...this.props} settingsData={settingsData} />
        {/*  Back to top */}
        <div className="btn-back-to-top" id="scrollToTopBtn">
          <span className="symbol-btn-back-to-top">
            <i className="zmdi zmdi-chevron-up"></i>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userOrders: state.orders.userOrders,
  authUser: state.users.auth,
  customer: state.customers.findCustomer,
  settings: state.settings.settings,
  fetchingUserOrders: state.orders.fetchingUserOrders,
  cities: state.cities.cities,
  regions: state.regions.regions,
});

const mapDispatchToProps = {
  fetchCartlist,
  fetchAuthUser,
  fetchShipping,
  findUserOrders,
  findCustomer,
  fetchSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccount);
