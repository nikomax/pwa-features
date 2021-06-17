<template>
  <div class="container py-4">
    <h1 class="mb-4">Web sharing</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else>
      <div class="form-floating mb-4">
        <input class="form-control" id="floatingText1" v-model="title" />
        <label for="floatingText1">Title</label>
      </div>
      <div class="form-floating mb-4">
        <input class="form-control" id="floatingText2" v-model="text" />
        <label for="floatingText2">Text</label>
      </div>
      <div class="form-floating mb-4">
        <input class="form-control" id="floatingText3" v-model="url" />
        <label for="floatingText3">Url</label>
      </div>
      <div v-if="filesSupport" class="mb-4">
        <label for="formFile" class="form-label">Files</label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="setFiles"
          multiple
        />
      </div>
      <button class="btn btn-primary" @click="share">Share</button>
      <p v-if="result" class="mt-4">{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: true,
      filesSupport: false,
      title: "Title example",
      text: "Text example",
      url: "https://pwa-features.github.io/",
      result: "",
      filesArray: null,
    };
  },
  methods: {
    setFiles(e) {
      this.filesArray = e.target.files || e.dataTransfer.files;
    },
    async share() {
      const { title, text, url } = this;
      const data = { title, text, url };
      this.filesSupport && (data.files = this.filesArray);
      try {
        await navigator.share(data);
        this.result = "Data shared successfully";
      } catch (err) {
        this.result = "Error: " + err;
      }
    },
  },
  created() {
    if (!navigator.share) {
      this.supported = false;
      return;
    }
    if (
      navigator.canShare &&
      navigator.canShare({
        files: [
          new File(["foo"], "foo.txt", {
            type: "text/plain",
          }),
        ],
      })
    ) {
      this.filesSupport = true;
    }
  },
};
</script>
