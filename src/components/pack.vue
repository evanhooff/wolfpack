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
