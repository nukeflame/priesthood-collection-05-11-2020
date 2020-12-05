import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { imageUrl } from "../../../../config/helpers";
import PropTypes from "prop-types";
import queryString from "query-string";

class ArticleOrder extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    parseDate: PropTypes.func.isRequired,
    toCheckOrder: PropTypes.func.isRequired,
  };

  render() {
    const { order, parseDate, toCheckOrder } = this.props;
    const item = order.items && order.items[0];

    return (
      <Card className="article-order">
        <CardBody>
          <div className="article-box">
            <img
              src={imageUrl() + "/images/" + order.orderThumbnail}
              className="article-image"
              width="104"
              height="104"
              alt={order.id}
            />
            <div className="article-title">
              <h2>{item.ProductName}</h2>
              <p className="article-par">
                Placed on {parseDate(order.createdAt)}
              </p>
              <p className="article-status">{order.status.name}</p>
            </div>
            <Link
              to={`/account/customer?${queryString.stringify({
                tab: "my_orders",
                order: order.orderNo,
              })}`}
              onClick={(e) => toCheckOrder(e)}
              className="article-more"
            >
              See details
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default ArticleOrder;
