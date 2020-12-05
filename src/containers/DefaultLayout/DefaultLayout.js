import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes/dashRoots";
import { connect } from "react-redux";
import { ReactTableDefaults } from "react-table";
import { destroyToken, getUserData } from "../../config/auth";
import { ToastContainer } from "react-toastify";
import { isNull } from "lodash";
import { fetchAuthUser } from "../../redux/actions/userAction";
import { fetchSettings } from "../../redux/actions/settingAction";
import loaderSm from "../../assets/loader/ajax-loader.gif";

Object.assign(ReactTableDefaults, {
  defaultPageSize: 13,
  pageSizeOptions: [13, 23, 50],
  loadingText: (
    <div className="animated fadeIn text-center mt-5">
      <img src={loaderSm} alt="Loading..." className="pt-2" />
      {/* <div className="sk-spinner sk-spinner-pulse" /> */}
    </div>
  ),
});

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
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

  loadingBody = () => (
    <div
      className="animated fadeIn pt-1 text-center d-flex justify-content-center"
      style={{ margin: "40px auto" }}
    >
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  loadingSidebar = () => (
    <div
      className="animated fadeIn pt-1 text-center d-flex justify-content-center"
      style={{ margin: "195px auto" }}
    >
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  signOut = (e) => {
    e.preventDefault();
    destroyToken();
    this.props.history.push("/auth/login");
  };

  componentDidMount() {
    const userData = getUserData() && getUserData();
    if (!isNull(userData)) {
      this.props.fetchAuthUser(userData.email);
    }
    //settings
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
  }

  render() {
    const { settingsData } = this.state;
    const { authUser } = this.props;

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              {...this.props}
              onLogout={(e) => this.signOut(e)}
              authUser={authUser}
              settingsData={settingsData}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loadingBody()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <route.component {...props} authUser={authUser} />
                        )}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loadingSidebar()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        {/* toastify */}
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.users.auth,
  settings: state.settings.settings,
});

const mapDispatchToProps = {
  fetchAuthUser,
  fetchSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
