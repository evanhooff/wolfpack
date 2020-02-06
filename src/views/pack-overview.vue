// single pack view
<template>
  <div>
    <div v-if="!packLoading">
      <b-alert v-model="showAlert" dismissible>{{ alertMessage }}</b-alert>

      <!-- pack information -->
      <h1>Pack {{ selectedPack.name }}</h1>
      <delete-pack :packId="selectedPack.id" @deleted="showAlertMessage"></delete-pack>

      <!-- pack details -->
      <pack :selectedPack="selectedPack"></pack>

      <!-- add wolf to pack -->
      <add-wolf :pack="selectedPack" @added="showAlertMessage"></add-wolf>

      <!-- all wolves in a pack -->
      <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf">
        <remove-wolf :wolfId="wolf.id" :packId="selectedPack.id" @removed="showAlertMessage"></remove-wolf>
        <delete-wolf :wolfId="wolf.id" @deleted="showAlertMessage"></delete-wolf>
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
import deletePack from "../components/deletePack";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf,
    deleteWolf,
    removeWolf,
    addWolf,
    deletePack
  },
  data() {
    return {
      showAlert: false,
      alertMessage: "",
      showRemovedMessage: false
    };
  },
  computed: {
    ...mapState("packs", ["packLoading"]),
    ...mapGetters("packs", ["selectedPack"])
  },
  methods: {
    ...mapActions("packs", ["getPack"]),
    showAlertMessage(message) {
      this.showAlert = true;
      this.alertMessage = message;
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
