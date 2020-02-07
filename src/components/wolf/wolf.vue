<template>
  <b-card class="wolf" :title="wolf.name">
    <p>Gender: {{wolf.gender}}</p>
    <p>Birthday: {{wolf.birthday | dateFormat}}</p>
    <slot></slot>
  </b-card>
</template>

<script>
import moment from "moment";

export default {
  name: "wolf",
  props: {
    wolf: {
      type: Object,
      required: true
    }
  },
  filters: {
    // format for the birthdate
    dateFormat: function(date) {
      if (!date) return "";
      const formattedDate = moment(date).format("DD/MM/YYYY");
      return formattedDate;
    }
  }
};
</script>
