"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setMessage("Please complete the required fields before registering your interest.");
      return;
    }

    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      state: String(formData.get("state") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      company: String(formData.get("company") ?? ""),
      sourcePage: window.location.href,
    };
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not save your registration.");
      form.reset();
      setMessage("Thank you — PWI has received your registration.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not send your registration. Please try again or contact PWI directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to registration form</a>
      <header className="site-header">
        <nav className="container nav" aria-label="Primary navigation">
          <a className="wordmark" href="/" aria-label="Promise Wesley Initiative home"><span className="wordmark-mark" aria-hidden="true">PWI</span><span>Promise Wesley<br />Initiative</span></a>
          <div className="nav-links">
            <a href="/#top">Home</a><a href="/#about">About</a><a href="/#building">What we&apos;re building</a><a href="/#involved">Get involved</a>
            <a className="nav-register" href="/register" aria-current="page">Register <span aria-hidden="true">↗</span></a>
            <a className="nav-contact" href="/#contact">Contact us <span aria-hidden="true">↗</span></a>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Open navigation menu"><span></span><span></span></summary>
            <div className="mobile-menu-panel"><a href="/#top">Home</a><a href="/#about">About</a><a href="/#building">What we&apos;re building</a><a href="/#involved">Get involved</a><a href="/register" aria-current="page">Register your interest <span aria-hidden="true">↗</span></a><a href="/#contact">Contact us <span aria-hidden="true">↗</span></a></div>
          </details>
        </nav>
      </header>

      <main id="main" className="register-shell">
        <div className="container register-grid">
          <section className="register-intro" aria-labelledby="register-heading">
            <p className="eyebrow"><span></span> PWI / Register</p>
            <h1 id="register-heading">Start with<br /><em>your next step.</em></h1>
            <p>Tell PWI a little about yourself and the kind of opportunity you would like to explore. We are building the next steps carefully, with young people and community at the centre.</p>
            <div className="register-detail"><strong>What this is for</strong><span>Interest in future learning, guidance, volunteering, partnership, and community opportunities.</span></div>
          </section>

          <form className="contact-form registration-form" onSubmit={handleSubmit} noValidate>
            <input className="form-honeypot" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-row"><div className="field"><label htmlFor="full-name">Full name <b>*</b></label><input id="full-name" name="fullName" autoComplete="name" required placeholder="Your full name" /></div><div className="field"><label htmlFor="registration-email">Email address <b>*</b></label><input id="registration-email" name="email" type="email" autoComplete="email" spellCheck={false} required placeholder="you@example.com" /></div></div>
            <div className="form-row"><div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your phone number" /></div><div className="field"><label htmlFor="nigerian-state">State of residence <b>*</b></label><select id="nigerian-state" name="state" autoComplete="address-level1" required defaultValue=""><option value="" disabled>Select your state</option><option>Abia</option><option>Adamawa</option><option>Akwa Ibom</option><option>Anambra</option><option>Bauchi</option><option>Bayelsa</option><option>Benue</option><option>Borno</option><option>Cross River</option><option>Delta</option><option>Ebonyi</option><option>Edo</option><option>Ekiti</option><option>Enugu</option><option>Federal Capital Territory (Abuja)</option><option>Gombe</option><option>Imo</option><option>Jigawa</option><option>Kaduna</option><option>Kano</option><option>Katsina</option><option>Kebbi</option><option>Kogi</option><option>Kwara</option><option>Lagos</option><option>Nasarawa</option><option>Niger</option><option>Ogun</option><option>Ondo</option><option>Osun</option><option>Oyo</option><option>Plateau</option><option>Rivers</option><option>Sokoto</option><option>Taraba</option><option>Yobe</option><option>Zamfara</option></select></div></div>
            <div className="field"><label htmlFor="registration-interest">I&apos;m registering as <b>*</b></label><select id="registration-interest" name="interest" required defaultValue=""><option value="" disabled>Choose one</option><option>Young person</option><option>Mentor or volunteer</option><option>Partner or supporter</option></select></div>
            <div className="field"><label htmlFor="registration-message">What would you like to explore? <b>*</b></label><textarea id="registration-message" name="message" required rows={4} placeholder="Tell us a little about the kind of support, opportunity, or conversation you are looking for."></textarea></div>
            <label className="consent-field" htmlFor="consent"><input id="consent" name="consent" type="checkbox" required /><span>I agree that PWI may contact me about future opportunities and updates.</span></label>
            <p className="draft-notice">Please do not add sensitive personal information. PWI will only use these details to respond about future opportunities and updates.</p>
            <p className="form-message" role="status" aria-live="polite">{message}</p>
            <button className="button button-gold" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? "Sending…" : <>Register your interest <span aria-hidden="true">→</span></>}</button>
          </form>
        </div>
      </main>

      <footer className="footer"><div className="container footer-inner"><a className="footer-brand" href="/">Promise Wesley Initiative <span>Grow Forward.</span></a><div className="footer-social" aria-label="Promise Wesley Initiative social links"><p className="footer-label">Find PWI online</p><div className="social-links"><a className="social-link" href="https://linkedin.com/company/promise-wesley-initiative" target="_blank" rel="noreferrer" aria-label="PWI on LinkedIn — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/linkedin/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">LinkedIn</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://www.facebook.com/share/1Khteg1sDc/" target="_blank" rel="noreferrer" aria-label="PWI on Facebook — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/facebook/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">Facebook</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://www.instagram.com/promisewesleyinitiative?exln=emd6NTFmcjA2NDRt" target="_blank" rel="noreferrer" aria-label="PWI on Instagram — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/instagram/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">Instagram</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://www.tiktok.com/@promise.wesley.in?_r=1&amp;_t=ZS-9AkhpwTmJIQ" target="_blank" rel="noreferrer" aria-label="PWI on TikTok — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/tiktok/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">TikTok</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://x.com/PW_Initiative" target="_blank" rel="noreferrer" aria-label="PWI on X — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/x/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">X</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://youtube.com/@promisewesleyinitiative?si=YUbobHiWBoMoceSr" target="_blank" rel="noreferrer" aria-label="PWI on YouTube — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/youtube/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">YouTube</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://wa.me/2348022712478" target="_blank" rel="noreferrer" aria-label="Message PWI on WhatsApp — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/whatsapp/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">WhatsApp</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="mailto:Promisewesleyinitiative@gmail.com"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"></rect><path d="m4 7 8 6 8-6"></path></svg><span className="social-name">Email</span><span className="social-arrow" aria-hidden="true">↗</span></a></div></div><p>© {new Date().getFullYear()} PWI. Draft landing page.</p></div></footer>
    </>
  );
}
