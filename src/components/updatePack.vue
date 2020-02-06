<template>
  <div>
    <b-button v-b-modal.update-pack>Change pack</b-button>

    <b-modal id="update-pack" :title="`Change ${pack.name}`" :hide-footer="true">
      <pack-form @submit="updatePack" :pack="pack">
        <b-alert v-if="error" :show="showErrorMessage" dismissible>
          {{ error.message }}
          <p v-for="(field, index) in error.errors" :key="index">{{ field[0] }}</p>
        </b-alert>
      </pack-form>
    </b-modal>
  </div>
</template>

<script>
import rest from "../api/rest";
import packForm from "./packForm";

export default {
  name: "updatePack",
  components: {
    packForm
  },
  props: {
    pack: {
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
    updatePack(formData) {
      this.error = undefined;
      this.showErrorMessage = false;
      rest
        .updatePack(formData)
        .then(() => {
          // on success: hide modal
          this.$bvModal.hide("update-pack");
          // reset the view
          this.$emit("updated", "Pack details were updated.");
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
