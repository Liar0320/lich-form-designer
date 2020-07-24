import Vue from "vue";
import VueRouter from "vue-router";
import Creator from "examples/views/Creator.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/creator",
    name: "creator",
    component: Creator
  },
  {
    path: "/parser",
    name: "parser",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Parser.vue")
  },
  {
    path: "/tableList",
    name: "TableList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/TableList.vue")
  },
  {
    path: "*",
    redirect: "/tableList"
  }
];

const router = new VueRouter({
  routes
});

export default router;
