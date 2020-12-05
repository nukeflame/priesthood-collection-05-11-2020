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
  FormGroup,
  Label,
} from "reactstrap";
import { imageUrl } from "../../../../config/helpers";

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Blog",
    };
  }

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    $(".homepage-wrapper .header-v4 .container-menu-desktop").addClass(
      "blog-single-bg"
    );
    $(".header-v4 .wrap-menu-desktop").addClass("blog-header-shadow");
    //
    this.props.fetchPages();
  }

  formatHtml = (data) => {
    return { __html: data };
  };

  render() {
    const { pageTitle } = this.state;
    const { pages } = this.props;
    const page = pages.filter((page) => page.title === pageTitle);

    return (
      <div
        className="wrapper-component animated fadeIn"
        style={{ backgroundColor: "var(--white)" }}
      >
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
              <section className="bg0  p-b-60">
                <div className="container">
                  <Row>
                    <Col md="8" lg="9" className="p-b-80">
                      <div className="p-r-45 p-r-0-lg">
                        <div className="p-b-63">
                          <a
                            href="blog-detail.html"
                            className="hov-img0 how-pos5-parent hidden p-b-32"
                          >
                            <img
                              src={`${imageUrl()}/bg-04.jpg`}
                              alt="IMG-BLOG"
                            />
                            <div className="flex-col-c-m size-123 bg9 how-pos5">
                              <span className="ltext-107 cl2 txt-center">
                                23
                              </span>

                              <span className="stext-109 cl3 txt-center">
                                Jan 2018
                              </span>
                            </div>
                          </a>

                          <div>
                            <h4 className="p-b-15">
                              <a
                                href="blog-detail.html"
                                className="ltext-108 cl2 hov-cl1 trans-04"
                              >
                                8 Inspiring Ways to Wear Dresses in the Winter
                              </a>
                            </h4>

                            <p className="stext-117 cl6">
                              Class aptent taciti sociosqu ad litora torquent
                              per conubia nostra, per inceptos himenaeos. Fusce
                              eget dictum tortor. Donec dictum vitae sapien eu
                              varius
                            </p>

                            <div className="flex-w flex-sb-m p-t-18">
                              <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                <span>
                                  <span className="cl4">By</span> Admin
                                  <span className="cl12 m-l-4 m-r-6">|</span>
                                </span>

                                <span>
                                  StreetStyle, Fashion, Couple
                                  <span className="cl12 m-l-4 m-r-6">|</span>
                                </span>

                                <span>8 Comments</span>
                              </span>

                              <a
                                href="blog-detail.html"
                                className="stext-101 cl2 hov-cl1 trans-04 m-tb-10"
                              >
                                Continue Reading
                                <i className="fa fa-long-arrow-right m-l-9"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="p-b-63">
                          <a
                            href="blog-detail.html"
                            className="hov-img0 how-pos5-parent hidden p-b-32"
                          >
                            <img
                              src={`${imageUrl()}/bg-04.jpg`}
                              alt="IMG-BLOG"
                            />
                            <div className="flex-col-c-m size-123 bg9 how-pos5">
                              <span className="ltext-107 cl2 txt-center">
                                23
                              </span>

                              <span className="stext-109 cl3 txt-center">
                                Jan 2018
                              </span>
                            </div>
                          </a>

                          <div>
                            <h4 className="p-b-15">
                              <a
                                href="blog-detail.html"
                                className="ltext-108 cl2 hov-cl1 trans-04"
                              >
                                8 Inspiring Ways to Wear Dresses in the Winter
                              </a>
                            </h4>

                            <p className="stext-117 cl6">
                              Class aptent taciti sociosqu ad litora torquent
                              per conubia nostra, per inceptos himenaeos. Fusce
                              eget dictum tortor. Donec dictum vitae sapien eu
                              varius
                            </p>

                            <div className="flex-w flex-sb-m p-t-18">
                              <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                <span>
                                  <span className="cl4">By</span> Admin
                                  <span className="cl12 m-l-4 m-r-6">|</span>
                                </span>

                                <span>
                                  StreetStyle, Fashion, Couple
                                  <span className="cl12 m-l-4 m-r-6">|</span>
                                </span>

                                <span>8 Comments</span>
                              </span>

                              <a
                                href="blog-detail.html"
                                className="stext-101 cl2 hov-cl1 trans-04 m-tb-10"
                              >
                                Continue Reading
                                <i className="fa fa-long-arrow-right m-l-9"></i>
                              </a>
                            </div>
                          </div>

                          {/* <!-- Pagination --> */}
                          <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
                            {/* eslint-disable-next-line */}
                            <a
                              href="#"
                              className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1"
                            >
                              1
                            </a>
                            {/* eslint-disable-next-line */}
                            <a
                              href="#"
                              className="flex-c-m how-pagination1 trans-04 m-all-7"
                            >
                              2
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" lg="3" className="p-b-80">
                      <div className="side-menu">
                        <div className="single-widget search">
                          <input
                            type="text"
                            name="search"
                            placeholder="Search"
                          />
                          <button type="button">
                            <i className="zmdi zmdi-search fs-14"></i>
                          </button>
                        </div>
                        <div class="p-t-15">
                          <h4 class="mtext-11 ff-RM cl2 p-b-15">
                            Blog Categories
                          </h4>

                          <ul className="categor-list">
                            <li class="bor18">
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                class="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                              >
                                Fashion
                              </a>
                            </li>

                            <li class="bor18">
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                class="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                              >
                                Beauty
                              </a>
                            </li>

                            <li class="bor18">
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                class="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                              >
                                Street Style
                              </a>
                            </li>

                            <li class="bor18">
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                class="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                              >
                                Life Style
                              </a>
                            </li>

                            <li class="bor18">
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                class="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                              >
                                DIY Crafts
                              </a>
                            </li>
                          </ul>

                          <div class="single-widget recent-post">
                            <h4 class="title">Recent post</h4>

                            <div class="single-post">
                              <div class="image">
                                <img
                                  src={`${imageUrl()}/TigdoK6AROzWSEtmeNBsn1v7gPo8f1UZAWvpVhbI.jpeg`}
                                  height="100"
                                  width="100"
                                  alt="#"
                                />
                              </div>
                              <div class="content">
                                <h5>
                                  {/* eslint-disable-next-line */}
                                  <a href="#">
                                    Top 10 Beautyful Women Dress in the world
                                  </a>
                                </h5>
                                <ul class="comment">
                                  <li>
                                    <i
                                      class="fa fa-calendar"
                                      aria-hidden="true"
                                    ></i>
                                    Jan 11, 2020
                                  </li>
                                  <li>
                                    <i
                                      class="fa fa-commenting-o"
                                      aria-hidden="true"
                                    ></i>
                                    35
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div class="single-post">
                              <div class="image">
                                <img
                                  src={`${imageUrl()}/TigdoK6AROzWSEtmeNBsn1v7gPo8f1UZAWvpVhbI.jpeg`}
                                  height="100"
                                  width="100"
                                  alt="#"
                                />
                              </div>
                              <div class="content">
                                <h5>
                                  {/* eslint-disable-next-line */}
                                  <a href="#">
                                    Top 10 Beautyful Women Dress in the world
                                  </a>
                                </h5>
                                <ul class="comment">
                                  <li>
                                    <i
                                      class="fa fa-calendar"
                                      aria-hidden="true"
                                    ></i>
                                    Mar 05, 2019
                                  </li>
                                  <li>
                                    <i
                                      class="fa fa-commenting-o"
                                      aria-hidden="true"
                                    ></i>
                                    59
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div class="single-post">
                              <div class="image">
                                <img
                                  src={`${imageUrl()}/TigdoK6AROzWSEtmeNBsn1v7gPo8f1UZAWvpVhbI.jpeg`}
                                  height="100"
                                  width="100"
                                  alt="#"
                                />
                              </div>
                              <div class="content">
                                <h5>
                                  {/* eslint-disable-next-line */}
                                  <a href="#">
                                    Top 10 Beautyful Women Dress in the world
                                  </a>
                                </h5>
                                <ul class="comment">
                                  <li>
                                    <i
                                      class="fa fa-calendar"
                                      aria-hidden="true"
                                    ></i>
                                    June 09, 2019
                                  </li>
                                  <li>
                                    <i
                                      class="fa fa-commenting-o"
                                      aria-hidden="true"
                                    ></i>
                                    44
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 class="mtext-11 ff-RM cl2 p-b-15">Newslater</h4>
                            <FormGroup>
                              <Label htmlFor="newslater"></Label>
                              <Input
                                type="text"
                                id="newslater"
                                className="form-control-xs"
                                placeholder="Enter your Email"
                              />
                            </FormGroup>
                            <Button
                              block
                              color="primary"
                              className="text-uppercase btn-square"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </section>

              {/* <div dangerouslySetInnerHTML={this.formatHtml(page[0].content)} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
