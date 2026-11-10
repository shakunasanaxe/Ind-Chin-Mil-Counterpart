/* Shared shell and components. No dependencies. */
(function () {
  'use strict';

  /* ------------------------------------------------------------ helpers */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  window.$ = $; window.$$ = $$; window.esc = esc;

  /* ------------------------------------------------------------ navigation */
  const NAV = [
    ['Orientation', [
      ['index.html', 'Overview'],
      ['reforms.html', 'Reform Timeline'],
    ]],
    ['Command and Control', [
      ['apex.html', 'Apex Command'],
      ['cmc.html', 'The Military Commission'],
      ['services.html', 'Services and Arms'],
      ['theatres.html', 'Theatre Commands'],
      ['western.html', 'Western Theatre in Depth'],
      ['ladder.html', 'Levels and Ranks'],
    ]],
    ['Domains', [
      ['cyber-space.html', 'Cyber, Space and Information'],
      ['education.html', 'Education and Doctrine'],
      ['industry.html', 'Industry and Procurement'],
      ['equipment.html', 'Equipment Side by Side'],
    ]],
    ['Reference', [
      ['sources.html', 'Sources'],
    ]],
  ];

  function shell() {
    const page = (location.pathname.split('/').pop() || 'index.html');
    let links = '';
    NAV.forEach(([g, items]) => {
      links += `<div class="grp">${esc(g)}</div>`;
      items.forEach(([h, t]) => { links += `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${esc(t)}</a>`; });
    });
    const side = document.createElement('aside');
    side.className = 'side';
    side.setAttribute('aria-label', 'Sections');
    side.innerHTML = `
      <a class="brand" href="index.html">
        <span class="mono meta">Takshashila Institution</span>
        <strong>Counterparts</strong>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="navlinks">Menu</button>
      </a>
      <nav class="nav" id="navlinks">${links}</nav>
      <div class="side-foot">A study desk on the PLA and the Indian defence ecosystem. Compiled November 2026 from open sources.</div>`;
    document.body.prepend(side);
    const btn = $('.menu-btn', side);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = side.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    const foot = document.createElement('footer');
    foot.className = 'page-foot';
    foot.innerHTML = '<span>Takshashila Institution · Counterparts study desk</span>';
    const main = $('main');
    if (main) main.appendChild(foot);
  }

  /* ------------------------------------------------------------ photo library (Wikimedia Commons, hot-linked) */
  const IMG = {
    j20: ['J-20 at Airshow China 2016.jpg', 'CC BY-SA 4.0', 'Alert5', 'Chengdu J-20'],
    fc31: ['FC-31 2.0 prototype at SAC Aviation Expo Park 20260401121555.jpg', 'CC BY-SA 4.0', 'TurnOnTheNight', 'Shenyang FC-31 prototype'],
    rafale: ['RB 005 - Dassault Rafale - Indian Air Force.jpg', 'CC0', 'Dylan Agbagni', 'Dassault Rafale, Indian Air Force'],
    su30: ['Sukhoi Su-30MKi.jpg', 'CC BY 4.0', 'Sanil Nath', 'Sukhoi Su-30MKI'],
    tejas: ['HAL LCA Tejas (52710138753).jpg', 'CC BY-SA 2.0', 'Ashwin Kumar', 'HAL Tejas'],
    fujian: ['Chinese aircraft carrier Fujian flight deck.jpg', 'CC BY 4.0', 'China News Service', 'Chinese carrier Fujian, flight deck'],
    vikrant: ['INS Vikrant Fleet Operation 4.jpg', 'GODL-India', 'Government of India', 'INS Vikrant'],
    carriers: ['INS Vikrant (R11) and INS Vikramaditya (R33) during joint exercise.jpg', 'GODL-India', 'Indian Navy', 'INS Vikrant and INS Vikramaditya'],
    t055: ['Type 055 destroyer.jpg', 'CC BY-SA 3.0', '星海军事', 'Type 055 destroyer'],
    p15b: ['INS Visakhapatnam (D66).jpg', 'GODL-India', 'Indian Navy', 'INS Visakhapatnam (Project 15B)'],
    t094: ['Type 094 SSBN.JPG', 'Public domain', 'SSBN-0-lover', 'Type 094 (Jin class) SSBN'],
    arihant: ['INS Arihant at sea (cropped).jpg', 'GODL-India', "Prime Minister's Office", 'INS Arihant'],
    agni5: ['Agni-V MIRV.jpg', 'GODL-India', 'Government of India', 'Agni-V (MIRV test)'],
    plz05: ['PLZ-05 Self-Propelled Artillery 20170902.jpg', 'CC BY-SA 4.0', 'Tyg728', 'PLZ-05 self-propelled howitzer'],
    k9: ['K9 Vajra Republic day 2023.jpg', 'CC BY-SA 4.0', 'Press Information Bureau', 'K9 Vajra-T'],
    type15: ['Type 15 tank 20221020.jpg', 'CC BY-SA 4.0', '颐园居', 'Type 15 light tank'],
    t90: ['Tank T- 90 (Bhishma) passes at the Republic Day Celebrations 2020.jpg', 'GODL-India', 'Ministry of Defence', 'T-90 Bhishma'],
    hq9: ['HQ-9 Surface-to-air missiles 20170919.jpg', 'CC BY-SA 4.0', 'Tyg728', 'HQ-9 launchers'],
    ghop: ['Great Hall of the People Beijing China.jpg', 'CC BY 4.0', 'Philip Nalangan', 'Great Hall of the People, Beijing'],
    rb: ['Rashtrapati Bhavan 1.jpg', 'GODL-India', "President's Secretariat", 'Rashtrapati Bhavan, New Delhi'],
    southblock: ['New Delhi government block 03-2016 img5.jpg', 'FAL', 'A. Savin', 'North and South Block, New Delhi'],
    pangong: ['Pangong Tso 2.jpg', 'CC BY-SA 4.0', 'KennyOMG', 'Pangong Tso, eastern Ladakh'],
    potala: ['Potala.jpg', 'CC BY 2.5', 'Ondřej Žváček', 'Potala Palace, Lhasa'],
    chengdu: ['Chengdu skyline June 2017.jpg', 'CC BY 2.0', 'George N', 'Chengdu, headquarters city of the Western Theatre Command'],
    ndc: ['Drawing of the National Defence College (NDC), New Delhi.jpg', 'GODL-India', 'Indian Navy', 'National Defence College, New Delhi (drawing)'],
    df41: ['assets/img/df41-sketch.svg', 'CC BY-SA 4.0', 'Mike1979 Russia, own work', 'Dongfeng-41 (CSS-20) sketch'],
    s400: ['assets/img/s400.jpg', 'CC BY 2.0, via Wikimedia Commons', 'Dmitriy Fomin from Moscow, Russia', 'S-400 Triumf launcher'],
    leh: ['PM Modi with officers and soldiers of the Indian Army and Indian Air Force at Leh.jpg', 'GODL-India', "Prime Minister's Office", 'Army and Air Force personnel at Leh'],
  };
  const isLocal = (f) => f.indexOf('assets/') === 0;
  const fileUrl = (f, w) => isLocal(f) ? f : 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f) + (w ? '?width=' + w : '');
  const pageUrl = (f) => isLocal(f) ? '' : 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(f.replace(/ /g, '_'));
  function photoData(key) { const p = IMG[key]; return p ? { src: fileUrl(p[0], 1000), full: fileUrl(p[0], 1600), page: pageUrl(p[0]), lic: p[1], by: p[2], alt: p[3] } : null; }
  function photo(key, cls, caption) {
    const d = photoData(key);
    if (!d) return `<figure class="photo ${cls || ''}"><div class="frame stripe" data-cap="${esc(caption || 'Image slot')}"></div></figure>`;
    return `<figure class="photo ${cls || ''}">
      <div class="frame" data-zoom="${esc(d.full)}" data-alt="${esc(d.alt)}" data-page="${esc(d.page)}" tabindex="0" role="button" aria-label="Enlarge: ${esc(d.alt)}">
        <img data-photo="1" loading="lazy" src="${esc(d.src)}" alt="${esc(d.alt)}"></div>
      <figcaption>${esc(caption || d.alt)} · ${esc(d.by)}, ${esc(d.lic)}${d.page ? ` · <a href="${esc(d.page)}" target="_blank" rel="noopener">Commons ↗</a>` : ''}</figcaption></figure>`;
  }
  window.photo = photo; window.photoData = photoData; window.IMG = IMG;

  function lightbox() {
    const dlg = document.createElement('dialog');
    dlg.className = 'lb';
    dlg.innerHTML = '<img alt=""><div class="cap"><span></span><button class="btn sm ghost" type="button">Close</button></div>';
    document.body.appendChild(dlg);
    const open = (el) => {
      $('img', dlg).src = el.dataset.zoom; $('img', dlg).alt = el.dataset.alt || '';
      $('.cap span', dlg).textContent = el.dataset.alt || '';
      dlg.showModal();
    };
    document.addEventListener('click', (e) => { const f = e.target.closest('[data-zoom]'); if (f && !e.target.closest('a')) open(f); });
    document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-zoom]')) { e.preventDefault(); open(e.target); } });
    $('button', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    // graceful fallback when a hot-linked photo cannot load
    document.addEventListener('error', (e) => {
      const t = e.target;
      if (t && t.tagName === 'IMG' && t.dataset.photo) {
        const frame = t.closest('.frame, .pic');
        if (frame) { frame.classList.add('stripe'); frame.removeAttribute('data-zoom'); frame.setAttribute('data-cap', t.alt || 'Photo unavailable'); frame.style.cursor = 'default'; }
        t.remove();
      }
    }, true);
  }

  /* ------------------------------------------------------------ carousel */
  function Carousel(el, slides) {
    let i = 0;
    el.classList.add('carousel');
    el.setAttribute('role', 'region'); el.setAttribute('aria-roledescription', 'carousel');
    el.innerHTML = `<div class="car-view"><div class="car-track">${slides.map((s, n) => {
      const d = s.img ? photoData(s.img) : null;
      return `<div class="car-slide" role="group" aria-label="Slide ${n + 1} of ${slides.length}">
        <div class="txt"><span class="eyebrow">${esc(s.kicker || '')}</span><h3>${s.title}</h3><p>${s.text}</p>${s.href ? `<p style="margin-top:8px"><a class="link-cta" href="${esc(s.href)}">${esc(s.cta || 'Open')} →</a></p>` : ''}</div>
        <div class="pic ${d ? '' : 'stripe'}" ${d ? '' : `data-cap="${esc(s.cap || 'Image slot')}"`}>${d ? `<img data-photo="1" loading="eager" src="${esc(d.src)}" alt="${esc(d.alt)}"><div class="cap">${esc(d.alt)} · ${esc(d.by)}, ${esc(d.lic)} · ${d.page ? `<a href="${esc(d.page)}" target="_blank" rel="noopener">Commons ↗</a>` : ''}</div>` : ''}</div></div>`;
    }).join('')}</div></div>
      <div class="car-ctl"><div class="car-dots">${slides.map((_, n) => `<button type="button" aria-label="Go to slide ${n + 1}"></button>`).join('')}</div>
      <div class="arrows"><button type="button" data-d="-1" aria-label="Previous slide">←</button><button type="button" data-d="1" aria-label="Next slide">→</button></div></div>`;
    const track = $('.car-track', el), dots = $$('.car-dots button', el);
    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, k) => d.setAttribute('aria-current', k === i));
    }
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    $$('.arrows button', el).forEach((b) => b.addEventListener('click', () => go(i + Number(b.dataset.d))));
    el.tabIndex = 0;
    el.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
    let sx = null;
    el.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', (e) => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); sx = null; });
    go(0);
  }

  /* ------------------------------------------------------------ tabs */
  function Tabs(el) {
    const btns = $$('[data-tab]', el), panels = $$('[data-panel]', el);
    function show(id) {
      btns.forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === id));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
    }
    btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.tab)));
    if (btns[0]) show(btns[0].dataset.tab);
    return show;
  }

  /* ------------------------------------------------------------ bar chart */
  function BarChart(el, sets) {
    el.classList.add('chart');
    el.innerHTML = `<div class="pill-row" role="tablist" aria-label="Measure"></div><div class="cbody"></div>`;
    const pills = $('.pill-row', el), body = $('.cbody', el);
    sets.forEach((s, n) => { const b = document.createElement('button'); b.className = 'btn sm ghost'; b.type = 'button'; b.textContent = s.tab; b.addEventListener('click', () => draw(n)); pills.appendChild(b); });
    function draw(n) {
      const s = sets[n], max = Math.max(s.cn, s.in) * 1.18;
      $$('button', pills).forEach((b, k) => b.setAttribute('aria-pressed', k === n));
      body.innerHTML = `<div class="meta" style="margin-top:22px">${esc(s.eyebrow)}</div><div class="ctitle">${esc(s.title)}</div>
        <div class="bars">
          ${[['China', 'cn', s.cn, s.cnLabel], ['India', 'in', s.in, s.inLabel]].map(([l, k, v, lab]) => `<div class="bar-row"><div class="lab">${l}</div><div class="bar-track"><div class="bar ${k}" data-w="${(v / max) * 100}"></div><span class="bar-val" style="left:${(v / max) * 100}%">${esc(lab)}</span></div></div>`).join('')}
        </div>
        <div class="cnote">${s.note}</div>
        <div class="csrc">Source: ${s.src}</div>`;
      requestAnimationFrame(() => requestAnimationFrame(() => $$('.bar', body).forEach((b) => { b.style.width = b.dataset.w + '%'; })));
    }
    draw(0);
  }

  /* ------------------------------------------------------------ paired organisation tree */
  const CONF = { E: 'Established structure', R: 'Reported, not officially confirmed', F: 'In flux, verify before citing' };
  function PairedTree(root, cfg) {
    const nodes = {};
    const links = {};
    function walk(list, side, parent, prefix) {
      list.forEach((n, i) => {
        n._side = side; n._parent = parent;
        n._code = parent ? prefix + '.' + (i + 1) : prefix + '.' + String(i + 1).padStart(2, '0');
        nodes[n.id] = n;
        if (n.ch) walk(n.ch, side, n, n._code);
      });
    }
    walk(cfg.india, 'in', null, 'IN');
    walk(cfg.china, 'cn', null, 'CN');
    cfg.links.forEach(([a, b, t, note]) => {
      if (!nodes[a] || !nodes[b]) { console.warn('bad link', a, b); return; }
      (links[a] = links[a] || []).push({ id: b, t, note });
      (links[b] = links[b] || []).push({ id: a, t, note });
    });
    const st = { sel: null, exp: new Set(), q: '', vis: null };
    const ancestors = (n) => { const out = []; while (n && n._parent) { n = n._parent; out.push(n.id); } return out; };
    const descendants = (n, out) => { (n.ch || []).forEach((c) => { out.push(c.id); descendants(c, out); }); return out; };
    const openDefault = () => { st.exp.clear(); Object.values(nodes).forEach((n) => { if (!n._parent || !n._parent._parent) st.exp.add(n.id); }); };
    openDefault();

    root.classList.add('pt');
    root.innerHTML = `
      <div class="pt-tools">
        <input type="search" placeholder="Search names, Chinese terms or functions" aria-label="Search the structures">
        <button class="btn sm ghost" type="button" data-act="expand">Expand all</button>
        <button class="btn sm ghost" type="button" data-act="collapse">Collapse all</button>
        <div class="pt-legend"><span>● Close counterpart</span><span>○ Partial overlap</span><span>No marker: no counterpart</span></div>
      </div>
      <div class="pt-cols">
        <div class="pt-col" data-side="in"><div class="pt-head"><h3>${esc(cfg.indiaTitle)}</h3><span class="meta">${esc(cfg.indiaSub || '')}</span></div><div class="pt-scroll"></div></div>
        <div class="pt-col" data-side="cn"><div class="pt-head"><h3>${esc(cfg.chinaTitle)}</h3><span class="meta">${esc(cfg.chinaSub || '')}</span></div><div class="pt-scroll"></div></div>
      </div>
      <div class="pt-detail" aria-live="polite"></div>`;
    const scrolls = { in: $('[data-side="in"] .pt-scroll', root), cn: $('[data-side="cn"] .pt-scroll', root) };
    const detail = $('.pt-detail', root);

    function mark(id) { const l = links[id]; if (!l) return ''; return l.some((x) => x.t === 'd') ? '●' : '○'; }
    function li(n, cpSet) {
      if (st.vis && !st.vis.has(n.id)) return '';
      const kids = (n.ch || []).map((c) => li(c, cpSet)).join('');
      const has = !!(n.ch && n.ch.length);
      const open = has && (st.exp.has(n.id) || !!st.vis);
      const cls = n.id === st.sel ? ' sel' : (cpSet.has(n.id) ? ' cp' : '');
      return `<li data-id="${n.id}"><div class="row"><button type="button" class="tg${has ? '' : ' empty'}" data-tg="${n.id}" aria-label="${open ? 'Collapse' : 'Expand'} ${esc(n.n)}" aria-expanded="${open}">${open ? '−' : '+'}</button>
        <button type="button" class="nd${cls}" data-sel="${n.id}" ${n.id === st.sel ? 'aria-current="true"' : ''}><span class="code">${n._code}</span><span class="nm">${esc(n.n)}${n.zh ? `<span class="zh">${esc(n.zh)}</span>` : ''}</span><span class="mk" title="${links[n.id] ? 'Has a counterpart on the other side' : 'No counterpart'}">${mark(n.id)}</span></button></div>
        ${has && open ? `<ul>${kids}</ul>` : ''}</li>`;
    }
    function render() {
      const keep = { in: scrolls.in.scrollTop, cn: scrolls.cn.scrollTop };
      const cpSet = new Set((links[st.sel] || []).map((x) => x.id));
      scrolls.in.innerHTML = `<ul>${cfg.india.map((n) => li(n, cpSet)).join('')}</ul>`;
      scrolls.cn.innerHTML = `<ul>${cfg.china.map((n) => li(n, cpSet)).join('')}</ul>`;
      scrolls.in.scrollTop = keep.in; scrolls.cn.scrollTop = keep.cn;
      renderDetail();
    }
    function renderDetail() {
      const n = nodes[st.sel];
      if (!n) { detail.innerHTML = '<div><p class="desc">Select any box in either structure to read about it and to see what, if anything, answers to it on the other side.</p></div><div></div>'; return; }
      const side = n._side === 'in' ? 'India' : 'China';
      const cps = links[n.id] || [];
      const chips = (n.ch || []).map((c) => `<button type="button" data-go="${c.id}">${esc(c.n)}</button>`).join('');
      const rows = [
        ['Side', side],
        ['Level', n.lv],
        ['Reports to', n._parent ? n._parent.n : (n.up || 'Top of this chart')],
        ['Key post', n.h],
        ['Since', n.y],
        ['Status', CONF[n.c || 'E']],
      ].filter((r) => r[1]);
      detail.innerHTML = `
        <div>
          <span class="meta">${n._code} · ${side}</span>
          <h3>${esc(n.n)}</h3>
          ${n.zh ? `<div class="zhline zh">${esc(n.zh)}${n.py ? ' · <span class="mono" style="font-size:12px">' + esc(n.py) + '</span>' : ''}</div>` : ''}
          <p class="desc">${n.d}</p>
          ${n.w ? `<div class="aside" style="margin:18px 0"><strong>Why it matters for the comparison.</strong> ${n.w}</div>` : ''}
          <dl class="deftable" style="margin-top:20px">${rows.map((r) => `<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join('')}</dl>
          ${chips ? `<div class="meta" style="margin-top:22px">Sub-units, select to open</div><div class="chips">${chips}</div>` : ''}
        </div>
        <div>
          <span class="meta">${n._side === 'in' ? 'Closest on the Chinese side' : 'Closest on the Indian side'}</span>
          ${cps.length ? cps.map((c) => { const o = nodes[c.id]; return `<button type="button" class="cpcard" data-go="${o.id}"><span class="meta">${c.t === 'd' ? '● Close counterpart' : '○ Partial overlap'} · ${o._code}</span><span class="t">${esc(o.n)}</span>${o.zh ? ` <span class="zh" style="color:var(--ink-50);font-size:13px">${esc(o.zh)}</span>` : ''}<p>${c.note}</p></button>`; }).join('')
          : `<div class="none-card"><strong>No direct counterpart.</strong> ${n.x || 'Nothing on the other side performs this function in a comparable form, which is itself informative about how the two systems divide authority.'}</div>`}
        </div>`;
    }
    function reveal(id) { // expand ancestors
      const n = nodes[id]; if (!n) return;
      ancestors(n).forEach((a) => st.exp.add(a));
    }
    function within(side, id) {
      const el = $(`li[data-id="${id}"] > .row`, scrolls[side]);
      if (!el) return;
      const c = scrolls[side], r = el.getBoundingClientRect(), cr = c.getBoundingClientRect();
      c.scrollTo({ top: c.scrollTop + (r.top - cr.top) - 70, behavior: 'smooth' });
    }
    function select(id, from) {
      if (!nodes[id]) return;
      st.sel = id; reveal(id);
      (links[id] || []).forEach((l) => reveal(l.id));
      render();
      requestAnimationFrame(() => {
        within(nodes[id]._side, id);
        (links[id] || []).forEach((l) => within(nodes[l.id]._side, l.id));
      });
      try { history.replaceState(null, '', '#' + id); } catch (e) { /* ignore */ }
    }
    function search(q) {
      q = q.trim().toLowerCase();
      if (!q) { st.q = ''; st.vis = null; render(); return; }
      st.q = q; const vis = new Set();
      Object.values(nodes).forEach((n) => {
        const hay = (n.n + ' ' + (n.zh || '') + ' ' + (n.py || '') + ' ' + (n.d || '')).toLowerCase();
        if (hay.includes(q)) { vis.add(n.id); ancestors(n).forEach((a) => vis.add(a)); descendants(n, []).forEach((d) => vis.add(d)); }
      });
      st.vis = vis; render();
    }
    root.addEventListener('click', (e) => {
      const tg = e.target.closest('[data-tg]');
      if (tg) { const id = tg.dataset.tg; st.exp.has(id) ? st.exp.delete(id) : st.exp.add(id); render(); return; }
      const s = e.target.closest('[data-sel]'); if (s) { select(s.dataset.sel); return; }
      const g = e.target.closest('[data-go]'); if (g) { select(g.dataset.go); return; }
      const a = e.target.closest('[data-act]');
      if (a) {
        if (a.dataset.act === 'expand') Object.values(nodes).forEach((n) => st.exp.add(n.id));
        else { openDefault(); if (st.sel) { reveal(st.sel); (links[st.sel] || []).forEach((l) => reveal(l.id)); } }
        render();
      }
    });
    $('input[type="search"]', root).addEventListener('input', (e) => search(e.target.value));
    render();
    const h = (location.hash || '').slice(1);
    select(nodes[h] ? h : (cfg.start || (cfg.links[0] && cfg.links[0][1])));
    return { select, nodes, links };
  }

  window.UI = { Carousel, Tabs, BarChart, PairedTree, photo, shell, CONF };

  document.addEventListener('DOMContentLoaded', () => { shell(); lightbox(); $$('[data-tabs]').forEach(Tabs); });
})();
