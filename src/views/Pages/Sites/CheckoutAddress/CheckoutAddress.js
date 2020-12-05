import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Row,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormText,
} from "reactstrap";
import classNames from "classnames";
import { orderPayNow, findOrder } from "../../../../redux/actions/orderAction";
import {
  saveCheckoutAddress,
  updateCheckoutAddress,
  findAddress,
} from "../../../../redux/actions/addressAction";
import loaderSm from "../../../../assets/loader/sharp-sm.svg";
import loaderBg from "../../../../assets/loader/ajax-loader.gif";
import hLoader from "../../../../assets/loader/horizontal.svg";
import iconClose from "../../../../assets/img/icons/icon_close.svg";
import mpesaLogo from "../../../../assets/img/brand/mpesa1.jpg";
import { formatMoney, imageUrl } from "../../../../config/helpers";
import { isNull, isEmpty } from "lodash";
import { fetchAuthUser } from "../../../../redux/actions/userAction";
import { getUserData } from "../../../../config/auth";
import {
  destroyCartlist,
  fetchCartlist,
} from "../../../../redux/actions/cartlistAction";
import {
  updateShipping,
  findShipping,
} from "../../../../redux/actions/shippingAction";
import { fetchCities } from "../../../../redux/actions/cityAction";
import {
  fetchRegions,
  showRegions,
} from "../../../../redux/actions/regionAction";
import {
  createBilling,
  updateBilling,
} from "../../../../redux/actions/billingAction";
// import moment from "moment";
import queryString from "query-string";
import {
  setPickupRegion,
  showPickupRegion,
} from "../../../../redux/actions/pickupActions";
// import { toast } from "react-toastify";

class CheckoutAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [true, false, false],
      checkAddress: true,
      checkMethod: false,
      confirmOrderMd: false,
      checkOutData: {
        id: "",
        firstname: "",
        lastname: "",
        mobileNo: "",
        otherMobileNo: "",
        deliveryAddress: "",
        deliveryAddress2: "",
        stateRegion: "",
        city: "",
        shippingMethod: "pickUp",
        deliveryMethod: "payOnline",
        mpesaNo: "",
        totalPay: "",
      },
      isEditAddress: false,
      orderId: "",
      showClosePay: false,
      payBackdrop: false,
      pickupMd: false,
      checkTotal: {
        id: "",
        subTotal: "",
        total: "",
        shippingAmount: "",
      },
      isEditShipping: false,
      shippingData: {
        id: "",
        deliveryAdress: "",
        deliveryAddress2: "",
        deliveryInfo: "",
        deliveryMethod: "",
        deliveryCity: "",
        deliveryRegion: "",
        deliveryFee: "",
      },
      billData: {
        billId: "",
        orderId: "",
        paymentMethod: "",
        totalFee: "",
      },
      typeNo: false,
      checkShipBtn: false,
      checkProceedBtn: true,
      regionInfo: false,
      disRegionInfo: false,
      pickupData: {
        cityId: 0,
        stateRegionId: 0,
        pickupAddress: "",
        locations: [],
        defaultPickup: false,
      },
      disSelect: false,
    };
  }

  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  };

  handleEditCart = () => {
    this.props.history.push("/cart");
  };

  handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      checkOutData: {
        ...prevState.checkOutData,
        [name]: value,
      },
    }));
    //
    if (value === "homeDelivery") {
      this.setState({ checkProceedBtn: false });
    } else {
      this.setState({ checkProceedBtn: true });
    }
  };

  handleSaveAdress = (e) => {
    e.preventDefault();
    const { cart } = this.props;
    const c = this.state.checkOutData;
    const data = {
      id: c.id,
      addressDetails: true,
      firstname: c.firstname,
      lastname: c.lastname,
      mobileNo: c.mobileNo,
      otherMobileNo: c.otherMobileNo,
      deliveryAddress: c.deliveryAddress,
      deliveryAddress2: c.deliveryAddress2,
      stateRegion: c.stateRegion,
      city: c.city,
      cart,
    };

    const { isEditAddress } = this.state;
    if (isEditAddress) {
      this.props.updateCheckoutAddress(data).then(() => {
        this.setState({ accordion: [true, true, true], checkAddress: true });
        this.resetCheckOutData();
      });
    } else {
      this.props.saveCheckoutAddress(data).then(() => {
        this.setState({ accordion: [true, true, true], checkAddress: true });
        this.resetCheckOutData();
      });
    }
  };

  resetCheckOutData = () => {
    this.setState((prevState) => ({
      checkOutData: {
        ...prevState.checkOutData,
        id: "",
        firstname: "",
        lastname: "",
        mobileNo: "",
        otherMobileNo: "",
        deliveryAddress: "",
        deliveryAddress2: "",
        stateRegion: "",
        city: "",
        shippingMethod: "homeDelivery",
        deliveryMethod: "payOnline",
        mpesaNo: "",
      },
      isEditAddress: false,
    }));
  };

  handleEditAddress = (e) => {
    e.preventDefault();
    const { addressData } = this.props;
    const mbNo = addressData.mobileNo
      ? Number(addressData.mobileNo.slice(4))
      : "";
    const otherMbNo = addressData.otherMobileNo
      ? Number(addressData.otherMobileNo.slice(4))
      : "";

    this.setState((prevState) => ({
      checkOutData: {
        ...prevState.checkOutData,
        id: addressData.id,
        firstname: addressData.firstname,
        lastname: addressData.lastname,
        mobileNo: mbNo,
        otherMobileNo: otherMbNo,
        deliveryAddress: addressData.deliveryAddress,
        deliveryAddress2: addressData.deliveryAddress2
          ? addressData.deliveryAddress2
          : "",
        stateRegion:
          addressData.stateRegion !== null ? addressData.stateRegion.id : null,
        city: addressData.city !== null ? addressData.city.id : null,
      },
    }));
    this.setState({
      accordion: [true, false, false],
      checkAddress: false,
      isEditAddress: true,
    });
  };

  togleConfOrder = () => {
    const { confirmOrderMd } = this.state;
    this.setState({ confirmOrderMd: !confirmOrderMd });
  };

  handleConfimrOder = () => {
    const { latestBilling, latestOrder, addressData } = this.props;
    const { checkTotal, checkOutData } = this.state;

    const data = {
      orderId: latestOrder.id,
      totalFee: checkTotal.total,
      vat: 0,
      couponId: 0,
      paymentMmethod: checkOutData.deliveryMethod,
    };

    if (isNull(latestOrder.billing)) {
      this.props.createBilling(data).then(() => {
        const { latestBilling, latestOrder } = this.props;
        this.setState((prevState) => ({
          billData: {
            ...prevState.billData,
            billId: latestBilling.id,
            orderId: latestOrder.id,
            paymentMethod: latestBilling.paymentMethod,
            totalFee: latestBilling.totalFee,
          },
        }));

        if (!isNull(addressData.mobileNo)) {
          let mpesaNo = Number(addressData.mobileNo);
          this.setState((prevState) => ({
            checkOutData: {
              ...prevState.checkOutData,
              mpesaNo,
            },
          }));
        }
        // payment modal
        this.togleConfOrder();
      });
    } else {
      const { latestOrder } = this.props;
      const data = {
        billId: latestOrder.billing.id,
        orderId: latestOrder.id,
        totalFee: checkTotal.total,
        vat: 0,
        couponId: 0,
        paymentMmethod: checkOutData.deliveryMethod,
      };

      this.props.updateBilling(data).then(() => {
        this.setState((prevState) => ({
          billData: {
            ...prevState.billData,
            billId: latestBilling.id,
            orderId: latestOrder.id,
            paymentMethod: latestBilling.paymentMethod,
            totalFee: latestBilling.totalFee,
          },
        }));

        if (!isNull(addressData.mobileNo)) {
          let mpesaNo = Number(addressData.mobileNo);
          this.setState((prevState) => ({
            typeNo: false,
            checkOutData: {
              ...prevState.checkOutData,
              mpesaNo,
            },
          }));
        }
        // payment modal
        this.togleConfOrder();
      });
    }
  };

  pickupModal = () => {
    const { pickupMd } = this.state;
    this.setState((prevState) => ({
      pickupData: {
        ...prevState.pickupData,
        locations: [],
      },
      pickupMd: !pickupMd,
    }));

    const { authUser } = this.props;
    let pickup = {};
    if (authUser.pickups.length > 0) {
      pickup = authUser.pickups[0];

      this.setState((prevState) => ({
        pickupData: {
          ...prevState.pickupData,
          cityId: pickup.city.id,
          stateRegionId: pickup.region.id,
          locations: [],
        },
        regionInfo: false,
        disRegionInfo: true,
      }));
      //
      this.props
        .showPickupRegion({
          cityId: pickup.city.id,
          regionId: pickup.region.id,
        })
        .then(() => {
          const { pickupLocations } = this.props;
          this.setState((prevState) => ({
            pickupData: {
              ...prevState.pickupData,
              locations: pickupLocations,
              // defaultPickup: true,
            },
          }));
        });
    }
  };

  handleEditShipping = (e) => {
    e.preventDefault();
    const { latestOrder } = this.props;
    this.setState({
      accordion: [true, true, false],
      checkMethod: false,
      isEditShipping: true,
      orderId: latestOrder.id,
    });
  };

  removeCartItem = (e, c) => {
    e.preventDefault();
    this.props.destroyCartlist(c);
  };

  changeMpesaNo = () => {
    const { typeNo } = this.state;
    this.setState((prevState) => ({
      typeNo: !typeNo,
      checkOutData: {
        ...prevState.checkOutData,
        mpesaNo: "",
      },
    }));
  };

  formatMobileNo = (b) => {
    if (b && b.mobileNo) {
      return `+${Number(b.mobileNo.slice(0, 5))}XX XXX ${Number(
        b.mobileNo.slice(10, 13)
      )}`;
    }
    return null;
  };

  handleChangeCity = (e) => {
    const { value } = e.target;
    this.props.showRegions({ Id: value }).then(() => {
      this.setState((prevState) => ({
        pickupData: {
          ...prevState.pickupData,
          cityId: value,
        },
        regionInfo: true,
        disRegionInfo: true,
      }));
    });
  };

  handleChangeRegion = (e) => {
    const { value } = e.target;
    const { cityId } = this.state.pickupData;
    this.setState({ regionInfo: false });
    this.props.showPickupRegion({ cityId, regionId: value }).then(() => {
      const { pickupLocations } = this.props;
      if (pickupLocations.length) {
        this.setState((prevState) => ({
          pickupData: {
            ...prevState.pickupData,
            locations: pickupLocations,
          },
        }));
      } else {
        this.setState((prevState) => ({
          pickupData: {
            ...prevState.pickupData,
            locations: [],
          },
          disSelect: false,
        }));
      }
    });
  };

  handleChangeLocation = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      pickupData: {
        ...prevState.pickupData,
        [name]: value,
      },
      disSelect: true,
    }));
  };

  handleChangeLocAddress = (e) => {
    const { name, checked } = e.target;
    this.setState((prevState) => ({
      pickupData: {
        ...prevState.pickupData,
        [name]: checked,
      },
    }));
  };

  selectPickupStation = (e) => {
    e.preventDefault();
    const { pickupData } = this.state;
    const data = {
      cityId: pickupData.cityId,
      pickupAddressId: pickupData.pickupAddress,
      defaultPickup: pickupData.defaultPickup,
    };

    this.props.setPickupRegion(data).then(() => {
      this.setState({ pickupMd: false, checkProceedBtn: false });
    });
  };

  proceedToPayment = (e) => {
    e.preventDefault();
    const { addressData, cart, userPickupLocation } = this.props;
    const { checkOutData, checkTotal, isEditShipping, orderId } = this.state;
    let data = {};
    if (checkOutData.shippingMethod === "pickUp") {
      //pickup location
      data = {
        shipId: checkTotal.id,
        subTotal: checkTotal.subTotal,
        total: checkTotal.total,
        shippingAmount: checkTotal.shippingAmount,
        shippingMethod: checkOutData.shippingMethod,
        deliveryAddress: userPickupLocation.address,
        city: userPickupLocation.city.name,
        region: userPickupLocation.region.name,
        addressId: addressData.id,
        picLocId: userPickupLocation.id,
        isEditShipping,
        orderId,
        cart,
      };
    } else {
      //home delivery address
      data = {
        shipId: checkTotal.id,
        subTotal: checkTotal.subTotal,
        total: checkTotal.total,
        shippingAmount: checkTotal.shippingAmount,
        shippingMethod: checkOutData.shippingMethod,
        deliveryAddress: addressData.deliveryAddress,
        city: addressData.city.name,
        region: addressData.stateRegion.name,
        addressId: addressData.id,
        isEditShipping,
        picLocId: userPickupLocation ? userPickupLocation.id : 0,
        orderId,
        cart,
      };
    }

    this.props.updateShipping(data).then(() => {
      const { latestOrder } = this.props;
      // shipping info
      if (latestOrder.shipping) {
        const s = latestOrder.shipping;
        const d = latestOrder.address;
        const p = latestOrder.pickups;

        if (latestOrder.shipping.shippingMethod === "pickUp") {
          this.setState((prevState) => ({
            shippingData: {
              ...prevState.shippingData,
              id: s.id,
              deliveryAdress: p.address,
              deliveryInfo: "",
              deliveryMethod: s.shippingMethod,
              deliveryCity: p.city.name,
              deliveryRegion: p.region.name,
              deliveryFee: s.shippingAmount,
            },
          }));
        } else {
          this.setState((prevState) => ({
            shippingData: {
              ...prevState.shippingData,
              id: s.id,
              deliveryAdress: d.delivery_address,
              deliveryInfo: "",
              deliveryMethod: s.shippingMethod,
              deliveryCity: s.city,
              deliveryRegion: s.region,
              deliveryFee: s.shippingAmount,
            },
          }));
        }
        this.setState({ accordion: [true, true, true], checkMethod: true });
      }
    });
  };

  handlePayNow = () => {
    const { checkOutData } = this.state;
    const { cart, latestOrder } = this.props;
    let cartIds = [];
    for (let i = 0; i < cart.length; i++) {
      const c = cart[i];
      cartIds.push(c.id);
    }
    const billData = latestOrder.billing;
    const data = {
      idfNo: billData.idfNo,
      cartIds,
      billId: billData.id,
      orderId: latestOrder.id,
      paymentMethod: billData.paymentMethod,
      totalPay: parseFloat(billData.totalFee),
      mpesaNo: parseInt(checkOutData.mpesaNo),
    };

    this.props.orderPayNow(data).then(() => {
      const { paymentData, latestOrder } = this.props;
      //clear storage
      localStorage.removeItem("orNo");
      localStorage.removeItem("checkData");
      this.resetCheckOutData();

      if (paymentData.ResponseCode > 0) {
        this.resetCheckOutData();
      } else {
        this.setState({ confirmOrderMd: false });
        this.props.history.push(
          `new/product?${queryString.stringify({
            status: latestOrder.orderNo,
          })}`
        );
      }
    });

    // this.setState({ showClosePay: true });
    // setTimeout(() => {
    //   this.setState({ showClosePay: false });
    //   this.props.history.push(
    //     `new/product?${queryString.stringify({ status: data.orderId })}`
    //   );
    // }, 5000);

    // this.props.orderPayNow(data).then(() => {
    // localStorage.removeItem("orNosetTimeout(() => {
    //    //   //    this.setState({ showClosePay: false });
    //    //   //  }, 20000);");
    // localStorage.removeItem("checkData");
    // this.resetCheckOutData();
    // console.log(data);
    // this.setState({ showClosePay: true });
    // [[]]
    //  const { paymentData } = this.props;
    //  if (paymentData.ResponseCode > 0) {
    //    console.log(paymentData.ResponseCode);
    //    //   //  this.setState({ showClosePay: true });
    //    //   //  setTimeout(() => {
    //    //   //    this.setState({ showClosePay: false });
    //    //   //  }, 20000);
    //    //   // this.setState({ showClosePay: true });
    //    //   // setTimeout(() => {
    //    //   //   this.setState({ confirmOrderMd: false, showClosePay: false });
    //    //   //   this.props.history.push("/checkout-address/success");
    //    //   // }, 2000);
    //  } else {
    //    this.setState({ showClosePay: true });
    //    setTimeout(() => {
    //      this.setState({ confirmOrderMd: false, showClosePay: false });
    //      // this.props.history.push("/checkout-address/success");
    //    }, 150000);
    //  }
    // [[]]
    // if (paymentData.ResponseCode > 0) {
    //   this.setState({ showClosePay: true });
    //   setTimeout(() => {
    //     this.setState({ confirmOrderMd: false, showClosePay: false });
    //     this.props.history.push("/checkout-address/success");
    //   }, 2000);
    // } else {
    //   this.setState({ showClosePay: true });
    //   setTimeout(() => {
    //     this.setState({ showClosePay: false });
    //   }, 20000);
    // }
    // });
  };

  componentDidMount() {
    //fetch user
    const userData = getUserData() && getUserData();
    if (!isNull(userData)) {
      this.props.fetchAuthUser(userData.email).then(() => {
        const { authUser, cart } = this.props;
        if (isNull(cart)) {
          this.props.history.push("/cart");
        } else if (!isNull(authUser)) {
          //find address
          this.props.findAddress(authUser.id).then(() => {
            const { addressData } = this.props;
            if (!isEmpty(addressData)) {
              this.setState({
                checkAddress: true,
                accordion: [true, true, false],
              });
            } else {
              this.setState({
                checkAddress: false,
                accordion: [true, false, false],
              });
            }

            //redirect if no cart
            const checkData = JSON.parse(
              JSON.parse(localStorage.getItem("checkData"))
            );
            if (!isNull(checkData)) {
              const orderNo = JSON.parse(localStorage.getItem("orNo"));
              if (orderNo) {
                this.props.findShipping(orderNo).then(() => {
                  const { latestOrder } = this.props;
                  const s = latestOrder.shipping;
                  const d = latestOrder.address;
                  const p = latestOrder.pickups;
                  if (latestOrder.shipping.shippingMethod === "pickUp") {
                    this.setState((prevState) => ({
                      shippingData: {
                        ...prevState.shippingData,
                        id: s.id,
                        deliveryAdress: p.address,
                        deliveryInfo: "",
                        deliveryMethod: s.shippingMethod,
                        deliveryCity: p.city.name,
                        deliveryRegion: p.region.name,
                        deliveryFee: s.shippingAmount,
                      },
                    }));
                  } else {
                    this.setState((prevState) => ({
                      shippingData: {
                        ...prevState.shippingData,
                        id: s.id,
                        deliveryAdress: d.delivery_address,
                        deliveryInfo: "",
                        deliveryMethod: s.shippingMethod,
                        deliveryCity: s.city,
                        deliveryRegion: s.region,
                        deliveryFee: s.shippingAmount,
                      },
                    }));
                  }

                  this.setState({
                    accordion: [true, true, true],
                    checkMethod: true,
                  });
                });
              }
              //
              const shipAmount = parseInt(checkData.shippingAmount);
              const totalAmount = parseInt(checkData.total);
              this.setState((prevState) => ({
                checkTotal: {
                  ...prevState.checkTotal,
                  id: checkData.id,
                  subTotal: parseInt(checkData.subTotal),
                  total: shipAmount + totalAmount,
                  shippingAmount: parseInt(checkData.shippingAmount),
                },
              }));
            } else {
              localStorage.removeItem("checkData");
              this.props.history.push("/cart");
            }
          });
        }
      });
    }

    //fetch items
    this.props.fetchCartlist().then(() => {
      //redirect
      const { cart } = this.props;
      if (cart && !cart.length > 0) {
        // console.log(cart);
        this.setState({ checkShipBtn: true, checkProceedBtn: true });
        this.props.history.push("/cart");
      }
    });
    //fetch items
    this.props.fetchCities();
    this.props.fetchRegions();
  }

  componentWillUnmount() {
    //clear
    localStorage.removeItem("orNo");
    localStorage.removeItem("checkData");
  }

  render() {
    const {
      accordion,
      checkOutData,
      checkAddress,
      confirmOrderMd,
      showClosePay,
      pickupMd,
      checkTotal,
      checkMethod,
      shippingData,
      typeNo,
      checkShipBtn,
      checkProceedBtn,
      regionInfo,
      disRegionInfo,
      disSelect,
      pickupData,
    } = this.state;
    const {
      addressLoad,
      addressData,
      checkoutErrors,
      paymentLoading,
      findOrderLoading,
      cart,
      updateShipLoad,
      cities,
      regions,
      confirmingOrder,
      latestBilling,
      fetchingCities,
      showingPickups,
      settingPickLoc,
    } = this.props;

    const getDeliveryInfo = () => {
      return (
        <p className="text-muted">
          No Goods delivery to home addresses at this moment.
          {/* <span className="ff-RM">
            KSh {formatMoney(shipping.shippingAmount)}
          </span> */}
        </p>
      );
    };

    return (
      <div className="animated fadeIn checkout-address">
        <div className="container">
          <Row className="pt-3">
            <Col md="8">
              <h4 className="head-title"> Checkout </h4>
              <div id="accordion">
                <Card className="address-details">
                  <CardHeader id="headingOne">
                    <div>
                      <div className="d-flex">
                        <Button
                          block
                          color="link"
                          disabled
                          className="acc mb-1"
                          aria-expanded={accordion[0]}
                          aria-controls="collapseOne"
                        >
                          <h5>
                            <span className="check">
                              <i
                                className={
                                  "fa fa-check-circle " +
                                  classNames({
                                    "text-success": accordion[0],
                                  })
                                }
                              ></i>
                            </span>
                            <span className="title"> 1. Address Details </span>
                          </h5>
                        </Button>
                        {findOrderLoading ? null : (
                          <Button
                            type="button"
                            color="link"
                            className={
                              "acc_edit " +
                              classNames({ displayBlock: checkAddress })
                            }
                            onClick={(e) => this.handleEditAddress(e, 0)}
                          >
                            Edit Address
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <Collapse
                    isOpen={accordion[0]}
                    data-parent="#accordion"
                    id="collapseOne"
                    aria-labelledby="headingOne"
                  >
                    <CardBody>
                      <div>
                        {/* //adress details */}
                        {findOrderLoading ? (
                          <div>
                            <p className="text-center pt-2">
                              <img src={loaderBg} alt="" />
                            </p>
                          </div>
                        ) : (
                          <div
                            className={
                              "cont animated fadeIn " +
                              classNames({ displayBlock: checkAddress })
                            }
                          >
                            <div className="ft-address-name">
                              {addressData.firstname} {addressData.lastname}
                            </div>
                            <div className="color-default-800 -fs-13">
                              <div className="ft-address-location">
                                {addressData.deliveryAddress}
                              </div>
                              <div className="ft-address-location">
                                {addressData.deliveryAddress2}
                              </div>
                              <div className="ft-address-phone">
                                {addressData.mobileNo}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className={
                          "checkout-body animated fadeIn " +
                          classNames({ hidden: checkAddress })
                        }
                      >
                        <FormGroup row>
                          <Col md="6">
                            <Label htmlFor="firstname"> Firstname </Label>
                            <Input
                              type="text"
                              className="form-control-xs"
                              placeholder="Jane"
                              id="firstname"
                              name="firstname"
                              value={checkOutData.firstname}
                              onChange={this.handleCheckoutChange}
                            />
                            {checkoutErrors.firstname &&
                            checkoutErrors.firstname.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.firstname}
                              </span>
                            ) : null}
                          </Col>
                          <Col md="6">
                            <Label htmlFor="lastname"> Lastname </Label>
                            <Input
                              type="text"
                              className="form-control-xs"
                              placeholder="Doe"
                              id="lastname"
                              name="lastname"
                              value={checkOutData.lastname}
                              onChange={this.handleCheckoutChange}
                            />
                            {checkoutErrors.lastname &&
                            checkoutErrors.lastname.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.lastname}
                              </span>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="6">
                            <Label htmlFor="mobileNo"> Mobile Number </Label>
                            <div className="d-flex-row">
                              <Input
                                type="text"
                                className="form-control-xs"
                                style={{
                                  width: "60px",
                                  marginRight: "4px",
                                  textAlign: "right",
                                }}
                                disabled
                                defaultValue="+254"
                                id="mobileNoL"
                              />
                              <Input
                                type="number"
                                placeholder="700412127"
                                className="form-control-xs"
                                id="mobileNo"
                                name="mobileNo"
                                value={checkOutData.mobileNo}
                                onChange={this.handleCheckoutChange}
                              />
                            </div>
                            {checkoutErrors.mobileNo &&
                            checkoutErrors.mobileNo.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.mobileNo}
                              </span>
                            ) : null}
                          </Col>
                          <Col md="6">
                            <Label htmlFor="otherMobileNo">
                              Other Mobile Number
                              <small className="optional"> (Optional) </small>
                            </Label>
                            <div className="d-flex-row">
                              <Input
                                type="text"
                                className="form-control-xs"
                                style={{
                                  width: "60px",
                                  marginRight: "4px",
                                  textAlign: "right",
                                }}
                                disabled
                                defaultValue="+254"
                                id="otherMobileNoL"
                              />
                              <Input
                                type="number"
                                placeholder="700412127"
                                className="form-control-xs"
                                id="otherMobileNo"
                                name="otherMobileNo"
                                value={checkOutData.otherMobileNo}
                                onChange={this.handleCheckoutChange}
                              />
                            </div>
                            {checkoutErrors.otherMobileNo &&
                            checkoutErrors.otherMobileNo.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.otherMobileNo}
                              </span>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="12">
                            <Label htmlFor="deliveryAddress">
                              Delivery Address
                            </Label>
                            <Input
                              type="text"
                              className="form-control-xs"
                              placeholder="Street Name / Building / Apartment No. / Floor"
                              id="deliveryAddress"
                              name="deliveryAddress"
                              value={checkOutData.deliveryAddress}
                              onChange={this.handleCheckoutChange}
                            />
                            {checkoutErrors.deliveryAddress &&
                            checkoutErrors.deliveryAddress.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.deliveryAddress}
                              </span>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="12">
                            <Label htmlFor="deliveryAddress2">
                              Address 2
                              <small className="optional"> (Optional) </small>
                            </Label>
                            <Input
                              type="text"
                              className="form-control-xs"
                              id="deliveryAddress2"
                              name="deliveryAddress2"
                              value={checkOutData.deliveryAddress2}
                              onChange={this.handleCheckoutChange}
                            />
                            {checkoutErrors.deliveryAddress2 &&
                            checkoutErrors.deliveryAddress2.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.deliveryAddress2}
                              </span>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="6">
                            <Label htmlFor="stateRegion">State / Region</Label>
                            <Input
                              type="select"
                              className="form-control-xs"
                              id="stateRegion"
                              name="stateRegion"
                              defaultValue={checkOutData.stateRegion}
                              onChange={this.handleCheckoutChange}
                            >
                              {regions && regions.length > 0 ? (
                                regions.map((r) => (
                                  <option value={r.id} key={r.id}>
                                    {r.name}
                                  </option>
                                ))
                              ) : (
                                <option value disabled>
                                  No records found.
                                </option>
                              )}
                            </Input>
                            {checkoutErrors.stateRegion &&
                            checkoutErrors.stateRegion.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.stateRegion}
                              </span>
                            ) : null}
                          </Col>
                          <Col md="6">
                            <Label htmlFor="city"> City </Label>
                            <Input
                              type="select"
                              className="form-control-xs"
                              id="city"
                              name="city"
                              defaultValue={checkOutData.city}
                              onChange={this.handleCheckoutChange}
                            >
                              {cities && cities.length > 0 ? (
                                cities.map((c) => (
                                  <option value={c.id} key={c.id}>
                                    {c.name}
                                  </option>
                                ))
                              ) : (
                                <option value disabled>
                                  No records found.
                                </option>
                              )}
                            </Input>
                            {checkoutErrors.city &&
                            checkoutErrors.city.length > 0 ? (
                              <span
                                className="text-danger animated fadeIn"
                                id="help-txt-username"
                              >
                                {checkoutErrors.city}
                              </span>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup row className="mb-0">
                          <Col md="12">
                            <Button
                              type="button"
                              className="text-uppercase mt-2 mb-0"
                              color="dark"
                              onClick={(e) => this.handleSaveAdress(e)}
                              block
                            >
                              {addressLoad ? (
                                <span>
                                  <img src={loaderSm} alt="" />
                                </span>
                              ) : (
                                <span> Save and Continue </span>
                              )}
                            </Button>
                          </Col>
                        </FormGroup>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="delivery-method">
                  <CardHeader id="headingTwo">
                    <div className="d-flex">
                      <Button
                        block
                        color="link"
                        disabled
                        className="acc"
                        aria-expanded={accordion[1]}
                        aria-controls="collapseTwo"
                      >
                        <h5>
                          <span className="check">
                            <i
                              className={
                                "fa fa-check-circle " +
                                classNames({ "text-success": accordion[1] })
                              }
                            ></i>
                          </span>
                          <span className="title"> 2. Shipping Method </span>
                        </h5>
                      </Button>
                      {findOrderLoading ? null : (
                        <Button
                          type="button"
                          color="link"
                          className={
                            "acc_edit " +
                            classNames({ displayBlock: checkMethod })
                          }
                          onClick={(e) => this.handleEditShipping(e, 0)}
                        >
                          Edit Shipping
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <Collapse
                    isOpen={accordion[1]}
                    data-parent="#accordion"
                    id="collapseTwo"
                  >
                    <CardBody>
                      <div
                        className={
                          "cont-shipping animated fadeIn " +
                          classNames({ displayBlock: checkMethod })
                        }
                      >
                        <h5 className="ff-RM">
                          {shippingData.deliveryMethod === "homeDelivery"
                            ? "Delivery to your home or office"
                            : "Pickup Station"}
                        </h5>
                        <p className="text-muted fs-13">
                          {shippingData.deliveryInfo !== "" ? (
                            shippingData.deliveryInfo
                          ) : shippingData.deliveryMethod === "homeDelivery" ? (
                            <span>
                              Ready for delivery between Wednesday 29 Apr and
                              Thursday 7 May with cheaper shipping fees - Large
                              Items(e.g.freezers, fridges) may arrive 2 business
                              days later than other products - Living in
                              Mombasa, Premium members enjoy Free
                              Delivery(Excluding bulky items) Please ensure you
                              entered your Home address, not your office one, so
                              that we can deliver to you successfully
                            </span>
                          ) : (
                            <span>
                              Ready for Pickup between Wednesday 29 Apr and
                              Thursday 7 May
                            </span>
                          )}
                        </p>
                        <div className="bg-default">
                          <div className="color-default">
                            {shippingData.deliveryRegion} {",  "}
                            {shippingData.deliveryCity}
                          </div>
                          <div className="color-gray">
                            {shippingData.deliveryAdress} <br />
                            {shippingData.deliveryFee > 0 ? (
                              <div>
                                Shipping Fee
                                <b className="color-primary">
                                  <span data-currency-iso="KES"> KSh </span>
                                  <span
                                    dir="ltr"
                                    data-price={shippingData.deliveryFee}
                                  >
                                    {formatMoney(shippingData.deliveryFee)}
                                  </span>
                                </b>
                              </div>
                            ) : (
                              "--- Free Shipping ---"
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          "checkout-body animated fadeIn " +
                          classNames({ hidden: checkMethod })
                        }
                      >
                        <h5 className="deliver-title">
                          How do you want your order deliverd ?
                        </h5>
                        <div className="mb-3">
                          <div className="custom-control custom-radio ">
                            <input
                              id="pickUp"
                              name="shippingMethod"
                              type="radio"
                              className="custom-control-input"
                              checked={
                                checkOutData.shippingMethod === "pickUp"
                                  ? true
                                  : false
                              }
                              value="pickUp"
                              onChange={(e) => this.handleCheckoutChange(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="pickUp"
                            >
                              Pickup Station
                            </label>
                          </div>
                          <div className="deliver-pickup ">
                            <p>
                              Ready for pick up except holidays and weekends
                              with affordable shipping fees.
                            </p>
                            <Button
                              type="button"
                              color="primary"
                              className="text-uppercase"
                              onClick={this.pickupModal}
                            >
                              Select pickup station
                            </Button>
                          </div>
                          <hr />
                          <div className="custom-control custom-radio">
                            <input
                              id="homeDelivery"
                              name="shippingMethod"
                              type="radio"
                              className="custom-control-input"
                              checked={
                                checkOutData.shippingMethod !== "pickUp"
                                  ? true
                                  : false
                              }
                              value="homeDelivery"
                              onChange={(e) => this.handleCheckoutChange(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="homeDelivery"
                            >
                              Deliver to your doorstep
                            </label>
                            <div>{getDeliveryInfo()}</div>
                          </div>
                          <div className="right-checkout shipping">
                            <ul>
                              <li>
                                <span className="left"> Subtotal </span>
                                <span className="right">
                                  Ksh {formatMoney(checkTotal.subTotal)}
                                </span>
                              </li>
                              <li>
                                <span className="left"> VAT </span>
                                <span className="right"> N / A </span>
                              </li>
                              <li>
                                <span className="left"> Shipping Amount </span>
                                <span className="right">
                                  Ksh {formatMoney(checkTotal.shippingAmount)}
                                </span>
                              </li>
                              <li className="last">
                                <span className="left"> Total </span>
                                <span className="right">
                                  Ksh {formatMoney(checkTotal.total)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <FormGroup row className="mb-0">
                          <Col md="12">
                            <Button
                              type="button"
                              className="text-uppercase mt-2 mb-0"
                              color="dark"
                              onClick={(e) => this.proceedToPayment(e)}
                              block
                              disabled={checkProceedBtn ? true : false}
                            >
                              {updateShipLoad ? (
                                <span>
                                  <img src={loaderSm} alt="" />
                                </span>
                              ) : (
                                <span> Proceed to Payment </span>
                              )}
                            </Button>
                          </Col>
                        </FormGroup>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="payment-method">
                  <CardHeader id="headingThree">
                    <Button
                      block
                      color="link"
                      disabled
                      className="acc"
                      aria-expanded={accordion[2]}
                      aria-controls="collapseThree"
                    >
                      <h5>
                        <span className="check">
                          <i
                            className={
                              "fa fa-check-circle " +
                              classNames({ "text-success": accordion[2] })
                            }
                          ></i>
                        </span>
                        <span className="title"> 3. Payment Method </span>
                      </h5>
                    </Button>
                  </CardHeader>
                  <Collapse
                    isOpen={accordion[2]}
                    data-parent="#accordion"
                    id="collapseThree"
                  >
                    <CardBody>
                      <div className="checkout-body">
                        <h5 className="deliver-title">
                          How do you want to pay for your order ?
                        </h5>
                        <div className="my-3">
                          <div className="custom-control custom-radio">
                            <input
                              id="payOnline"
                              name="deliveryMethod"
                              type="radio"
                              className="custom-control-input"
                              checked={
                                checkOutData.deliveryMethod === "payOnline"
                                  ? true
                                  : false
                              }
                              value="payOnline"
                              onChange={(e) => this.handleCheckoutChange(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="payOnline"
                            >
                              Pay Online: M - pesa
                            </label>
                          </div>
                          <div className="pl-4">
                            <img src={mpesaLogo} alt="" />
                          </div>
                          <hr />
                          <div className="custom-control custom-radio">
                            <input
                              id="cashDelivery"
                              name="deliveryMethod"
                              type="radio"
                              className="custom-control-input"
                              checked={
                                checkOutData.deliveryMethod !== "payOnline"
                                  ? true
                                  : false
                              }
                              value="cashDelivery"
                              disabled
                              onChange={(e) => this.handleCheckoutChange(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="cashDelivery"
                            >
                              Cash On Delivery
                            </label>
                          </div>
                          <div className="right-checkout shipping">
                            <ul>
                              <li>
                                <span className="left"> VAT </span>
                                <span className="right"> Ksh 0.00 </span>
                              </li>
                              <li className="last">
                                <span className="left"> Total </span>
                                <span className="right">
                                  Ksh {formatMoney(checkTotal.total)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <FormGroup row className="mb-0">
                          <Col md="12">
                            <Button
                              type="button"
                              className="text-uppercase mt-2 mb-0"
                              color="dark"
                              block
                              onClick={(e) => this.handleConfimrOder(e)}
                              disabled={checkShipBtn ? true : false}
                            >
                              {confirmingOrder ? (
                                <span>
                                  <img src={loaderSm} alt="" />
                                </span>
                              ) : (
                                <span> Complete Order </span>
                              )}
                            </Button>
                          </Col>
                        </FormGroup>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </div>
            </Col>
            <Col md="4">
              <h4 className="head-title"> Summary </h4>
              <Card className="right-card">
                <CardHeader className="py-2">
                  Your Order
                  <span>
                    ({cart && cart.length}
                    items)
                  </span>
                  <Button
                    type="button"
                    color="link"
                    className="float-right m-0 p-0"
                    onClick={(e) => this.handleEditCart(e)}
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardBody className="m-1">
                  <div className="order-list">
                    <div className="order-flow">
                      <ul className="shopping-list">
                        {cart && cart.length > 0 ? (
                          cart.map((c, i) => (
                            <li key={i}>
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                className="remove hidden"
                                title="Remove this item"
                                onClick={(e) => this.removeCartItem(e, c)}
                              >
                                <i className="fa fa-remove"> </i>
                              </a>
                              <span className="price" style={{ left: "0px" }}>
                                Ksh {formatMoney(c.TotalPrice)}
                              </span>
                              <a
                                href={c.Media && c.Media[0] && c.Media[0].url}
                                className="cart-img"
                              >
                                <div className="cart-box-imag">
                                  <img
                                    src={
                                      c.Media &&
                                      c.Media[0] &&
                                      imageUrl() + "/images/" + c.Media[0].name
                                    }
                                    alt=""
                                  />
                                </div>
                              </a>
                              <h4>
                                <span> {c.ProductName} </span>
                              </h4>
                              <p className="quantity">
                                {c.Quantity}x -
                                <span className="amount">
                                  {formatMoney(c.Price)}
                                </span>
                              </p>
                            </li>
                          ))
                        ) : (
                          <li
                            className="text-center fs-14"
                            style={{ border: "none" }}
                          >
                            Your Order is empty!
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="bottom">
                      <div className="right-checkout">
                        <ul>
                          <li>
                            <span className="left"> Subtotal </span>
                            <span className="right">
                              KSH {formatMoney(checkTotal.subTotal)}
                            </span>
                          </li>
                          <li>
                            <span className="left"> VAT </span>
                            <span className="right"> Ksh 0.00 </span>
                          </li>
                          <li>
                            <span className="left"> Shipping Amount </span>
                            <span className="right"> N / A </span>
                          </li>
                          <li className="last">
                            <span className="left"> Total </span>
                            <span className="right">
                              KSH {formatMoney(checkTotal.total)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Confirm Modal */}
        <Modal
          isOpen={confirmOrderMd}
          toggle={this.togleConfOrder}
          fade={false}
          backdrop="static"
          scrollable={false}
          className={this.props.className}
          modalClassName="modal_stretch animated fadeIn confirmOrderModal"
        >
          <ModalHeader className="buy-name mb-0" style={{ zIndex: "2000" }}>
            <span>
              <i className="cui-shield" /> Priesthood Collections - Order
              Payment
            </span>
            <span
              className={"buy-title " + classNames({ hidden: showClosePay })}
            >
              <Button
                color="link"
                className="modal-close-x"
                onClick={this.togleConfOrder}
              >
                <img src={iconClose} className="close-img" alt="" />
              </Button>
            </span>
          </ModalHeader>
          <ModalBody className="order-payment">
            <div className="modal-fluid mr-0">
              <div className={classNames({ hidden: !showClosePay })}>
                <Row className="pt-2">
                  <Col sm="12">
                    <div className="text-center pt-3">
                      <div className="pb-3">
                        <img src={hLoader} alt="" />
                      </div>
                      <p className="ff-RM fs-13">
                        Waiting for your confirmation
                      </p>
                      <div>
                        <p className="text-muted fs-13">
                          Please follow the instructions and do not refresh or
                          leave the page. <br /> This may take upto 2 minutes.
                          {/* {this.state.time.m} s: {this.state.time.s} */}
                        </p>
                      </div>
                    </div>
                    <Card>
                      <CardBody>
                        <p className="text-dark fs-13">
                          You will receive a prompt on mobile number to enter
                          your PIN to authorize your payment request.
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className={classNames({ hidden: showClosePay })}>
                <Row>
                  <Col sm="6">
                    <h4 className="head-title"> Order Summary </h4>
                  </Col>
                  <Col sm="6">
                    <Button color="link" className="edit-summary hidden">
                      Edit
                    </Button>
                  </Col>
                </Row>
                <Card className="pay-card">
                  <CardBody>
                    <div className="right-checkout shipping">
                      <ul>
                        <li className="last">
                          <span className="left"> Total To Pay </span>
                          <span className="right">
                            Ksh
                            {formatMoney(
                              latestBilling && latestBilling.totalFee
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className={classNames({ hidden: showClosePay })}>
                <Row>
                  <Col sm="12">
                    <h4 className="head-title"> Payment Method </h4>
                    <Card className="pt-2">
                      <CardBody>
                        <h6 className="mbMoney"> Mobile Money </h6>
                        <FormGroup row>
                          <Col sm={3}>
                            <Label className="mbLabel"> M-pesa No. </Label>
                          </Col>
                          <Col
                            sm={9}
                            className={classNames({ hidden: typeNo })}
                          >
                            <Label className="mbLabel">
                              {this.formatMobileNo(addressData)}
                            </Label>
                          </Col>
                          <Col sm={9}>
                            <Label
                              className={
                                "mbLabel " + classNames({ hidden: typeNo })
                              }
                            ></Label>
                            <Input
                              type="number"
                              id="mobileMoney"
                              placeholder="254 7xx xxx xxx"
                              className={
                                "form-control-xs " +
                                classNames({ hidden: !typeNo })
                              }
                              name="mpesaNo"
                              value={checkOutData.mpesaNo}
                              onChange={this.handleCheckoutChange}
                            />
                            {checkoutErrors.mpesaNo &&
                            checkoutErrors.mpesaNo.length > 0 ? (
                              <span className="text-danger animated fadeIn fs-13">
                                {checkoutErrors.mpesaNo}
                              </span>
                            ) : null}
                          </Col>
                          <Col sm={12}>
                            <Button
                              type="button"
                              color="primary"
                              className={
                                "mt-3 mb-0 " + classNames({ hidden: typeNo })
                              }
                              size="sm"
                              onClick={this.changeMpesaNo}
                            >
                              Change Mpesa No.
                            </Button>
                          </Col>
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className={classNames({ hidden: showClosePay })}>
                <Row className="pt-2">
                  <Col sm="12">
                    <Button
                      type="button"
                      size="lg"
                      block
                      color="success"
                      className="text-uppercase"
                      onClick={this.handlePayNow}
                      disabled={
                        !typeNo || checkOutData.mpesaNo.length > 0
                          ? false
                          : true
                      }
                    >
                      {paymentLoading ? (
                        <span>
                          <img src={loaderSm} alt="" />
                        </span>
                      ) : (
                        <span>
                          Pay Now : Ksh{" "}
                          {formatMoney(latestBilling && latestBilling.totalFee)}
                        </span>
                      )}
                    </Button>
                    <div className="pt-3 text-center">
                      <span className="help-text">
                        By Clicking Pay Now you Agree to the Terms &amp;
                        Conditions
                      </span>
                      <br />
                      <span className="help-text">
                        Need Help ? Contact us on{" "}
                        <Link to="/contacts" target="_blank">
                          Here
                        </Link>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* select pickup modal */}
        <Modal
          isOpen={pickupMd}
          toggle={this.pickupModal}
          fade={false}
          backdrop="static"
          scrollable={false}
          size="lg"
          className={this.props.className}
          modalClassName="modal_stretch animated fadeIn confirmOrderModal"
        >
          <ModalHeader className="buy-name mb-0" style={{ zIndex: "2000" }}>
            <span>
              <i className="cui-check" /> Select a Pickup Station
            </span>
            <span className="buy-title">
              <Button
                color="link"
                className="modal-close-x"
                onClick={this.pickupModal}
              >
                <img src={iconClose} className="close-img" alt="" />
              </Button>
            </span>
          </ModalHeader>
          <ModalBody className="order-payment">
            {fetchingCities ? (
              <p className="text-center pb-3">
                <img src={loaderBg} alt="" />
              </p>
            ) : (
              <div className="modal-fluid mr-0">
                <div>
                  <Row>
                    <Col sm="12">
                      <h4 className="head-title"> Location </h4>
                      <div className="pick-location">
                        <FormGroup row>
                          <Col sm="6">
                            <Label htmlFor="city-station"> City/Town: </Label>
                            <Input
                              type="select"
                              className="form-control-xs"
                              id="city-station"
                              defaultValue={pickupData.cityId}
                              name="cityTown"
                              onChange={(e) => this.handleChangeCity(e)}
                            >
                              <option value="0" disabled>
                                --Select--
                              </option>
                              {cities && cities.length > 0 ? (
                                cities.map((c) => (
                                  <option value={c.id} key={c.id}>
                                    {c.name}
                                  </option>
                                ))
                              ) : (
                                <option value disabled>
                                  No records found.
                                </option>
                              )}
                            </Input>
                            <FormText className={!regionInfo ? "hidden" : ""}>
                              <span className="text-danger">
                                Please select a region
                              </span>
                            </FormText>
                          </Col>
                          <Col sm="6">
                            <Label htmlFor="region"> State/Region: </Label>
                            <Input
                              type="select"
                              className="form-control-xs"
                              id="region"
                              disabled={!disRegionInfo ? true : false}
                              defaultValue={pickupData.stateRegionId}
                              onChange={(e) => this.handleChangeRegion(e)}
                            >
                              <option value="0" disabled>
                                --Select--
                              </option>
                              {regions && regions.length > 0 ? (
                                regions.map((r) => (
                                  <option value={r.id} key={r.id}>
                                    {r.name}
                                  </option>
                                ))
                              ) : (
                                <option value disabled>
                                  No records found.
                                </option>
                              )}
                            </Input>
                          </Col>
                        </FormGroup>
                      </div>
                      <h4 className="head-title"> Pickup station near you </h4>
                      <div className="pick-select">
                        <hr className="mt-0" />
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <p>Your local Pickup Location:-</p>
                              {showingPickups ? (
                                <p className="text-center pb-3">
                                  <img src={loaderBg} alt="" />
                                </p>
                              ) : pickupData.locations.length > 0 ? (
                                pickupData.locations.map((l) => (
                                  <div
                                    className="custom-control custom-radio pb-2"
                                    key={l.id}
                                  >
                                    <input
                                      id={l.id}
                                      name="pickupAddress"
                                      type="radio"
                                      className="custom-control-input"
                                      value={l.id}
                                      onChange={(e) =>
                                        this.handleChangeLocation(e)
                                      }
                                    />
                                    <label
                                      className="custom-control-label fs-14"
                                      htmlFor={l.id}
                                      style={{ lineHeight: "17px" }}
                                    >
                                      {l.address}
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <p>
                                  Sorry, there is no pickup station under your
                                  choice
                                </p>
                              )}
                            </FormGroup>

                            <FormGroup
                              className={
                                !pickupData.locations.length > 0 ? "hidden" : ""
                              }
                            >
                              <div className="custom-control custom-checkbox pb-1">
                                <input
                                  id="defAddress"
                                  name="defaultPickup"
                                  type="checkbox"
                                  className="custom-control-input"
                                  value={pickupData.defaultPickup}
                                  onChange={(e) =>
                                    this.handleChangeLocAddress(e)
                                  }
                                />
                                <label
                                  className="custom-control-label fs-13"
                                  htmlFor="defAddress"
                                >
                                  Set as Default Address
                                </label>
                              </div>
                            </FormGroup>
                            <Button
                              type="button"
                              size="lg"
                              block
                              color="dark"
                              disabled={
                                disSelect && !settingPickLoc ? false : true
                              }
                              onClick={(e) => this.selectPickupStation(e)}
                            >
                              {settingPickLoc ? (
                                <span>
                                  <img src={loaderSm} alt="" />
                                </span>
                              ) : (
                                <span> Select this pickup station </span>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.users.auth,
  products: state.products.products,
  addressLoad: state.orders.checkoutAddressLoad,
  checkoutErrors: state.orders.checkoutErrors,
  addressData: state.address.addressData,
  orders: state.orders.orders,
  paymentLoading: state.orders.paymentLoading,
  paymentData: state.orders.paymentData,
  cart: state.cartlist.cartlist,
  findOrderLoading: state.orders.findOrderLoading,
  shipping: state.shipping.shipping,
  updateShipLoad: state.shipping.updateShipLoad,
  latestOrder: state.orders.latestOrder,
  cities: state.cities.cities,
  fetchingCities: state.cities.fetchingCities,
  regions: state.regions.regions,
  confirmingOrder: state.billing.billingLoad,
  latestBilling: state.billing.latestBilling,
  showingPickups: state.pickups.showingPickups,
  pickupLocations: state.pickups.pickupLocations,
  settingPickLoc: state.pickups.settingPickLoc,
  userPickupLocation: state.pickups.userPickupLocation,
});

const mapDispatchToProps = {
  saveCheckoutAddress,
  updateCheckoutAddress,
  orderPayNow,
  findAddress,
  fetchAuthUser,
  updateShipping,
  findOrder,
  fetchCities,
  fetchRegions,
  findShipping,
  createBilling,
  updateBilling,
  destroyCartlist,
  fetchCartlist,
  showRegions,
  showPickupRegion,
  setPickupRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddress);
