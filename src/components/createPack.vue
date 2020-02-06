<template>
  <div>
    <b-button v-b-modal.create-pack>Create pack</b-button>

    <b-alert v-if="pack" :show="showCreatedMessage" dismissible>{{ pack.name }} is created!</b-alert>

    <b-modal id="create-pack" title="Create a pack" :hide-footer="true">
      <pack-form @submit="createPack">
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
import packForm from "../components/packForm";

export default {
  name: "createPack",
  components: {
    packForm
  },
  data() {
    return {
      showCreatedMessage: false,
      pack: undefined, // used to display success creating wolf message,
      showModal: true,
      showErrorMessage: false, // used to display error adding wolf message
      error: undefined // used to display error message
    };
  },
  methods: {
    createPack(formData) {
      this.showCreatedMessage = false;
      this.error = undefined;
      this.showErrorMessage = false;
      rest
        .createPack(formData)
        .then(response => {
          // on success: hide modal
          this.$bvModal.hide("create-pack");
          // display data of created wolf
          this.showCreatedMessage = true;
          this.pack = response.data;
          // go to pack
          this.$router.push({ name: "pack", params: { id: response.data.id } });

          // update the pack selector
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
