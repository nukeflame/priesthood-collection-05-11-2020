export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },
    {
      title: true,
      name: "Features",
    },
    {
      name: "Orders",
      url: "/orders",
      icon: "cui-basket-loaded",
      children: [
        {
          name: "All Orders",
          url: "/orders/manage",
          icon: "cui-basket-loaded",
        },
        // {
        //   name: "Add Order",
        //   url: "/orders/new",
        //   icon: "cui-basket-loaded",
        // },
        {
          name: "Order Statuses",
          url: "/orders/statuses",
          icon: "cui-basket-loaded",
        },
      ],
    },
    {
      name: "Products",
      url: "/products",
      icon: "icon-handbag",
      children: [
        {
          name: "All Products",
          url: "/products/manage",
          icon: "icon-handbag",
        },
        {
          name: "Add Product",
          url: "/products/new",
          icon: "icon-handbag",
        },
        {
          name: "Categories",
          url: "/products/categories",
          icon: "icon-handbag",
        },
        // {
        //   name: "Tags",
        //   url: "/products/tags",
        //   icon: "icon-handbag",
        // },
      ],
    },
    {
      name: "Marketing",
      url: "/marketing",
      icon: "fa fa-money fs-15",
      children: [
        {
          name: "Banner",
          url: "/marketing/banner",
          icon: "fa fa-money fs-15",
        },
        {
          name: "Add Coupon",
          url: "/marketing/coupons",
          icon: "fa fa-money fs-15",
        },
      ],
    },
    {
      name: "Customers",
      url: "/customers",
      icon: "cui-people",
    },
    {
      title: true,
      name: "Components",
    },

    {
      name: "Posts",
      url: "/posts",
      icon: "icon-pin",
      children: [
        {
          name: "All Post",
          url: "/posts/manage",
          icon: "icon-pin",
        },
        {
          name: "Add New",
          url: "/posts/new",
          icon: "icon-pin",
        },
      ],
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-puzzle",
      children: [
        {
          name: "Manage",
          url: "/pages/manage",
          icon: "icon-puzzle",
        },
        {
          name: "Add New",
          url: "/pages/new",
          icon: "icon-puzzle",
        },
      ],
    },
    {
      name: "Reviews",
      url: "/reviews",
      icon: "cui-comment-square",
    },

    {
      name: "Settings",
      url: "/settings",
      icon: "icon-settings",
      children: [
        {
          name: "General",
          url: "/settings/general",
          icon: "icon-settings",
        },
      ],
    },
  ],
};
