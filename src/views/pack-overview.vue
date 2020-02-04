<template>
  <div>
    <div v-if="!isLoading">
      <h1>Pack {{ selectedPack.name }}</h1>
      <pack :selectedPack="selectedPack"></pack>
      <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf"></wolf>
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import Pack from "../components/pack";
import Wolf from "../components/wolf";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf
  },
  computed: {
    ...mapGetters({
      selectedPack: "packs/selectedPack",
      isLoading: "packs/loading"
    })
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
