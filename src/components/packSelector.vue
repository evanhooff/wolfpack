// pack menu
<template>
  <div>
    <span>Select Pack:</span>

    <b-dropdown
      id="pack-selector-menu"
      :text="(selectedPack) ? selectedPack.name : 'All wolves'"
      class="m-md-2"
    >
      <b-dropdown-item :to="'/'">all wolves</b-dropdown-item>
      <b-dropdown-item
        v-for="pack in allPacks"
        :key="pack.id"
        :to="`/pack/${pack.id}`"
      >{{pack.name}}</b-dropdown-item>
    </b-dropdown>

    <!-- create pack -->
    <create-pack @created="updateSelector"></create-pack>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import createPack from "./pack/createPack";

export default {
  name: "packSelector",
  components: {
    createPack
  },
  computed: {
    ...mapGetters({
      allPacks: "packs/allPacks"
    }),
    ...mapState("packs", ["selectedPack"])
  },
  methods: {
    ...mapActions("packs", ["getAllPacks"]),
    updateSelector() {
      this.getAllPacks();
    }
  },
  mounted() {
    this.getAllPacks();
  }
};
</script>

<style>
</style>
