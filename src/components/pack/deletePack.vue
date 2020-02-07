<template>
  <div>
    <!-- button to delete the wolf entirely -->
    <button class="btn btn-primary mx-2" @click="deletePack">delete</button>

    <!-- error message on deleting or removing a pack -->
    <b-alert :show="showError" dismissible>{{ errorMessage }}</b-alert>
  </div>
</template>

<script>
import rest from "../../api/rest";

export default {
  name: "wolf",
  props: {
    packId: {
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
  methods: {
    // function to delete the wolf entirely
    deletePack() {
      rest
        .deletePack({ id: this.packId })
        .then(response => {
          // emit to parent to reload the view
          // parse response data to display the deleted wolf
          this.$emit("deleted", response.data);
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
