<template>
  <div class="container py-4">
    <h1 class="mb-4">QR Scanner</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else class="row">
      <div class="col-12 col-md-4">
        <div class="card shadow">
          <div class="card-body">
            <div>
              <img
                src="https://media.istockphoto.com/vectors/smart-phone-scan-code-check-the-code-vector-icon-digital-technology-vector-id1222814019?k=20&m=1222814019&s=612x612&w=0&h=DA_Kct3pO1SObV_1xkGjMEM8JGiUKkFhY9plCR-q4nw="
                v-if="!isRecording"
                style="width: 100%; height: 300px; object-fit: cover"
                class="mb-4 d-block"
              />
              <video
                id="video"
                v-if="isRecording"
                autoplay
                playsinline
                ref="video"
                style="width: 100%; height: 300px; object-fit: cover"
                class="mb-4 d-block"
              />
              <button
                v-if="!isRecording"
                @click="scan"
                class="btn btn-primary me-1"
              >
                scan
              </button>
              <div v-else>
                <button @click="stopScan" class="btn btn-primary">
                  stop scanning
                </button>
                <button
                  v-if="
                    capabilities.facingMode && capabilities.facingMode.length
                  "
                  @click="flipCamera"
                  class="btn btn-primary ms-1"
                >
                  change camera
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card mt-2 mt-md-0">
          <div class="card-body">
            <h4>Scanner result</h4>
            <div>
              {{ result }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarcodeDetector from "barcode-detector";
// polyfill unless already supported
if (!("BarcodeDetector" in window)) {
  window.BarcodeDetector = BarcodeDetector;
}

export default {
  data() {
    return {
      supported: true,
      mediaStream: null,
      isRecording: false,
      front: true,
      capabilities: {},
      flash: false,
      interval: null,
      result: null,
    };
  },
  computed: {
    constraints() {
      return {
        video: { facingMode: this.front ? "user" : "environment" },
      };
    },
  },
  methods: {
    getSupportedMimeType() {
      const possibleTypes = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm;codecs=h264,opus",
        "video/mp4;codecs=h264,aac",
        "video/mp4",
      ];
      return possibleTypes.find((mimeType) => {
        return MediaRecorder.isTypeSupported(mimeType);
      });
    },
    stopScan() {
      this.destroyStream();
      this.isRecording = false;
      clearInterval(this.interval);
    },
    async initMedia() {
      this.mediaStream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      this.$refs.video.srcObject = this.mediaStream;
      this.$refs.video.play();
    },
    destroyStream() {
      const tracks = this.mediaStream?.getTracks();
      tracks?.map((track) => track.stop());
    },
    async flipCamera() {
      this.destroyStream();
      this.front = !this.front;
      await this.initMedia();
    },
    toggleFlash() {
      this.flash = !this.flash;
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      mediaStreamTrack.applyConstraints({ advanced: [{ torch: this.flash }] });
    },
    async scan() {
      if (!navigator.mediaDevices) {
        this.supported = false;
        return;
      }
      const barcodeDetector = new window.BarcodeDetector({
        formats: ["qr_code"],
      });

      if (!barcodeDetector) {
        this.supported = false;
        return;
      }
      this.isRecording = true;

      await this.initMedia();
      const mediaStreamTrack = await this.mediaStream.getVideoTracks()[0];
      this.capabilities = await mediaStreamTrack.getCapabilities();
      this.interval = setInterval(() => {
        barcodeDetector
          .detect(this.$refs.video)
          .then((barcodes) => {
            barcodes.forEach((barcode) => {
              this.result = barcode.rawValue;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, 300);
    },
  },
  unmounted() {
    this.destroyStream();
  },
};
</script>
