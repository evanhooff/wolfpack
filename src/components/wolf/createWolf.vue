<template>
  <div>
    <b-card v-b-modal.create-wolf class="add-button" border-variant="primary">Create Wolf</b-card>

    <b-alert
      v-if="wolf"
      :show="showCreatedMessage"
      dismissible
    >{{ wolf.name }} is created as a wolf!</b-alert>

    <b-modal id="create-wolf" title="Create a new wolf" :hide-footer="true">
      <wolf-form @submit="createWolf">
        <b-alert v-if="error" :show="showErrorMessage" dismissible>
          {{ error.message }}
          <p v-for="(field, index) in error.errors" :key="index">{{ field[0] }}</p>
        </b-alert>
      </wolf-form>
    </b-modal>
  </div>
</template>

<script>
import rest from "../../api/rest";
import wolfForm from "./wolfForm";

export default {
  name: "createWolf",
  components: {
    wolfForm
  },
  data() {
    return {
      iconProps: {
        blank: true,
        blankColor: "#777",
        width: 75,
        height: 75,
        class: "m1"
      },
      showModal: true,
      showCreatedMessage: false,
      wolf: undefined, // used to display success creating wolf message,
      showErrorMessage: false, // used to display error creating wolf message
      error: undefined // used to display error message
    };
  },
  methods: {
    createWolf(formData) {
      this.showCreatedMessage = false;
      this.error = undefined;
      this.showErrorMessage = false;

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
