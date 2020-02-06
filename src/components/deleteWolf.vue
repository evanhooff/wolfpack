<template>
  <div>
    <!-- button to delete the wolf entirely -->
    <b-button variant="primary" @click="deleteWolf">delete</b-button>

    <!-- error message on deleting or removing a wolf -->
    <b-alert :show="showError" dismissible>{{ errorMessage }}</b-alert>
  </div>
</template>

<script>
import rest from "../api/rest";
import moment from "moment";

export default {
  name: "wolf",
  props: {
    wolfId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showError: false, // used for displaying delete error
      errorMessage: undefined
    };
  },
  filters: {
    // format for the birthdate
    dateFormat: function(date) {
      if (!date) return "";
      const formattedDate = moment(date).format("DD/MM/YYYY");
      return formattedDate;
    }
  },
  methods: {
    // function to delete the wolf entirely
    deleteWolf() {
      rest
        .deleteWolf({ id: this.wolfId })
        .then(() => {
          // emit to parent to reload the view
          this.$emit("deleted", `Wolf was deleted.`);
        })
        .catch(error => {
          // display error
          this.showError = true;
          this.errorMessage = error.message;
        });
    }
  }
};
</script>
