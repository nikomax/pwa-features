<template>
  <div class="container py-4">
    <h1 class="mb-4">Network</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else>
      <div><b>Status:</b> {{ online ? "online" : "offline" }}</div>
      <div><b>Network effective type:</b> {{ effectiveType }}</div>
      <div v-if="type"><b>Network type:</b> {{ type }}</div>
      <div><b>Download speed:</b> {{ downlink }} mbps</div>
      <div><b>RTT:</b> {{ rtt }} ms</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: true,
      effectiveType: null,
      rtt: null,
      downlink: 0,
      connection: null,
      online: false,
      type: null,
    };
  },
  methods: {
    updateConnectionStatus() {
      const { effectiveType, rtt, downlink, type } = this.connection;
      this.online = navigator.onLine;
      this.effectiveType = effectiveType;
      this.rtt = rtt;
      this.downlink = downlink;
      this.type = type;
    },
  },
  mounted() {
    this.connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (!this.connection) {
      this.supported = false;
      return;
    }
    this.updateConnectionStatus();
    this.connection.addEventListener("change", this.updateConnectionStatus);
    window.addEventListener("online", this.updateConnectionStatus);
    window.addEventListener("offline", this.updateConnectionStatus);
  },
  unmounted() {
    this.connection.removeEventListener("change", this.updateConnectionStatus);
    window.removeEventListener("online", this.updateConnectionStatus);
    window.removeEventListener("offline", this.updateConnectionStatus);
  },
};
</script>
