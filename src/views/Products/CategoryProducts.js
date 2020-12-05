import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button, FormGroup, Input, Label } from "reactstrap";
import ReactTable from "react-table";
import loaderSm from "../../assets/loader/sharp-sm.svg";
import {
  createCategory,
  fetchCategory,
} from "../../redux/actions/categoryAction";

class CategoryProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryData: {
        catName: "",
        slug: "",
        description: "",
        parentCat: "",
      },
    };
  }

  handleChngeCategory = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      categoryData: {
        ...prevState.categoryData,
        [name]: value,
      },
    }));
  };

  handleCategory = () => {
    const { categoryData } = this.state;
    this.props.createCategory(categoryData).then(() => {
      this.setState((prevState) => ({
        categoryData: {
          ...prevState.categoryData,
          catName: "",
          slug: "",
          description: "",
        },
      }));
    });
  };

  componentDidMount() {
    //fetch categories
    this.props.fetchCategory();
  }

  render() {
    const { categoryData } = this.state;
    const { categories, createCategoryLoad, categoryErrors } = this.props;

    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Count",
        accessor: "products.length",
      },
      {
        Header: "Description",
        accessor: "description",
        minWidth: 150,
        Cell: (props) => (
          <span>
            {props.original.description !== null
              ? props.original.description
              : "---"}
          </span>
        ),
      },
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="icon-handbag"></i> Categories
            </h5>
            <div className="dashb-wrapper mb-0">
              <Row>
                <Col md="4">
                  <div className="dashb-wrapper">
                    <h5>Add New Category</h5>
                  </div>
                  <FormGroup row>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="catName">Name</Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          id="catName"
                          name="catName"
                          value={categoryData.catName}
                          onChange={this.handleChngeCategory}
                        />

                        {categoryErrors.catName &&
                        categoryErrors.catName.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {categoryErrors.catName}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          type="text"
                          className="form-control-xs"
                          id="slug"
                          name="slug"
                          value={categoryData.slug}
                          onChange={this.handleChngeCategory}
                        />

                        {categoryErrors.slug &&
                        categoryErrors.slug.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {categoryErrors.slug}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="parentCat">Parent Category</Label>
                        <Input
                          type="select"
                          className="form-control-xs"
                          id="parentCat"
                          name="parentCat"
                          // value={categoryData.parentCat}
                          onChange={this.handleChngeCategory}
                        >
                          <option value="-1">None</option>
                          {categories && categories.length > 0
                            ? categories.map(
                                (c) => (
                                  // c.children.length > 0 ? (
                                  //   c.children.map((d) => (
                                  //     <option value={d.id} key={d.id}>
                                  //       &nbsp;&nbsp;&nbsp;{d.name}
                                  //     </option>
                                  //   ))
                                  // ) : (
                                  <option value={c.id} key={c.id}>
                                    {c.name}
                                  </option>
                                )
                                //   )
                              )
                            : null}
                        </Input>

                        {categoryErrors.slug &&
                        categoryErrors.slug.length > 0 ? (
                          <span className="text-danger animated fadeIn">
                            {categoryErrors.slug}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          type="textarea"
                          className="form-control-xs"
                          id="description"
                          name="description"
                          value={categoryData.description}
                          onChange={this.handleChngeCategory}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" className="mt-2">
                      <Button
                        type="button"
                        color="primary"
                        onClick={this.handleCategory}
                      >
                        {createCategoryLoad ? (
                          <span>
                            Processing... <img src={loaderSm} alt="" />
                          </span>
                        ) : (
                          <span>
                            Add New Category <i className="fa fa-plus"></i>
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
                    </Row>
                  </div>
                  <div className="dashb-cards mt-2">
                    <Card>
                      <ReactTable
                        className="-highlight -striped text-left"
                        data={categories}
                        columns={columns}
                        defaultPageSize={14}
                        pageSizeOptions={[14, 28, 42, 50]}
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
  categories: state.categories.categories,
  createCategoryLoad: state.categories.createCategoryLoad,
  categoryErrors: state.categories.categoryErrors,
});

const mapDispatchToProps = { fetchCategory, createCategory };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);
