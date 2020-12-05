import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import ReactTable from "react-table";
import { fetchPosts } from "../../../redux/actions/postAction";
import moment from "moment";
import loaderSm from "../../../assets/loader/sharp-sm.svg";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityBtnLoading: false,
    };
  }

  toCreatePost = () => {
    this.props.history.push("/posts/new");
  };

  handleEditPost = (e, p) => {
    e.preventDefault();
    this.props.history.push(`/posts/${p.id}/edit`);
  };

  handleVisibiltyPost = (e, p) => {
    e.preventDefault();
    const { visibilityBtnLoading } = this.state;
    this.setState({ visibilityBtnLoading: !visibilityBtnLoading });

    console.log(p);

    // this.props.history.push(`/posts/${p.id}/edit`);
  };

  formatTime = (t) => {
    return moment().calendar();
  };
  deletePost = () => {};

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, loadingPosts } = this.props;
    const { visibilityBtnLoading } = this.state;

    const columns = [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author.firstname",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Post Type",
        accessor: "postType",
        Cell: (props) => (
          <span>
            {props.value === "normalPost"
              ? "Normal Post"
              : props.value === "featuredPost"
              ? "Featured Post"
              : "Homepage Ad"}
          </span>
        ),
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: (props) => <span>Published {this.formatTime(props.value)}</span>,
      },
      {
        Header: "",
        accessor: "actions",
        Cell: (props) => (
          <span className="">
            <button
              type="button"
              className="rt-btn btn-primary-outline mr-3"
              onClick={(e) => this.handleVisibiltyPost(e, props.original)}
            >
              {visibilityBtnLoading ? (
                <span>
                  <img src={loaderSm} alt="" id={props.original} />
                </span>
              ) : props.original.postVisibility === 1 ? (
                <i className="fa fa-eye"></i>
              ) : (
                <i className="fa fa-eye-slash"></i>
              )}
            </button>
            <button
              type="button"
              className="rt-btn btn-primary-outline"
              title="Edit Post"
              onClick={(e) => this.handleEditPost(e, props.original)}
            >
              <i className="icon-pencil"></i>
            </button>
            <button
              type="button"
              title="Delete Post"
              className="rt-btn btn-danger-outline"
              onClick={(e) => this.deletePost(e, props.original)}
            >
              <i className="ti-trash"></i>
            </button>
          </span>
        ),
      },
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="cui-puzzle"></i> Posts
            </h5>
            <div className="dashb-wrapper">
              <Button
                type="button"
                className="mr-2 fs-10"
                color="dark"
                size="sm"
                outline
                onClick={this.toCreatePost}
              >
                <i className="fa fa-plus"></i> Add Post
              </Button>
              <Button
                type="button"
                className="fs-10"
                color="danger"
                outline
                size="sm"
              >
                <i className="fa fa-trash"></i> Bulk Delete
              </Button>
            </div>
            <div className="dashb-cards">
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="8">
                      <ul className="subsubsub">
                        <li className="all">
                          <a href="edit.php?post_type=post">
                            All{" "}
                            <span className="count">
                              ({posts && posts.length})
                            </span>
                          </a>{" "}
                          |
                        </li>
                        <li className="publish">
                          <a href="edit.php?post_status=publish&amp;post_type=post">
                            Published <span className="count">(2)</span>
                          </a>{" "}
                          |
                        </li>
                        <li className="draft">
                          <a href="edit.php?post_status=draft&amp;post_type=post">
                            Draft <span className="count">(1)</span>
                          </a>
                          |
                        </li>
                        <li className="draft">
                          <a href="edit.php?post_status=draft&amp;post_type=post">
                            Trash <span className="count">(1)</span>
                          </a>
                        </li>
                      </ul>
                    </Col>
                    <Col md="4">
                      <p className="search-box">
                        <label
                          className="screen-reader-text"
                          htmlFor="post-search-input"
                        >
                          Search Posts:
                        </label>
                        <input type="search" id="post-search-input" name="s" />
                        <input
                          type="submit"
                          id="search-submit"
                          className="search-submit-button"
                          value="Search Posts"
                        />
                      </p>
                    </Col>
                  </Row>
                  <div>
                    <ReactTable
                      className="-highlight -striped text-left"
                      data={posts}
                      loading={loadingPosts}
                      columns={columns}
                      showPostSizeOptions={false}
                      // getTrProps={(state, rowInfo) => {
                      //   if (rowInfo && rowInfo.row) {
                      //     return {
                      //       style: {
                      //         background: "#42a5f533",
                      //       },
                      //     };
                      //   } else {
                      //     return {};
                      //   }
                      // }}

                      getTrProps={(state, rowInfo, column) => {
                        return {
                          // style: {
                          //   background: rowInfo.row.age > 20 ? "green" : "red",
                          // },
                        };
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  loadingPosts: state.posts.loadingPosts,
});

const mapDispatchToProps = { fetchPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
