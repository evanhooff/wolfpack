<template>
  <div>
    <h1>Google Maps</h1>
    <google-map :markers="packLocations"></google-map>
  </div>
</template>

<script>
import GoogleMap from "../components/googleMap";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "mapOverview",
  components: {
    GoogleMap
  },
  computed: {
    ...mapGetters("packs", ["packLocations", "allPacks"])
  },
  methods: {
    ...mapActions("packs", ["getAllPacks"])
  },
  mounted() {
    if (!this.allPacks) this.getAllPacks();
  }
};
</script>
