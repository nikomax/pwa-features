<template>
  <div class="container py-4">
    <h1 class="mb-4">Speech synthesis</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else class="card mt-2 shadow">
      <div class="card-body">
        <div class="form-floating mb-4">
          <textarea class="form-control" id="floatingText" v-model="text" />
          <label for="floatingText">Text</label>
        </div>
        <select class="form-select mb-4" v-model="voice">
          <option v-for="voice in voices" :key="voice.voiceURI" :value="voice">
            {{ voice.name }} / {{ voice.lang }}
          </option>
        </select>
        <div class="mb-4">
          <label for="customRange1" class="form-label">Pitch {{ pitch }}</label>
          <input
            type="range"
            class="form-range"
            id="customRange1"
            min="0"
            max="2"
            step="0.25"
            v-model.number="pitch"
          />
        </div>
        <div class="mb-4">
          <label for="customRange2" class="form-label">Rate {{ rate }}</label>
          <input
            type="range"
            class="form-range"
            id="customRange2"
            min="0.25"
            max="2"
            step="0.25"
            v-model.number="rate"
          />
        </div>
        <button class="btn btn-primary" @click="speak">speak</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: true,
      text: "Everybody dance now",
      pitch: 1,
      rate: 1,
      voices: [],
      voice: null,
    };
  },
  methods: {
    speak() {
      const utterance = new SpeechSynthesisUtterance(this.text);
      utterance.pitch = this.pitch;
      utterance.rate = this.rate;
      utterance.voice = this.voice;
      speechSynthesis.speak(utterance);
    },
    setVoices() {
      this.voices = speechSynthesis.getVoices();
      this.voice = this.voices[0];
    },
  },
  created() {
    if (!SpeechSynthesisUtterance) {
      this.supported = false;
      return;
    }
    this.setVoices();
    speechSynthesis.onvoiceschanged = () => {
      this.setVoices();
    };
  },
};
</script>
