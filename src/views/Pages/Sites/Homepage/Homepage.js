import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { SlidePanel, FeaturedBanner, CarouselBanner } from "./Banners";
import {
  getSliderPosts,
  getfeaturedPosts,
  getHomepagePosts,
} from "../../../../redux/actions/postAction";

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 1;
var data1 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(0, 1));
}

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fPosts: [],
    };
  }

  toOfferList = (e, p) => {
    e.preventDefault();
    this.props.history.push(`/offers-list/${p.slug}`);
  };

  componentDidMount() {
    this.props.getHomepagePosts();
    this.props.getSliderPosts();
    this.props.getfeaturedPosts().then(() => {
      const { feauturedPosts } = this.props;
      if (feauturedPosts.length > 0) {
        const fPosts = feauturedPosts[0].promoProducts.filter((p, i) => i < 3);
        this.setState({ fPosts });
      }
    });
  }

  render() {
    const { sliderPosts, homepagePost, networkError } = this.props;
    const { fPosts } = this.state;

    return (
      <div style={{ backgroundColor: "#f1f3f6" }}>
        {/* Slider */}
        <section className="section-slide">
          <CarouselBanner {...this.props} homepagePost={homepagePost} />
        </section>
        {/* Banner  */}
        <div className="sec-banner" style={{ backgroundColor: "#f1f3f6" }}>
          <div className={data1[0] ? "container" : "mx-4"}>
            <Row>
              <Col sm={12}>
                <div style={{ padding: "0px 0px 0px 0px", display: "block" }}>
                  <Row>
                    {fPosts && fPosts.length > 0
                      ? fPosts.map((post) => (
                          <FeaturedBanner
                            key={post.id}
                            {...this.props}
                            post={post}
                          />
                        ))
                      : null}
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Products */}
        <section className="sec-product">
          <div className={data1[1] ? "container" : "mx-4"}>
            <Row>
              <Col sm={12}>
                {sliderPosts && sliderPosts.length > 0
                  ? sliderPosts.map((post) => (
                      <SlidePanel
                        key={post.id}
                        {...this.props}
                        post={post}
                        toOfferList={(e, p) => this.toOfferList(e, p)}
                      />
                    ))
                  : null}
              </Col>
            </Row>
          </div>
        </section>
        {/* no display */}
        {networkError}
        <section className="section-slide hidden">
          <div className="text-center" style={{ minHeight: "100vh" }}>
            <h1>Unable to connect to server, Try again later!</h1>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sliderPosts: state.posts.sliderPosts,
  feauturedPosts: state.posts.feauturedPosts,
  homepagePost: state.posts.homepagePost,
  networkError: state.users.networkError,
});

const mapDispatchToProps = {
  getSliderPosts,
  getfeaturedPosts,
  getHomepagePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
