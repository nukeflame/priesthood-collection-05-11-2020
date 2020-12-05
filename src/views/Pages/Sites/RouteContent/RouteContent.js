import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import { fetchPages } from "../../../../redux/actions/pageAction";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

class RouteContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "",
    };
  }

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    //
    this.props.fetchPages();
    //check route path
    const { about, contact, blog } = this.props;
    if (blog) {
      this.setState({ pageTitle: "Blog" });
    } else if (about) {
      this.setState({ pageTitle: "About" });
    } else if (contact) {
      this.setState({ pageTitle: "Contact" });
    }
  }

  formatHtml = (data) => {
    return { __html: data };
  };

  render() {
    const { pageTitle } = this.state;
    const { pages } = this.props;
    const page = pages.filter((page) => page.title === pageTitle);

    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container">
          <div className="homepage-breadcrumb">
            <Link to="/home" className="bread-link bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">{pageTitle}</span>
          </div>
          <h2>{/* {pageTitle} <span className="small">l</span> */}</h2>
        </div>
        <div className="container">
          {page && page.length > 0 ? (
            <div className="blog-single section">
              <div dangerouslySetInnerHTML={this.formatHtml(page[0].content)} />
            </div>
          ) : (
            <div
              className="app flex-row align-items-center"
              style={{ minHeight: "60vh", height: "60vh" }}
            >
              <Container>
                <Row className="justify-content-center">
                  <Col md="6">
                    <div className="clearfix">
                      <h1 className="float-left display-3 mr-4">404</h1>
                      <h4 className="pt-3">Oops! You're lost.</h4>
                      <p className="text-muted float-left">
                        The page you are looking for was not found.
                      </p>
                    </div>
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        size="16"
                        type="text"
                        placeholder="What are you looking for?"
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="info">Search</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.pages.pages,
});

const mapDispatchToProps = { fetchPages };

export default connect(mapStateToProps, mapDispatchToProps)(RouteContent);
