// single pack view
<template>
  <div>
    <div v-if="!packLoading">
      <!-- pack information -->
      <h1>Pack {{ selectedPack.name }}</h1>
      <delete-pack :packId="selectedPack.id" @deleted="showAlertMessage"></delete-pack>
      <update-pack :pack="selectedPack" @updated="showAlertMessage"></update-pack>

      <!-- pack details -->
      <pack :selectedPack="selectedPack"></pack>

      <!-- add wolf to pack -->
      <add-wolf :pack="selectedPack" @added="showAlertMessage"></add-wolf>

      <!-- alert message for when adding/deleting wolf -->
      <b-alert v-model="showAlert" dismissible>{{ alertMessage }}</b-alert>

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
import updatePack from "../components/updatePack";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Pack,
    Wolf,
    deleteWolf,
    removeWolf,
    addWolf,
    deletePack,
    updatePack
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
      this.getPack(this.$route.params.id).catch(error => {
        console.log(this.packNotFound(error));
      });
    },
    packNotFound(error) {
      // pack not found, so redirect the user to the main view
      console.log(error);
    }
  },
  mounted() {
    this.getPack(this.$route.params.id).catch(error => {
      console.log(this.packNotFound(error));
    });

    // needed for route change
    this.$router.beforeEach((to, from, next) => {
      this.getPack(to.params.id).catch(error => {
        console.log(this.packNotFound(error));
      });
      next();
    });
  }
};
</script>

<style>
</style>
