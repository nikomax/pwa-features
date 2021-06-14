<template>
  <div class="container py-4">
    <h1 class="mb-4">Media</h1>
    <div class="row">
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
      mediaStream: null,
      image: null,
      video: null,
      recordedChunks: [],
      mediaRecorder: null,
      isRecording: false,
    };
  },
  methods: {
    capture() {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      return imageCapture.takePhoto().then((blob) => {
        this.image = URL.createObjectURL(blob);
      });
    },
    record() {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: "video/webm;codecs=vp9,opus",
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
          type: "video/webm;codecs=vp9,opus",
        });
        this.video = URL.createObjectURL(superBuffer);
        this.mediaRecorder = null;
        this.isRecording = false;
      });
    },
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      })
      .catch((error) => console.error("getUserMedia() error:", error));
  },
  unmounted() {
    const tracks = this.mediaStream.getTracks();
    tracks.map((track) => track.stop());
  },
};
</script>
