import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button, Collapse } from "reactstrap";
import classNames from "classnames";
import {
  fetchCategory,
  findCategoryProduct,
} from "../../../../redux/actions/categoryAction";
import {
  fetchProducts,
  fetchProductSort,
} from "../../../../redux/actions/productAction";
import { ProductContainer } from "../../Includes";
import $ from "jquery";
import { isEmpty } from "lodash";
// import { imageUrl } from "../../../../config/helpers";
import queryString from "query-string";
import catLoadImg from "../../../../assets/loader/arrow-loader.svg";

class ShopCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      custom: [true, false, false, false, false],
      results: { name: "", slug: "", tags: "" },
    };
  }

  filterCatProduct = (e, c) => {
    e.preventDefault();
    this.props.findCategoryProduct(c);
  };

  toggleCustom = (t) => {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (t === index ? !x : false));
    this.setState({ custom: state });
  };

  changeSortBy = (e) => {
    e.preventDefault();
    $("body").css("opacity", "0.7");
    let sortB = $("#shopSortby .sortby-list");
    sortB.removeClass("active");
    let t = e.currentTarget;
    if (t.className.includes("relevence")) {
      $(t).addClass("active");
      this.props.fetchProductSort("relevence").then(() => {
        $("body").css("opacity", "1");
      });
    } else if (t.className.includes("popular")) {
      $(t).addClass("active");
      this.props.fetchProductSort("popular").then(() => {
        $("body").css("opacity", "1");
      });
    } else if (t.className.includes("PlowToHigh")) {
      $(t).addClass("active");
      this.props.fetchProductSort("PlowToHigh").then(() => {
        $("body").css("opacity", "1");
      });
    } else if (t.className.includes("PhighToLow")) {
      $(t).addClass("active");
      this.props.fetchProductSort("PhighToLow").then(() => {
        $("body").css("opacity", "1");
      });
    } else if (t.className.includes("newFirst")) {
      $(t).addClass("active");
      this.props.fetchProductSort("newFirst").then(() => {
        $("body").css("opacity", "1");
      });
    }
  };

  initMethods = () => {
    // $("#slider-range").slider({
    //   range: true,
    //   min: 0,
    //   max: 500,
    //   values: [120, 250],
    //   slide: function (event, ui) {
    //     $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    //   },
    // });
    // $("#amount").val(
    //   "$" +
    //     $("#slider-range").slider("values", 0) +
    //     " - $" +
    //     $("#slider-range").slider("values", 1)
    // );
  };

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 0);
    // this.initMethods();
    //fetch
    this.props.fetchCategory();
    this.props.fetchProducts();
  }

  render() {
    const { products, searchQuery, categories, categoriesLoad } = this.props;

    return (
      <div className="wrapper-component animated fadeIn">
        <div className="container">
          <div className="homepage-breadcrumb">
            <Link to="/home" className="bread-link bread-link">
              Home
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <Link to="/shop-catalog" className="bread-link bread-link">
              Shoping Catalog
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
            <span className="active">Clothing</span>
          </div>
        </div>
        <div className="container mt-3">
          <Row>
            <Col md={3} sm={12}>
              <div
                className={
                  "shop-sidebar " + classNames({ "h-sidebar": categoriesLoad })
                }
              >
                {categoriesLoad ? (
                  <div className="shop-loader">
                    <img src={catLoadImg} alt="" />
                  </div>
                ) : (
                  <>
                    <div className="single-widget category">
                      <h3 className="title">Categories</h3>
                      {categories && categories.length > 0
                        ? categories.map((c, i) => (
                            <div className="categor-list-wrapper" key={i}>
                              <Button
                                className="title-cat"
                                color="link"
                                onClick={() => this.toggleCustom(i)}
                                aria-expanded={this.state.custom[i]}
                                aria-controls="cat-list-01"
                              >
                                <span>
                                  <i
                                    className={
                                      this.state.custom[i]
                                        ? "fa fa-chevron-down pr-2 fs-13"
                                        : "fa fa-chevron-right pr-2 fs-13"
                                    }
                                  ></i>
                                </span>
                                {c.name}
                              </Button>
                              <Collapse
                                isOpen={this.state.custom[i]}
                                data-parent="#exampleAccordion"
                                id="cat-list-01"
                              >
                                {c.subcategory.length > 0
                                  ? c.subcategory.map((s, ix) => (
                                      <Link
                                        key={ix}
                                        className="cat-listsmall"
                                        title={s.name}
                                        to={`shop-catalog?${queryString.stringify(
                                          { sid: s.id },
                                          { sid: s.id }
                                        )}`}
                                      >
                                        {s.name}
                                      </Link>
                                    ))
                                  : null}
                              </Collapse>
                            </div>
                          ))
                        : null}
                    </div>
                    <div className="single-widget range">
                      <h3 className="title">Price</h3>
                      <div className="wsq-filter-wrapper__content">
                        <span
                          className="wsq-filter-shrink"
                          style={{
                            width: "52px",
                            height: "26px",
                            lineHeight: "26px",
                            borderRadius: "4px",
                          }}
                        >
                          <input
                            placeholder="min"
                            height="100%"
                            autoComplete="off"
                            data-spm-anchor-id="a2700.galleryofferlist.0.i4.11532f7eAKVTHf"
                          />
                        </span>
                        <span
                          className="seb-filter-price_no-shrink"
                          style={{ marginLeft: "2px", marginRight: "2px" }}
                        >
                          -
                        </span>
                        <span
                          className="wsq-filter-shrink"
                          style={{
                            width: "52px",
                            height: "26px",
                            lineHeight: "26px",
                            borderRadius: "4px",
                          }}
                        >
                          <input
                            placeholder="max"
                            height="100%"
                            autoComplete="off"
                            data-spm-anchor-id="a2700.galleryofferlist.0.i5.11532f7eAKVTHf"
                          />
                        </span>
                        {/* eslint-disable-next-line */}
                        <a
                          data-aplus-auto-filter="true"
                          data-params="floorName=l-price&amp;filterValue=start:@@end:&amp;filterType=radio"
                          data-aplus-clk="x4_3eb602"
                          data-spm-anchor-id="a2700.galleryofferlist.0.0"
                        >
                          <button
                            className="wsq-button"
                            type="button"
                            style={{ borderRadius: "0px", marginLeft: "5px" }}
                          >
                            OK
                          </button>
                        </a>
                      </div>
                    </div>
                    {/* post */}
                    <div className="single-widget recent-post hidden">
                      <h3 className="title">Brand</h3>
                      <div>
                        <div className="_single-widget">
                          <div className="_widget-br">
                            <div className="-FTLnR">
                              {/*dd*/}
                              <i className="fa fa-search" />
                              <input
                                type="text"
                                className="_3vKPvR"
                                placeholder="Search Brand"
                              />
                            </div>
                            <div className="_4IiNRh _2mtkou" title="boAt">
                              <div className="_2wQvxh _1WV8jE">
                                <div className="_2kFyHg _2mtkou">
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="_3uUUD5"
                                      readOnly=""
                                      value="on"
                                    />
                                    <div className="_1p7h2j"></div>
                                    <div className="_1GEhLw">boAt</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="_4IiNRh _2mtkou" title="Syska">
                              <div className="_2wQvxh _1WV8jE">
                                <div className="_2kFyHg _2mtkou">
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="_3uUUD5"
                                      readOnly=""
                                      value="on"
                                    />
                                    <div className="_1p7h2j"></div>
                                    <div className="_1GEhLw">Syska</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="_4IiNRh _2mtkou" title="Ambrane">
                              <div className="_2wQvxh _1WV8jE">
                                <div className="_2kFyHg _2mtkou">
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="_3uUUD5"
                                      readOnly=""
                                      value="on"
                                    />
                                    <div className="_1p7h2j"></div>
                                    <div className="_1GEhLw">Ambrane</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="_4IiNRh _2mtkou" title="Apple">
                              <div className="_2wQvxh _1WV8jE">
                                <div className="_2kFyHg _2mtkou">
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="_3uUUD5"
                                      readOnly=""
                                      value="on"
                                    />
                                    <div className="_1p7h2j"></div>
                                    <div className="_1GEhLw">Apple</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="_4IiNRh _2mtkou" title="Philips">
                              <div className="_2wQvxh _1WV8jE">
                                <div className="_2kFyHg _2mtkou">
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="_3uUUD5"
                                      readOnly=""
                                      value="on"
                                    />
                                    <div className="_1p7h2j"></div>
                                    <div className="_1GEhLw">Philips</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="_4IiNRh _2mtkou" title="Mivi">
                              <div className="_2wQvxh _1WV8jE">
                                <div className="_2kFyHg _2mtkou">
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="_3uUUD5"
                                      readOnly=""
                                      value="on"
                                    />
                                    <div className="_1p7h2j"></div>
                                    <div className="_1GEhLw">Mivi</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opNt-w _2Tprpw">
                            <span>5472 MORE</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* post */}
                    <div className="single-widget recent-post hidden">
                      <h3 className="title">Recent post</h3>
                      <div className="single-post first">
                        <div className="image">
                          {/* <img
                          src={`${imageUrl()}/OvHRlX1CpJtCrfpAe3JnRY9kfwM9KjfounaKiwa4.jpeg`}
                          alt=""
                        /> */}
                        </div>
                        <div className="content">
                          <h5>
                            <a href="/">Laptop Hp x403 EliteBook 65G RAM</a>
                          </h5>
                          <p className="price">$99.50</p>
                          <ul className="reviews">
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li>
                              <i className="ti-star"></i>
                            </li>
                            <li>
                              <i className="ti-star"></i>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="single-post first">
                        <div className="image">
                          {/* <img
                          src={`${imageUrl()}/TigdoK6AROzWSEtmeNBsn1v7gPo8f1UZAWvpVhbI.jpeg`}
                          alt=""
                        /> */}
                        </div>
                        <div className="content">
                          <h5>
                            <a href="/">Women Clothings</a>
                          </h5>
                          <p className="price">$99.50</p>
                          <ul className="reviews">
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li>
                              <i className="ti-star"></i>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="single-post first">
                        <div className="image">
                          {/* <img
                          src={`${imageUrl()}/BIvYYTc3Vcc1a2qyGjEW6yNLZY8rrtri.jpeg`}
                          alt=""
                        /> */}
                        </div>
                        <div className="content">
                          <h5>
                            <a href="/">Man Tshirt</a>
                          </h5>
                          <p className="price">$99.50</p>
                          <ul className="reviews">
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                            <li className="yellow">
                              <i className="ti-star"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col md={9} sm={12} style={{ padding: "0px 15px 0px 0px" }}>
              <section
                className="sec-product"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="container">
                  {!isEmpty(searchQuery) && products && products.length > 0 ? (
                    <div className="item-info">
                      <span className="prod-title">
                        {products.length > 1
                          ? products.length + " Products found."
                          : products.length + " Product found."}
                        {/* Showing 1 – 40 of 27,99,419 results for "
                         */}
                      </span>
                    </div>
                  ) : null}
                  <div className="sec-product-sort" id="shopSortby">
                    <span className="sortby-name">Sort By</span>
                    <div
                      className="sortby-list relevence active"
                      onClick={(e) => this.changeSortBy(e)}
                    >
                      Relevance
                    </div>
                    <div
                      className="sortby-list popular"
                      onClick={(e) => this.changeSortBy(e)}
                    >
                      Popularity
                    </div>
                    <div
                      className="sortby-list PlowToHigh"
                      onClick={(e) => this.changeSortBy(e)}
                    >
                      Price -- Low to High
                    </div>
                    <div
                      className="sortby-list PhighToLow"
                      onClick={(e) => this.changeSortBy(e)}
                    >
                      Price -- High to Low
                    </div>
                    <div
                      className="sortby-list newFirst"
                      onClick={(e) => this.changeSortBy(e)}
                    >
                      Newest First
                    </div>
                  </div>
                </div>
                <hr style={{ margin: "0px" }} />
                <article className="container pr-outer-gallery">
                  <Row>
                    <ProductContainer {...this.props} products={products} />
                  </Row>
                </article>
              </section>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  categoriesLoad: state.categories.categoriesLoad,
  products: state.products.products,
  searchQuery: state.search.query,
});

const mapDispatchToProps = {
  fetchCategory,
  fetchProducts,
  findCategoryProduct,
  fetchProductSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCatalog);
