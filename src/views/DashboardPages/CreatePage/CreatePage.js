import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  CardFooter,
  Label,
  Button,
  Collapse,
} from "reactstrap";
import classNames from "classnames";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import loaderSm from "../../../assets/loader/sharp-sm.svg";
import { connect } from "react-redux";
import { savePage } from "../../../redux/actions/pageAction";
import { toast } from "react-toastify";
import { API_URL } from "../../../config/auth/appRoutes";

class CreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      custom: [false, false],
      publishPage: false,
      pageData: {
        title: "",
        description: "",
      },
    };
  }

  onChangePageDesc = (e, v, d) => {
    this.setState((prevState) => ({
      pageData: {
        ...prevState.pageData,
        description: d,
      },
    }));
  };

  handleChangePage = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      pageData: {
        ...prevState.pageData,
        [name]: value,
      },
    }));
  };

  handlePublish = () => {
    const { publishPage, pageData } = this.state;
    const { user } = this.props;
    if (publishPage) {
      const data = {
        title: pageData.title,
        description: pageData.description,
        authorId: user.id,
        postType: "page",
      };

      if (pageData.title.length > 0) {
        this.props.savePage(data).then(() => {
          toast(
            <div>
              <i className="fa fa-check"></i> Page saved.
            </div>,
            {
              className: "text-only text-dark",
              autoClose: 4000,
              position: "top-right",
            }
          );
          this.props.history.push("/pages");
        });
      }
    } else {
      this.setState({ publishPage: true });
    }
  };

  handleCancelPub = () => {
    this.setState({ publishPage: false });
  };

  toggleCustom = (tab) => {
    let { custom } = this.state;
    const prevState = custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      custom: state,
    });
  };

  render() {
    const { pageData, custom, publishPage } = this.state;
    const { loadingPublish } = this.props;

    return (
      <div>
        <Row>
          <Col md="12">
            <h5 className="dashb-title">
              <i className="cui-puzzle"></i> New Page
            </h5>
            <div className="dashb-wrapper">
              <Row>
                <Col md="9">
                  <FormGroup>
                    <Label htmlFor="title">Enter Title</Label>
                    <Input
                      type="select"
                      className="form-control-xs"
                      id="title"
                      name="title"
                      value={pageData.title}
                      onChange={(e) => this.handleChangePage(e)}
                    >
                      <option value="" disabled>
                        -- Select --
                      </option>
                      <option value="Blog">Blog</option>
                      <option value="Contact">Contact</option>
                      <option value="About">About</option>
                    </Input>
                  </FormGroup>
                  <div className="new-page-wrapper">
                    <CKEditor
                      height="234px"
                      editor={ClassicEditor}
                      data={pageData.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.onChangePageDesc(event, editor, data);
                      }}
                    />
                  </div>
                </Col>
                <Col sm="3">
                  <Card>
                    <CardHeader>Publish</CardHeader>
                    <CardBody className="components-panel__body-toggle">
                      <div
                        className={
                          "editor-post-publish-panel__content " +
                          classNames({
                            hidden: !publishPage,
                          })
                        }
                      >
                        <div className="pb-1">
                          <strong>Are you ready to publish?</strong>
                        </div>
                        <p>Double-check your settings before publishing.</p>
                      </div>
                      <div
                        id="statusAndVisibility"
                        className={
                          "components-panel " +
                          classNames({
                            hidden: publishPage,
                          })
                        }
                        data-children=".item"
                      >
                        <div className="item">
                          <h2>
                            <Button
                              color="link"
                              onClick={() => this.toggleCustom(0)}
                              aria-expanded={custom[0]}
                              aria-controls="statusAndVisibilityAc"
                            >
                              <span className="icon-right">
                                <i
                                  className={
                                    "icon-arrow-down " +
                                    classNames({
                                      "icon-arrow-up": custom[0],
                                    })
                                  }
                                />
                              </span>
                              Status
                            </Button>
                          </h2>
                          <Collapse
                            isOpen={custom[0]}
                            data-parent="#statusAndVisibility"
                            id="statusAndVisibilityAc"
                          >
                            <div className="components-panel__row">
                              <span>Visibility</span>
                              <div className="components-dropdown">
                                <Button type="button" size="sm" color="link">
                                  Public
                                </Button>
                              </div>
                            </div>
                            <div className="components-panel__row">
                              <span>Publish</span>
                              <div className="components-dropdown">
                                <Button type="button" size="sm" color="link">
                                  Immediately
                                </Button>
                              </div>
                            </div>
                          </Collapse>
                        </div>
                        <div className="item">
                          <Button
                            color="link"
                            onClick={() => this.toggleCustom(1)}
                            aria-expanded={custom[1]}
                            aria-controls="linkUrl"
                          >
                            <span className="icon-right">
                              <i
                                className={
                                  "icon-arrow-down " +
                                  classNames({
                                    "icon-arrow-up": custom[1],
                                  })
                                }
                              />
                            </span>
                            Link URL
                          </Button>
                          <Collapse
                            isOpen={custom[1]}
                            data-parent="#exampleAccordion"
                            id="linkUrl"
                          >
                            <div className="components-panel__link">
                              <FormGroup row>
                                <Col md="12">
                                  <Label htmlFor="slugUrl">URL Slug</Label>
                                  <Input
                                    bsSize="sm"
                                    className="form-control-xs"
                                    value={
                                      API_URL + pageData.title.toLowerCase()
                                    }
                                    disabled
                                  />
                                </Col>
                              </FormGroup>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        className={
                          "float-left " + classNames({ hidden: !publishPage })
                        }
                        onClick={(e) => this.handleCancelPub(e)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        color={publishPage ? "success" : "primary"}
                        size="sm"
                        className="float-right"
                        onClick={(e) => this.handlePublish(e)}
                        disabled={pageData.title.length ? false : true}
                      >
                        {loadingPublish ? (
                          <span>
                            Publishing <img src={loaderSm} alt="" />
                          </span>
                        ) : (
                          <span>Publish</span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
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
  user: state.users.auth,
  loadingPublish: state.pages.loadingPublish,
});

const mapDispatchToProps = {
  savePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
