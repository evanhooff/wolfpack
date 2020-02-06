// pack detail page
<template>
  <div>
    <div v-if="error404">
      <h1>Pack not found</h1>
      <span>Something went wrong, please return to the home page.</span>
      <b-button :to="{ name: 'home' }">Take me home</b-button>
    </div>

    <div v-else>
      <h1>Something went wrong.</h1>
      <span>We seem to have lost communication. Please howl and try again later.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "restError",
  props: {
    error404: {
      type: Boolean,
      required: false
    }
  }
};
</script>

