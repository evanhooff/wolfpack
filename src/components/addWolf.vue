<template>
  <div>
    <b-button v-b-modal.add-wolf>Add Wolf</b-button>

    <b-alert v-if="wolf" v-model="showAddedMessage" dismissible>{{ wolf.name }} is added as a wolf!</b-alert>

    <b-modal id="add-wolf" title="Add a new wolf" :hide-footer="true">
      <b-form @submit="onSubmit" @reset="onReset" v-if="showModal">
        <b-form-group id="name-input-group" label="Name:" label-for="name-input">
          <b-form-input id="name-input" v-model="form.name" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="gender-input-group" label="Gender:" label-for="gender-input">
          <b-form-select id="gender-input" v-model="form.gender" :options="genders" required></b-form-select>
        </b-form-group>

        <b-form-group id="date-input-group" label="Birtday:" label-for="date-input">
          <b-form-input id="date-input" v-model="form.birthday" type="date" required></b-form-input>
        </b-form-group>

        <b-alert v-if="error" v-modal="showErrorMessage" dismissible>
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

export default {
  name: "addWolf",
  data() {
    return {
      form: {
        name: "",
        gender: null,
        birthday: ""
      },
      genders: [{ text: "Select Gender", value: null }, "female", "male"],
      showModal: true,
      showAddedMessage: false,
      wolf: undefined, // used to display success adding wolf message
      showErrorMessage: false,
      error: undefined // used to display error adding wolf message
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // reset the error message
      this.error = undefined;
      this.showErrorMessage = false;
      this.showAddedMessage = false;
      rest
        .addWolf(this.form)
        .then(response => {
          // on success: hide modal
          this.$bvModal.hide("add-wolf");
          // reset the form
          this.resetForm();
          // display data of added wolf
          this.showAddedMessage = true;
          this.wolf = response.data;
          // reset the view
          this.$emit("added");
        })
        .catch(error => {
          // on error: display server error response
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
      // reset the error message
      this.error = undefined;
      // Reset our form values
      this.form.name = "";
      this.form.gender = null;
      this.form.birthday = "";
    }
  }
};
</script>
