<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf"></wolf>
  </div>
</template>

<script>
import Wolf from "./components/wolf";
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
