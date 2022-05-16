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
        path: "login",
        name: "login",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("src/pages/Register.vue"),
      },
      {
        path: "emailconfirmation",
        name: "emailconfirmation",
        component: () => import("src/pages/EmailConfirmation.vue"),
      },
      {
        path: "forgotpassword",
        name: "forgotpassword",
        component: () => import("src/pages/ForgotPassword.vue"),
      },
      {
        path: "resetpassword",
        name: "resetpassword",
        component: () => import("src/pages/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "todo",
        name: "todo",
        component: () => import("src/pages/Todo.vue"),
      },
      { path: "me", name: "me", component: () => import("src/pages/Me.vue") },
      {
        path: "help",
        name: "help",
        component: () => import("src/pages/Help.vue"),
      },
      {
        path: "adtags",
        name: "adtags",
        component: () => import("src/pages/AdTags.vue"),
      },
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
