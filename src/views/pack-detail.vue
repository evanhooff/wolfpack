// pack detail page
<template>
  <div>
    <b-button :to="{ name: 'home' }">Show all wolves</b-button>
    <b-button :to="{ name: 'map' }" variant="primary" class="mx-2">Show packs on map</b-button>

    <!-- check if pack is loaded -->
    <div v-if="!packLoading">
      <div class="pack-detail">
        <h1>Pack {{ selectedPack.name }}</h1>
        <delete-pack :packId="selectedPack.id" @deleted="redirectView"></delete-pack>
        <update-pack :pack="selectedPack" @updated="reloadView"></update-pack>
      </div>

      <!-- pack details with Google Maps-->
      <pack :selectedPack="selectedPack"></pack>

      <!-- alert message for when adding/deleting wolf and updating pack -->
      <b-alert v-model="showAlert" dismissible>{{ alertMessage }}</b-alert>

      <h2 class="custom-font">{{ selectedPack.wolves.length }} Wolves in this pack</h2>
      <!-- all wolves in a pack -->
      <b-card-group columns>
        <wolf v-for="wolf in selectedPack.wolves" :key="wolf.id" :wolf="wolf">
          <div class="button-bar">
            <remove-wolf :wolfId="wolf.id" :packId="selectedPack.id" @removed="reloadView"></remove-wolf>
            <delete-wolf :wolfId="wolf.id" @deleted="reloadView"></delete-wolf>
          </div>
        </wolf>
      </b-card-group>

      <!-- add wolf to pack -->
      <add-wolf :pack="selectedPack" @added="reloadView"></add-wolf>
    </div>

    <div v-if="packLoading && !error">Loading...</div>
    <rest-error v-if="error" :error404="this.error.status === 404"></rest-error>
  </div>
</template>

<script>
import Pack from "../components/pack/pack";
import Wolf from "../components/wolf/wolf";
import deleteWolf from "../components/wolf/deleteWolf";
import removeWolf from "../components/wolf/removeWolf";
import addWolf from "../components/wolf/addWolf";
import deletePack from "../components/pack/deletePack";
import updatePack from "../components/pack/updatePack";
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
