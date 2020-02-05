// single pack view
<template>
  <div>
    <div v-if="!packLoading">
      <!-- success message on deleting a wolf -->
      <b-alert v-model="showDeletedMessage" dismissible>Wolf was deleted.</b-alert>

      <h1>Pack {{ selectedPack.name }}</h1>
      <pack :selectedPack="selectedPack"></pack>
      <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf">
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
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf,
    deleteWolf
  },
  data() {
    return {
      showDeletedMessage: false
    };
  },
  computed: {
    ...mapState("packs", ["selectedPack", "packLoading"])
  },
  methods: {
    ...mapActions("packs", ["getPack"]),
    updateView() {
      // update the wolves after adding, deleting and updating
      this.getPack(this.$route.params.id);
    },
    wolfDeleted() {
      this.showDeletedMessage = true;
      this.updateView();
    }
  },
  mounted() {
    this.updateView();
    this.$router.beforeEach((to, from, next) => {
      this.updateView();
      next();
    });
  }
};
</script>

<style>
</style>
