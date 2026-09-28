"use client";

import { type FormEvent, useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    category: "Product platform",
    name: "Productify",
    description:
      "A product-led landing experience built to clarify value quickly, improve confidence, and support conversion through cleaner UX and better visual hierarchy.",
    tags: ["Frontend", "Responsive UI", "Product Design"],
    preview: "product",
    href: "https://productivy.netlify.app/",
  },
  {
    number: "02",
    category: "Community platform",
    name: "Black Literacy Code",
    description:
      "A community-driven experience designed to spotlight creators and culture while making content discovery and storytelling more accessible and engaging.",
    tags: ["Community", "Content", "UX Design"],
    preview: "literacy",
    href: "https://blackliteracycode.netlify.app/",
  },
  {
    number: "03",
    category: "Banking website",
    name: "UBA Clone",
    description:
      "A clone of the UBA banking website focused on bringing the same brand experience, layout structure, and user flow into a responsive front-end build.",
    tags: ["Finance", "Banking UI", "Responsive Web"],
    preview: "banking",
    href: "https://ubaclone.netlify.app/",
  },
  {
    number: "04",
    category: "Data experience",
    name: "Zoology Animal Club",
    description:
      "A data-rich biodiversity dashboard built to transform complex information into a more discoverable, educational, and visually compelling research experience.",
    tags: ["Data Visuals", "Research", "Dashboard"],
    preview: "zoology",
    href: "https://zac-5aj7.vercel.app/",
  },
  {
    number: "05",
    category: "Social automation",
    name: "Quixess Social Hub",
    description:
      "A social media automation platform experience built to present the product clearly, support user trust, and create a polished conversion-focused landing flow.",
    tags: ["Automation", "Social Growth", "Web App"],
    preview: "social",
    href: "https://social.quixess.com/",
  },
];

function Arrow() {
  return <span className="arrow" aria-hidden="true">{"\u2197"}</span>;
}

function ThemeIcon({ dark }: { dark: boolean }) {
  if (dark) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2m-3.64-5.36 1.41-1.41M5.22 18.78l1.41-1.41m0-10.72L5.22 5.24m13.56 13.54-1.41-1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
    </svg>
  );
}

function ProjectPreview({ variant, name }: { variant: string; name: string }) {
  return (
    <div className="project-preview" aria-label={`${name} website screenshot`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/preview-${variant}.png`}
        alt={`${name} website preview`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [counts, setCounts] = useState({ projects: 0, years: 0 });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme ? savedTheme === "dark" : true;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  // reveal on scroll â€” triggers early (6% visible)
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // animated counters
  useEffect(() => {
    const targets = { projects: 5, years: 3 };
    const duration = 1800;
    let started = false;
    const el = document.querySelector(".stats-section");
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        function tick(now: number) {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCounts({
            projects: Math.round(targets.projects * ease),
            years:    Math.round(targets.years    * ease),
          });
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function toggleTheme() {
    const nextTheme = !dark;
    setDark(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme ? "dark" : "light");
    document.documentElement.style.colorScheme = nextTheme ? "dark" : "light";
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  }
  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString().trim() || "Portfolio visitor";
    const email = form.get("email")?.toString().trim() || "Not provided";
    const message = form.get("message")?.toString().trim() || "";

    setFormStatus("Opening your email app...");
    window.location.href = `mailto:ahmadtech20@gmail.com?subject=${encodeURIComponent(
      `Portfolio enquiry from ${name}`,
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  }

  return (
    <main>
      <a href="#top" className="skip-to-content">Skip to main content</a>
      <header className="nav-header">
        <nav className="nav shell">
          <a className="logo" href="#top" aria-label="Ahmad El-Ashraf home">
            <span className="logo-box">AE</span>
            <span className="logo-name">Ahmad El-Ashraf</span>
          </a>
          <div className={menuOpen ? "nav-links open" : "nav-links"}>
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <div className="nav-actions">
            <a className="nav-cta" href="#contact">Start a project {"\u2197"}</a>
            <button
              className="theme"
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <ThemeIcon dark={dark} />
            </button>
            <button
              className={menuOpen ? "menu open" : "menu"}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              <span className="hamburger">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <section id="top" className="hero reveal is-visible">
        <div className="hero-inner">
          <p className="eyebrow"><i /> Available for frontend projects</p>
          <h1>
          Design-led digital products.
          <br />
          <em>Built to convert.</em>
        </h1>
        <p className="hero-intro">
          Iâ€™m Ahmad Mohammad El-Ashraf, a frontend developer creating fast,
          polished, and conversion-focused web experiences for startups, brands,
          and digital products.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            View selected work <Arrow />
          </a>
          <a className="button button-secondary" href="mailto:ahmadtech20@gmail.com">
            Email me
          </a>
        </div>
        <div className="hero-footer">
          <p>
            React, Next.js, responsive UI systems, and product experiences
            designed to move users toward action.
          </p>
          <a className="round-link" href="#work" aria-label="Explore selected work">
            {"\u2193"}
          </a>
        </div>
        </div>
      </section>

      <section className="marquee" aria-label="Technical skills">
        <div>
          <span>JavaScript</span><i>*</i>
          <span>React</span><i>*</i>
          <span>Next.js</span><i>*</i>
          <span>Tailwind CSS</span><i>*</i>
          <span>REST APIs</span><i>*</i>
          <span>Responsive Design</span><i>*</i>
          <span>JavaScript</span><i>*</i>
          <span>React</span><i>*</i>
          <span>Next.js</span>
        </div>
      </section>

      <section id="work" className="work">
        <div className="shell">
          <div className="section-heading reveal">
            <p className="eyebrow">Project archive</p>
            <p>(05 projects)</p>
          </div>
          <div className="work-intro">
            <h2 className="reveal-left">Selected work</h2>
            <p className="reveal-right">
              Interface work focused on clarity, product intent, and user
              conversion across web projects.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project reveal" key={project.name}>
                <ProjectPreview variant={project.preview} name={project.name} />
                <div className="project-info">
                  <div>
                    <span className="project-category">
                      {project.number} / {project.category}
                    </span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={project.href}
                    aria-label={`View ${project.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ RESULTS â”€â”€ */}
      <section className="stats-section">
        <div className="shell">
          <div className="stats-top reveal-left">
            <p className="eyebrow">By the numbers</p>
            <h2>Results that speak<br /><em>for themselves.</em></h2>
          </div>
          <div className="stats-grid reveal-scale">
            <div className="stat-item">
              <span className="stat-num">{counts.projects}<sup>+</sup></span>
              <span className="stat-label">Projects shipped</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{counts.years}<sup>+</sup></span>
              <span className="stat-label">Years building</span>
            </div>
          </div>
          <div className="value-cards">
            <div className="value-card reveal-left">
              <span className="vc-num">01</span>
              <h3>Conversion-first UI</h3>
              <p>Built around clarity, trust, and faster product understanding â€” helping users act with confidence.</p>
            </div>
            <div className="value-card reveal">
              <span className="vc-num">02</span>
              <h3>Responsive by default</h3>
              <p>Designed for real-world browsing â€” pixel-perfect across desktop, tablet, and mobile without compromise.</p>
            </div>
            <div className="value-card reveal-right">
              <span className="vc-num">03</span>
              <h3>Reusable systems</h3>
              <p>Component patterns and structured layouts that make future iterations faster, cleaner, and easier to scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ TECHNICAL PROFILE â”€â”€ */}
      <section id="about" className="about">
        <div className="shell">
          <div className="about-header">
            <p className="eyebrow reveal-left">Technical profile</p>
            <div className="about-header-grid">
              <h2 className="reveal-left">Building clear, scalable<br /><em>front-end</em> experiences.</h2>
              <div className="about-copy reveal-right">
              <p>I'm Ahmad Mohammad El-Ashraf, a frontend developer focused on building clean, responsive, and product-minded interfaces that feel easy to use and strong on performance.</p>
              <p>I translate design concepts into maintainable UI systems, connect front-end experiences with real APIs, and create web products that balance usability, accessibility, and business goals.</p>
              <a className="text-link" href="#contact">Let's work together <Arrow /></a>
            </div>
          </div>
        </div>

          <div className="skill-bars reveal">
            <div className="skill-bar">
              <div className="skill-bar-label"><span>React / Next.js</span><span>95%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" style={{["--w" as string]:"95%"}} /></div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-label"><span>JavaScript / TypeScript</span><span>90%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" style={{["--w" as string]:"90%"}} /></div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-label"><span>CSS / Tailwind / UI Systems</span><span>92%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" style={{["--w" as string]:"92%"}} /></div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-label"><span>REST APIs / Integration</span><span>85%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" style={{["--w" as string]:"85%"}} /></div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-label"><span>Accessibility / Performance</span><span>88%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" style={{["--w" as string]:"88%"}} /></div>
            </div>
          </div>

          <div className="capabilities reveal">
            {["React","Next.js","JavaScript","TypeScript","Tailwind CSS","REST APIs","Responsive Design","Accessibility","Performance","Git","Figma"].map((s, i) => (
              <span key={s} className="cap-tag" style={{["--i" as string]: i}}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="shell">
          <div className="contact-grid">
            {/* â”€â”€ Left: info + channels â”€â”€ */}
            <div className="contact-info reveal-left">
              <p className="eyebrow">Have a project in mind?</p>
              <h2 className="contact-title">
                Let's make it<br />
                <em>matter.</em>
              </h2>
              <p className="contact-sub">
                Open to frontend contracts, product collabs, and startup builds.
                Reach out directly or send a message.
              </p>
              <div className="contact-channels">
                <a className="contact-channel" href="mailto:ahmadtech20@gmail.com">
                  <span className="channel-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m2 7 10 7 10-7"/>
                    </svg>
                  </span>
                  <span className="channel-body"><b>Email</b></span>
                  <Arrow />
                </a>

                <a className="contact-channel" href="https://github.com/El-ashraf" target="_blank" rel="noreferrer">
                  <span className="channel-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                    </svg>
                  </span>
                  <span className="channel-body"><b>GitHub</b></span>
                  <Arrow />
                </a>

                <a className="contact-channel" href="https://www.linkedin.com/in/ashraf-ahmad-7a43972a1" target="_blank" rel="noreferrer">
                  <span className="channel-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                  <span className="channel-body"><b>LinkedIn</b></span>
                  <Arrow />
                </a>
              </div>
            </div>

            {/* â”€â”€ Right: form â”€â”€ */}
            <form className="contact-form reveal-right" onSubmit={handleContactSubmit}>
              <label htmlFor="cf-name">
                Your name
                <input id="cf-name" name="name" autoComplete="name" placeholder="Ahmadâ€¦" required />
              </label>
              <label htmlFor="cf-email">
                Email address
                <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label htmlFor="cf-message">
                Message
                <textarea id="cf-message" name="message" rows={6} placeholder="Tell me about your project, timeline, and budgetâ€¦" required />
              </label>
              <div className="form-actions">
                <button type="submit">Send message <Arrow /></button>
                <p aria-live="polite">{formStatus}</p>
              </div>
            </form>

          </div>

          <div className="contact-bottom">
            <p>Â© 2026 Ahmad Mohammad El-Ashraf. All rights reserved.</p>
            <div className="contact-socials">
              <a href="mailto:ahmadtech20@gmail.com">Email</a>
              <a href="https://github.com/El-ashraf" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/ashraf-ahmad-7a43972a1" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

        </div>
      </section>
  </main>
  );
}

