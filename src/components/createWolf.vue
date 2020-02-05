<template>
  <div>
    <b-button v-b-modal.create-wolf>Create Wolf</b-button>

    <b-alert
      v-if="wolf"
      :show="showCreatedMessage"
      dismissible
    >{{ wolf.name }} is created as a wolf!</b-alert>

    <b-modal id="create-wolf" title="Create a new wolf" :hide-footer="true">
      <b-form @submit="submitWolf" @reset="onReset" v-if="showModal">
        <b-form-group id="name-input-group" label="Name:" label-for="name-input">
          <b-form-input id="name-input" v-model="form.name" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="gender-input-group" label="Gender:" label-for="gender-input">
          <b-form-select id="gender-input" v-model="form.gender" :options="genders" required></b-form-select>
        </b-form-group>

        <b-form-group id="date-input-group" label="Birtday:" label-for="date-input">
          <b-form-input id="date-input" v-model="form.birthday" type="date" required></b-form-input>
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

export default {
  name: "createWolf",
  data() {
    return {
      form: {
        name: "",
        gender: null,
        birthday: ""
      },
      genders: [{ text: "Select Gender", value: null }, "female", "male"],
      showModal: true,
      showCreatedMessage: false,
      wolf: undefined, // used to display success creating wolf message
      showErrorMessage: false, // used to display error creating wolf message
      error: undefined // used to display error message
    };
  },
  methods: {
    submitWolf(evt) {
      evt.preventDefault();
      // reset the error message
      this.error = undefined;
      this.showErrorMessage = false;
      this.showCreatedMessage = false;
      rest
        .createWolf(this.form)
        .then(response => {
          // on success: hide modal
          this.$bvModal.hide("create-wolf");
          // reset the form
          this.resetForm();
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
