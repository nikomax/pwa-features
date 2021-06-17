<template>
  <div class="container py-4">
    <h1 class="mb-4">Device orientation</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else>
      <button class="btn btn-primary mb-4" @click="activate">
        Activate sensors
      </button>
      <div class="mb-4">{{ text }}</div>
      <div class="card shadow container p-0" ref="container"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
export default {
  data() {
    return {
      supported: true,
      text: "",
    };
  },
  methods: {
    render() {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    },
    init() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.$refs.container.clientWidth,
        this.$refs.container.clientHeight
      );
      this.renderer.setClearColor(0xffffff, 1);
      this.$refs.container.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        70,
        this.$refs.container.clientWidth / this.$refs.container.clientHeight
      );
      this.camera.position.z = 40;
      this.scene.add(this.camera);

      const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      const basicMaterial = new THREE.MeshNormalMaterial();
      this.cube = new THREE.Mesh(boxGeometry, basicMaterial);
      this.scene.add(this.cube);
      this.setRotation(0.2, 0, 0);
    },
    setRotation(x, y, z) {
      this.cube.rotation.set(x, y, z);
    },
    async activate() {
      if (
        DeviceOrientationEvent &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permissionState =
          await DeviceOrientationEvent.requestPermission();
        if (permissionState === "granted") {
          window.addEventListener(
            "deviceorientation",
            ({ beta, gamma, alpha }) => {
              this.setRotation(0.4, 0.6, 0);
              this.cube.rotation.set(beta / 15, gamma / 15, alpha / 15);
            }
          );
        } else {
          this.text = "Permission denied";
        }
      }
    },
  },
  async mounted() {
    if (!window.DeviceOrientationEvent) {
      this.supported = false;
      return;
    }
    this.init();
    this.render();
  },
  unmounted() {
    window.removeEventListener("deviceorientation", this.setRotation);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
}
</style>
