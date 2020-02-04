<template>
  <div>
    <h2>Select Pack:</h2>
    <router-link to="/">all wolves</router-link>
    <p v-for="(pack, index) in allPacks" :key="index">
      <router-link :to="`/pack/${pack.id}`">{{pack.name}}</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "packSelector",
  computed: {
    ...mapGetters({
      allPacks: "packs/allPacks"
    })
  },
  methods: {
    ...mapActions("packs", ["getAllPacks"])
  },
  mounted() {
    this.getAllPacks();
  }
};
</script>

<style>
</style>
