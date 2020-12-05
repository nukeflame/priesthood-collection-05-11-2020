import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Row,
  Col,
  Input,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardFooter,
  CardHeader,
  FormText,
} from "reactstrap";
import { connect } from "react-redux";
import { createProduct } from "../../redux/actions/productAction";
import loaderSm from "../../assets/loader/sharp-sm.svg";
import classNames from "classnames";
import { formatMoney } from "../../config/helpers";
import { toast } from "react-toastify";
import { fetchCategory } from "../../redux/actions/categoryAction";
// import { isEmpty } from "lodash";

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadZone: false,
      showCat: false,
      productImgFile: "",
      attachedFiles: [],
      fileGallery: [],
      formData: new FormData(),
      productData: {
        fileThumb: "",
        weight: "0",
        productName: "",
        category: [],
        price: "",
        comparePrice: "",
        stockQnty: 0,
        stockStatus: 1,
        backOrders: "",
        brandId: "",
        sku: "",
        barcode: "",
        shippingPrice: "",
        specifications: "<p>More specifications</p>",
        description: "<p>Product description</p>",
      },
    };
  }

  loadingBody = () => (
    <div
      className="animated fadeIn pt-1 text-center d-flex justify-content-center"
      style={{ margin: "20% auto" }}
    >
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  onChangeProduct = (e) => {
    const { name, value, checked } = e.target;

    if (name === "product_category") {
      if (checked) {
        let category = this.state.productData.category;
        category.push(parseInt(value));
        this.setState((prevState) => ({
          productData: {
            ...prevState.productData,
            category,
          },
        }));
      } else {
        let category = this.state.productData.category;
        category.splice(category.indexOf(value), 1);
      }
    }

    this.setState((prevState) => ({
      productData: {
        ...prevState.productData,
        [name]: value,
      },
    }));
  };

  onChangeProductDesc = (e, v, d) => {
    this.setState((prevState) => ({
      productData: {
        ...prevState.productData,
        description: d,
      },
    }));
  };

  onChangeSpecifications = (e, v, d) => {
    this.setState((prevState) => ({
      productData: {
        ...prevState.productData,
        specifications: d,
      },
    }));
  };

  onChangeProductPrice = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      productData: {
        ...prevState.productData,
        [name]: formatMoney(value),
      },
    }));
  };

  resetProductData = () => {
    this.setState((prevState) => ({
      uploadZone: false,
      showCat: false,
      productImgFile: "",
      attachedFiles: [],
      fileGallery: [],
      formData: new FormData(),
      productData: {
        fileThumb: "",
        weight: "0",
        productName: "",
        category: [],
        price: "",
        comparePrice: "",
        stockQnty: 0,
        stockStatus: 1,
        backOrders: "",
        brandId: "",
        sku: Math.random().toString(36).substring(4).toUpperCase(),
        barcode: "",
        shippingPrice: "",
        specifications: "<p>More specifications</p>",
        description: "<p>Product description</p>",
      },
    }));
  };

  handleChangePrdGallery = () => {
    const { fileGallery } = this.state;
    const { user } = this.props;
    const files = this.refs.prdtGallery.files;
    let viewData = fileGallery;

    if (!files.length > 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      let formData = this.state.formData;
      formData.append("checkGallery", true);
      formData.append("userId", user.id);
      formData.append("attachedFiles[]", files[i]);
      //
      let reader = files[i];
      reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        viewData.push(e.target.result);
        this.setState({ fileGallery: viewData });
      };
    }
  };

  handleProductGallery = (e) => {
    e.preventDefault();
    this.refs.prdtGallery.click();
  };

  removeFile = (e, i) => {
    e.preventDefault();
    const { attachedFiles, fileGallery } = this.state;
    const uploadChanged = fileGallery.filter(
      (d) => fileGallery.indexOf(d) !== i
    );
    const attachedChanged = attachedFiles.filter(
      (d) => attachedFiles.indexOf(d) !== i
    );
    this.setState({
      fileGallery: uploadChanged,
      attachedFiles: attachedChanged,
    });
  };

  removeFileProduct = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      formData: new FormData(),
      productImgFile: "",
      productData: {
        ...prevState.productData,
        fileThumb: "",
      },
    }));
  };

  handleChangeTags = () => {};

  handleClickCat = () => {
    const { showCat } = this.state;
    this.setState({ showCat: !showCat });
  };

  handleProductImage = (e) => {
    e.preventDefault();
    this.refs.productImg.click();
  };

  handleChangePrdImg = () => {
    const productImage = this.refs.productImg;
    const { user } = this.props;

    if (!productImage.files.length > 0) {
      return;
    }

    const file = productImage.files[0];
    let reader = file;
    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({ productImgFile: e.target.result });
    };

    let formData = this.state.formData;
    formData.append("checkThumb", true);
    formData.append("userId", user.id);
    formData.append("productThumb", file);

    //
  };

  saveProduct = () => {
    const p = this.state.productData;
    let formData = this.state.formData;
    formData.append("productName", p.productName);
    formData.append("price", p.price);
    formData.append("comparePrice", p.comparePrice);
    formData.append("sku", p.sku);
    formData.append("stockQnty", p.stockQnty);
    formData.append("stockStatus", p.stockStatus);
    formData.append("backOrders", p.backOrders);
    formData.append("category", p.category);
    formData.append("brandId", p.brandId);
    formData.append("shippingPrice", p.shippingPrice);
    formData.append("specifications", p.specifications);
    formData.append("description", p.description);

    this.props.createProduct(formData).then(() => {
      toast("New product created!", {
        className: "text-only text-dark",
      });
      this.resetProductData();
    });
  };

  componentDidMount() {
    let str = Math.random().toString(36).substring(4).toUpperCase();
    this.setState((prevState) => ({
      productData: {
        ...prevState.productData,
        sku: str,
      },
    }));
    //fetch categories
    this.props.fetchCategory();
  }

  render() {
    const {
      productData,
      uploadZone,
      fileGallery,
      showCat,
      // attachedFiles,
      productImgFile,
    } = this.state;
    const { fetchProductLoad, productErrors, categories } = this.props;

    return (
      <div className="animated fadeIn">
        <div
          className={
            "loader-body animated fadeIn " +
            classNames({ displayBlock: fetchProductLoad })
          }
        >
          {this.loadingBody()}
        </div>
        <h5 className="dashb-title mb-3">
          <i className="cui-basket-loaded"></i> Add Product
        </h5>
        <Row>
          <Col md="9">
            <Row>
              <Col md="12">
                <Card style={{ borderRadius: "0px" }}>
                  <CardBody style={{ paddingBottom: "0px" }}>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="nameProduct">Product name *</Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            id="nameProduct"
                            placeholder="Short sleeve t-shirt"
                            value={productData.productName}
                            name="productName"
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                          {productErrors.productName &&
                          productErrors.productName.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.productName}
                            </span>
                          ) : null}
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="price">Price *</Label>
                          <div className="form-price-fixed">
                            <div className="form-price">Ksh</div>
                            <Input
                              type="text"
                              className="form-control-xs"
                              id="price"
                              name="price"
                              autoComplete="off"
                              value={productData.price}
                              onChange={(e) => this.onChangeProduct(e)}
                              onBlur={(e) => this.onChangeProductPrice(e)}
                            />
                          </div>
                          {productErrors.price &&
                          productErrors.price.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.price}
                            </span>
                          ) : null}
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="comparePrice">Compare at price</Label>
                          <div className="form-price-fixed">
                            <div className="form-price">Ksh</div>
                            <Input
                              type="text"
                              className="form-control-xs"
                              id="comparePrice"
                              name="comparePrice"
                              autoComplete="off"
                              value={productData.comparePrice}
                              onChange={(e) => this.onChangeProduct(e)}
                              onBlur={(e) => this.onChangeProductPrice(e)}
                            />
                          </div>
                          {productErrors.comparePrice &&
                          productErrors.comparePrice.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.comparePrice}
                            </span>
                          ) : null}
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="brandName">Brand name </Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="brandName"
                            name="brandId"
                            autoComplete="off"
                            onChange={(e) => this.onChangeProduct(e)}
                          >
                            <option value="-1">--</option>
                            <option value="1">Adidas</option>
                            <option value="2">Gucci</option>
                            <option value="3">Nike</option>
                            <option value="4">Dell</option>
                          </Input>

                          {productErrors.brandName &&
                          productErrors.brandName.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.brandName}
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <fieldset className="inline-edit-col-center inline-edit-categories">
                          <div className="inline-edit-col">
                            <span className="title inline-edit-categories-label">
                              Categories *
                            </span>
                            <input
                              type="hidden"
                              name="product_category[]"
                              value="0"
                            />
                            <ul className="cat-checklist category-checklist">
                              {categories && categories.length > 0
                                ? categories.map((c) => (
                                    <li id={`category-${c.id}`} key={c.id}>
                                      <label className="selectit">
                                        <input
                                          value={c.id}
                                          type="checkbox"
                                          name="product_category"
                                          id={`in-category-${c.id}`}
                                          onChange={(e) =>
                                            this.onChangeProduct(e)
                                          }
                                        />{" "}
                                        {c.name}
                                      </label>
                                    </li>
                                  ))
                                : null}

                              {/* <li id="category-8">
                                <label className="selectit">
                                  <input
                                    value="8"
                                    type="checkbox"
                                    name="post_category[]"
                                    id="in-category-8"
                                  />{" "}
                                  Home Appliances
                                </label>
                                <ul className="children">
                                  <li id="category-10">
                                    <label className="selectit">
                                      <input
                                        value="10"
                                        type="checkbox"
                                        name="post_category[]"
                                        id="in-category-10"
                                      />{" "}
                                      Washing Machines
                                    </label>
                                  </li>
                                </ul>
                              </li> */}
                            </ul>
                          </div>
                        </fieldset>
                        {productErrors.category &&
                        productErrors.category.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {productErrors.category}
                          </span>
                        ) : null}

                        {/* <Label htmlFor="selectCat">Category *</Label>
                        <Input
                          type="select"
                          className="form-control-xs"
                          id="selectCat"
                          name="category"
                          defaultValue="0"
                          onChange={(e) => this.onChangeProduct(e)}
                        >
                          <option value="0" disabled>
                            Select category
                          </option>
                          {categories && categories.length > 0 ? (
                            categories.map((c) => (
                              <option value={c.id} key={c.id}>
                                {c.name}
                              </option>
                            ))
                          ) : (
                            <option value>Records not found.</option>
                          )}
                        </Input>
                        {productErrors.category &&
                        productErrors.category.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {productErrors.category}
                          </span>
                        ) : null} */}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label>Short product description</Label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={productData.description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              this.onChangeProductDesc(event, editor, data);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 className="ff-RM mt-0">
                      <i className="fa fa-server"></i> Inventory
                    </h5>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="sku">SKU *</Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            id="sku"
                            name="sku"
                            placeholder="TXH-394"
                            value={productData.sku}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                          {productErrors.sku && productErrors.sku.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.sku}
                            </span>
                          ) : null}
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="stockQnty">Stock quantity *</Label>
                          <Input
                            type="number"
                            className="form-control-xs"
                            id="stockQnty"
                            name="stockQnty"
                            value={productData.stockQnty}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                          {productErrors.stock &&
                          productErrors.stock.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.stock}
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="stockStatus">Stock status *</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="stockStatus"
                            name="stockStatus"
                            value={productData.stockStatus}
                            onChange={(e) => this.onChangeProduct(e)}
                          >
                            <option value="1">In Stock</option>
                            <option value="-1">Out of Stock</option>
                          </Input>

                          {/* {productErrors.barcode &&
                          productErrors.barcode.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.barcode}
                            </span>
                          ) : null} */}
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="allow-backorders">
                            Allow backorders
                          </Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="allow-backorders"
                            name="allowBackorders"
                            value={productData.backOrders}
                            onChange={(e) => this.onChangeProduct(e)}
                          >
                            <option value="-1">Do not allow</option>
                            <option value="1">
                              Allow, but notify customer
                            </option>
                            <option value="2">Allow</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 className="ff-RM  mt-0">
                      <i className="fa fa-truck"></i> Shipping
                    </h5>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label htmlFor="sku">Weight (Ibs) </Label>
                          <Input
                            type="number"
                            className="form-control-xs"
                            id="sku"
                            name="sku"
                            value={productData.weight}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                          {productErrors.sku && productErrors.sku.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.sku}
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="length">Dimensions (in)</Label>
                          <FormGroup row>
                            <Col md="4">
                              <FormGroup>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="length"
                                  name="length"
                                  placeholder="Length"
                                  value={productData.stock}
                                  onChange={(e) => this.onChangeProduct(e)}
                                />
                                {productErrors.stock &&
                                productErrors.stock.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {productErrors.stock}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="width"
                                  name="width"
                                  placeholder="Width"
                                  value={productData.stock}
                                  onChange={(e) => this.onChangeProduct(e)}
                                />
                                {productErrors.stock &&
                                productErrors.stock.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {productErrors.stock}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Input
                                  type="text"
                                  className="form-control-xs"
                                  id="height"
                                  name="height"
                                  placeholder="Height"
                                  value={productData.stock}
                                  onChange={(e) => this.onChangeProduct(e)}
                                />
                                {productErrors.stock &&
                                productErrors.stock.length > 0 ? (
                                  <span className="text-danger animated fadeIn">
                                    {productErrors.stock}
                                  </span>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="shipping-class">Shipping class</Label>
                          <Input
                            type="select"
                            className="form-control-xs"
                            id="shipping-class"
                            name="shippingPrice"
                            value={productData.shippingPrice}
                            onChange={(e) => this.onChangeProduct(e)}
                            onBlur={(e) => this.onChangeProductPrice(e)}
                          >
                            <option value="1">No shipping class</option>
                          </Input>
                        </FormGroup>

                        {/* <FormGroup>
                          <Label htmlFor="shipping-price">Shipping Price</Label>
                          <div className="form-price-fixed">
                            <div className="form-price">Ksh</div>
                            <Input
                              type="text"
                              className="form-control-xs"
                              id="shipping-price"
                              name="shippingPrice"
                              value={productData.shippingPrice}
                              onChange={(e) => this.onChangeProduct(e)}
                              onBlur={(e) => this.onChangeProductPrice(e)}
                            />
                          </div>
                          {productErrors.shippingPrice &&
                          productErrors.shippingPrice.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.shippingPrice}
                            </span>
                          ) : null}
                        </FormGroup> */}
                      </Col>
                    </Row>
                    <h5 className="ff-RM mt-0">
                      <i className="fa fa-link"></i> Linked Products
                    </h5>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="upSells">Up-sells </Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            id="upSells"
                            name="upSells"
                            placeholder="Search for a product"
                            value={productData.upSells}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                          {productErrors.sku && productErrors.sku.length > 0 ? (
                            <span className="text-danger animated fadeIn">
                              {productErrors.sku}
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label htmlFor="crossSells">Cross-sells</Label>
                          <Input
                            type="text"
                            className="form-control-xs"
                            id="crossSells"
                            name="crossSells"
                            placeholder="Search for a product"
                            value={productData.crossSells}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h5 className="ff-RM mt-0">
                      <i className="fa fa-cog"></i> Advanced
                    </h5>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label htmlFor="purchaseNote">Purchase note </Label>
                          <Input
                            type="textarea"
                            className="form-control-xs"
                            style={{ minHeight: "100px" }}
                            id="purchaseNote"
                            name="purchaseNote"
                            placeholder="Search for a product"
                            value={productData.purchaseNote}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="6">
                        <FormGroup>
                          <Label htmlFor="menuOrder">Menu Order</Label>
                          <Input
                            type="number"
                            className="form-control-xs"
                            id="menuOrder"
                            name="menuOrder"
                            value={productData.menuOrder}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="enableReviews">Enable Reviews</Label>
                          <Input
                            type="checkbox"
                            className="form-control-xs"
                            id="enableReviews"
                            name="enableReviews"
                            value={productData.enableReviews}
                            onChange={(e) => this.onChangeProduct(e)}
                          />
                        </FormGroup>
                      </Col> */}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label className="ff-RM">More Specifications</Label>
                  <CKEditor
                    editor={ClassicEditor}
                    className="specifications"
                    data={productData.specifications}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.onChangeSpecifications(event, editor, data);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col md="3">
            <FormGroup row>
              <Col md="12">
                <Button
                  type="button"
                  color="danger"
                  outline
                  block
                  size="sm"
                  className="mb-2"
                  onClick={(e) => this.handleCancelPub(e)}
                >
                  Move to Trash
                </Button>
                <Button
                  color="dark"
                  type="button"
                  block
                  size="sm"
                  className="btn-square"
                  onClick={this.saveProduct}
                >
                  {fetchProductLoad ? (
                    <span>
                      Processing... <img src={loaderSm} alt="" />
                    </span>
                  ) : (
                    <span>
                      Save Product <i className="fa fa-plus"></i>
                    </span>
                  )}
                </Button>
              </Col>
            </FormGroup>
            {/* product category */}
            <Card style={{ borderRadius: "0px" }}>
              <CardHeader>
                <span className="ff-RM">Product category</span>
              </CardHeader>
              <CardBody style={{ padding: "0px" }}>
                <Button
                  color="link"
                  className="mb-2 fs-14 pt-2"
                  onClick={this.handleClickCat}
                >
                  <i className="fa fa-plus" /> Add new category
                </Button>
                <div className={"px-3 " + classNames({ hidden: !showCat })}>
                  <FormGroup>
                    <Label htmlFor="newCatName">New Category Name</Label>
                    <Input
                      type="text"
                      className="form-control-xs"
                      id="newCatName"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="catSlug">Slug</Label>
                    <Input
                      type="text"
                      className="form-control-xs"
                      id="catSlug"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="catParent">Parent Category</Label>
                    <Input
                      type="select"
                      className="form-control-xs"
                      id="catParent"
                    >
                      <option>Costumes</option>
                      <option>Fragrances</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="button"
                      className="btn-square"
                      size="sm"
                      color="dark"
                    >
                      Add New Category
                    </Button>
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
            {/* product image */}
            <Card style={{ borderRadius: "0px" }}>
              <CardHeader>
                <span className="ff-RM">Product image</span>
              </CardHeader>
              <CardBody style={{ padding: "0px" }}>
                <Button
                  color="link"
                  className={
                    "mb-2 fs-14 pt-2 " +
                    classNames({ hidden: productImgFile.length })
                  }
                  onClick={(e) => this.handleProductImage(e)}
                >
                  Set product image
                </Button>
                <input
                  type="file"
                  ref="productImg"
                  accept="image/*"
                  onChange={(e) => this.handleChangePrdImg(e)}
                  className="hidden"
                />
                <div
                  className={
                    "attached-files p-3 " +
                    classNames({ hidden: !productImgFile.length })
                  }
                >
                  <ul>
                    <li
                      className="attachment clearfix"
                      tabIndex="0"
                      style={{ width: "100%" }}
                      onClick={(e) => this.handleProductImage(e)}
                    >
                      <div className="attachment-preview">
                        <div className="thumbnail">
                          <div className="centered">
                            <img
                              src={productImgFile}
                              alt=""
                              draggable="false"
                            />
                          </div>
                        </div>
                      </div>
                      <FormText>Click image to edit or update</FormText>
                    </li>
                  </ul>
                  <div
                    className="remove-title pt-2"
                    style={{ textAlign: "left" }}
                  >
                    {/* eslint-disable-next-line */}
                    <a href="#" onClick={(e) => this.removeFileProduct(e)}>
                      Remove product image
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* product gallery */}
            <Card style={{ borderRadius: "0px" }}>
              <CardHeader>
                <span className="ff-RM">Product gallery</span>
              </CardHeader>
              <CardBody className="attached-cardbody">
                <div
                  className="attached-files " // classNames({ hidden: fileGallery.length })
                >
                  <ul>
                    {fileGallery && fileGallery.length > 0
                      ? fileGallery.map((f, i) => (
                          <li
                            className="attachment clearfix"
                            key={i}
                            tabIndex="0"
                          >
                            <div className="attachment-preview">
                              <div className="thumbnail">
                                <div className="centered">
                                  <img src={f} alt="" draggable="false" />
                                </div>
                              </div>
                            </div>
                            <div className="remove-title">
                              {/* eslint-disable-next-line  */}
                              <a
                                href="#"
                                onClick={(e) => this.removeFile(e, i)}
                              >
                                Remove
                              </a>
                            </div>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
                {/*  */}
                <Button
                  color="link"
                  className="mb-2 fs-14 pt-2"
                  onClick={(e) => this.handleProductGallery(e)}
                >
                  Add product gallery images
                </Button>
                <input
                  type="file"
                  ref="prdtGallery"
                  multiple
                  accept="image/*"
                  onChange={(e) => this.handleChangePrdGallery(e)}
                  className="hidden"
                />
              </CardBody>
              <CardFooter
                className={
                  "attached-cardfooter " + classNames({ hidden: !uploadZone })
                }
              >
                <div className="file-title">
                  <Button
                    color="seconadry"
                    type="button"
                    size="sm"
                    block
                    outline
                    className="btn-square"
                    onClick={(e) => this.handleUploadFile(e)}
                  >
                    <i className="ti-plus" /> Add Product Image(s)
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchProductLoad: state.products.fetchProductLoad,
  productErrors: state.products.productErrors,
  categories: state.categories.categories,
  user: state.users.auth,
});

const mapDispatchToProps = {
  createProduct,
  fetchCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
