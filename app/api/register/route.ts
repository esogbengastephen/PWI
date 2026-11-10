import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NIGERIAN_STATES = new Set([
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory (Abuja)", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]);
const INTERESTS = new Set(["Young person", "Mentor or volunteer", "Partner or supporter"]);
const attempts = new Map<string, { count: number; startedAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 4;

type RegistrationPayload = {
  fullName?: unknown; email?: unknown; phone?: unknown; state?: unknown; interest?: unknown; message?: unknown; consent?: unknown; sourcePage?: unknown; company?: unknown;
};

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 16_000) return error("Please shorten your response and try again.", 413);

  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) return error("Please wait a few minutes before trying again.", 429);

  let payload: RegistrationPayload;
  try {
    payload = await request.json();
  } catch {
    return error("We could not read your registration. Please try again.", 400);
  }

  if (asText(payload.company, 200)) return NextResponse.json({ ok: true });

  const registration = {
    fullName: asText(payload.fullName, 160),
    email: asText(payload.email, 254).toLowerCase(),
    phone: asText(payload.phone, 40),
    state: asText(payload.state, 80),
    interest: asText(payload.interest, 80),
    message: asText(payload.message, 2_000),
    consent: payload.consent === true,
    sourcePage: asText(payload.sourcePage, 500) || "PWI landing website",
  };

  if (!registration.fullName || !isEmail(registration.email) || !NIGERIAN_STATES.has(registration.state) || !INTERESTS.has(registration.interest) || !registration.message || !registration.consent) {
    return error("Please complete every required field and confirm consent.", 400);
  }

  try {
    await appendToSheet(registration);
    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("Registration could not be saved", cause);
    return error("We could not save your registration right now. Please try again or contact PWI directly.", 503);
  }
}

function asText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = attempts.get(clientKey);
  if (!current || now - current.startedAt >= RATE_LIMIT_WINDOW_MS) {
    attempts.set(clientKey, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX_ATTEMPTS;
}

function error(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

async function appendToSheet(registration: { fullName: string; email: string; phone: string; state: string; interest: string; message: string; sourcePage: string }) {
  const endpoint = requiredEnv("GOOGLE_APPS_SCRIPT_WEB_APP_URL");
  const response = await fetch(
    endpoint,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        state: registration.state,
        interest: registration.interest,
        message: registration.message,
        consent: "true",
        company: "",
        sourcePage: registration.sourcePage,
      }),
    },
  );
  if (!response.ok) throw new Error(`Apps Script returned ${response.status}`);
  const result = await response.json() as { ok?: boolean };
  if (!result.ok) throw new Error("Apps Script did not accept the registration");
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
