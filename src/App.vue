<template>
  <div>
    <header class="header">
      <div class="logo">
        <h1>
          <span class="redslash">/</span>WOLFPACK
        </h1>
      </div>
      <pack-selector></pack-selector>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
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
</style>
