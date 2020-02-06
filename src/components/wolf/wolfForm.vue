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

    <slot></slot>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="light">Reset</b-button>
  </b-form>
</template>

<script>
export default {
  name: "wolfForm",
  props: {
    wolf: {
      type: Object,
      required: false,
      default() {
        return {
          id: "",
          name: "",
          gender: null,
          birthday: ""
        };
      }
    }
  },
  data() {
    return {
      form: {
        id: this.wolf.id,
        name: this.wolf.name,
        gender: this.wolf.gender,
        birthday: this.wolf.birthday
      },
      genders: [{ text: "Select Gender", value: null }, "female", "male"]
    };
  },
  methods: {
    submitWolf(evt) {
      evt.preventDefault();

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
