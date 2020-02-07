<template>
  <div>
    <!-- link to home -->
    <b-button :to="{ name: 'home' }">Show all wolves</b-button>

    <h1>Google Maps</h1>
    <google-map :markers="allPacks"></google-map>
    <span v-if="allPacks">Showing {{allPacks.length}} packs</span>
    <!-- link to map -->
    <b-button :to="{ name: 'home' }" variant="primary">Back to wolves overview</b-button>
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
    ...mapGetters("packs", ["allPacks"])
  },
  methods: {
    ...mapActions("packs", ["getAllPacks"])
  },
  mounted() {
    if (!this.allPacks) this.getAllPacks();
  }
};
</script>
