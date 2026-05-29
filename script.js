import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyByRFJMm2xnoDG9xKX1P0PldOd1EkLnEJo",
  authDomain: "myapp2-2000.firebaseapp.com",
  databaseURL: "https://myapp2-2000-default-rtdb.firebaseio.com",
  projectId: "myapp2-2000",
  storageBucket: "myapp2-2000.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let lastFirebaseValue = "";
let showSendingMessage = false;

// =====================================
// إرسال رسالة إلى ESP32
// =====================================
window.saveMessage = function () {

  const input = document.getElementById("messageInput");
  const status = document.getElementById("status");

  const message = input.value.trim();

  if (message === "") {
    status.innerText = "اكتب == رسالة أولاً";
    return;
  }

  showSendingMessage = true;

  set(
    ref(database, "message"),
    {
      text: message
    }
  )
  .then(() => {

    status.innerText = "تم إرسال الرسالة";

    input.value = "";

    setTimeout(() => {

      showSendingMessage = false;

      status.innerText =
        "القيمة الحالية: " + lastFirebaseValue;

    }, 3000);

  })
  .catch((error) => {

    showSendingMessage = false;

    status.innerText =
      "خطأ: " + error.message;

  });
};

// =====================================
// مراقبة Firebase مباشرة
// =====================================
onValue(
  ref(database, "message/text"),
  (snapshot) => {

    if (snapshot.exists()) {

      lastFirebaseValue = snapshot.val();

      document.getElementById(
        "currentMessage"
      ).innerText = lastFirebaseValue;

      if (!showSendingMessage) {

        document.getElementById(
          "status"
        ).innerText =
          "القيمة الحالية: " +
          lastFirebaseValue;
      }

    } else {

      document.getElementById(
        "currentMessage"
      ).innerText =
        "No message";

      if (!showSendingMessage) {

        document.getElementById(
          "status"
        ).innerText =
          "لا توجد رسالة";
      }
    }
  }
);
