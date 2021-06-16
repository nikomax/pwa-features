<template>
  <div class="container py-4">
    <h1 class="mb-4">Speech recognition</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else class="card mt-2 shadow">
      <div class="card-body">
        <button
          v-if="!recognizing"
          class="btn btn-primary mb-4"
          @click="recognize"
        >
          Start recognition
        </button>
        <button v-else class="btn btn-primary mb-4" @click="recognizeStop">
          Stop
        </button>
        <div class="form-floating">
          <textarea
            class="form-control"
            id="floatingText"
            v-model="text"
            style="height: 140px"
          />
          <label for="floatingText">Text</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
export default {
  data() {
    return {
      supported: true,
      text: "",
      recognizing: false,
      recognition: null,
    };
  },
  methods: {
    recognize() {
      this.recognition.start();
      this.recognizing = true;
    },
    recognizeStop() {
      this.recognition.stop();
      this.recognizing = false;
    },
  },
  created() {
    if (!SpeechRecognition) {
      this.supported = false;
      return;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.onend = () => {
      this.recognizing = false;
    };
    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.text += event.results[i][0].transcript;
        }
      }
    };
  },
};
</script>
