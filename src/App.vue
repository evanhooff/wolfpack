<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <pack-selector></pack-selector>
    <router-view></router-view>
  </div>
</template>

<script>
import PackSelector from "./components/packSelector";

export default {
  name: "app",
  components: {
    PackSelector
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
