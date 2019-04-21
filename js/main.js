var webPush = require("web-push");
var pushSubscription = {
  endpoint:
    "https://android.googleapis.com/gcm/send/dBNHdDrTsLM:APA91bG77dy0_j4X1_Mu7tsVtQgHWJLUsIt_ccaMvGcaUnNSq3MS_WGxB-RDTB7WOu10HiaA4sdVhyMgUN9euLZFZ0WwImMUFR5UWgAiDJvSmBQ3KElESvGwr7N9pe4tsAg0CP4UJ3_Z",
  keys: {
    p256dh:
      "BBpYBkQmN00Uc021o1hgnywXUUG4iYY7eDEtDNffwRZoHTpXJ2rvZqTkQFuA1HO9NDJUXbWu5WjYKjnu+inbv9o=",
    auth: "i6b3V703/46g+gVYpMeCOQ=="
  }
};
var payload = "Here is a payload!";
var options = {
  gcmAPIKey:
    "AAAAyAjpQ9c:APA91bFSLfGZyYxc2f4IVSHGiMl2a55mBSnRnBG6yTDX0DrHNF8LgYeKiNgpPcubnlr2du9PCljbKx9xNpSLsDehawlO1gzhmyf7iJ8neYHPgyLTCruuQZOCpqLc-ggfdKFdOpKdOup2",
  TTL: 60
};
webPush.sendNotification(pushSubscription, payload, options);
