import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const AllWolves = () =>
  import( /* webpackChunkName: "AllWolves" */ "@/views/all-wolves.vue");

const Pack = () =>
  import( /* webpackChunkName: "Pack" */ "@/views/pack-detail.vue");

let router = new VueRouter({
  routes: [{
      path: "/",
      name: "home",
      component: AllWolves
    },
    {
      path: "/pack/:id",
      name: "pack",
      component: Pack
    }
  ]
});

export default router;