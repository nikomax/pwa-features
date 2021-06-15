import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Media from "../views/media.vue";
import Network from "../views/network.vue";
import Audio from "../views/audio.vue";
import Notifications from "../views/notifications.vue";
import Geolocation from "../views/geolocation.vue";
// import Screencapture from "../views/screencapture.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/media",
    name: "Media",
    component: Media,
  },
  // {
  //   path: "/screencapture",
  //   name: "Screen capture",
  //   component: Screencapture,
  // },
  {
    path: "/audio",
    name: "Audio",
    component: Audio,
  },
  {
    path: "/network",
    name: "Network",
    component: Network,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/geolocation",
    name: "Geolocation",
    component: Geolocation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
