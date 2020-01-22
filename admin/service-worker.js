"use strict";

self.addEventListener("push", event => {
  event.waitUntil(
    self.registration.showNotification("You Got An Order!", {
      body: event.data.text()
    })
  );
});
