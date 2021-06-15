<template>
  <div class="container py-4">
    <h1 class="mb-4">Vibration</h1>
    <button class="btn btn-primary" @click="play">play</button>
  </div>
</template>

<script>
export default {
  methods: {
    play() {
      window.navigator.vibrate([200, 100, 200]);
    },
  },
};
</script>
