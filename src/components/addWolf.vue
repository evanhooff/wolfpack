<template>
  <div>
    <b-button v-b-modal.add-wolf>Add Wolf to this Pack</b-button>

    <b-modal id="add-wolf" :title="`Add a wolf to ${pack.name}`" :hide-footer="true">
      <b-form @submit="submitWolf" @reset="onReset" v-if="showModal">
        <b-form-group id="wolf-input-group" label="Select a wolf:" label-for="wolf-input">
          <b-form-select id="wolf-input" v-model="selectedWolf" :options="allWolves" required></b-form-select>
        </b-form-group>

        <b-alert v-if="error" :show="showErrorMessage" dismissible>
          {{ error.message }}
          <p v-for="(field, index) in error.errors" :key="index">{{ field[0] }}</p>
        </b-alert>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="light">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import rest from "../api/rest";
import { mapState, mapActions } from "vuex";

export default {
  name: "addWolf",
  props: {
    pack: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedWolf: null,
      showModal: true,
      showErrorMessage: false, // used to display error adding wolf message
      error: undefined // used to display error message
    };
  },
  computed: {
    ...mapState("wolves", ["allWolves"])
  },
  beforeMount() {
    this.getAllWolves();
  },
  methods: {
    ...mapActions("wolves", ["getAllWolves"]),
    submitWolf(evt) {
      evt.preventDefault();
      // reset the error message
      this.error = undefined;
      this.showErrorMessage = false;
      rest
        .addWolfToPack({
          wolfId: this.selectedWolf,
          packId: this.pack.id
        })
        .then(() => {
          // on success: hide modal
          this.$bvModal.hide("add-wolf");
          // reset the form
          this.resetForm();
          // display data of added wolf
          // reset the view
          this.$emit("added", this.selectedWolf);
        })
        .catch(error => {
          // on error: display server error response
          console.log("error", error);
          this.showErrorMessage = true;
          this.error = error.data;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.resetForm();
      // Trick to reset/clear native browser form validation state
      this.showModal = false;
      this.$nextTick(() => {
        this.showModal = true;
      });
    },
    resetForm() {
      // Reset all form values to default
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  }
};
</script>
