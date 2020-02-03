<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    Hier: {{ testVariable }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      testVariable: "testApiGetter/getTestVariable"
    })
  },
  methods: {
    ...mapActions("testApiGetter", ["testDefaultApiCall"])
  },
  mounted() {
    this.testDefaultApiCall();
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
