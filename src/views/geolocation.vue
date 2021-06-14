<template>
  <div class="container py-4">
    <h1 class="mb-4">Geolocation</h1>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <span v-if="textContent">{{ textContent }}</span>
            <iframe
              v-else
              height="500px"
              width="100%"
              :src="`https://maps.google.com/maps?q=${coords}&hl=es;z=14&amp;output=embed`"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coords: "40.73061,-73.935242",
      textContent: "",
    };
  },
  methods: {
    getCoords(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      this.textContent = "";
      this.coords = `${latitude},${longitude}`;
    },
  },
  mounted() {
    if (!navigator.geolocation) {
      this.textContent = "Geolocation is not supported by your browser";
    } else {
      this.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(this.getCoords, (e) => {
        console.error(e);
      });
    }
  },
};
</script>
