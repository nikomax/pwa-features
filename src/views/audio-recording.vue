<template>
  <div class="container py-4">
    <h1 class="mb-4">Audio Recording</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else class="row">
      <div class="col-12 col-md-4">
        <div class="card shadow">
          <div class="card-body">
            <audio :src="audio" controls class="mb-4" />
            <div>
              <button
                @click="record"
                class="btn btn-primary me-1"
                v-if="!isRecording && !audio"
              >
                record
              </button>
              <button
                @click="stopRecord"
                class="btn btn-primary"
                v-if="isRecording"
              >
                stop recording
              </button>
              <button
                @click="audio = null"
                class="btn btn-danger me-1"
                v-if="audio"
              >
                delete
              </button>
              <a :href="audio" download class="btn btn-primary" v-if="audio">
                save audio
              </a>
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
      audio: null,
      mediaStream: null,
      recordedChunks: [],
      mediaRecorder: null,
      isRecording: false,
    };
  },
  methods: {
    record() {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
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
          type: "audio/mp4",
        });
        this.audio = URL.createObjectURL(superBuffer);
        this.mediaRecorder = null;
        this.isRecording = false;
      }, 500);
    },
    async initMedia() {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    },
    destroyStream() {
      const tracks = this.mediaStream?.getTracks();
      tracks?.map((track) => track.stop());
    },
  },
  async mounted() {
    if (!navigator.mediaDevices) {
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
