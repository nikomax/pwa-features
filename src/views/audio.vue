<template>
  <div class="container py-4">
    <h1 class="mb-4">Audio</h1>
    <audio ref="audio" controls src="chlorine.mp3"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
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
      this.$refs.audio.play();
      console.log("> User clicked 'Play' icon.");
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      this.$refs.audio.pause();
      console.log("> User clicked 'Pause' icon.");
    });
  },
};
</script>
