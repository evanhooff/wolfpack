// display the details of a single pack
// takes the selected pack as input
// todo: add map
<template>
  <div>Location: {{ selectedPack.lat }} / {{ selectedPack.lng }}</div>
</template>

<script>
export default {
  name: "pack",
  props: ["selectedPack"]
};
</script>

<style scoped>
</style>