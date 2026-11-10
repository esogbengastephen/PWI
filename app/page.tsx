"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const TIMING = Object.freeze({
  marker: 100,
  context: 260,
  identity: 430,
});

export default function Home() {
  const [stage, setStage] = useState(0);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const root = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setStage(3);
      return;
    }

    const marker = window.setTimeout(() => setStage(1), TIMING.marker);
    const context = window.setTimeout(() => setStage(2), TIMING.context);
    const identity = window.setTimeout(() => setStage(3), TIMING.identity);

    return () => {
      window.clearTimeout(marker);
      window.clearTimeout(context);
      window.clearTimeout(identity);
      root.dataset.stage = "0";
    };
  }, []);

  useEffect(() => {
    document.body.dataset.stage = String(stage);
  }, [stage]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setFormMessage("Please complete the required fields before sending your enquiry.");
      return;
    }

    setFormMessage(
      "Draft form ready — contact routing will be connected once PWI details are confirmed.",
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header entrance-nav">
        <nav className="container nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Promise Wesley Initiative home">
            <span className="wordmark-mark" aria-hidden="true">PWI</span>
            <span>Promise Wesley<br />Initiative</span>
          </a>
          <div className="nav-links">
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#building">What we&apos;re building</a>
            <a href="#involved">Get involved</a>
            <a className="nav-register" href="/register">Register <span aria-hidden="true">↗</span></a>
            <a className="nav-contact" href="#contact">Contact us <span aria-hidden="true">↗</span></a>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Open navigation menu"><span></span><span></span></summary>
            <div className="mobile-menu-panel">
              <a href="#top">Home</a>
              <a href="#about">About</a>
              <a href="#building">What we&apos;re building</a>
              <a href="#involved">Get involved</a>
              <a href="/register">Register your interest <span aria-hidden="true">↗</span></a>
              <a href="#contact">Contact us <span aria-hidden="true">↗</span></a>
            </div>
          </details>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-orb hero-orb-one" aria-hidden="true"></div>
          <div className="hero-orb hero-orb-two" aria-hidden="true"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker"><span></span> Promise Wesley Initiative</p>
              <h1 className="hero-title">Grow forward,<br /><em>with purpose.</em></h1>
              <p className="hero-intro hero-body">A youth-development initiative building practical pathways for young people to learn, lead, contribute, and move forward with confidence.</p>
              <div className="hero-actions hero-cta">
                <a className="button button-gold" href="#contact">Start a conversation <span aria-hidden="true">→</span></a>
                <a className="text-link on-dark" href="#about">Discover PWI <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className="hero-art" aria-label="Promise Wesley Initiative logo">
              <div className="orbit orbit-outer" aria-hidden="true"></div>
              <div className="orbit orbit-inner" aria-hidden="true"></div>
              <div className="logo-panel">
                <Image src="/brand-assets/pwi-yellow-people-crown-logo.png" alt="Promise Wesley Initiative logo" width={1254} height={1254} priority />
              </div>
              <p className="art-caption">Potential deserves a real next step.</p>
            </div>
          </div>
          <div className="container hero-footnote hero-footnote-animated">
            <p>Purpose <i></i> Practical skills <i></i> Community <i></i> Opportunity</p>
            <a href="#about" aria-label="Scroll to About PWI">Scroll to explore <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="arc-feature" aria-labelledby="arc-heading">
          <div className="container">
            <div className="arc-feature-intro">
              <div>
                <p className="eyebrow eyebrow-dark"><span></span> Featured / ARC ’27</p>
                <h2 id="arc-heading">African Redefined Conference.</h2>
              </div>
              <p>Looking beyond the walls—toward creativity, mindshift, discipline, and a more global perspective.</p>
            </div>
            <figure className="arc-poster">
              <Image src="/events/african-redefined-conference-arc27.png" alt="African Redefined Conference ARC ’27 poster for 1.0 — Barracks Redefined, featuring the theme Looking Beyond the Walls, Think Global." width={1672} height={941} sizes="(max-width: 1180px) calc(100vw - 48px), 1180px" />
              <figcaption><span>ARC ’27</span><span>1.0 — Barracks Redefined</span></figcaption>
            </figure>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container section-grid">
            <div>
              <p className="eyebrow eyebrow-dark"><span></span> 01 / About PWI</p>
              <h2>A place for ambition to become practical progress.</h2>
            </div>
            <div className="about-copy">
              <p className="lead">PWI is building a youth-development community for people navigating education, work, leadership, and the choices that shape their futures.</p>
              <p>We believe potential is everywhere. Access, encouragement, and consistent action are what help it grow. Our role is to make the next move clearer—and more possible.</p>
              <a className="text-link" href="#building">How PWI is building this <span aria-hidden="true">→</span></a>
              <aside className="belief"><span>Our belief</span><q>Potential is everywhere.</q></aside>
            </div>
          </div>
          <div className="container principle-grid" aria-label="PWI principles">
            <article><span>01</span><h3>Purpose</h3><p>Growth is strongest when it has direction and meaning.</p></article>
            <article><span>02</span><h3>Possibility</h3><p>A starting point does not define what someone can build.</p></article>
            <article><span>03</span><h3>Community</h3><p>Progress grows through connection, generosity, and contribution.</p></article>
          </div>
        </section>

        <section id="building" className="section building">
          <div className="container building-header">
            <p className="eyebrow"><span></span> 02 / What we&apos;re building</p>
            <h2>Clearer pathways.<br />Useful support.<br /><em>Meaningful futures.</em></h2>
          </div>
          <div className="container pathway-list">
            <article className="pathway"><span className="pathway-number">01</span><div><h3>Learn what matters</h3><p>Practical learning that helps young people build useful skills, habits, and confidence.</p></div><span className="pathway-symbol" aria-hidden="true">⌁</span></article>
            <article className="pathway"><span className="pathway-number">02</span><div><h3>Find guidance and direction</h3><p>Encouragement, useful perspectives, and clearer next steps for the road ahead.</p></div><span className="pathway-symbol" aria-hidden="true">↗</span></article>
            <article className="pathway"><span className="pathway-number">03</span><div><h3>Move together</h3><p>A community where young people, mentors, and supporters can share access and opportunity.</p></div><span className="pathway-symbol" aria-hidden="true">◌</span></article>
          </div>
        </section>

        <section id="involved" className="section involved">
          <div className="container involved-card">
            <div className="involved-copy"><p className="eyebrow eyebrow-dark"><span></span> 03 / Get involved</p><h2>Progress becomes more possible when we move together.</h2></div>
            <div className="involved-actions"><p>Whether you are a young person looking for direction or someone ready to share knowledge, access, or encouragement, there is room to begin a conversation.</p><a className="button button-dark" href="#contact">Talk to PWI <span aria-hidden="true">→</span></a></div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-grid">
            <div className="contact-intro"><p className="eyebrow"><span></span> 04 / Contact</p><h2>Let’s make the next step visible.</h2><p>Tell us how you would like to connect. Contact routing and direct details will be added when confirmed.</p><div className="contact-note"><span aria-hidden="true">✦</span> Contact details coming soon</div></div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field"><label htmlFor="name">Your name <b>*</b></label><input id="name" name="name" autoComplete="name" required placeholder="Your name" /></div>
                <div className="field"><label htmlFor="email">Email address <b>*</b></label><input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required placeholder="you@example.com" /></div>
              </div>
              <div className="field"><label htmlFor="interest">I&apos;m reaching out as <b>*</b></label><select id="interest" name="interest" required defaultValue=""><option value="" disabled>Choose one</option><option>Young person</option><option>Mentor or volunteer</option><option>Partner or supporter</option><option>General enquiry</option></select></div>
              <div className="field"><label htmlFor="message">Your message <b>*</b></label><textarea id="message" name="message" required rows={4} placeholder="How would you like to connect?"></textarea></div>
              <p className="form-message" role="status" aria-live="polite">{formMessage}</p>
              <button className="button button-gold" type="submit">Send enquiry <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><a className="footer-brand" href="#top">Promise Wesley Initiative <span>Grow Forward.</span></a><div className="footer-social" aria-label="Promise Wesley Initiative social links"><p className="footer-label">Find PWI online</p><div className="social-links"><a className="social-link" href="https://linkedin.com/company/promise-wesley-initiative" target="_blank" rel="noreferrer" aria-label="PWI on LinkedIn — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/linkedin/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">LinkedIn</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://www.facebook.com/share/1Khteg1sDc/" target="_blank" rel="noreferrer" aria-label="PWI on Facebook — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/facebook/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">Facebook</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://www.instagram.com/promisewesleyinitiative?exln=emd6NTFmcjA2NDRt" target="_blank" rel="noreferrer" aria-label="PWI on Instagram — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/instagram/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">Instagram</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://www.tiktok.com/@promise.wesley.in?_r=1&amp;_t=ZS-9AkhpwTmJIQ" target="_blank" rel="noreferrer" aria-label="PWI on TikTok — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/tiktok/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">TikTok</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://x.com/PW_Initiative" target="_blank" rel="noreferrer" aria-label="PWI on X — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/x/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">X</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://youtube.com/@promisewesleyinitiative?si=YUbobHiWBoMoceSr" target="_blank" rel="noreferrer" aria-label="PWI on YouTube — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/youtube/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">YouTube</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="https://wa.me/2348022712478" target="_blank" rel="noreferrer" aria-label="Message PWI on WhatsApp — opens in a new tab"><img className="social-icon" src="https://cdn.simpleicons.org/whatsapp/F5A000" alt="" aria-hidden="true" width="15" height="15" /><span className="social-name">WhatsApp</span><span className="social-arrow" aria-hidden="true">↗</span></a><a className="social-link" href="mailto:Promisewesleyinitiative@gmail.com"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"></rect><path d="m4 7 8 6 8-6"></path></svg><span className="social-name">Email</span><span className="social-arrow" aria-hidden="true">↗</span></a></div></div><p>© {new Date().getFullYear()} PWI. Draft landing page.</p></div></footer>
    </>
  );
}
