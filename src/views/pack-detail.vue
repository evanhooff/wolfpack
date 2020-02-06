// pack detail page
<template>
  <div>
    <!-- link to map -->
    <b-button :to="{ name: 'map' }" variant="primary">Show packs on map</b-button>

    <div v-if="!packLoading">
      <!-- pack information -->
      <h1>Pack {{ selectedPack.name }}</h1>
      <delete-pack :packId="selectedPack.id" @deleted="redirectView"></delete-pack>
      <update-pack :pack="selectedPack" @updated="reloadView"></update-pack>

      <!-- pack details -->
      <pack :selectedPack="selectedPack"></pack>

      <!-- add wolf to pack -->
      <add-wolf :pack="selectedPack" @added="reloadView"></add-wolf>

      <!-- alert message for when adding/deleting wolf and updating pack -->
      <b-alert v-model="showAlert" dismissible>{{ alertMessage }}</b-alert>

      <!-- all wolves in a pack -->
      <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf">
        <remove-wolf :wolfId="wolf.id" :packId="selectedPack.id" @removed="reloadView"></remove-wolf>
        <delete-wolf :wolfId="wolf.id" @deleted="reloadView"></delete-wolf>
      </wolf>
    </div>
    <div v-if="packLoading && !error">Loading...</div>

    <rest-error v-if="error" :error404="this.error.status === 404"></rest-error>
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
import restError from "../components/restError";
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
    updatePack,
    restError
  },
  data() {
    return {
      showAlert: false,
      alertMessage: "",
      showRemovedMessage: false
    };
  },
  computed: {
    ...mapState("packs", ["packLoading", "error"]),
    ...mapGetters("packs", ["selectedPack"])
  },
  methods: {
    ...mapActions("packs", ["getPack"]),
    showAlertMessage(message) {
      this.showAlert = true;
      this.alertMessage = message;
    },
    reloadView(alertMessage) {
      this.showAlertMessage(alertMessage);
      this.getPack(this.$route.params.id);
    },
    redirectView() {
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    this.getPack(this.$route.params.id);

    // needed for route change
    this.$router.beforeEach((to, from, next) => {
      this.getPack(to.params.id);
      next();
    });
  }
};
</script>
