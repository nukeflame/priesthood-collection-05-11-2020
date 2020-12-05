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
} from "reactstrap";
import { connect } from "react-redux";
import { updateProduct, findProduct } from "../../redux/actions/productAction";
import loaderSm from "../../assets/loader/sharp-sm.svg";
import classNames from "classnames";
import { formatMoney } from "../../config/helpers";
import Select from "react-select";
// import { toast } from "react-toastify";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadZone: false,
      attachedFiles: [],
      productData: {
        id: "",
        productName: "",
        category: [],
        price: "",
        comparePrice: "",
        stock: "",
        tags: [],
        sku: "",
        barcode: "",
        shippingPrice: "",
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
    const { name, value } = e.target;
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
      attachedFiles: [],
      productTags: [
        {
          value: 0,
          label: "0",
        },
        {
          value: 1,
          label: "1",
        },
      ],
      productData: {
        ...prevState.productData,
        productName: "",
        category: [],
        price: "",
        comparePrice: "",
        stock: "",
        tags: [],
        sku: "",
        barcode: "",
        shippingPrice: "",
        description: "<p>Product description</p>",
      },
    }));
  };

  handleUpdateProduct = () => {
    // const { attachedFiles } = this.state;
    // const p = this.state.productData;
    // let formData = new FormData();
    // for (let i = 0; i < attachedFiles.length; i++) {
    //   const f = attachedFiles[i];
    //   formData.append("attachedFiles[]", f);
    // }

    // formData.append("id", p.id);
    // formData.append("productName", p.productName);
    // formData.append("price", p.price);
    // formData.append("comparePrice", p.comparePrice);
    // formData.append("sku", p.sku);
    // formData.append("stock", p.stock);
    // formData.append("category", p.category);
    // formData.append("barcode", p.barcode);
    // formData.append("tags", p.tags);
    // formData.append("shippingPrice", p.shippingPrice);
    // formData.append("description", p.description);
    const formData = new FormData();
    formData.append("name", "ken");

    this.props.updateProduct(formData);
    // .then(() => {
    //   toast("Product updated successfully!");
    //   // this.resetProductData();
    // });
  };

  handleDropFiles = (e) => {
    e.preventDefault();
  };

  handleDragOver = (e) => {
    e.preventDefault();
    return false;
  };

  handleDragLeave = (e) => {
    e.preventDefault();
    return false;
  };

  handleChangeFile = () => {
    this.setState({ uploadZone: true });
    const uploadFile = this.refs.uploadFile;
    const files = uploadFile.files;
    let pushFiles = this.state.attachedFiles;
    for (let i = 0; i < files.length; i++) {
      pushFiles.push(files[i]);
      this.setState({ attachedFiles: pushFiles });
    }
  };

  handleUploadFile = (e) => {
    e.preventDefault();
    this.refs.uploadFile.click();
  };

  removeFile = (e, i) => {
    e.preventDefault();
    let uploadFiles = this.state.attachedFiles;
    const files = uploadFiles.filter((d, s) => ++s !== i);
    this.setState({ attachedFiles: files });
  };

  handleChangeTags = () => {
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.findProduct(params.id).then(() => {
      const p = this.props.product;
      if (p) {
        this.setState((prevState) => ({
          uploadZone: p.media.length ? true : false,
          attachedFiles: p.media,
          productData: {
            ...prevState.productData,
            id: p.id,
            productName: p.productName,
            category: p.category,
            price: formatMoney(p.price),
            comparePrice:
              p.comparePrice !== null ? formatMoney(p.comparePrice) : "",
            stock: p.inventory !== null ? p.inventory : "",
            tags: p.tags !== null ? p.tags : "",
            sku: p.sku !== null ? p.sku : "",
            barcode: p.barcode !== null ? p.barcode : "",
            shippingPrice:
              p.shippingPrice !== null ? formatMoney(p.shippingPrice) : "",
            description: p.description,
          },
        }));
      }
    });
  }

  render() {
    const { productData, uploadZone, attachedFiles, productTags } = this.state;
    const { fetchProductLoad, productErrors } = this.props;

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
          <i className="cui-basket-loaded"></i> Edit Product
        </h5>
        <Row>
          <Col md="8">
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="nameProduct">Product Name *</Label>
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
                      </Col>
                      <Col md="6">
                        <Label htmlFor="selectCat">Select Category *</Label>
                        <Input
                          type="select"
                          className="form-control-xs"
                          id="selectCat"
                          name="category"
                          onChange={(e) => this.onChangeProduct(e)}
                        >
                          <option value="1">Women</option>
                          <option value="2">Men</option>
                        </Input>
                        {productErrors.category &&
                        productErrors.category.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {productErrors.category}
                          </span>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <Row>
                          <Col sm="6">
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
                          </Col>
                          <Col sm="6">
                            <Label htmlFor="comparePrice">
                              Compare at price
                            </Label>
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
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Label htmlFor="selectTags">Select Tags</Label>
                        <Select
                          id="tagsSel"
                          options={productTags}
                          multiple
                          className="form-control-xs none"
                          onChange={this.handleChangeTags}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <Row>
                          <Col md="6">
                            <Label htmlFor="sku">
                              SKU (Stock Keeping Unit){" "}
                            </Label>
                            <Input
                              type="text"
                              className="form-control-xs"
                              id="sku"
                              name="sku"
                              placeholder="TXH-394"
                              value={productData.sku}
                              disabled
                              onChange={(e) => this.onChangeProduct(e)}
                            />
                            {productErrors.sku &&
                            productErrors.sku.length > 0 ? (
                              <span className="text-danger animated fadeIn">
                                {productErrors.sku}
                              </span>
                            ) : null}
                          </Col>
                          <Col md="6">
                            <Label htmlFor="barcode">
                              Barcode (ISBN, UPC, etc.)
                            </Label>
                            <Input
                              type="text"
                              className="form-control-xs"
                              id="barcode"
                              name="barcode"
                              value={productData.barcode}
                              onChange={(e) => this.onChangeProduct(e)}
                            />
                            {productErrors.barcode &&
                            productErrors.barcode.length > 0 ? (
                              <span className="text-danger animated fadeIn">
                                {productErrors.barcode}
                              </span>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Col md="6">
                            <Label htmlFor="stock">Stock *</Label>
                            <Input
                              type="number"
                              className="form-control-xs"
                              id="stock"
                              name="stock"
                              value={productData.stock}
                              onChange={(e) => this.onChangeProduct(e)}
                            />
                            {productErrors.stock &&
                            productErrors.stock.length > 0 ? (
                              <span className="text-danger animated fadeIn">
                                {productErrors.stock}
                              </span>
                            ) : null}
                          </Col>
                          <Col md="6">
                            <Label htmlFor="shipping-price">
                              Shipping Price
                            </Label>
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
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <CKEditor
                  editor={ClassicEditor}
                  data={productData.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    this.onChangeProductDesc(event, editor, data);
                  }}
                />
                <div className=" my-3">
                  <Button
                    color="dark"
                    type="button"
                    size="sm"
                    className="btn-square"
                    onClick={this.handleUpdateProduct}
                  >
                    {fetchProductLoad ? (
                      <span>
                        Processing... <img src={loaderSm} alt="" />
                      </span>
                    ) : (
                      <span>
                        Update Product <i className="fa fa-check"></i>
                      </span>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="4">
            <Card>
              <CardBody>
                <div
                  className={
                    "attached-files " + classNames({ hidden: !uploadZone })
                  }
                >
                  <ul>
                    {attachedFiles && attachedFiles.length > 0 ? (
                      attachedFiles.map((f, i) => (
                        <li className="clearfix" key={i}>
                          <div className="file-title">
                            {++i}. {f.name}
                          </div>
                          <div className="remove-file">
                            <a href="/" onClick={(e) => this.removeFile(e, i)}>
                              <i className="fa fa-trash"></i>
                            </a>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="clearfix">No new files</li>
                    )}

                    <li className="clearfix add-file">
                      <div className="file-title">
                        <a href="/" onClick={(e) => this.handleUploadFile(e)}>
                          Add more files
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    "product-image-upload " + classNames({ hidden: uploadZone })
                  }
                >
                  <div
                    className="product-image-none"
                    id="drop-zone"
                    onDrop={(e) => this.handleDropFiles(e)}
                    onDragOver={this.handleDragOver}
                    onDragLeave={(e) => this.handleDragLeave(e)}
                  >
                    <div className="pb-2">
                      <i className="cui-cloud-upload"></i>
                    </div>
                    <Button
                      type="button"
                      color="secondary"
                      className="btn-square"
                      onClick={(e) => this.handleUploadFile(e)}
                    >
                      Add Files
                    </Button>
                    <small className="mt-2">Or Drop files here to upload</small>
                    <input
                      type="file"
                      ref="uploadFile"
                      multiple
                      accept="image/*"
                      onChange={(e) => this.handleChangeFile(e)}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchProductLoad: state.products.fetchProductLoad,
  product: state.products.findProduct,
  productErrors: state.products.productErrors,
});

const mapDispatchToProps = {
  findProduct,
  updateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
