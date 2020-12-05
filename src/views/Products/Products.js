import React, { Component } from "react";
import { Button, Col, Row, Card } from "reactstrap";
import ReactTable from "react-table";
import {
  fetchProducts,
  destroyProduct,
} from "../../redux/actions/productAction";
import { connect } from "react-redux";
import { formatMoney } from "../../config/helpers";
import { toast } from "react-toastify";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delProductId: "",
    };
  }

  toCreateProducts = () => {
    this.props.history.push("/products/new");
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleEditProduct = (e, p) => {
    e.preventDefault();
    this.props.history.push(`/products/${p.id}/edit`);
  };

  handleDelProduct = (e, closeToast) => {
    e.preventDefault();
    const { delProductId } = this.state;
    closeToast();
    this.props.destroyProduct(delProductId).then(() => {
      this.setState({ destroyProduct: "" });
      toast(
        <div className="text-dark">
          <i className="fa fa-check-circle fs-16"></i> Product deleted!
        </div>,
        {
          className: "text-only",
          autoClose: 3000,
        }
      );
    });
  };

  render() {
    // const MsgError = ({ closeToast }) => (
    //   <div>
    //     Are you sure you want to delete this Product? <br />
    //     <button
    //       type="button"
    //       className="btn-toast default"
    //       onClick={(e) => this.handleDelProduct(e, closeToast)}
    //     >
    //       Yes, Continue
    //     </button>
    //     <button type="button" className="btn-toast" onClick={closeToast}>
    //       Cancel
    //     </button>
    //   </div>
    // );

    // const delProduct = (e, p) => {
    //   e.preventDefault();
    //   toast.error(<MsgError />, {
    //     position: "top-center",
    //     autoClose: false,
    //     closeOnClick: false,
    //   });
    //   this.setState({ delProductId: p.id });
    // };

    const { products } = this.props;
    const columns = [
      {
        Header: "Name",
        accessor: "productName",
      },
      {
        Header: "Product SKU",
        accessor: "sku",
      },
      {
        Header: "Stock",
        accessor: "inventory.stock_quantity",
      },
      {
        Header: "Price (Ksh)",
        accessor: "price",
        Cell: (props) => <span>{formatMoney(props.original.price)}</span>,
      },
      {
        Header: "Shipping Price (Ksh)",
        accessor: "shippingPrice",
        Cell: (props) => (
          <span>{formatMoney(props.original.shippingPrice)}</span>
        ),
      },
      {
        Header: "Files",
        accessor: "media.length",
      },
      {
        Header: "",
        accessor: "actions",
        Cell: (props) => (
          <span className="">
            <button
              type="button"
              className="rt-btn btn-primary-outline"
              title="Edit Product"
              onClick={(e) => this.handleEditProduct(e, props.original)}
            >
              <i className="icon-pencil"></i>
            </button>
            <button
              type="button"
              title="Delete Product"
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
          <Col md="12">
            <h5 className="dashb-title">
              <i className="cui-basket-loaded"></i> Products
            </h5>
            <div className="dashb-wrapper mb-0">
              <Row>
                <Col md="8">
                  <Button
                    type="button"
                    className="mr-2 fs-10"
                    color="dark"
                    size="sm"
                    outline
                    onClick={this.toCreateProducts}
                  >
                    <i className="fa fa-plus"></i> Add Product
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
            </div>
            <div className="dashb-cards mt-2">
              <Card>
                <Row>
                  <Col md="12">
                    <ReactTable
                      className="-highlight -striped text-left"
                      data={products}
                      columns={columns}
                      defaultPageSize={14}
                      pageSizeOptions={[14, 28, 42, 50]}
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
  products: state.products.products,
});

const mapDispatchToProps = {
  fetchProducts,
  destroyProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
