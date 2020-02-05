<template>
  <div>
    <h1>All Wolves</h1>
    <create-wolf @created="getAllWolves"></create-wolf>

    <!-- success message on deleting a wolf -->
    <b-alert v-model="showDeletedMessage" dismissible>Wolf was deleted.</b-alert>

    <div v-if="!isLoading">
      <wolf v-for="wolf in allWolves" :key="wolf.id" :wolf="wolf">
        <delete-wolf :wolfId="wolf.id" @deleted="wolfDeleted"></delete-wolf>
      </wolf>
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import Wolf from "../components/wolf";
import createWolf from "../components/createWolf";
import deleteWolf from "../components/deleteWolf";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Wolf,
    createWolf,
    deleteWolf
  },
  data() {
    return {
      showDeletedMessage: false
    };
  },
  computed: {
    ...mapState("wolves", ["allWolves", "isLoading"])
  },
  mounted() {
    this.getAllWolves();
  },
  methods: {
    ...mapActions("wolves", ["getAllWolves"]),
    wolfDeleted() {
      this.showDeletedMessage = true;
      this.getAllWolves();
    }
  }
};
</script>
