import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import logoPlaceholder from "../../../assets/avatar/placeholder.svg";
import loaderSm from "../../../assets/loader/sharp-sm.svg";
import {
  fetchSettings,
  updateSettings,
  createSettings,
} from "../../../redux/actions/settingAction";
import { toast } from "react-toastify";

class GeneralSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logoUrl: "",
      settingsData: {
        id: 1,
        siteTitle: "",
        siteUrl: "",
        siteDescription: "",
        siteLogoUrl: "",
        miniLogoUrl: "",
        adminEmail: "",
        siteEmail: "",
        siteTelephone: "",
        instagramUrl: "",
        facebookUrl: "",
        pinterestUrl: "",
        footerDescription: "",
      },
    };
  }

  handleClickUpload = () => {
    this.refs.refLogo.click();
  };

  handleLogoUpload = (e) => {
    let reader = this.refs.refLogo.files[0];
    let file = this.refs.refLogo.files[0];

    if (this.refs.refLogo.files.length < 0) {
      return;
    }

    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({ logoUrl: e.target.result });
    };

    let formData = new FormData();
    formData.append("siteLogoUrl", file);
    this.props.createSettings(formData);
  };

  handleChangeSettings = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      settingsData: {
        ...prevState.settingsData,
        [name]: value,
      },
    }));
  };

  handleSaveSettings = () => {
    const { settingsData } = this.state;
    this.props.updateSettings(settingsData).then(() => {
      toast("Settings update successfully!", {
        className: "text-only text-dark",
        autoClose: 4000,
        position: "bottom-left",
      });
    });
  };

  componentDidMount() {
    this.props.fetchSettings().then(() => {
      const { settings } = this.props;
      for (let i = 0; i < settings.length; i++) {
        const s = settings[i];
        if (s.optionName === "siteTitle") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteTitle: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteLogoUrl") {
          this.setState({
            logoUrl: s.optionValue,
          });
        } else if (s.optionName === "miniLogoUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              miniLogoUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteDescription") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteDescription: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "adminEmail") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              adminEmail: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteEmail") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteEmail: s.optionValue,
            },
          }));
        } else if (s.optionName === "siteTelephone") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              siteTelephone: s.optionValue,
            },
          }));
        } else if (s.optionName === "instagramUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              instagramUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "facebookUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              facebookUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "pinterestUrl") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              pinterestUrl: s.optionValue,
            },
          }));
        } else if (s.optionName === "footerDescription") {
          this.setState((prevState) => ({
            settingsData: {
              ...prevState.settingsData,
              footerDescription: s.optionValue,
            },
          }));
        }
      }
    });
  }

  render() {
    const { settingsData, logoUrl } = this.state;
    const { updateSettingsLoad } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <h5 className="dashb-title mb-3">
              <i className="cui-settings"></i> General Settings
            </h5>
            <Row>
              <Col sm={6}>
                <Card>
                  <CardBody>
                    <FormGroup>
                      <Label className="ff-RM">Site Title</Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.siteTitle}
                        name="siteTitle"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">Tagline</Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.siteDescription}
                        name="siteDescription"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">Site Adress (URL)</Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        disabled
                        value={settingsData.siteUrl}
                        name="siteUrl"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">Site Email</Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.siteEmail}
                        name="siteEmail"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">
                        Administration Email Address
                      </Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.adminEmail}
                        name="adminEmail"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">Telephone Contact</Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.siteTelephone}
                        name="siteTelephone"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">
                        <i className="fa fa-instagram"></i> Instagram URL
                      </Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.instagramUrl}
                        name="instagramUrl"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup className="pt-3">
                      <Button
                        color="dark"
                        size="sm"
                        onClick={this.handleSaveSettings}
                      >
                        {updateSettingsLoad ? (
                          <span>
                            Processing... <img src={loaderSm} alt="" />
                          </span>
                        ) : (
                          <span>
                            Save Changes <i className="cui-check pl-2"></i>
                          </span>
                        )}
                      </Button>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={6}>
                <Card>
                  <CardBody className="pb-0">
                    <FormGroup>
                      <Label className="ff-RM">Site Logo</Label>
                      <div className="logo-container">
                        <div className="logo-box">
                          {logoUrl.length ? (
                            <img src={logoUrl} alt="" />
                          ) : (
                            <img src={logoPlaceholder} alt="" />
                          )}
                        </div>
                      </div>
                      <div className="pl-3">
                        <Button
                          type="button"
                          color="primary"
                          size="sm"
                          onClick={this.handleClickUpload}
                        >
                          Upload Logo <i className="fa fa-upload"></i>
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          ref="refLogo"
                          accept="image/*"
                          onChange={(e) => this.handleLogoUpload(e)}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label className="ff-RM">Footer Description</Label>
                      <Input
                        type="textarea"
                        className="form-control-xs"
                        value={settingsData.footerDescription}
                        name="footerDescription"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">
                        <i className="fa fa-facebook"></i> Facebook URL
                      </Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.facebookUrl}
                        name="facebookUrl"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="ff-RM">
                        <i className="fa fa-pinterest"></i> Pinterst URL
                      </Label>
                      <Input
                        type="text"
                        className="form-control-xs"
                        value={settingsData.pinterestUrl}
                        name="pinterestUrl"
                        onChange={this.handleChangeSettings}
                      />
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings.settings,
  updateSettingsLoad: state.settings.updateSettingsLoad,
});

const mapDispatchToProps = {
  fetchSettings,
  updateSettings,
  createSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
