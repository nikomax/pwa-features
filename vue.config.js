module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_ROOT_PATH : "/",
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      navigateFallback: "index.html",
      importScripts: ["service-worker-app.js"],
    },
    themeColor: "#000000",
    appleMobileWebAppCapable: "yes",
  },
};
