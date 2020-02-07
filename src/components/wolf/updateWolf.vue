<template>
  <div>
    <b-button @click="showModal = !showModal">change</b-button>

    <b-modal
      v-model="showModal"
      :id="`update-wolf-${wolf.id}`"
      :title="`Change ${wolf.name}`"
      :hide-footer="true"
    >
      <wolf-form @submit="updateWolf" :wolf="wolf">
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
  props: {
    wolf: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      showErrorMessage: false, // used to display error creating wolf message
      error: undefined // used to display error message
    };
  },
  methods: {
    updateWolf(formData) {
      this.error = undefined;
      this.showErrorMessage = false;
      rest
        .updateWolf(formData)
        .then(() => {
          // on success: hide modal
          this.$bvModal.hide(`update-wolf-${this.wolf.id}`);
          // reset the view
          this.$emit("updated", "Wolf details were updated.");
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
