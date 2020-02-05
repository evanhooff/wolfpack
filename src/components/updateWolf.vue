<template>
  <div>
    <b-button @click="showModal = !showModal">Change</b-button>

    <b-modal
      v-model="showModal"
      :id="`update-wolf-${wolf.id}`"
      :title="`Change ${wolf.name}`"
      :hide-footer="true"
    >{{wolf}}</b-modal>
  </div>
</template>

<script>
export default {
  name: "createWolf",
  props: {
    wolf: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      showUpdatedMessage: false,
      showErrorMessage: false, // used to display error creating wolf message
      error: undefined // used to display error message
    };
  }
};
</script>
