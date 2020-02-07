// todo: add map
<template>
  <div class="my-4">
    <google-map :markers="[selectedPack]" :set-center="selectedPack.position"></google-map>
  </div>
</template>

<script>
import GoogleMap from "../../components/googleMap";
export default {
  name: "pack",
  props: ["selectedPack"],
  components: {
    GoogleMap
  }
};
</script>
