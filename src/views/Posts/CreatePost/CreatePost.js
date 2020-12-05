import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  FormGroup,
  Input,
  Label,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import ReactTable from "react-table";
import loaderSm from "../../../assets/loader/sharp-sm.svg";
import {
  newPost,
  fetchPosts,
  createPromoProduct,
  getPromoProduct,
  findOfferProducts,
  destroyPromoProduct,
  updatePromoProduct,
} from "../../../redux/actions/postAction";
import { fetchProducts } from "../../../redux/actions/productAction";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postData: {
        title: "",
        slug: "",
        postType: "normalPost",
        postVisibility: "public",
      },
      productMd: false,
      searchInput: "",
      selectedRows: [],
      showAddProduct: false,
      hideCancel: true,
      filteredData: [],
      formData: new FormData(),
      productInfo: {
        postId: "",
        infoName: "",
        infoPrice: "",
        infoTags: "",
        infoFile: "",
        pInfo: "",
        products: [],
      },
      postSlug: "",
      postProducts: [],
      updatePromo: false,
    };
  }

  handleChangePost = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      postData: {
        ...prevState.postData,
        [name]: value,
      },
    }));
  };

  savePost = () => {
    const { postData } = this.state;
    const { authUser } = this.props;
    const data = {
      postType: "featuredPost",
      title: postData.title,
      slug: postData.slug,
      featuredType: postData.postType,
      authorId: authUser.id,
      postVisibility: postData.postVisibility === "public" ? true : false,
    };

    this.props.newPost(data).then(() => {
      this.setState({ postProducts: [] });
      toast(
        <div className="text-dark">
          <i className="fa fa-check-circle fs-16"></i> New post created continue
          to add products.
        </div>,
        {
          className: "text-only",
          autoClose: 4000,
          position: "bottom-left",
        }
      );
    });
  };

  showProductBtn = () => {
    const { showAddProduct } = this.state;
    const { latestPost } = this.props;

    if (!isEmpty(latestPost)) {
      this.setState((prevState) => ({
        productInfo: {
          ...prevState.productInfo,
          postId: latestPost.id,
        },
        showAddProduct: !showAddProduct,
        hideCancel: false,
      }));
    }
  };

  searchInProducts = (e) => {
    const { searchInput } = this.state;
    const { products } = this.props;
    this.setState(
      {
        searchInput: e.target.value.substr(0, 60),
      },
      () => {
        if (searchInput && searchInput !== "") {
          this.setState({
            filteredData: products && products.length > 0 ? products : null,
          });
        }
      }
    );
  };

  handleChangeInfo = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      productInfo: {
        ...prevState.productInfo,
        [name]: value,
      },
    }));
  };

  saveProductInfo = () => {
    const { productInfo, formData } = this.state;
    formData.append("infoName", productInfo.infoName);
    formData.append("infoPrice", productInfo.infoPrice);
    formData.append("infoTags", productInfo.infoTags);
    formData.append("pInfo", productInfo.pInfo);
    formData.append("products", productInfo.products);
    formData.append("postId", productInfo.postId);

    this.props.createPromoProduct(formData).then(() => {
      this.resetProductInfo();
      const { latestPost } = this.props;
      this.setState({ postProducts: latestPost.promoProducts });
    });
  };

  updateProductInfo = () => {
    const { productInfo } = this.state;
    let formData = new FormData();
    formData.append("infoName", "productInfo.infoName");
    // formData.append("infoPrice", productInfo.infoPrice);
    // formData.append("infoTags", productInfo.infoTags);
    // formData.append("pInfo", productInfo.pInfo);
    // formData.append("products", productInfo.products);
    // formData.append("postId", productInfo.postId);

    this.props.updatePromoProduct(formData, productInfo.postId);
    // this.resetProductInfo();
  };

  selectProduct = () => {
    const { productMd } = this.state;
    this.setState({ productMd: !productMd, selectedRows: [] });
  };

  addSelectedProducts = () => {
    const { selectedRows } = this.state;
    let productIds = [];
    for (let i = 0; i < selectedRows.length; i++) {
      const product = selectedRows[i];
      productIds.push(product.id);
    }

    this.setState((prevState) => ({
      productInfo: {
        ...prevState.productInfo,
        products: productIds,
      },
      productMd: false,
    }));
  };

  handleInfoFile = (e) => {
    const file = e.target.files[0];
    let formData = this.state.formData;
    formData.append("promoFile", file);
  };

  resetProductInfo = () => {
    this.setState((prevState) => ({
      productInfo: {
        ...prevState.productInfo,
        postId: "",
        infoName: "",
        infoPrice: "",
        infoTags: "",
        infoFile: "",
        pInfo: "",
        products: [],
      },
      selectedRows: [],
      showAddProduct: false,
      hideCancel: false,
      formData: new FormData(),
      updatePromo: false,
    }));
  };

  editPromo = (e, data) => {
    e.preventDefault();

    this.setState((prevState) => ({
      productInfo: {
        ...prevState.productInfo,
        postId: data.postId,
        infoName: data.productName,
        infoPrice: data.productPrice,
        infoTags: data.tags,
        pInfo: data.productInfo,
        products: data.items,
      },
      selectedRows: data.items,
      showAddProduct: true,
      hideCancel: false,
      updatePromo: true,
    }));
  };

  deletePromo = (e, Id) => {
    e.preventDefault();
    this.props.destroyPromoProduct(Id).then(() => {
      const { latestPost } = this.props;
      this.setState({ postProducts: latestPost.promoProducts });
    });
  };

  componentDidMount() {
    this.props.getPromoProduct();
    //fetch products
    this.props.fetchProducts();
  }

  render() {
    const {
      postData,
      showAddProduct,
      hideCancel,
      filteredData,
      productInfo,
      productMd,
      postProducts,
      updatePromo,
    } = this.state;
    const {
      newPostLoad,
      postErrors,
      products,
      latestPost,
      savingPromoProduct,
      promoProductsErrors,
      updatingPromoProduct,
    } = this.props;

    const columns = [
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Promo Price",
        accessor: "productPrice",
      },
      {
        Header: "Promo Info",
        accessor: "productInfo",
      },
      {
        Header: "",
        accessor: "actions",
        minWidth: 40,
        Cell: (props) => (
          <span className="">
            <button
              type="button"
              className="rt-btn btn-primary-outline"
              title="Edit Promo"
              onClick={(e) => this.editPromo(e, props.original)}
            >
              <i className="icon-pencil"></i>
            </button>
            <button
              type="button"
              title="Delete Promo"
              className="rt-btn btn-danger-outline"
              onClick={(e) => this.deletePromo(e, props.original.id)}
            >
              <i className="icon-trash"></i>
            </button>
          </span>
        ),
      },
    ];

    const proCol = [
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
    ];

    const filteredList = filteredData.filter((i) => {
      const searchOption = this.state.searchInput.toLowerCase();
      return (
        i.productName.toLowerCase().includes(searchOption.toLowerCase()) ||
        i.sku.toLowerCase().includes(searchOption.toLowerCase())
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="icon-pin"></i> Add Post
            </h5>
            <div className="dashb-wrapper mb-0">
              <Row>
                <Col md="4">
                  <div className="dashb-wrapper">
                    <h5>Add New Post</h5>
                  </div>
                  <FormGroup row>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="title" className="ff-RM">
                          Title
                        </Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          id="title"
                          name="title"
                          value={postData.title}
                          disabled={showAddProduct ? true : false}
                          onChange={this.handleChangePost}
                        />
                        <FormText className="fs-12">
                          The name is how it appears on your site.
                        </FormText>
                        {postErrors.title && postErrors.title.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {postErrors.title}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="slug" className="ff-RM">
                          Slug
                        </Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          id="slug"
                          name="slug"
                          value={postData.slug}
                          disabled={showAddProduct ? true : false}
                          onChange={this.handleChangePost}
                        />
                        <FormText className="fs-12">
                          The “slug” is the URL-friendly version of the name. It
                          is usually all lowercase and contains only letters,
                          numbers, and hyphens.
                        </FormText>
                        {postErrors.slug && postErrors.slug.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {postErrors.slug}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="featured mb-2" className="ff-RM pb-2">
                          Featured Images
                        </Label>
                        <div className="custom-control custom-radio mb-2">
                          <input
                            id="normalPost"
                            name="postType"
                            type="radio"
                            className="custom-control-input"
                            disabled={showAddProduct ? true : false}
                            value="normalPost"
                            checked={
                              postData.postType === "normalPost" ? true : false
                            }
                            onChange={this.handleChangePost}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="normalPost"
                          >
                            Normal Post
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-2">
                          <input
                            id="featuredAd"
                            name="postType"
                            type="radio"
                            className="custom-control-input"
                            value="featuredPost"
                            disabled={showAddProduct ? true : false}
                            checked={
                              postData.postType === "featuredPost"
                                ? true
                                : false
                            }
                            onChange={this.handleChangePost}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="featuredAd"
                          >
                            Featured Ad (3 Ad pics min)
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-2">
                          <input
                            id="homepageAd"
                            type="radio"
                            name="postType"
                            className="custom-control-input"
                            value="homepageAd"
                            checked={
                              postData.postType === "homepageAd" ? true : false
                            }
                            disabled={showAddProduct ? true : false}
                            onChange={this.handleChangePost}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="homepageAd"
                          >
                            Homepage Ad (1688px wide and 280px length)
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="featured mb-2" className="ff-RM  pb-2">
                          Post Visibilty
                        </Label>
                        <div className="custom-control custom-radio mb-2">
                          <input
                            id="publicPost"
                            name="postVisibility"
                            type="radio"
                            className="custom-control-input"
                            // disabled={showAddProduct ? true : false}
                            value="public"
                            checked={
                              postData.postVisibility === "public"
                                ? true
                                : false
                            }
                            onChange={this.handleChangePost}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="publicPost"
                          >
                            Public
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-2">
                          <input
                            id="privatePost"
                            name="postVisibility"
                            type="radio"
                            className="custom-control-input"
                            value="private"
                            // disabled={showAddProduct ? true : false}
                            checked={
                              postData.postVisibility === "private"
                                ? true
                                : false
                            }
                            onChange={this.handleChangePost}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="privatePost"
                          >
                            Private
                          </label>
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm="12" className="mt-2">
                      <Button
                        type="button"
                        color="primary"
                        disabled={showAddProduct ? true : false}
                        onClick={this.savePost}
                      >
                        {newPostLoad ? (
                          <span>
                            Processing... <img src={loaderSm} alt="" />
                          </span>
                        ) : (
                          <span className="text-uppercase">
                            Add Post <i className="fa fa-plus"></i>
                          </span>
                        )}
                      </Button>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <div className="dashb-wrapper mb-0">
                    <Row>
                      <Col md="6">
                        {showAddProduct ? (
                          <Button
                            type="button"
                            className={
                              "mr-2 fs-10 " + classNames({ hidden: hideCancel })
                            }
                            color="dark"
                            size="sm"
                            outline
                            onClick={this.showProductBtn}
                          >
                            <i className="fa fa-times"></i> Cancel
                          </Button>
                        ) : (
                          <>
                            <Button
                              type="button"
                              className="mr-2 fs-10"
                              color="dark"
                              size="sm"
                              outline
                              onClick={this.showProductBtn}
                              disabled={
                                latestPost && isEmpty(latestPost) ? true : false
                              }
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
                          </>
                        )}
                      </Col>
                      {!showAddProduct ? (
                        <Col md="6">
                          <p className="search-box">
                            <label
                              className="screen-reader-text"
                              htmlFor="post-search-input"
                            >
                              Search Pages:
                            </label>
                            <input
                              type="search"
                              id="post-search-input"
                              name="s"
                            />
                            <input
                              type="submit"
                              id="search-submit"
                              className="search-submit-button"
                              value="Search Pages"
                            />
                          </p>
                        </Col>
                      ) : null}
                    </Row>
                  </div>
                  <div className="dashb-cards mt-2">
                    {showAddProduct ? (
                      <Row>
                        <Col md="12">
                          <div className="dashb-wrapper">
                            <h5>Promo Information Details.</h5>
                          </div>
                          <FormGroup row>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="infoNamed">Promo Name</Label>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="infoNamed"
                                  name="infoName"
                                  value={productInfo.infoName}
                                  onChange={(e) => this.handleChangeInfo(e)}
                                />
                                <FormText className="fs-12">
                                  The promo product name, may be actual product
                                  name or any other name decided.
                                </FormText>
                                {promoProductsErrors.infoName &&
                                promoProductsErrors.infoName.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {promoProductsErrors.infoName}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="infoPriced">Promo Price</Label>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="infoPriced"
                                  name="infoPrice"
                                  value={productInfo.infoPrice}
                                  onChange={(e) => this.handleChangeInfo(e)}
                                />
                                <FormText className="fs-12">
                                  The promo price can be discount or any other
                                  price information.
                                </FormText>
                                {promoProductsErrors.infoPrice &&
                                promoProductsErrors.infoPrice.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {promoProductsErrors.infoPrice}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="infoTags">Tags</Label>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="infoTags"
                                  name="infoTags"
                                  value={productInfo.infoTags}
                                  onChange={(e) => this.handleChangeInfo(e)}
                                />
                                <FormText className="fs-12">
                                  The 'tags' includes related info abbout
                                  products with same similarities, may be brand,
                                  price or any other
                                </FormText>
                                {promoProductsErrors.infoTags &&
                                promoProductsErrors.infoTags.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {promoProductsErrors.infoTags}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="infoFile">Browse Image</Label>
                                <Input
                                  type="file"
                                  className="form-control-xs"
                                  id="infoFile"
                                  name="infoFile"
                                  onChange={this.handleInfoFile}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="selectPd"></Label>
                                <Input
                                  type="button"
                                  className="form-control-xs btn-primary"
                                  id="selectPd"
                                  name="infoSelect"
                                  value="Select Products"
                                  onClick={this.selectProduct}
                                />
                                {promoProductsErrors.products &&
                                promoProductsErrors.products.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {promoProductsErrors.products}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="selectPd"></Label>
                                <FormText className="fs-13">
                                  {productInfo.products &&
                                    productInfo.products.length}{" "}
                                  Selected item(s)
                                </FormText>
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label htmlFor="pInfod">Promo Info</Label>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="pInfod"
                                  name="pInfo"
                                  value={productInfo.pInfo}
                                  onChange={(e) => this.handleChangeInfo(e)}
                                />
                                <FormText className="fs-12">
                                  More information about the promo product
                                </FormText>
                                {promoProductsErrors.pInfo &&
                                promoProductsErrors.pInfo.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {promoProductsErrors.pInfo}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col sm="12" className="mt-2">
                              {updatePromo ? (
                                <Button
                                  type="button"
                                  color="dark"
                                  onClick={this.updateProductInfo}
                                >
                                  {updatingPromoProduct ? (
                                    <span>
                                      Updating... <img src={loaderSm} alt="" />
                                    </span>
                                  ) : (
                                    <span>
                                      Update
                                      <i className="fa fa-check pl-2"></i>
                                    </span>
                                  )}
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  color="dark"
                                  onClick={this.saveProductInfo}
                                >
                                  {savingPromoProduct ? (
                                    <span>
                                      Processing...{" "}
                                      <img src={loaderSm} alt="" />
                                    </span>
                                  ) : (
                                    <span>
                                      Submit
                                      <i className="fa fa-check pl-2"></i>
                                    </span>
                                  )}
                                </Button>
                              )}
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : (
                      <Card>
                        <ReactTable
                          className="-highlight -striped text-left"
                          data={postProducts}
                          columns={columns}
                          defaultPageSize={14}
                          pageSizeOptions={[14, 28, 42, 50]}
                        />
                      </Card>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            {/*  Modal */}
            <Modal
              isOpen={productMd}
              toggle={this.selectProduct}
              fade={false}
              className={this.props.className}
              size="lg"
              modalClassName="modal_stretch animated fadeIn"
            >
              <ModalHeader>
                <i className="icon-check"></i> Select Product(s)
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={this.selectProduct}
                  >
                    <i className="fa fa-times" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody className="md-body">
                <Row>
                  <Col md="12">
                    <Row>
                      <Col md="6">
                        <Button
                          size="sm"
                          type="button"
                          color="success"
                          onClick={this.addSelectedProducts}
                        >
                          Add Selected
                        </Button>
                      </Col>
                      <Col md="6">
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
                            style={{ width: "290px" }}
                          />
                          <input
                            type="submit"
                            id="search-submit"
                            className="search-submit-button"
                            value="Search"
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
                              : products
                          }
                          columns={proCol}
                          showPageSizeOptions={false}
                          defaultPageSize={16}
                          pageSizeOptions={[16, 32, 50]}
                          getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                              return {
                                onClick: (e) => {
                                  let selectedRows = [];

                                  if (e.ctrlKey && this.previousRow) {
                                    if (
                                      this.previousRow.index < rowInfo.index
                                    ) {
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
                                  let selRows = [];
                                  selRows.push(rowInfo.original.id);
                                  this.setState((prevState) => ({
                                    productInfo: {
                                      ...prevState.productInfo,
                                      products: selRows,
                                    },
                                    productMd: false,
                                  }));
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
                      </Card>
                    </div>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  newPostLoad: state.posts.newPostLoad,
  postErrors: state.posts.postErrors,
  products: state.products.products,
  authUser: state.users.auth,
  latestPost: state.posts.latestPost,
  promoProducts: state.posts.promoProducts,
  promoProductsErrors: state.posts.promoProductsErrors,
  savingPromoProduct: state.posts.savingPromoProduct,
  updatingPromoProduct: state.posts.updatingPromoProduct,
});

const mapDispatchToProps = {
  fetchPosts,
  newPost,
  fetchProducts,
  getPromoProduct,
  createPromoProduct,
  updatePromoProduct,
  findOfferProducts,
  destroyPromoProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
