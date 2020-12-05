import React, { Component } from "react";
import { Card, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { fetchCustomers } from "../../redux/actions/customerAction";

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
    };
  }

  addCustomer = () => {
    this.props.history.push(`/customers/create`);
  };

  handleEditCustomer = (e, c) => {
    e.preventDefault();
    this.props.history.push(`/customers/${c.id}`);
  };

  componentDidMount() {
    this.props.fetchCustomers();
  }

  render() {
    const { customers, fetchCustomerLoad } = this.props;
    const columns = [
      {
        Header: "Customer",
        accessor: "firstname",
        Cell: (props) => (
          <span>
            {props.original.firstname}&nbsp;{props.original.lastname}
          </span>
        ),
      },
      {
        Header: "Last Seen",
        accessor: "lastSeen",
      },
      {
        Header: "Orders",
        accessor: "orders.length",
      },
      {
        Header: "Total Spent ",
        accessor: "totalSpent",
      },
      {
        Header: "Latest Purchase",
        accessor: "latestPurchase",
        minWidth: 130,
      },
      {
        Header: "News",
        accessor: "hasNews",
        Cell: (props) => (
          <span>
            {props.value ? (
              <i className="fa fa-check"></i>
            ) : (
              <i className="fa fa-times"></i>
            )}
          </span>
        ),
        minWidth: 50,
      },
      {
        Header: "Email",
        accessor: "email",
        minWidth: 150,
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
              onClick={(e) => this.handleEditCustomer(e, props.original)}
            >
              <i className="icon-pencil"></i>
            </button>
            <button
              type="button"
              title="Delete Customer"
              className="rt-btn btn-danger-outline"
              onClick={(e) => this.delProduct(e, props.original)}
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
          <Col md={12}>
            <h5 className="dashb-title">
              <i className="cui-people"></i> Customers
            </h5>
            <div className="dashb-wrapper mb-0">
              <Row>
                <Col md={8}>
                  <Button
                    type="button"
                    className="mr-2 fs-10"
                    color="dark"
                    size="sm"
                    outline
                    onClick={this.addCustomer}
                  >
                    <i className="fa fa-plus"></i> Add Customer
                  </Button>
                  <Button
                    type="button"
                    className="fs-10"
                    color="danger"
                    outline
                    size="sm"
                    disabled
                  >
                    <i className="fa fa-trash"></i> Bulk Delete
                  </Button>
                </Col>
                <Col md={4}>
                  <p className="search-box">
                    <label
                      className="screen-reader-text"
                      htmlFor="post-search-input"
                    >
                      Search Pages:
                    </label>
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
            </div>
            <div className="dashb-cards mt-2">
              <Card>
                <Row>
                  <Col md="12">
                    <ReactTable
                      className="-highlight -striped text-left"
                      data={customers}
                      columns={columns}
                      loading={fetchCustomerLoad}
                      defaultPageSize={14}
                      pageSizeOptions={[14, 28, 42, 50]}
                      getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {
                              let selectedRows = [];

                              if (e.ctrlKey && this.previousRow) {
                                if (this.previousRow.index < rowInfo.index) {
                                  for (
                                    let i = this.previousRow.index;
                                    i <= rowInfo.index;
                                    i++
                                  ) {
                                    selectedRows.push(
                                      state.sortedData[i]._original
                                    );
                                  }
                                } else {
                                  for (
                                    let i = rowInfo.index;
                                    i <= this.previousRow.index;
                                    i++
                                  ) {
                                    selectedRows.push(
                                      state.sortedData[i]._original
                                    );
                                  }
                                }
                              } else {
                                rowInfo._index = rowInfo.index;
                                selectedRows.push(rowInfo.original);
                                this.previousRow = rowInfo;
                              }

                              this.setState({ selectedRows });
                            },

                            onDoubleClick: (e) => {
                              e.preventDefault();
                              this.props.history.push(
                                `/customers/${rowInfo.original.id}`
                              );
                            },

                            style: {
                              background:
                                this.state.selectedRows.some(
                                  (e) => e.id === rowInfo.original.id
                                ) && "#42a5f533",
                            },
                          };
                        } else {
                          return {};
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.customers.customers,
  fetchCustomerLoad: state.customers.fetchCustomerLoad,
});

const mapDispatchToProps = {
  fetchCustomers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
