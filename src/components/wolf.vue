<template>
  <div>
    {{wolf.name}}
    {{wolf.gender}}
    {{wolf.birthday | dateFormat}}
    <!-- if the pack id is set, this wolf is displayed on the pack overview page -->
    <button class="btn btn-secondary" v-if="packId" @click="removeFromPack">remove</button>
    <!-- button to delete the wolf entirely -->
    <button class="btn btn-primary" @click="deleteWolf">delete</button>
  </div>
</template>

<script>
// single wolf view

import rest from "../api/rest";
// date formatter
import moment from "moment";

export default {
  name: "wolf",
  props: {
    wolf: {
      type: Object,
      required: true
    },
    packId: {
      type: Number,
      required: false
    }
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
      console.log(`delete ${this.wolf.id}`);
      rest.deleteWolf({ id: this.wolf.id });
    },
    // function to remove the wolf from the pack
    removeFromPack() {
      console.log(`remove ${this.wolf.id} from pack ${this.packId}`);
      rest.removeWolfFromPack({
        wolfId: this.wolf.id,
        packId: this.packId
      });
    }
  }
};
</script>

<style scoped>
</style>