<template>
  <div>
    <h1>Pack {{ selectedPack.name }}</h1>
    <pack :selectedPack="selectedPack"></pack>
    <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf"></wolf>
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
      selectedPack: "packs/selectedPack"
    })
  },
  methods: {
    ...mapActions("packs", ["getPack"])
  },
  mounted() {
    this.getPack(this.$route.params.id);
  }
};
</script>

<style>
</style>
