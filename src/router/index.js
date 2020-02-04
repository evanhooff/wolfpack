import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const AllWolves = () =>
  import( /* webpackChunkName: "AllWolves" */ "@/views/all-wolves.vue");

const Pack = () =>
  import( /* webpackChunkName: "Pack" */ "@/views/pack-overview.vue");

let router = new VueRouter({
  routes: [{
      path: "/",
      component: AllWolves
    },
    {
      path: "/pack/:id",
      component: Pack
    }
  ]
});

export default router;