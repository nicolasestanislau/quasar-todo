const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLogin.vue"),
    children: [
      {
        path: "",
        name: "loginDefault",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("src/pages/Register.vue"),
      },
      {
        path: "/emailconfirmation",
        name: "email-confirmation",
        component: () => import("src/pages/EmailConfirmation.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/todo", component: () => import("src/pages/Todo.vue") },
      { path: "/me", name: "me", component: () => import("src/pages/Me.vue") },
      { path: "/help", component: () => import("src/pages/Help.vue") },
      { path: "/adtags", component: () => import("src/pages/AdTags.vue") },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
