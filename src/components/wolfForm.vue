<template>
  <b-form @submit="submitWolf" @reset="onReset">
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
</template>

<script>
export default {
  name: "wolfForm",
  data() {
    return {
      form: {
        name: "",
        gender: null,
        birthday: ""
      },
      genders: [{ text: "Select Gender", value: null }, "female", "male"],
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

      // emit form data to parent
      this.$emit("submit", this.form);

      // reset the form
      this.resetForm();
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
