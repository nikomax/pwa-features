/* eslint-disable no-console */

import { register } from "register-service-worker";

const applicationServerPublicKey =
  "BKxg9EdKqswji-vxf8zqOCLwkLA0BT3fcmxQ1s5c-LliE1IR7Vc--7inv2uDAF-lQNoMQd5i7OWwTxlO0sJY_XM";

let isSubscribed = false;
let swRegistration = null;

// const pushButton = document.querySelector(".js-push-btn");

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(reg) {
      Notification.requestPermission(async (result) => {
        console.log("result from permission question", result);
        swRegistration = reg;

        if (result !== "granted") {
          alert("You probably do not like notifications?!");
        } else {
          reg.pushManager.getSubscription().then((subscription) => {
            isSubscribed = !(subscription === null);
            if (!isSubscribed) {
              subscribeUser();
            }
            console.log(JSON.stringify(subscription));
          });
        }
      });
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.1");
    },
    updated(reg) {
      console.log("New content is available; please refresh.");
      document.dispatchEvent(new CustomEvent("swUpdated", { detail: reg }));
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}

function updateSubscriptionOnServer(subscription) {
  if (subscription) {
    // TODO send subscription to server
    // console.log(JSON.stringify(subscription));
  } else {
    console.log("ASDfasdfasdfasdfqr wfgwsf g s");
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then(function (subscription) {
      console.log("User is subscribed.");

      updateSubscriptionOnServer(subscription);
      console.log(JSON.stringify(subscription));

      isSubscribed = true;
    })
    .catch(function (err) {
      console.log("Failed to subscribe the user: ", err);
    });
}

// function unsubscribeUser() {
//   swRegistration.pushManager
//     .getSubscription()
//     .then(function (subscription) {
//       if (subscription) {
//         return subscription.unsubscribe();
//       }
//     })
//     .catch(function (error) {
//       console.log("Error unsubscribing", error);
//     })
//     .then(function () {
//       updateSubscriptionOnServer(null);
//
//       console.log("User is unsubscribed.");
//       isSubscribed = false;
//     });
// }
