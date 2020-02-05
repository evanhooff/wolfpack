<template>
  <div>
    <!-- if the pack id is set, this wolf is displayed on the pack overview page -->
    <button class="btn btn-secondary" v-if="packId" @click="removeFromPack">remove</button>
    <!-- button to delete the wolf entirely -->
    <button class="btn btn-primary" @click="deleteWolf">delete</button>

    <!-- error message on deleting a wolf -->
    <b-alert :show="showDeleteError" dismissible>{{ deleteError }}</b-alert>
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
      showDeleteError: false,
      deleteError: undefined // used for displaying delete error
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
        .then(response => {
          // emit to parent to reload the view
          // parse response data to display the deleted wolf
          this.$emit("deleted", response.data);
        })
        .catch(error => {
          // display error
          this.showDeleteError = true;
          this.deleteError = error.message;
        });
    },
    // function to remove the wolf from the pack
    removeFromPack() {
      console.log(`remove ${this.wolfId} from pack ${this.packId}`);
      rest.removeWolfFromPack({
        wolfId: this.wolfId,
        packId: this.packId
      });
    }
  }
};
</script>
