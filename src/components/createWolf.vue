<template>
  <div>
    <b-button v-b-modal.create-wolf>Create Wolf</b-button>

    <b-alert
      v-if="wolf"
      :show="showCreatedMessage"
      dismissible
    >{{ wolf.name }} is created as a wolf!</b-alert>

    <b-modal id="create-wolf" title="Create a new wolf" :hide-footer="true">
      <wolf-form @submit="createWolf"></wolf-form>
    </b-modal>
  </div>
</template>

<script>
import rest from "../api/rest";
import wolfForm from "../components/wolfForm";

export default {
  name: "createWolf",
  components: {
    wolfForm
  },
  data() {
    return {
      showModal: true,
      showCreatedMessage: false,
      wolf: undefined // used to display success creating wolf message
    };
  },
  methods: {
    createWolf(formData) {
      this.showCreatedMessage = false;
      rest
        .createWolf(formData)
        .then(response => {
          // on success: hide modal
          this.$bvModal.hide("create-wolf");
          // display data of created wolf
          this.showCreatedMessage = true;
          this.wolf = response.data;
          // reset the view
          this.$emit("created");
        })
        .catch(error => {
          // on error: display server error response
          this.showErrorMessage = true;
          this.error = error.data;
        });
    }
  }
};
</script>
