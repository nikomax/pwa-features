<template>
  <div class="container py-4">
    <h1 class="mb-4">Notifications</h1>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="form-floating mb-4">
          <input class="form-control" id="floatingText" v-model="title" />
          <label for="floatingText">Notification title</label>
        </div>
        <div class="form-floating mb-4">
          <textarea
            class="form-control"
            id="floatingTextarea"
            v-model="msg"
          ></textarea>
          <label for="floatingTextarea">Notification text</label>
        </div>
        <button class="btn btn-primary" @click="sendNotification">
          send notification
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      title: "",
    };
  },
  methods: {
    async sendNotification() {
      const reg = await navigator.serviceWorker.getRegistration();
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          const notifyTitle = this.title;
          const notifyBody = this.msg;
          const notifyImg = "";
          const options = {
            body: notifyBody,
            icon: notifyImg,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
          };
          reg.showNotification(notifyTitle, options);
        }
      });
    },
  },
};
</script>
