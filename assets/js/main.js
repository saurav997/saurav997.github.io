// Minimal client-side includes: fetch partials + hydrate with data
const mount = async (id, path) => {
const el = document.getElementById(id);
if (!el) return;
const res = await fetch(path);
el.innerHTML = await res.text();
};


(async function init(){
await mount("__header", "/partials/header.html");
await mount("__hero", "/partials/hero.html");
await mount("__projects", "/partials/projects.html");
await mount("__writing", "/partials/writing.html");
await mount("__skills", "/partials/skills.html");
await mount("__contact", "/partials/contact.html");
await mount("__footer", "/partials/footer.html");


// Load data
const [projects, writing] = await Promise.all([
fetch('/data/projects.json').then(r=>r.json()),
fetch('/data/writing.json').then(r=>r.json()),
]);


// Render projects
const projRoot = document.querySelector('#projects-grid');
if (projRoot) {
projRoot.innerHTML = projects.map(p => `
<article class="card">
<div>${(p.tags||[]).map(t=>`<span class=\"chip\">${t}</span>`).join('')}</div>
<h3>${p.title}</h3>
<p>${p.blurb||''}</p>
<div class="small">
${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">Repo →</a>` : ''}
${p.demo ? ` &nbsp; <a href="${p.demo}" target="_blank" rel="noopener">Demo →</a>` : ''}
</div>
</article>
`).join('');
}


// Render writing
const wRoot = document.querySelector('#writing-list');
if (wRoot) {
wRoot.innerHTML = writing.map(x => `
<a class="card" href="${x.url}" target="_blank" rel="noopener">${x.title} — <span class="small">${x.note||''}</span></a>
`).join('');
}
})();