<template>
  <div>
    {{wolf.name}}
    {{wolf.gender}}
    {{wolf.birthday | dateFormat}}
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "wolf",
  props: ["wolf"],
  filters: {
    dateFormat: function(date) {
      if (!date) return "";
      const formattedDate = moment(date).format("DD/MM/YYYY");
      return formattedDate;
    }
  }
};
</script>

<style scoped>
</style>