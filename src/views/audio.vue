<template>
  <div class="container py-4">
    <h1 class="mb-4">Audio</h1>
    <audio ref="audio" controls src="chlorine.mp3"></audio>
    <div class="card mt-2">
      <div class="card-body">
        <h4>User actions trough device native player</h4>
        <ol>
          <li v-for="(action, index) in actions" :key="index">{{ action }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
const DEFAULT_SKIP_TIME = 10;
export default {
  data() {
    return {
      actions: [],
    };
  },
  methods: {
    updatePositionState() {
      const audio = this.$refs.audio;
      if ("setPositionState" in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          playbackRate: audio.playbackRate,
          position: audio.currentTime,
        });
      }
    },
  },
  mounted() {
    const audio = this.$refs.audio;
    // eslint-disable-next-line no-undef
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Chlorine",
      artist: "Twenty One Pilots",
      album: "Trench",
      artwork: [
        {
          src: "http://placeimg.com/96/96/any",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "http://placeimg.com/128/128/any",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "http://placeimg.com/192/192/any",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "http://placeimg.com/256/256/any",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "http://placeimg.com/384/384/any",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "http://placeimg.com/512/512/any",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
    navigator.mediaSession.setActionHandler("play", () => {
      audio.play();
      this.actions.push("> User clicked 'Play' icon.");
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      audio.pause();
      this.actions.push("> User clicked 'Pause' icon.");
    });

    navigator.mediaSession.setActionHandler("seekbackward", (event) => {
      this.actions.push('> User clicked "Seek Backward" icon.');
      const skipTime = event.seekOffset || DEFAULT_SKIP_TIME;
      audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
      this.updatePositionState();
    });

    navigator.mediaSession.setActionHandler("seekforward", (event) => {
      this.actions.push('> User clicked "Seek Forward" icon.');
      const skipTime = event.seekOffset || DEFAULT_SKIP_TIME;
      audio.currentTime = Math.min(
        audio.currentTime + skipTime,
        audio.duration
      );
      this.updatePositionState();
    });

    try {
      navigator.mediaSession.setActionHandler("seekto", (event) => {
        this.actions.push('> User clicked "Seek To" icon.');
        if (event.fastSeek && "fastSeek" in audio) {
          audio.fastSeek(event.seekTime);
          return;
        }
        audio.currentTime = event.seekTime;
        this.updatePositionState();
      });
    } catch (error) {
      console.log(
        'Warning! The "seekto" media session action is not supported.'
      );
    }

    try {
      navigator.mediaSession.setActionHandler("stop", function () {
        this.actions.push('> User clicked "Stop" icon.');
        audio.pause();
        audio.currentTime = 0;
      });
    } catch (error) {
      console.log('Warning! The "stop" media session action is not supported.');
    }

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      this.actions.push('> User clicked "Previous Track" icon.');
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      this.actions.push('> User clicked "Next Track" icon.');
    });
  },
};
</script>
