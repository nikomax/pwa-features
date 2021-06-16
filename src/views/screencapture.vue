<template>
  <div class="container py-4">
    <h1 class="mb-4">Screen capture(Desktop only)</h1>
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
                <button @click="record" class="btn btn-primary me-1">
                  start recording
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
    };
  },
  computed: {
    constraints() {
      return {
        video: true,
      };
    },
  },
  methods: {
    record() {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: "video/webm; codecs=vp9",
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
          type: "video/webm",
        });
        this.video = URL.createObjectURL(superBuffer);
        this.mediaRecorder = null;
        this.isRecording = false;
      });
    },
    async initMedia() {
      this.mediaStream = await navigator.mediaDevices.getDisplayMedia(
        this.constraints
      );
      this.$refs.video.srcObject = this.mediaStream;
      this.$refs.video.play();
    },
    destroyStream() {
      const tracks = this.mediaStream?.getTracks();
      tracks?.map((track) => track.stop());
    },
  },
  async mounted() {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      this.supported = false;
      return;
    }
    await this.initMedia();
  },
  unmounted() {
    this.destroyStream();
  },
};
</script>
