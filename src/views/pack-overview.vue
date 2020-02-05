// single pack view
<template>
  <div>
    <div v-if="!packLoading">
      <!-- success message on deleting a wolf -->
      <b-alert v-model="showDeletedMessage" dismissible>Wolf was deleted.</b-alert>

      <!-- pack information -->
      <h1>Pack {{ selectedPack.name }}</h1>
      <pack :selectedPack="selectedPack"></pack>

      <!-- add wolf to pack -->
      <add-wolf :pack="selectedPack" @added="wolfAddedToPack"></add-wolf>

      <!-- all wolves in a pack -->
      <wolf
        v-for="wolf in selectedPack.wolves.reverse()"
        :key="wolf.id"
        :wolf="wolf"
        :class="{ blink: newWolf }"
      >
        <delete-wolf :packId="selectedPack.id" :wolfId="wolf.id" @deleted="wolfDeleted"></delete-wolf>
      </wolf>
    </div>
    <div v-if="packLoading">Loading...</div>
  </div>
</template>

<script>
import Pack from "../components/pack";
import Wolf from "../components/wolf";
import deleteWolf from "../components/deleteWolf";
import addWolf from "../components/addWolf";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf,
    deleteWolf,
    addWolf
  },
  data() {
    return {
      showDeletedMessage: false,
      newWolf: undefined
    };
  },
  computed: {
    ...mapState("packs", ["selectedPack", "packLoading"])
  },
  methods: {
    ...mapActions("packs", ["getPack"]),
    updateView(id) {
      // update the list of wolves
      this.getPack(id);
    },
    wolfDeleted() {
      // show message when deleted
      this.showDeletedMessage = true;
      this.updateView(this.$route.params.id);
    },
    wolfAddedToPack(wolfId) {
      console.log(wolfId);
      this.newWolf = wolfId;
      this.updateView(this.$route.params.id);
    }
  },
  mounted() {
    this.updateView(this.$route.params.id);
    this.$router.beforeEach((to, from, next) => {
      this.updateView(to.params.id);
      next();
    });
  }
};
</script>

<style>
</style>
