// single pack view
<template>
  <div>
    <div v-if="!packLoading">
      <!-- success message on deleting a wolf -->
      <b-alert v-model="showDeletedMessage" dismissible>Wolf was deleted.</b-alert>

      <!-- pack information -->
      <h1>Pack {{ selectedPack.name }}</h1>

      <!-- pack details -->
      <pack :selectedPack="selectedPack"></pack>

      <!-- add wolf to pack -->
      <add-wolf :pack="selectedPack" @added="wolfAddedToPack"></add-wolf>
      <b-alert v-model="showRemovedMessage" dismissible>Wolf was removed from this pack.</b-alert>

      <!-- all wolves in a pack -->
      <wolf
        v-for="wolf in selectedPack.wolves"
        :key="wolf.id"
        :wolf="wolf"
        :class="{ 'blink': wolf.id === newWolf}"
      >
        <remove-wolf :wolfId="wolf.id" :packId="selectedPack.id" @removed="wolfRemoved"></remove-wolf>
        <delete-wolf :wolfId="wolf.id" @deleted="wolfRemoved"></delete-wolf>
      </wolf>
    </div>
    <div v-if="packLoading">Loading...</div>
  </div>
</template>

<script>
import Pack from "../components/pack";
import Wolf from "../components/wolf";
import deleteWolf from "../components/deleteWolf";
import removeWolf from "../components/removeWolf";
import addWolf from "../components/addWolf";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf,
    deleteWolf,
    removeWolf,
    addWolf
  },
  data() {
    return {
      showDeletedMessage: false,
      showRemovedMessage: false,
      newWolf: undefined
    };
  },
  computed: {
    ...mapState("packs", ["packLoading"]),
    ...mapGetters("packs", ["selectedPack"])
  },
  methods: {
    ...mapActions("packs", ["getPack"]),
    wolfDeleted() {
      // show message when deleted
      this.showDeletedMessage = true;
      this.getPack(this.$route.params.id);
    },
    wolfRemoved() {
      this.showRemovedMessage = true;
      this.getPack(this.$route.params.id);
    },
    wolfAddedToPack(wolfId) {
      this.newWolf = wolfId;
      this.getPack(this.$route.params.id);
    }
  },
  mounted() {
    this.getPack(this.$route.params.id);
    this.$router.beforeEach((to, from, next) => {
      this.getPack(to.params.id);
      next();
    });
  }
};
</script>

<style>
</style>
