import store from "../store";

const routes = [
  {
    beforeEnter(to, from, next) {
      const savedToken = localStorage.getItem("userData");
      if (!store.state.auth.isLoggedIn || !savedToken) {
        if (savedToken) {
          const userJson = JSON.parse(savedToken);

          store.commit("auth/SET_USER_TOKEN", userJson);
          //try to login with the token or

          next();
        }
      } else {
        next();
      }
    },
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/List.vue") },
      { path: "list", component: () => import("pages/List.vue") },
      {
        path: "transactions",
        component: () => import("src/pages/Transaction.vue")
      }
    ]
  },
  { path: "/login", component: () => import("pages/Login.vue") },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
