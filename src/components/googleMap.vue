<template>
  <div>
    <gmap-map :center="center" :zoom="8" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="markerClicked(m)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "googleMap",
  props: {
    markers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 }
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    markerClicked(marker) {
      this.center = marker.position;
    }
  }
};
</script>