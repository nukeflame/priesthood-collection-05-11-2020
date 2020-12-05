import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatMoney, imageUrl } from "../../../../config/helpers";

export default class CartProduct extends Component {
  static propTypes = {
    product: PropTypes.shape({
      ProductName: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ProductThumb: PropTypes.string.isRequired,
      Media: PropTypes.array.isRequired,
      Quantity: PropTypes.number.isRequired,
      deleteProduct: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      Quantity: "",
      SubTotal: "",
    };
  }

  handleQtyChanged = (e, p) => {
    this.getTotal({ Quantity: e.target.value }, p);
  };

  increaseQty = (p) => {
    const { Quantity } = this.state;
    if (Quantity !== "") {
      let numProduct = Number(this.state.Quantity);
      if (numProduct > 0) {
        this.getTotal({ Quantity: numProduct + 1 }, p);
      }
    } else {
      let numProduct = Number(p.Quantity);
      if (numProduct > 0) {
        this.getTotal({ Quantity: numProduct + 1 }, p);
      }
    }
  };

  decreaseQty = (p) => {
    const { Quantity } = this.state;
    if (Quantity !== "") {
      let numProduct = Number(this.state.Quantity);
      if (numProduct > 1) {
        this.getTotal({ Quantity: numProduct - 1 }, p);
      }
    } else {
      let numProduct = Number(p.Quantity);
      if (numProduct > 1) {
        this.getTotal({ Quantity: numProduct - 1 }, p);
      }
    }
  };

  getTotal = (q, p) => {
    this.setState({ Quantity: parseInt(q.Quantity) });
    const qty = parseInt(q.Quantity);
    const price = parseInt(p.Price);
    const calcTotal = [];
    calcTotal.push({ price, qty });
    //cal multiply
    let SubTotal = calcTotal
      .reduce((a, b) => a + b.price * b.qty, 0)
      .toFixed(2);
    this.setState({ SubTotal });
    const data = {
      SubTotal,
      qty,
      pId: p.id,
    };
    this.props.handleSubTotal(data);
  };

  render() {
    const { product, deleteProduct } = this.props;
    const { Quantity, SubTotal } = this.state;

    return (
      <tr className="table_row">
        <td className="column-1">
          <div className="item-cart" onClick={(e) => deleteProduct(e, product)}>
            <img
              src={imageUrl() + "/images/" + product.ProductThumb}
              alt=""
              height="60"
              width="60"
            />
          </div>
        </td>
        <td className="column-2">
          <div className="ellips2">{product.ProductName}</div>
        </td>
        <td className="column-3">Ksh {formatMoney(product.Price)}</td>
        <td className="column-4">
          <div className="wrap-num-product">
            <div
              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
              onClick={() => this.decreaseQty(product)}
            >
              <i className="fs-16 zmdi zmdi-minus"></i>
            </div>
            <input
              className="mtext-104 cl3 txt-center num-product"
              type="number"
              name={product.SKU}
              value={Quantity === "" ? product.Quantity : Quantity}
              onChange={(e) => this.handleQtyChanged(e, product)}
            />
            <div
              className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
              onClick={() => this.increaseQty(product)}
            >
              <i className="fs-16 zmdi zmdi-plus"></i>
            </div>
          </div>
        </td>
        <td className="column-5">
          Ksh{" "}
          {SubTotal === ""
            ? formatMoney(product.TotalPrice)
            : formatMoney(SubTotal)}
        </td>
        <td className="column-6">
          <a href="/shop-catalog" onClick={(e) => deleteProduct(e, product)}>
            <i className="fa fa-trash remove-icon"></i>
          </a>
        </td>
      </tr>
    );
  }
}
