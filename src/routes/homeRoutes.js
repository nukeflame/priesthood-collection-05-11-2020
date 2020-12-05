import React from "react";
import { renderRoutes } from "react-router-config";

// const CartList = React.lazy(() => import("../views/Pages/Modules/CartList"));
// const Homepage = React.lazy(() => import("../views/Pages/Modules/Homepage"));

const Root = ({ route }) => (
  <div>
    <h1>Root</h1>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

const Cart = ({ route }) => (
  <div>
    <h2>Cart</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, {
      someProp: "these extra props are optional"
    })}
  </div>
);

const Products = ({ route }) => (
  <div>
    <h2>Products</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, {
      someProp: "these extra props are optional"
    })}
  </div>
);

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/cart",
        exact: true,
        component: Cart
      },
      {
        path: "/products",
        exact: true,
        component: Products
      }
    ]
  }
];

export default routes;
