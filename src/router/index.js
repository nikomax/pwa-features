import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Media from "@/views/media.vue";
import Network from "@/views/network.vue";
import Audio from "@/views/audio.vue";
import Notifications from "@/views/notifications.vue";
import Geolocation from "@/views/geolocation.vue";
import Vibration from "@/views/vibration.vue";
import Screencapture from "@/views/screencapture.vue";
import AudioRecording from "@/views/audio-recording.vue";
import SpeechSynthesis from "@/views/speech-synthesis.vue";
import SpeechRecognition from "@/views/speech-recognition.vue";
import WakeLock from "@/views/wake-lock.vue";
import Sharing from "@/views/sharing.vue";
import Contacts from "@/views/contacts.vue";
import DeviceOrientation from "@/views/device-orientation.vue";

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
  {
    path: "/vibration",
    name: "Vibration",
    component: Vibration,
  },
  {
    path: "/screencapture",
    name: "Screen capture(Desktop only)",
    component: Screencapture,
  },
  {
    path: "/audio-recording",
    name: "Audio recording ",
    component: AudioRecording,
  },
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
  {
    path: "/speech-synthesis",
    name: "Speech synthesis",
    component: SpeechSynthesis,
  },
  {
    path: "/speech-recognition",
    name: "Speech recognition",
    component: SpeechRecognition,
  },
  {
    path: "/wake-lock",
    name: "Wake lock",
    component: WakeLock,
  },
  {
    path: "/sharing",
    name: "Web sharing",
    component: Sharing,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/device-orientation",
    name: "Device orientation",
    component: DeviceOrientation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
