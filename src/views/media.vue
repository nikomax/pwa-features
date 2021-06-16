<template>
  <div class="container py-4">
    <h1 class="mb-4">Media</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else class="row">
      <div class="col-12 col-md-4">
        <div class="card shadow">
          <div class="card-body">
            <div v-show="!image && !video">
              <video
                autoplay
                playsinline
                ref="video"
                style="width: 100%; height: 300px; object-fit: cover"
                class="mb-4"
              />
              <div v-if="!isRecording">
                <button @click="capture" class="btn btn-primary me-1">
                  photo
                </button>
                <button @click="record" class="btn btn-primary me-1">
                  video
                </button>
                <button
                  v-if="
                    capabilities.facingMode && capabilities.facingMode.length
                  "
                  @click="flipCamera"
                  class="btn btn-primary me-1"
                >
                  change camera
                </button>
                <button
                  v-if="capabilities.torch"
                  @click="toggleFlash"
                  class="btn btn-primary me-1"
                >
                  flash
                </button>
              </div>
              <button v-else @click="stopRecord" class="btn btn-primary">
                stop recording
              </button>
            </div>
            <div>
              <div v-if="image">
                <img
                  :src="image"
                  style="width: 100%; height: 300px; object-fit: cover"
                  class="mb-4"
                />
                <button @click="image = null" class="btn btn-danger me-1">
                  delete
                </button>
                <a :href="image" download class="btn btn-primary">save photo</a>
              </div>
              <div v-if="video">
                <video
                  playsinline
                  :src="video"
                  controls
                  class="mb-4"
                  style="width: 100%; height: 300px; object-fit: cover"
                />
                <button @click="video = null" class="btn btn-danger me-1">
                  delete
                </button>
                <a :href="video" download class="btn btn-primary">
                  save video
                </a>
              </div>
            </div>
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
      supported: true,
      mediaStream: null,
      image: null,
      video: null,
      recordedChunks: [],
      mediaRecorder: null,
      isRecording: false,
      front: true,
      capabilities: {},
      flash: false,
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
    capture() {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
      return imageCapture.takePhoto().then((blob) => {
        this.image = URL.createObjectURL(blob);
      });
    },
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
    record() {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: this.getSupportedMimeType(),
      });
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      this.mediaRecorder.start();
      this.isRecording = true;
    },
    stopRecord() {
      this.mediaRecorder.stop();
      setTimeout(() => {
        const superBuffer = new Blob(this.recordedChunks, {
          type: this.getSupportedMimeType(),
        });
        this.video = URL.createObjectURL(superBuffer);
        this.mediaRecorder = null;
        this.isRecording = false;
      }, 500);
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
  },
  async mounted() {
    if (!navigator.mediaDevices) {
      this.supported = false;
      return;
    }
    await this.initMedia();
    const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
    this.capabilities = mediaStreamTrack.getCapabilities();
  },
  unmounted() {
    this.destroyStream();
  },
};
</script>
