<template>
  <div>
    <h1>All Wolves</h1>
    <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf"></wolf>
  </div>
</template>

<script>
import Wolf from "../components/wolf";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Wolf
  },
  computed: {
    ...mapGetters({
      allWolves: "wolves/allWolves"
    })
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
