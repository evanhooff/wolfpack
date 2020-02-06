<template>
  <div>
    <h1>All Wolves</h1>
    <create-wolf @created="getAllWolves"></create-wolf>

    <!-- success message on updating a wolf -->
    <b-alert v-model="showAlert" dismissible>{{ alertMessage }}</b-alert>

    <div v-if="!isLoading">
      <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf">
        <delete-wolf :wolfId="wolf.id" @deleted="showAlertMessage"></delete-wolf>
        <update-wolf :wolf="wolf" @updated="showAlertMessage"></update-wolf>
      </wolf>
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import Wolf from "../components/wolf";
import createWolf from "../components/createWolf";
import deleteWolf from "../components/deleteWolf";
import updateWolf from "../components/updateWolf";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Wolf,
    createWolf,
    deleteWolf,
    updateWolf
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
    ...mapState("wolves", ["isLoading"]),
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
