<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf"></wolf> -->
    <pack></pack>
  </div>
</template>

<script>
// import Wolf from "./components/wolf";
import Pack from "./components/pack";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    // Wolf
    Pack
  },
  computed: {
    ...mapGetters({
      // allWolves: "wolves/allWolves"
      allPacks: "packs/allPacks"
    })
  },
  methods: {
    // ...mapActions("wolves", ["getAllWolves"]),
    ...mapActions("packs", ["getAllPacks"])
  },
  mounted() {
    // this.getAllWolves();
    this.getAllPacks();
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
