import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const AllWolves = () =>
  import( /* webpackChunkName: "AllWolves" */ "@/views/all-wolves.vue");


let router = new VueRouter({
  routes: [{
    path: "/",
    component: AllWolves
  }]
});

export default router;