import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const AllWolves = () =>
  import( /* webpackChunkName: "AllWolves" */ "@/views/all-wolves.vue");

const Pack = () =>
  import( /* webpackChunkName: "Pack" */ "@/views/pack-detail.vue");

const Map = () =>
  import( /* webpackChunkName: "Map" */ "@/views/map-overview.vue");

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
    },
    {
      path: "/map",
      name: "map",
      component: Map
    }
  ]
});

export default router;