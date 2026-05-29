import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
set,
onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

apiKey: "AIzaSyByRFJMm2xnoDG9xKX1P0PldOd1EkLnEJo",

authDomain: "myapp2-2000.firebaseapp.com",

databaseURL: "https://myapp2-2000-default-rtdb.firebaseio.com",

projectId: "myapp2-2000",

storageBucket: "myapp2-2000.firebasestorage.app"

};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// إرسال رسالة إلى ESP32
window.saveMessage = function()
{
const input =
document.getElementById("messageInput");

const status =
document.getElementById("status");

const message =
input.value.trim();

if(message === "")
{
status.innerText =
"اكتب رسالة أولاً";

return;

}

set(
ref(database,"message"),
{
text:message
}
)
.then(()=>{

status.innerText =
  "تم إرسال الرسالة";

input.value="";

})
.catch((error)=>{

status.innerText =
  error.message;

});
};

// مراقبة آخر رسالة في Firebase
onValue(
ref(database,"message/text"),
(snapshot)=>{

if(snapshot.exists())
{
  document.getElementById(
    "currentMessage"
  ).innerText =
  snapshot.val();
}
else
{
  document.getElementById(
    "currentMessage"
  ).innerText =
  "No message";
}

}
);