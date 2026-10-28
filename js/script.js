/* ==========================================================
   1. CONTENT: edit everything here. Empty values are hidden.
   All values below are SAMPLE placeholders, replace them.
   ========================================================== */
const CONFIG = {
  name: "Your Name",
  initials: "YN",
  title: "Full Stack Developer",
  roles: ["MERN Stack Developer", "Frontend Engineer", "Problem Solver"],
  available: "Available for new opportunities", // "" hides the badge
  headline: "I build fast, accessible web products.",
  description: "Sample text: describe your expertise and the value you bring to teams and clients in two or three sentences.",
  profileImage: "", // e.g. "assets/images/profile.jpg"
  resume: "", // e.g. "assets/resume.pdf"; "" hides the button
  about: [
    "Sample paragraph: introduce yourself and your career journey.",
    "Sample paragraph: describe how you approach problems and what you want to work on next."
  ],
  focus: ["Frontend development", "Backend APIs", "Databases"],
  stats: [], // e.g. [{ value: "3+", label: "Years experience" }] (only add verifiable numbers)
  skills: {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    "Backend": ["Node.js", "Express"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Tools": ["Git", "GitHub", "VS Code"]
  },
  projects: [
    { title: "Sample Project One", category: "Web Development", description: "Replace with a short description of the problem solved.", tech: ["React", "Node.js"], features: ["Key feature"], image: "", live: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics", description: "Replace with a short description of the problem solved.", tech: ["Python", "Power BI"], features: [], image: "", live: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Data Science", description: "Replace with a short description of the problem solved.", tech: ["Python", "scikit-learn"], features: [], image: "", live: "", code: "", caseStudy: "" }
  ],
  experience: [
    { role: "Sample Role", org: "Sample Company", period: "Start – End", points: ["Replace with a real responsibility or achievement."], tech: ["JavaScript"] },
    { role: "Sample Degree", org: "Sample University", period: "Start – End", points: [], tech: [] }
  ],
  achievements: [], // e.g. [{ title: "Certificate name", issuer: "Issuer", year: "2025" }]
  contact: {
    email: "hello@example.com", // sample address, replace
    phone: "", // international format, e.g. "+911234567890"
    whatsapp: "", // digits with country code, e.g. "911234567890"
    whatsappMessage: "Hi! I found your portfolio and would like to connect.",
    linkedin: "", github: "", instagram: "",
    location: ""
  }
};
const NAV = [["home","Home"],["about","About"],["skills","Skills"],["projects","Projects"],["experience","Experience"],["contact","Contact"]];

/* ==========================================================
   2. RENDERING
   ========================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = (id, v) => { const e = document.getElementById(id); if (e) e.innerHTML = v; return e; };
const text = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
const hide = id => { const e = document.getElementById(id); if (e) e.hidden = true; };
const ext = 'target="_blank" rel="noopener noreferrer"';
const icon = n => `<i data-lucide="${n}"></i>`;
const c = CONFIG, k = c.contact;

const socials = [["github","github","GitHub"],["linkedin","linkedin","LinkedIn"],["instagram","instagram","Instagram"]]
  .filter(([key]) => k[key]);
const socialLinks = socials.map(([key, ic, label]) =>
  `<li><a class="icon-btn" href="${k[key]}" ${ext} aria-label="${label} profile">${icon(ic)}</a></li>`).join("");

function renderStatic() {
  document.title = `${c.name} | ${c.title} Portfolio`;
  html("logo", `${c.initials}<span class="accent">.</span>`);
  const links = cls => NAV.map(([id, l]) => `<li><a class="nav-link ${cls}" href="#${id}" data-nav="${id}">${l}</a></li>`).join("");
  html("nav-desktop", links("")); html("nav-mobile", links(""));
  html("nav-footer", NAV.map(([id, l]) => `<li><a class="muted hover:underline" href="#${id}">${l}</a></li>`).join(""));
  text("greeting", `Hi, I'm ${c.name}.`);
  text("headline", c.headline); text("hero-desc", c.description);
  c.available ? text("avail", c.available) : hide("avail");
  html("hero-social", socialLinks); html("footer-social", socialLinks);
  text("footer-name", c.name); text("footer-name2", c.name);
  text("year", new Date().getFullYear());
  const img = $("#avatar");
  if (c.profileImage) { img.src = c.profileImage; img.alt = `Portrait of ${c.name}`; } else { img.remove(); text("avatar-fallback", c.initials); }

  html("about-text", c.about.map(p => `<p>${p}</p>`).join(""));
  html("about-focus", c.focus.map(f => `<li class="card flex items-center gap-3 py-3">${icon("check")}${f}</li>`).join(""));
  c.stats.length ? html("stats", c.stats.map(s => `<li class="card"><p class="font-heading text-3xl font-bold accent">${s.value}</p><p class="text-sm muted">${s.label}</p></li>`).join("")) : hide("stats");
  const r = $("#resume"); c.resume ? r.href = c.resume : r.hidden = true;

  html("skills-grid", Object.entries(c.skills).map(([cat, items]) =>
    `<div class="card hov reveal"><h3 class="mb-4 text-lg font-semibold">${cat}</h3><div class="flex flex-wrap gap-2">${items.map(i => `<span class="tag">${i}</span>`).join("")}</div></div>`).join(""));

  html("timeline", c.experience.map(e => `<li class="card reveal"><h3 class="text-lg font-semibold">${e.role}</h3><p class="accent">${e.org}</p><p class="mb-3 text-sm muted">${e.period}</p>
    ${e.points.length ? `<ul class="list-disc space-y-1 pl-5 text-sm muted">${e.points.map(p => `<li>${p}</li>`).join("")}</ul>` : ""}
    ${e.tech.length ? `<div class="mt-3 flex flex-wrap gap-2 ${""}">${e.tech.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}</li>`).join(""));

  if (c.achievements.length) html("ach-grid", c.achievements.map(a => `<div class="card hov reveal">${icon("award")}<h3 class="mt-3 font-semibold">${a.title}</h3><p class="text-sm muted">${[a.issuer, a.year].filter(Boolean).join(", ")}</p></div>`).join(""));
  else { $("#achievements").remove(); }
}

function renderProjects() {
  const cats = ["All", ...new Set(c.projects.map(p => p.category))];
  const filters = html("filters", cats.map((x, i) => `<button class="chip" data-filter="${x}" aria-pressed="${i === 0}">${x}</button>`).join(""));
  if (cats.length < 3) filters.hidden = true; // not enough projects to filter
  html("project-grid", c.projects.map(p => {
    const links = [[p.live, "external-link", "Live demo"], [p.code, "code", "Source code"], [p.caseStudy, "file-text", "Case study"]]
      .filter(l => l[0]).map(([u, ic, l]) => `<a href="${u}" ${ext}>${icon(ic)}${l}</a>`).join("");
    return `<article class="card hov proj reveal" data-category="${p.category}">
      <div class="thumb">${p.image ? `<img src="${p.image}" alt="Screenshot of ${p.title}" loading="lazy" width="640" height="400">` : icon("layout-dashboard")}</div>
      <h3 class="text-xl font-semibold">${p.title}</h3><p class="mt-2 text-sm muted">${p.description}</p>
      ${p.features.length ? `<ul class="mt-3 list-disc pl-5 text-sm muted">${p.features.map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
      <div class="mt-4 flex flex-wrap gap-2">${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      ${links ? `<div class="link-row mt-4 flex flex-wrap gap-4">${links}</div>` : ""}</article>`;
  }).join(""));
  filters.addEventListener("click", e => {
    const b = e.target.closest("[data-filter]"); if (!b) return;
    $$("[data-filter]", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
    $$(".proj").forEach(card => card.classList.toggle("hidden-card", b.dataset.filter !== "All" && card.dataset.category !== b.dataset.filter));
  });
}

function renderContact() {
  const wa = k.whatsapp.replace(/\D/g, "");
  const items = [
    [k.email, "mail", "Email", k.email, `mailto:${k.email}`, false],
    [k.phone, "phone", "Phone", k.phone, `tel:${k.phone.replace(/[^\d+]/g, "")}`, false],
    [wa, "message-circle", "WhatsApp", "Chat directly", `https://wa.me/${wa}${k.whatsappMessage ? "?text=" + encodeURIComponent(k.whatsappMessage) : ""}`, true],
    [k.linkedin, "linkedin", "LinkedIn", "Connect professionally", k.linkedin, true],
    [k.github, "github", "GitHub", "Browse my code", k.github, true],
    [k.instagram, "instagram", "Instagram", "Follow along", k.instagram, true]
  ].filter(i => i[0]).map(([, ic, label, desc, href, external]) =>
    `<li class="reveal"><a class="card hov flex items-center gap-4" href="${href}" ${external ? ext : ""}><span class="contact-ic">${icon(ic)}</span><span><span class="block font-semibold">${label}</span><span class="block break-all text-sm muted">${desc}</span></span></a></li>`);
  if (k.location) items.push(`<li class="reveal"><div class="card flex items-center gap-4"><span class="contact-ic">${icon("map-pin")}</span><span><span class="block font-semibold">Location</span><span class="text-sm muted">${k.location}</span></span></div></li>`);
  html("contact-grid", items.join(""));
}

/* ==========================================================
   3. BEHAVIOUR
   ========================================================== */
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

function initTheme() {
  $("#theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

function initMenu() {
  const btn = $("#menu-toggle"), menu = $("#mobile-menu");
  const set = open => { menu.classList.toggle("hidden", !open); btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", e => { if (!e.target.closest("#header")) set(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { set(false); btn.focus(); } });
  matchMedia("(min-width:1024px)").addEventListener("change", () => set(false));
}

function initActiveNav() {
  const links = $$("[data-nav]");
  const obs = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) links.forEach(l => { const on = l.dataset.nav === en.target.id; l.classList.toggle("active", on); on ? l.setAttribute("aria-current", "page") : l.removeAttribute("aria-current"); });
  }), { rootMargin: "-45% 0px -50% 0px" });
  NAV.forEach(([id]) => { const s = document.getElementById(id); if (s) obs.observe(s); });
}

function initReveal() {
  const items = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) return items.forEach(i => i.classList.add("in"));
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.12 });
  items.forEach(i => obs.observe(i));
}

function initRoles() {
  const el = $("#role-text"); if (!el) return;
  const roles = c.roles.length ? c.roles : [c.title];
  if (reduced || roles.length === 1) return void (el.textContent = roles[0]);
  let r = 0, i = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 75);
  })();
}

function initToTop() {
  const b = $("#to-top");
  addEventListener("scroll", () => b.classList.toggle("show", scrollY > 600), { passive: true });
  b.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderStatic(); renderProjects(); renderContact();
  initTheme(); initMenu(); initActiveNav(); initReveal(); initRoles(); initToTop();
  window.lucide && lucide.createIcons();
});