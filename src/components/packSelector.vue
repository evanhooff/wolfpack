// pack menu
<template>
  <div class="menu">
    <label for="pack-selector-menu">Select Pack:</label>

    <b-dropdown
      id="pack-selector-menu"
      :text="(selectedPack) ? selectedPack.name : 'Packname'"
      class="m-md-2"
    >
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
