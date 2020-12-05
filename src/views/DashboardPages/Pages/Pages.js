import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import ReactTable from "react-table";
import { fetchPages } from "../../../redux/actions/pageAction";

export class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toCreatePage = () => {
    this.props.history.push("/pages/new");
  };

  handleEditPage = () => {};

  deletePage = () => {};

  componentDidMount() {
    this.props.fetchPages();
  }

  render() {
    const { pages, loadingPages } = this.props;
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
        Header: "Date",
        accessor: "createdAt",
        Cell: (props) => <span>Published 15 hours ago</span>,
      },
      {
        Header: "",
        accessor: "actions",
        Cell: (props) => (
          <span className="">
            <button
              type="button"
              className="rt-btn btn-primary-outline"
              title="Edit Customer"
              onClick={(e) => this.handleEditPage(e, props.original)}
            >
              <i className="icon-pencil"></i>
            </button>
            <button
              type="button"
              title="Delete Customer"
              className="rt-btn btn-danger-outline"
              onClick={(e) => this.deletePage(e, props.original)}
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
              <i className="cui-puzzle"></i> Pages
            </h5>
            <div className="dashb-wrapper">
              <Button
                type="button"
                className="mr-2 fs-10"
                color="dark"
                size="sm"
                outline
                onClick={this.toCreatePage}
              >
                <i className="fa fa-plus"></i> Add Page
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
                          <a href="edit.php?post_type=page">
                            All{" "}
                            <span className="count">
                              ({pages && pages.length})
                            </span>
                          </a>{" "}
                          |
                        </li>
                        <li className="publish">
                          <a href="edit.php?post_status=publish&amp;post_type=page">
                            Published <span className="count">(2)</span>
                          </a>{" "}
                          |
                        </li>
                        <li className="draft">
                          <a href="edit.php?post_status=draft&amp;post_type=page">
                            Draft <span className="count">(1)</span>
                          </a>
                          |
                        </li>
                        <li className="draft">
                          <a href="edit.php?post_status=draft&amp;post_type=page">
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
                          Search Pages:
                        </label>
                        <input type="search" id="post-search-input" name="s" />
                        <input
                          type="submit"
                          id="search-submit"
                          className="search-submit-button"
                          value="Search Pages"
                        />
                      </p>
                    </Col>
                  </Row>
                  <div>
                    <ReactTable
                      className="-highlight -striped text-left"
                      data={pages}
                      loading={loadingPages}
                      columns={columns}
                      showPageSizeOptions={false}
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
  pages: state.pages.pages,
  loadingPages: state.pages.loadingPages,
});

const mapDispatchToProps = { fetchPages };

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
