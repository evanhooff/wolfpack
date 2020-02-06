<template>
  <b-form @submit="submitPack" @reset="onReset">
    <b-form-group id="name-input-group" label="Name:" label-for="name-input">
      <b-form-input id="name-input" v-model="form.name" required placeholder="Pack name"></b-form-input>
    </b-form-group>

    <b-form-group id="lat-input-group" label="Latitude:" label-for="lat-input">
      <b-form-input id="lat-input" v-model="form.lat" required placeholder="Latitude"></b-form-input>
    </b-form-group>

    <b-form-group id="lng-input-group" label="Longitude:" label-for="lng-input">
      <b-form-input id="lng-input" v-model="form.lng" required placeholder="Longitude"></b-form-input>
    </b-form-group>

    <!-- slot for error message -->
    <slot></slot>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="light">Reset</b-button>
  </b-form>
</template>

<script>
export default {
  name: "wolfForm",
  props: {
    pack: {
      type: Object,
      required: false,
      default() {
        return {
          id: "",
          name: "",
          lat: "",
          lng: ""
        };
      }
    }
  },
  data() {
    return {
      form: {
        id: this.pack.id,
        name: this.pack.name,
        lat: this.pack.lat,
        lng: this.pack.lng
      }
    };
  },
  methods: {
    submitPack(evt) {
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
