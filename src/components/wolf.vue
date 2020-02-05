<template>
  <div>
    {{wolf.name}}
    {{wolf.gender}}
    {{wolf.birthday | dateFormat}}
    <slot></slot>
  </div>
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
