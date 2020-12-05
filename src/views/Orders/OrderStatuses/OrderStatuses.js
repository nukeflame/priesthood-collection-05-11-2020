import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import ReactTable from "react-table";

export class OrderStatuses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionOpen: false,
    };
  }

  toCreateOrder = () => {
    this.props.history.push("/orders/new");
  };

  toggleAction = () => {
    const { actionOpen } = this.state;
    this.setState({ actionOpen: !actionOpen });
  };

  showRowSubComponent = (n, e) => {
    e.preventDefault();
  };

  componentDidMount() {
    // this.props.fetchProducts();
  }

  render() {
    const columns = [
      {
        Header: "Status",
        accessor: "status",
        minWidth: 30,
      },
      {
        Header: "Status Description",
        accessor: "statusDesc",
      },
    ];
    const data = [
      {
        status: "Incomplete",
        statusDesc:
          "An Incomplete Order happens when a shpper reached the payment page but did not complete the transaction",
      },
      {
        status: "Pending",
        statusDesc:
          "An Incomplete Order happens when a shpper reached the payment page but did not complete the transaction",
      },
      {
        status: "Awaiting Payment",
        statusDesc:
          "An Incomplete Order happens when a shpper reached the payment page but did not complete the transaction",
      },
      {
        status: "Awaiting Fulfilment",
        statusDesc:
          "An Incomplete Order happens when a shpper reached the payment page but did not complete the transaction",
      },
      {
        status: "Awaiting Shipment",
        statusDesc:
          "An Incomplete Order happens when a shpper reached the payment page but did not complete the transaction",
      },
      {
        status: "Awaiting Pickup",
        statusDesc:
          "An Incomplete Order happens when a shpper reached the payment page but did not complete the transaction",
      },
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="cui-basket-loaded"></i> Order Statuses
            </h5>
            <div className="dashb-wrapper mb-1">
              <p>
                Order Status can help you decide what actions need to be taken
                for a particular order.Does the order need to be shipped,
                packaged, or refunded? Most Order statuses are applied as a
                result of store user or customer action. but some must be
                manually changed.
              </p>
            </div>
            <div className="dashb-cards mt-0">
              <Row>
                <Col md="12">
                  <div className="pt-2">
                    <ReactTable
                      className="-highlight -striped text-left"
                      data={data}
                      loading={true}
                      columns={columns}
                      showPageSizeOptions={true}
                      pageSizeOptions={[13, 26, 39, 50]}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatuses);
