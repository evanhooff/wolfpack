<template>
  <div>
    <h1>All Wolves</h1>
    <div v-if="!isLoading">
      <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf"></wolf>
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import Wolf from "../components/wolf";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Wolf
  },
  computed: {
    ...mapState("wolves", ["allWolves", "isLoading"])
  },
  methods: {
    ...mapActions("wolves", ["getAllWolves"])
  },
  mounted() {
    this.getAllWolves();
  }
};
</script>

<style>
</style>
