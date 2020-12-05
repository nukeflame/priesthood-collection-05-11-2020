import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Row, Col, Button, Input, Label, Card } from "reactstrap";
import ReactTable from "react-table";
import { fetchOrders, destroydOrder } from "../../../redux/actions/orderAction";
import { formatMoney } from "../../../config/helpers";
import { toast } from "react-toastify";
import moment from "moment";
import { fetchOrderStatus } from "../../../redux/actions/orderStatusAction";
import $ from "jquery";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionOpen: false,
      selectedRows: [],
      status: [],
      selRow: "",
      searchInput: "",
      filteredData: [],
    };
  }

  toCreateOrder = () => {
    this.props.history.push("/orders/new");
  };

  toggleAction = () => {
    const { actionOpen } = this.state;
    this.setState({ actionOpen: !actionOpen });
  };

  handleDeleteOrder = (e, closeToast) => {
    e.preventDefault();
    const { selectedRows } = this.state;
    closeToast();
    if (selectedRows) {
      const orderIds = [];
      for (let i = 0; i < selectedRows.length; i++) {
        const s = selectedRows[i];
        orderIds.push(s.id);
      }
      this.props.destroydOrder(orderIds).then(() => {
        this.setState({ selectedRows: [] });
      });
    }
  };

  cancelDeleteOrder = (e, closeToast) => {
    e.preventDefault();
    closeToast();
    this.setState({ selectedRows: [] });
  };

  formatTime = (t) => {
    return moment(t).calendar();
  };

  handleChangeOrderStatus = (e, props) => {
    this.setState({
      status: { ...this.state.status, [props.original.id]: e.target.value },
    });
  };

  searchInOrders = (e) => {
    const { searchInput } = this.state;
    const { orders } = this.props;

    this.setState(
      {
        searchInput: e.target.value.substr(0, 60),
      },
      () => {
        if (searchInput && searchInput.length > 0) {
          this.setState({
            filteredData: orders,
          });
        }
      }
    );
  };

  handleViewOrder = (e, v) => {
    e.preventDefault();
    this.props.history.push(`/orders/${v.original.id}/edit`);
  };

  handleFilterOrder = (e, filter) => {
    e.preventDefault();
    $(`subsubsub a span.c`).removeClass("current");
    $(`#${filter} span.c`).addClass("current");
  };

  componentDidMount() {
    this.props.fetchOrders();
    this.props.fetchOrderStatus();
  }

  render() {
    const { fetchOrderLoading, orderStatus, orders } = this.props;
    const { selectedRows, filteredData } = this.state;

    const columns = [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: (props) => {
          return <span>{this.formatTime(props.value)}</span>;
        },
      },
      {
        Header: "Order No",
        accessor: "orderNo",
      },
      {
        Header: "Purchased",
        accessor: "items.length",
        Cell: (props) => (
          <span>
            {props.value} {props.value <= 1 ? "item" : "items"}
          </span>
        ),
      },
      {
        Header: "Customer",
        accessor: "customer.email",
      },
      {
        Header: "Status",
        accessor: "status.id",
        Cell: (props) => {
          return (
            <div className="order order-status">
              <span className="order-status-lable"></span>
              <Label className="hide-visually">Order Status:</Label>
              <Input
                type="select"
                bsSize="sm"
                className="form-control-xs"
                name={this.state.status[props.original.id]}
                value={
                  isEmpty(this.state.status)
                    ? props.value
                    : this.state.status[props.original.id]
                }
                onChange={(e) => this.handleChangeOrderStatus(e, props)}
              >
                {orderStatus && orderStatus.length > 0
                  ? orderStatus.map((s) => (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    ))
                  : null}
              </Input>
            </div>
          );
        },
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: (props) => {
          return <span>KES {formatMoney(props.value)}</span>;
        },
      },
      {
        Header: "",
        accessor: "actions",
        Cell: (props) => {
          return (
            <div>
              <button
                onClick={(e) => this.handleViewOrder(e, props)}
                className="mr-3"
                title="View Order"
              >
                <i className="icon-eye"></i>
              </button>
              <button
                onClick={(e) => handleTrashOrder(e, props)}
                title="Delete Order"
              >
                <i className="ti-trash"></i>
              </button>
            </div>
          );
        },
      },
    ];

    const filteredList = filteredData.filter((i) => {
      const searchOption = this.state.searchInput.toLowerCase();
      return (
        i.orderNo.toLowerCase().includes(searchOption.toLowerCase()) ||
        i.customer.email.toLowerCase().includes(searchOption.toLowerCase()) ||
        i.status.name.toLowerCase().includes(searchOption.toLowerCase())
      );
    });

    const MsgError = ({ closeToast }) => (
      <div>
        Are you sure you want to delete this Order(s)? <br />
        <button
          type="button"
          className="btn-toast default"
          onClick={(e) => this.handleDeleteOrder(e, closeToast)}
        >
          Yes, Continue
        </button>
        <button
          type="button"
          className="btn-toast"
          onClick={(e) => this.cancelDeleteOrder(e, closeToast)}
        >
          Cancel
        </button>
      </div>
    );

    const handleBulkDel = () => {
      toast.error(<MsgError />, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
      });
    };

    const handleTrashOrder = (e, s) => {
      e.preventDefault();
      const orderIds = [];
      orderIds.push(s.original.id);
      this.setState({ selectedRows: orderIds });
      toast.error(<MsgError />, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
      });
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="cui-basket-loaded"></i> Orders
            </h5>
            <div className="dashb-wrapper mb-1">
              <Button
                type="button"
                className="mr-2 fs-10"
                color="dark"
                size="sm"
                outline
                onClick={this.toCreateOrder}
              >
                <i className="fa fa-plus"></i> New Order
              </Button>
              <Button
                type="button"
                className="fs-10"
                color="danger"
                outline
                size="sm"
                disabled={selectedRows.length > 0 ? false : true}
                onClick={handleBulkDel}
              >
                <i className="fa fa-trash"></i> Bulk Delete
              </Button>
            </div>
            <div className="dashb-cards mt-0">
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="8">
                      <ul className="subsubsub">
                        <li className="all">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) => this.handleFilterOrder(e, "all")}
                            id="allFilterd"
                          >
                            <span className="current">All</span>
                            <span className="count">(3)</span>
                          </a>
                          |
                        </li>
                        <li className="publish">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) =>
                              this.handleFilterOrder(e, "pendingPayment")
                            }
                            id="pendingPayment"
                          >
                            <span className="c">Pending Payment</span>
                            <span className="count">(2)</span>
                          </a>
                          |
                        </li>
                        <li className="draft">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) =>
                              this.handleFilterOrder(e, "proccessing")
                            }
                            id="proccessing"
                          >
                            <span className="c">Processing</span>
                            <span className="count">(1)</span>
                          </a>
                          |
                        </li>
                        <li className="publish">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) =>
                              this.handleFilterOrder(e, "awaitingPayment")
                            }
                            id="awaitingPayment"
                          >
                            <span className="c">Awaiting Shipment</span>
                            <span className="count">(2)</span>
                          </a>
                          |
                        </li>
                        <li className="draft">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) =>
                              this.handleFilterOrder(e, "completed")
                            }
                            id="awaitingPayment"
                          >
                            <span className="c">Completed</span>
                            <span className="count">(1)</span>
                          </a>
                          |
                        </li>
                        <li className="publish">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) =>
                              this.handleFilterOrder(e, "refunded")
                            }
                          >
                            Refunded <span className="count">(2)</span>
                          </a>
                          |
                        </li>
                        <li className="publish">
                          {/* eslint-disable-next-line */}
                          <a
                            href="#"
                            onClick={(e) =>
                              this.handleFilterOrder(e, "deliverd")
                            }
                          >
                            Deliverd <span className="count">(2)</span>
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
                          Search Order:
                        </label>
                        <input
                          type="search"
                          id="post-search-input"
                          name="s"
                          onChange={(e) => this.searchInOrders(e)}
                        />
                        <input
                          type="submit"
                          id="search-submit"
                          className="search-submit-button"
                          value="Search Order"
                        />
                      </p>
                    </Col>
                  </Row>
                  <div className="pt-1">
                    <Card>
                      <ReactTable
                        className="-highlight -striped text-left"
                        data={
                          filteredList && filteredList.length
                            ? filteredList
                            : orders
                        }
                        columns={columns}
                        loading={fetchOrderLoading}
                        showPageSizeOptions={true}
                        defaultPageSize={13}
                        pageSizeOptions={[13, 26, 39, 50]}
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
                                this.setState({ selRow: rowInfo.original.id });

                                // rt-tr-group
                              },

                              // style: {
                              //   background: "#fbfbfc",
                              //   height: "150px",
                              // },

                              style: {
                                // background:
                                //   this.state.selectedRows.some(
                                //     (e) => e.id === rowInfo.original.id
                                //   ) && "#42a5f533",
                                // height:
                                //   this.state.selRow === rowInfo.original.id
                                //     ? "196px"
                                //     : null,
                              },
                            };
                          } else {
                            return {};
                          }
                        }}
                      />
                    </Card>
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
  orders: state.orders.orders,
  orderStatus: state.orderStatus.orderStatus,
  fetchOrderLoading: state.orders.fetchOrderLoading,
});

const mapDispatchToProps = { fetchOrders, destroydOrder, fetchOrderStatus };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
