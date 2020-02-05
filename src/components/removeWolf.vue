<template>
  <div>
    <!-- if the pack id is set, this wolf is displayed on the pack overview page -->
    <button class="btn btn-secondary" v-if="packId" @click="removeFromPack">remove</button>

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
    },
    packId: {
      type: Number,
      required: false
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
    // function to remove the wolf from the pack
    removeFromPack() {
      rest
        .removeWolfFromPack({
          wolfId: this.wolfId,
          packId: this.packId
        })
        .then(response => {
          // emit to parent to reload the view
          // parse response data to display the deleted wolf
          this.$emit("removed", response.data);
        })
        .catch(error => {
          this.showError = true;
          this.errorMessage = error.message;
        });
    }
  }
};
</script>
