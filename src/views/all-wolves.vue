<template>
  <div>
    <!-- link to map -->
    <b-button :to="{ name: 'map' }" variant="primary">Show packs on map</b-button>

    <h1>All Wolves</h1>

    <!-- success message on updating a wolf -->
    <b-alert v-model="showAlert" dismissible>{{ alertMessage }}</b-alert>

    <b-card-group columns v-if="!isLoading">
      <create-wolf @created="getAllWolves"></create-wolf>

      <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf">
        <div class="button-bar">
          <delete-wolf :wolfId="wolf.id" @deleted="showAlertMessage"></delete-wolf>
          <update-wolf :wolf="wolf" @updated="showAlertMessage"></update-wolf>
        </div>
      </wolf>
    </b-card-group>
    <div v-if="isLoading && !error">Loading...</div>

    <rest-error v-if="error" :error404="this.error.status === 404"></rest-error>
  </div>
</template>

<script>
import Wolf from "../components/wolf/wolf";
import createWolf from "../components/wolf/createWolf";
import deleteWolf from "../components/wolf/deleteWolf";
import updateWolf from "../components/wolf/updateWolf";
import restError from "../components/restError";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Wolf,
    createWolf,
    deleteWolf,
    updateWolf,
    restError
  },
  data() {
    return {
      showAlert: false,
      alertMessage: "",
      showDeletedMessage: false,
      showUpdatedMessage: false
    };
  },
  computed: {
    ...mapState("wolves", ["isLoading", "error"]),
    ...mapGetters("wolves", ["allWolves"])
  },
  mounted() {
    this.getAllWolves();
  },
  methods: {
    ...mapActions("wolves", ["getAllWolves"]),
    showAlertMessage(message) {
      this.showAlert = true;
      this.alertMessage = message;
      this.getAllWolves();
    }
  }
};
</script>
