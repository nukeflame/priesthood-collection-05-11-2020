import React, { Component } from "react";
// import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import defaultAvatar from "../../assets/avatar/defAvatar.gif";
import { isNull } from "lodash";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      countNotification: 0,
    };
  }

  toSettings = () => {
    this.props.history.push("/settings");
  };

  toHomepage = () => {
    this.props.history.push("/home");
  };

  render() {
    // eslint-disable-next-line
    const { authUser, settingsData, children, ...attributes } = this.props;
    const { countNotification, notifications } = this.state;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: settingsData && settingsData.siteLogoUrl,
            width: 144,
            height: "82%",
            alt: "",
          }}
          minimized={{
            src: settingsData && settingsData.siteLogoUrl,
            width: 30,
            height: 30,
            alt: "",
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {/* right sidebar */}
        <Nav className="ml-auto" navbar>
          {/* Notifications */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav onClick={this.viewNotifications}>
              <div className="top-badge">
                <i className="icon-bell" />
                {countNotification !== 0 ? (
                  <Badge pill color="danger">
                    {countNotification}
                  </Badge>
                ) : (
                  ""
                )}
              </div>
            </DropdownToggle>
            <DropdownMenu right className="notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                {notifications && notifications.length > 0 ? (
                  <a
                    href="/"
                    className="clear-noti"
                    onClick={this.handleClearNotifications}
                  >
                    Clear All
                  </a>
                ) : null}
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  {notifications && notifications.length > 0 ? (
                    notifications.map(
                      (notification) =>
                        // <NotificationList
                        //   key={notification.id}
                        //   notification={notification}
                        // />
                        "ee"
                    )
                  ) : (
                    <p className="text-center text-muted my-2">
                      No new notifications
                    </p>
                  )}
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="/">View all Notifications</a>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* Messages */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <div className="top-badge">
                <i className="icon-speech" />
                <Badge pill color="danger">
                  5
                </Badge>
              </div>
            </DropdownToggle>
            <DropdownMenu right className="notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Messages</span>
                <a href="/rel" className="clear-noti">
                  Clear All
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="/">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={"/"} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">12:28 AM</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="/">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={"/"} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">12:28 AM</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="notification-message">
                    <a href="/">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={"/"} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">12:28 AM</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="notification-message">
                    <a href="/">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={"/"} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Kennedy Peters</span>
                          <span className="message-time">6 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="notification-message">
                    <a href="/">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={"/"} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">27 Feb</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="/">View all Notifications</a>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* Profile */}
          <UncontrolledDropdown nav direction="down" className="mr-2">
            <DropdownToggle nav>
              <span className="user-img">
                {!isNull(authUser) ? (
                  <img src={authUser.avatar} className="img-avatar" alt="" />
                ) : (
                  <img src={defaultAvatar} className="img-avatar" alt="" />
                )}
                <span className="status online" />
              </span>
            </DropdownToggle>
            <DropdownMenu
              right
              style={{
                width: "250px",
                position: "absolute",
                willChange: "transform",
                top: "0px",
                left: "0px",
                transform: "translate3d(-200px, 35px, 0px)",
              }}
            >
              <DropdownItem
                disabled
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <i className="icon-user f-w-600" />
                {authUser && authUser.email}
              </DropdownItem>
              <DropdownItem onClick={this.toHomepage}>
                <i className="cui-home" /> Homepage
              </DropdownItem>
              <DropdownItem onClick={this.toSettings}>
                <i className="ti-settings" /> Settings
              </DropdownItem>
              <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                <i className="ti-power-off" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  authUser: state.users.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
