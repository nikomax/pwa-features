<template>
  <div class="container py-4">
    <h1 class="mb-4">Wake lock</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else>
      <p>{{ text }}</p>
      <button v-if="!wakeLock" class="btn btn-primary" @click="setWakeLock">
        Prevent your screen from locking
      </button>
      <button v-else class="btn btn-primary" @click="releaseWakeLock">
        Turn off preventing
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: true,
      wakeLock: null,
      text: "Wake Lock is inactive!",
    };
  },
  methods: {
    async setWakeLock() {
      try {
        this.wakeLock = await navigator.wakeLock.request("screen");
        this.text = "Wake Lock is active!";
      } catch (err) {
        this.text = `${err.name}, ${err.message}`;
      }
    },
    async releaseWakeLock() {
      await this.wakeLock.release();
      this.wakeLock = null;
      this.text = "Wake Lock is inactive!";
    },
  },
  created() {
    if (!navigator.wakeLock) {
      this.supported = false;
    }
  },
};
</script>
