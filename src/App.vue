<template>
  <b-container fluid>
    <header class="header">
      <div class="logo">
        <h1>
          <span class="redslash">/</span>WOLFPACK
        </h1>
      </div>
      <!-- Pack menu, including adding a new pack -->
      <pack-selector></pack-selector>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
    <!-- spacer for footer and possibly extra content (later) -->
    <footer class="footer"></footer>
  </b-container>
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
