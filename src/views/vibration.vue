<template>
  <div class="container py-4">
    <h1 class="mb-4">Vibration</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <button v-else class="btn btn-primary" @click="play">play</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: true,
    };
  },
  methods: {
    play() {
      navigator.vibrate([200, 100, 200]);
    },
  },
  created() {
    if (!navigator.vibrate) {
      this.supported = false;
    }
  },
};
</script>
