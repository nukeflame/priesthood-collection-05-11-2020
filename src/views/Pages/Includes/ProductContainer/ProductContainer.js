import React, { Component } from "react";
import ProductItem from "./ProductItem";
import {
  setCartProduct,
  findProduct,
} from "../../../../redux/actions/productAction";
import { connect } from "react-redux";
import $ from "jquery";
import { isNull, isEmpty } from "lodash";
import { createCartlist } from "../../../../redux/actions/cartlistAction";
import queryString from "query-string";

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: "",
      detailProductMd: false,
      buyNowMd: false,
      selectMedia: "",
      selectMediaId: "",
    };
  }

  detailProductModal = (e, p) => {
    e.preventDefault();
    this.props.history.push(
      `/shop-catalog?${queryString.stringify({
        description: p.productName,
        pId: p.id,
      })}`
    );
    this.setState({ productDetails: p });
    this.setState({ selectMedia: "", detailProductMd: true });
    $(".single-product .button-head").addClass("b0");
  };

  addToCartItem = (e, p) => {
    e.preventDefault();
    const { authUser } = this.props;
    if (!isNull(authUser)) {
      this.props.createCartlist(p);
    } else {
      //to local storage
      this.props.setCartProduct(p);
    }
  };

  componentDidMount() {
    //item description modal
    // const search = this.props.location.search;
    // if (!isEmpty(search)) {
    //   const params = queryString.parse(search);
    //   if (params.description) {
    //     this.props.findProduct(params.pId).then(() => {
    //       const p = this.props.product;
    //       this.setState({ productDetails: p });
    //       this.setState({ selectMedia: "", detailProductMd: true });
    //     });
    //   }
    // }
  }

  render() {
    const { products } = this.props;

    return (
      <React.Fragment>
        {products && products.length > 0
          ? products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                detailProductModal={(e, p) => this.detailProductModal(e, p)}
                addToCartItem={(e, p) => this.addToCartItem(e, p)}
              />
            ))
          : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cartList: state.cartlist.cartlist,
  authUser: state.users.auth,
  product: state.products.findProduct,
});

const mapDispatchToProps = {
  setCartProduct,
  createCartlist,
  findProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
