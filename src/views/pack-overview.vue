// single pack view
<template>
  <div>
    <div v-if="!packLoading">
      <h1>Pack {{ selectedPack.name }}</h1>
      <pack :selectedPack="selectedPack"></pack>
      <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf"></wolf>
    </div>
    <div v-if="packLoading">Loading...</div>
  </div>
</template>

<script>
import Pack from "../components/pack";
import Wolf from "../components/wolf";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf
  },
  computed: {
    ...mapState("packs", ["selectedPack", "packLoading"])
  },
  methods: {
    ...mapActions("packs", ["getPack"])
  },
  beforeMount() {
    this.getPack(this.$route.params.id);
    this.$router.beforeEach((to, from, next) => {
      this.getPack(to.params.id);
      next();
    });
  }
};
</script>

<style>
</style>
