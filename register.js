const form = document.querySelector("#registration-form");
const message = document.querySelector("#registration-message-status");
const submitButton = form.querySelector('button[type="submit"]');
const initialButtonLabel = submitButton.innerHTML;

document.querySelector("#year").textContent = new Date().getFullYear();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    message.textContent = "Please complete the required fields before registering your interest.";
    return;
  }

  const endpoint = window.PWI_REGISTRATION_ENDPOINT?.trim();

  if (!endpoint) {
    message.textContent = "Registrations are not live yet. Please try again later or contact PWI directly.";
    return;
  }

  const payload = new URLSearchParams(new FormData(form));
  payload.set("consent", "true");
  payload.set("sourcePage", window.location.href);

  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");
  submitButton.textContent = "Sending…";
  message.textContent = "";

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: payload.toString(),
    });
    form.reset();
    message.textContent = "Thank you — PWI has received your registration.";
  } catch (error) {
    message.textContent = "We could not send your registration. Please try again or contact PWI directly.";
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
    submitButton.innerHTML = initialButtonLabel;
  }
});
