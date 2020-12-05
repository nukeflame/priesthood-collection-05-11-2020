import React from "react";

const Dashboard = React.lazy(() => import("../views/Dashboard"));
const Products = React.lazy(() => import("../views/Products"));
const CreateProducts = React.lazy(() =>
  import("../views/Products/CreateProduct")
);
const EditProduct = React.lazy(() => import("../views/Products/EditProduct"));
const CategoryProducts = React.lazy(() =>
  import("../views/Products/CategoryProducts")
);

const Pages = React.lazy(() => import("../views/DashboardPages/Pages"));
const CreatePage = React.lazy(() =>
  import("../views/DashboardPages/CreatePage")
);

const Posts = React.lazy(() => import("../views/Posts/Posts"));
const CreatePost = React.lazy(() => import("../views/Posts/CreatePost"));
const EditPost = React.lazy(() => import("../views/Posts/EditPost"));

const Orders = React.lazy(() => import("../views/Orders/Orders"));
const CreateOrder = React.lazy(() => import("../views/Orders/CreateOrder"));
const EditOrder = React.lazy(() => import("../views/Orders/EditOrder"));

const OrderStatuses = React.lazy(() => import("../views/Orders/OrderStatuses"));

const GeneralSettings = React.lazy(() =>
  import("../views/Settings/GeneralSettings")
);

const Customers = React.lazy(() => import("../views/Customers/Customers"));
const Customer = React.lazy(() => import("../views/Customers/Customer"));
const CustomerCreate = React.lazy(() =>
  import("../views/Customers/CustomerCreate")
);

const Reviews = React.lazy(() => import("../views/Reviews"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", exact: true, name: "Theme", component: Dashboard },
  { path: "/orders", exact: true, name: "Orders", component: Orders },
  { path: "/orders/manage", name: "Manage", component: Orders },
  { path: "/orders/new", name: "Create", component: CreateOrder },
  { path: "/orders/:id/edit", name: "Edit", component: EditOrder },
  { path: "/orders/statuses", name: "Create", component: OrderStatuses },
  { path: "/products", exact: true, name: "Products", component: Products },
  { path: "/products/manage", name: "Manage", component: Products },
  { path: "/products/new", name: "Create", component: CreateProducts },
  { path: "/products/:id/edit", name: "Edit", component: EditProduct },
  {
    path: "/products/categories",
    name: "Categories",
    component: CategoryProducts,
  },
  { path: "/products/tags", name: "Tags", component: CreateProducts },
  { path: "/pages", exact: true, name: "Pages", component: Pages },
  { path: "/pages/manage", name: "Manage", component: Pages },
  { path: "/pages/new", name: "Create", component: CreatePage },
  { path: "/posts", exact: true, name: "Posts", component: Posts },
  { path: "/posts/manage", name: "Manage", component: Posts },
  { path: "/posts/new", name: "Create", component: CreatePost },
  { path: "/posts/:id/edit", name: "Edit", component: EditPost },
  {
    path: "/settings",
    exact: true,
    name: "Settings",
    component: GeneralSettings,
  },
  { path: "/settings/general", name: "General", component: GeneralSettings },

  { path: "/customers", exact: true, name: "Customers", component: Customers },
  {
    path: "/customers/create",
    name: "Create",
    component: CustomerCreate,
  },
  {
    path: "/customers/:id",
    exact: true,
    name: "Details",
    component: Customer,
  },
  { path: "/reviews", exact: true, name: "Reviews", component: Reviews },
];

export default routes;
