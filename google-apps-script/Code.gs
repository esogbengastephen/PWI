// PWI website registration endpoint.
// The first two values must match your Google Sheet and its tab name exactly.
const SPREADSHEET_ID = "1HYj6NVoXOOhK41lCvF_jsdLu6XLzdy0xtOe3f5sWVdk";
const SHEET_NAME = "Registrations";

function doGet() {
  return json_({ ok: true, message: "PWI registration endpoint is ready." });
}

function doPost(e) {
  try {
    const fields = (e && e.parameter) || {};

    // Quietly accept bot submissions without writing them to the sheet.
    if (value_(fields.company, 120)) return json_({ ok: true });

    const registration = {
      fullName: value_(fields.fullName, 160),
      email: value_(fields.email, 254).toLowerCase(),
      phone: value_(fields.phone, 40),
      state: value_(fields.state, 100),
      interest: value_(fields.interest, 100),
      message: value_(fields.message, 2000),
      consent: String(fields.consent || "") === "true",
      sourcePage: value_(fields.sourcePage, 500) || "PWI website",
    };

    if (
      !registration.fullName ||
      !validEmail_(registration.email) ||
      !registration.state ||
      !registration.interest ||
      !registration.message ||
      !registration.consent
    ) {
      return json_({ ok: false, message: "Please complete every required field." });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Missing sheet tab: ' + SHEET_NAME);

    // A lock prevents simultaneous submissions from colliding.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        sheetValue_(registration.fullName),
        sheetValue_(registration.email),
        sheetValue_(registration.phone),
        sheetValue_(registration.state),
        sheetValue_(registration.interest),
        sheetValue_(registration.message),
        "Yes",
        sheetValue_(registration.sourcePage),
      ]);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true, message: "Registration saved." });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return json_({ ok: false, message: "Unable to save registration. Please try again." });
  }
}

function value_(input, maxLength) {
  return String(input || "").trim().slice(0, maxLength);
}

function validEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sheetValue_(value) {
  // Prevent a submitted value beginning with =, +, - or @ from becoming a formula.
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
