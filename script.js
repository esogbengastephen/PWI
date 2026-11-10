/*
  Entrance storyboard
  000ms — navigation arrives
  100ms — PWI marker and statement appear
  260ms — context and actions settle in
  430ms — identity mark and page index complete the scene
*/
const TIMING = Object.freeze({
  marker: 100,
  context: 260,
  identity: 430,
});

const form = document.querySelector("#contact-form");
const message = document.querySelector("#form-message");
const root = document.body;
let stage = 0;

const advanceTo = (nextStage) => {
  stage = Math.max(stage, nextStage);
  root.dataset.stage = String(stage);
};

document.querySelector("#year").textContent = new Date().getFullYear();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  advanceTo(3);
} else {
  window.setTimeout(() => advanceTo(1), TIMING.marker);
  window.setTimeout(() => advanceTo(2), TIMING.context);
  window.setTimeout(() => advanceTo(3), TIMING.identity);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    message.textContent = "Please complete the required fields before sending your enquiry.";
    return;
  }
  message.textContent = "Draft form ready — contact routing will be connected once PWI details are confirmed.";
});
