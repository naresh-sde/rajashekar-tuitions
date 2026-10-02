/* ============================================================
   Rajashekar Tuitions — app logic
   Plain ES5-ish JS, no dependencies. Sections:
   1 helpers  2 theme  3 nav  4 renderers  5 finder  6 calculator
   7 SAM chat  8 gallery  9 reviews  10 FAQ  11 enquiry  12 admin
   ============================================================ */
(function () {
  "use strict";

  var RAW = window.SRT || {};
  var CFG = window.__SRT_CFG__ = JSON.parse(JSON.stringify(RAW));
  var LS = "srt_cfg_v1";
  var LEADS = "srt_leads_v1";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* merge saved overrides */
  try {
    var saved = JSON.parse(localStorage.getItem(LS) || "{}");
    if (saved && typeof saved === "object") deepMerge(CFG, saved);
  } catch (e) { /* ignore */ }

  function deepMerge(t, s) {
    Object.keys(s).forEach(function (k) {
      if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k]) && t[k] && typeof t[k] === "object" && !Array.isArray(t[k])) {
        deepMerge(t[k], s[k]);
      } else if (s[k] !== undefined) { t[k] = s[k]; }
    });
    return t;
  }
  function persist() { try { localStorage.setItem(LS, JSON.stringify(window.__SRT_CFG__)); } catch (e) {} }

  function icon(id, cls) {
    return '<svg class="' + (cls || "") + '" aria-hidden="true"><use href="#i-' + id + '"></use></svg>';
  }
  function money(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var toastT;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ---------------- 1. contacts / bindings ---------------- */
  function telHref(n) { return "tel:+91" + String(n).replace(/\D/g, "").slice(-10); }
  function waLink(msg) {
    return "https://wa.me/" + (CFG.contact.whatsapp || "") + "?text=" + encodeURIComponent(msg || "Hi Sir, I would like to know about tuition classes.");
  }

  /* HTML data-bind names -> paths inside the config object */
  var ALIAS = {
    brandName: "brand.name",
    areaLine: "brand.areaLine",
    phonePrimaryDisplay: "contact.phonePrimaryDisplay",
    email: "contact.email",
    tutorName: "tutor.name",
    tutorRole: "tutor.role",
    tutorAbout: "tutor.about",
    tutorExperience: "tutor.experience",
    tutorStudents: "tutor.students",
    tutorBoards: "tutor.boards"
  };
  function resolve(path) {
    return String(path).split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, CFG);
  }

  function bindAll() {
    $$("[data-bind]").forEach(function (el) {
      var key = el.getAttribute("data-bind");
      var val = resolve(ALIAS[key] || key);
      if (val != null && val !== "") el.innerHTML = esc(val);
    });

    var p = CFG.contact.phonePrimary;
    $$('a[href^="tel:"]').forEach(function (a) {
      a.setAttribute("href", telHref(a.getAttribute("data-tel") || p));
    });
    $$("[data-wa]").forEach(function (a) {
      a.setAttribute("href", waLink(a.getAttribute("data-wa")));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    $$('a[href^="mailto:"]').forEach(function (a) { a.setAttribute("href", "mailto:" + CFG.contact.email); });

    $("#year").textContent = String(new Date().getFullYear());
  }

  /* ---------------- 2. theme ---------------- */
  function initTheme() {
    var savedT = null;
    try { savedT = localStorage.getItem("srt_theme"); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = savedT || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    $("#themeToggle").addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("srt_theme", next); } catch (e) {}
      toast(next === "dark" ? "Dark mode on" : "Light mode on");
    });
  }

  /* ---------------- 3. nav ---------------- */
  function initNav() {
    var drawer = $("#drawer"), overlay = $("#overlay"), burger = $("#burger");
    function close() {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    burger.addEventListener("click", function () {
      drawer.classList.add("open");
      overlay.classList.add("show");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    });
    $("#drawerClose").addEventListener("click", close);
    overlay.addEventListener("click", close);
    $$("#drawer a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    var fab = $("#samFab");
    window.addEventListener("scroll", function () {
      fab.classList.toggle("show", window.scrollY > 700);
    }, { passive: true });

    $$("a[href^='#']:not([data-wa])").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href") || "";
        if (id.charAt(0) !== "#" || id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 84, behavior: "smooth" });
        history.replaceState(null, "", id);
      });
    });
  }

  /* ---------------- 4. renderers ---------------- */
  function renderMarquee() {
    var items = [
      "Mathematics only", "Classes 6 to 10", "CBSE · ICSE",
      "Free demo class", "Batch of max 12", "Based in Pragathinagar",
      "Home tuition within 10–15 km", "Class-wise syllabus tracker", "Weekly tests", "Mon–Fri 6–10 PM · Sat–Sun 10 AM–10 PM"
    ];
    var html = items.map(function (t) { return "<span>" + icon("check") + t + "</span>"; }).join("");
    $("#marquee").innerHTML = html + html;
  }

  function renderFormulaLab() {
    var data = CFG.formulaLab.maths;
    $("#flMaths").innerHTML = data.items.map(function (f) {
      return '<div class="fcard"><b>' + esc(f.n) + "</b><code>" + esc(f.f) + "</code><span>" + esc(f.w) + "</span></div>";
    }).join("");
  }

  /* ---------------- class-wise syllabus with covered tracking ---------------- */
  var DONE = "srt_syllabus_done_v1";
  function doneSet() {
    try { return JSON.parse(localStorage.getItem(DONE) || "[]"); } catch (e) { return []; }
  }
  function saveDone(list) { try { localStorage.setItem(DONE, JSON.stringify(list)); } catch (e) {} }

  function renderSyllabus() {
    var done = doneSet();
    $("#syllabusNote").textContent = CFG.syllabus.note;
    $("#syllabusFoot").textContent = CFG.syllabus.footnote;

    $("#syllabusPanels").innerHTML = CFG.syllabus.classes.map(function (g, i) {
      function col(board, list) {
        var items = list.map(function (name, j) {
          var key = g.cls + "-" + board + "-" + j;
          var on = done.indexOf(key) > -1;
          return '<label class="chap' + (on ? " done" : "") + '" data-key="' + key + '" data-name="' + esc(name.toLowerCase()) + '">' +
            '<input type="checkbox" data-syll-key="' + key + '"' + (on ? " checked" : "") + ">" +
            "<span>" + esc(name) + "</span></label>";
        }).join("");
        return '<div class="syll-col"><h4>' + (board === "cbse" ? "CBSE" : "ICSE") + ' · <span data-syll-count="' +
          g.cls + "-" + board + '">0</span> chapters</h4><div class="syll-list">' + items + "</div></div>";
      }
      return '<div class="tab-panel' + (i === 0 ? " active" : "") + '" id="syl-' + i + '" role="tabpanel">' +
        '<div class="grid grid-2 syll-cols">' + col("cbse", g.cbse) + col("icse", g.icse) + "</div></div>";
    }).join("");

    $("#syllabusPanels").addEventListener("change", function (e) {
      var box = e.target;
      if (!box.matches || !box.matches('[data-syll-key]')) return;
      var list = doneSet();
      var key = box.getAttribute("data-syll-key");
      var i = list.indexOf(key);
      if (box.checked && i < 0) list.push(key);
      if (!box.checked && i > -1) list.splice(i, 1);
      saveDone(list);
      box.closest(".chap").classList.toggle("done", box.checked);
      updateSyllabusTotals();
    });

    $("#syllabusSearch").addEventListener("input", filterSyllabus);
    $("#syllabusReset").addEventListener("click", function () {
      saveDone([]);
      $$("#syllabusPanels input[data-syll-key]").forEach(function (b) { b.checked = false; b.closest(".chap").classList.remove("done"); });
      $("#syllabusSearch").value = "";
      filterSyllabus();
      updateSyllabusTotals();
      toast("Syllabus ticks cleared");
    });

    updateSyllabusTotals();
  }

  function filterSyllabus() {
    var q = ($("#syllabusSearch").value || "").trim().toLowerCase();
    var shown = 0;
    $$("#syllabusPanels .chap").forEach(function (l) {
      var hit = !q || l.getAttribute("data-name").indexOf(q) > -1;
      l.classList.toggle("hidden-chap", !hit);
      if (hit) shown++;
    });
    $("#syllabusCount").textContent = q
      ? shown + " chapter" + (shown === 1 ? "" : "s") + ' matching "' + q + '"'
      : "0 of 0 chapters covered";
    if (q) return;
    updateSyllabusTotals();
  }

  function updateSyllabusTotals() {
    var total = 0, done = 0, list = doneSet();
    CFG.syllabus.classes.forEach(function (g) {
      ["cbse", "icse"].forEach(function (b) {
        var n = g[b].length;
        total += n;
        var hit = 0;
        g[b].forEach(function (_, j) { if (list.indexOf(g.cls + "-" + b + "-" + j) > -1) hit++; });
        done += hit;
        var el = $('[data-syll-count="' + g.cls + "-" + b + '"]');
        if (el) el.textContent = hit + "/" + n;
      });
    });
    var pct = total ? Math.round(done * 100 / total) : 0;
    $("#syllabusPct").textContent = pct + "%";
    if (!$("#syllabusSearch").value) {
      $("#syllabusCount").textContent = done + " of " + total + " chapters covered";
    }
  }

  function renderMethod() {
    $("#methodSteps").innerHTML = CFG.method.map(function (m) {
      return '<div class="step reveal"><h4>' + esc(m.t) + "</h4><p>" + esc(m.d) + "</p></div>";
    }).join("");
  }

  function renderSchedule() {
    $("#schedulePanels").innerHTML = CFG.schedule.map(function (g, i) {
      var rows = g.rows.map(function (r) {
        return "<tr><td class=\"nowrap\"><b>" + esc(r[0]) + "</b></td><td class=\"nowrap\">" + esc(r[1]) +
          "</td><td>" + esc(r[2]) + "</td><td>" + esc(r[3]) + "</td></tr>";
      }).join("");
      return '<div class="tab-panel' + (i === 0 ? " active" : "") + '" id="sched-' + i + '" role="tabpanel">' +
        '<div class="table-wrap"><table><caption>' + esc(g.tab) + "</caption><thead><tr>" +
        "<th>Day</th><th>Time</th><th>Subject / session</th><th>Batch</th></tr></thead><tbody>" + rows + "</tbody></table></div></div>";
    }).join("");
  }

  function renderTutor() {
    $("#tutorPoints").innerHTML = CFG.tutor.points.map(function (p) {
      return "<li>" + icon("check") + "<span>" + esc(p) + "</span></li>";
    }).join("");
  }

  function renderResults() {
    var tb = $("#resultsTable tbody");
    tb.innerHTML = CFG.results.map(function (r) {
      return "<tr><td>" + esc(r.cls) + "</td><td><b>" + esc(r.sub) + "</b></td><td>" + esc(r.board) +
        '</td><td><span class="pill" style="padding:6px 12px">' + esc(r.score) + "</span></td><td><b>+" + esc(r.delta) + "</b></td></tr>";
    }).join("");
  }

  function renderAreas() {
    var base = CFG.brand.baseArea;
    $("#areaList").innerHTML = CFG.areas.map(function (a) {
      return '<li data-area="' + esc(a.toLowerCase()) + '">' + esc(a) +
        (a === base ? ' <span class="area-base">Our base</span>' : "") + "</li>";
    }).join("");
    $("#areaSearch").addEventListener("input", function () {
      var q = ($("#areaSearch").value || "").trim().toLowerCase();
      var hits = 0;
      $$("#areaList li").forEach(function (li) {
        var hit = !q || li.getAttribute("data-area").indexOf(q) > -1;
        li.classList.toggle("hidden-area", !hit);
        if (hit) hits++;
      });
      $("#areaNote").textContent = q
        ? hits + " area" + (hits === 1 ? "" : "s") + ' within 10–15 km of ' + base + ' matching "' + q + '". If your area is not listed, ask — it is usually still possible.'
        : base + " is our base — home tuition anywhere within roughly 10–15 km. Areas outside the list are usually possible too, just ask.";
    });
  }

  function renderGallery() {
    $("#galleryGrid").innerHTML = CFG.gallery.map(function (g, i) {
      return '<figure class="reveal" tabindex="0" role="button" data-idx="' + i + '">' +
        '<img src="assets/img/' + esc(g.img) + '" alt="' + esc(g.cap) + '" width="400" height="300" loading="lazy">' +
        "<figcaption>" + esc(g.cap) + "</figcaption></figure>";
    }).join("");
  }

  function renderReviews() {
    $("#reviewTrack").innerHTML = CFG.testimonials.map(function (t) {
      var stars = "";
      for (var i = 0; i < 5; i++) stars += icon("star");
      return '<div class="slide"><div class="quote"><span class="stars" aria-label="5 out of 5">' + stars + "</span>" +
        "<p>" + esc(t.text) + '</p><div class="who"><b>' + esc(t.name) + "</b><span>" + esc(t.tag) + "</span></div></div></div>";
    }).join("");
    $("#revDots").innerHTML = CFG.testimonials.map(function (_, i) {
      return '<button type="button" data-i="' + i + '" aria-label="Review ' + (i + 1) + '"></button>';
    }).join("");
    goReview(0);
  }

  function renderFaqs() {
    $("#faqList").innerHTML = CFG.faqs.map(function (f) {
      return '<div class="acc-item"><button class="acc-q" type="button" aria-expanded="false">' +
        "<span>" + esc(f.q) + "</span>" + icon("chev", "chev") + "</button>" +
        '<div class="acc-a"><div>' + esc(f.a) + "</div></div></div>";
    }).join("");
  }

  function renderFeeCards() {
    ["classroom", "home", "online"].forEach(function (k) {
      var f = CFG.fees[k];
      var el = $('[data-bind="fee' + k.charAt(0).toUpperCase() + k.slice(1) + 'Base"]');
      if (el) el.textContent = Number(f.bands["10"]).toLocaleString("en-IN");
      var lbl = $('[data-bind="fee' + k.charAt(0).toUpperCase() + k.slice(1) + 'Label"]');
      if (lbl) lbl.textContent = f.label;
      var note = $('[data-bind="fee' + k.charAt(0).toUpperCase() + k.slice(1) + 'Note"]');
      if (note) note.textContent = f.note;
    });
  }

  /* ---------------- 5. finder ---------------- */
  function initFinder() {
    $("#finder").addEventListener("submit", function (e) {
      e.preventDefault();
      var cls = $("#fClass").value, board = $("#fBoard").value, mode = $("#fMode").value;
      var fee = CFG.fees[mode].bands[cls] || CFG.fees[mode].bands["10"];
      var modeName = { classroom: "in-class batch", home: "home tuition", online: "live online class" }[mode];
      var out = $("#finderResult");
      out.classList.add("show");
      out.innerHTML = icon("check") + "Class " + cls + " · " + board + " · Mathematics · " + modeName +
        " — " + money(fee) + " per month. " +
        (mode === "classroom"
          ? "Weekday batch between 6:00 PM and 10:00 PM."
          : mode === "home"
            ? "Any slot between 6:00 PM and 10:00 PM, or 10 AM – 10 PM at weekends."
            : "Live one-to-one, booked inside the 6 PM – 10 PM or 10 AM – 10 PM windows.");
      $("#heroResultTag").innerHTML = "Class " + cls + " · " + board + "<small>" + esc(modeName) + " available</small>";
      toast("Matching batch found — see the details below");
      document.querySelector("#fees").scrollIntoView({ behavior: "smooth", block: "start" });
      setCalc({ mode: mode, cls: cls });
    });
  }

  /* ---------------- 6. fee calculator ---------------- */
  function calc() {
    var cls = $("#calcClass").value, mode = $("#calcMode").value, months = Number($("#calcMonths").value);
    var rate = Number(CFG.fees[mode].bands[cls] || CFG.fees[mode].bands["10"]);
    var monthly = rate;
    var total = monthly * months;
    $("#calcMonthly").textContent = money(monthly);
    $("#calcTotal").textContent = money(total);
    $("#calcPerClass").textContent = money(rate);
    $("#calcMonthsLabel").textContent = months;
    $("#calcDiscountNote").textContent = "Mathematics only · " + CFG.fees[mode].label + " · " + money(rate) + " per month.";
    return { cls: cls, mode: mode, months: months, monthly: monthly, total: total, rate: rate };
  }

  function setCalc(opts) {
    if (opts.mode) $("#calcMode").value = opts.mode;
    if (opts.cls) $("#calcClass").value = opts.cls;
    calc();
  }

  function initCalc() {
    ["#calcClass", "#calcMode", "#calcMonths"].forEach(function (sel) {
      $(sel).addEventListener("change", calc);
    });
    $("#calcPrint").addEventListener("click", function () { window.print(); });
    $("#printPage").addEventListener("click", function () { window.print(); });
    $("#calcEnquire").addEventListener("click", function () {
      var r = calc();
      var modeName = CFG.fees[r.mode].label;
      this.setAttribute("data-wa",
        "Hi Sir, I used the fee calculator on your website.\nClass " + r.cls + " · CBSE/ICSE · Mathematics\n" +
        modeName + ": " + money(r.monthly) + " per month · " + money(r.total) + " for " + r.months + " months" +
        "\nPlease confirm the slot.");
      this.setAttribute("href", waLink(this.getAttribute("data-wa")));
    });
    calc();
  }

  /* ---------------- 7. SAM chat ---------------- */
  function samReply(q) {
    var s = (q || "").toLowerCase();
    var A = CFG.sam.answers;
    if (/fee|cost|price|charge|₹|rupee|payment/.test(s)) return A.fee;
    if (/time|timing|slot|schedule|when|hour|evening|morning|batch/.test(s)) return A.time;
    if (/syllabus|chapter|curriculum|course|covered|tick/.test(s)) return A.syllabus;
    if (/area|near|locality|location|located|address|where|place|home tuition in/.test(s)) return A.area;
    if (/subject|which subject|all subject/.test(s)) return A.subjects;
    if (/demo|free|trial|try/.test(s)) return A.demo;
    if (/home tuition|home tuition fees|visit|door|house|at home|personal|one to one|1-to-1/.test(s)) return A.home;
    if (/math|mathematic|formula|algebra|geometry|trigonometry|chapter/.test(s)) return A.maths;
    if (/board|cbse|icse/.test(s)) return A.boards;
    if (/result|progress|mark|test|report|improvement/.test(s)) return A.results;
    if (/call|phone|contact|whatsapp|talk|speak|number/.test(s)) return A.talk;
    return A.default;
  }

  function samPush(html, who) {
    var log = $("#samLog");
    var d = document.createElement("div");
    d.className = "msg msg--" + (who || "sam");
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }

  function initSam() {
    samPush(CFG.sam.greeting);
    $("#samQuick").innerHTML = CFG.sam.quick.map(function (q) {
      return '<button type="button" data-q="' + esc(q) + '">' + esc(q) + "</button>";
    }).join("");

    function ask(text) {
      if (!text.trim()) return;
      samPush(esc(text), "me");
      setTimeout(function () { samPush(samReply(text)); }, 340);
    }
    var samRole = $("#samRole");
    if (samRole && CFG.sam.full) samRole.textContent = CFG.sam.full;
    $("#samForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("#samInput");
      ask(input.value);
      input.value = "";
    });
    $("#samQuick").addEventListener("click", function (e) {
      if (e.target.tagName !== "BUTTON") return;
      ask(e.target.getAttribute("data-q"));
    });
    $("#samFab").addEventListener("click", function () {
      var s = document.querySelector("#sam");
      window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 84, behavior: "smooth" });
      setTimeout(function () { $("#samInput").focus(); }, 600);
    });
  }

  /* ---------------- 8. gallery lightbox ---------------- */
  function initGallery() {
    var lb = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap"), idx = 0;
    var items = CFG.gallery;
    function show(i) {
      idx = (i + items.length) % items.length;
      img.src = "assets/img/" + items[idx].img;
      img.alt = items[idx].cap;
      cap.textContent = items[idx].cap;
    }
    function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; $("#lbClose").focus(); }
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    $("#galleryGrid").addEventListener("click", function (e) {
      var f = e.target.closest("figure");
      if (f) open(Number(f.getAttribute("data-idx")));
    });
    $("#galleryGrid").addEventListener("keydown", function (e) {
      var f = e.target.closest("figure");
      if (f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(Number(f.getAttribute("data-idx"))); }
    });
    $("#lbPrev").addEventListener("click", function () { show(idx - 1); });
    $("#lbNext").addEventListener("click", function () { show(idx + 1); });
    $("#lbClose").addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------------- 9. reviews slider ---------------- */
  var revIdx = 0, revVisible = true, revAuto = null;
  function goReview(i) {
    var n = CFG.testimonials.length;
    revIdx = (i + n) % n;
    $("#reviewTrack").style.transform = "translateX(-" + (revIdx * 100) + "%)";
    $$("#revDots button").forEach(function (b, j) { b.classList.toggle("active", j === revIdx); });
  }
  function stopAuto() { if (revAuto) { clearInterval(revAuto); revAuto = null; } }
  function initReviews() {
    function next() { goReview(revIdx + 1); }
    $("#revNext").addEventListener("click", function () { stopAuto(); next(); });
    $("#revPrev").addEventListener("click", function () { stopAuto(); goReview(revIdx - 1); });
    $("#revDots").addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") { stopAuto(); goReview(Number(e.target.getAttribute("data-i"))); }
    });
    $("#reviews").addEventListener("mouseenter", stopAuto);
    $("#reviews").addEventListener("mouseleave", function () {
      if (!revAuto && revVisible) revAuto = setInterval(next, 7000);
    });
    if (!("IntersectionObserver" in window)) { revAuto = setInterval(next, 7000); return; }
    var io = new IntersectionObserver(function (en) {
      revVisible = en[0].isIntersecting;
      if (!revVisible) stopAuto();
      else if (!revAuto) revAuto = setInterval(next, 7000);
    }, { threshold: .25 });
    io.observe($("#reviews"));
  }

  /* ---------------- 10. tabs / accordion / filters / counters ---------------- */
  function initTabs() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-tab]");
      if (!t) return;
      var group = t.parentElement;
      var target = document.getElementById(t.getAttribute("data-tab"));
      if (!target) return;
      $$("[data-tab]", group).forEach(function (b) {
        b.classList.toggle("active", b === t);
        if (b.hasAttribute("role")) b.setAttribute("aria-selected", b === t ? "true" : "false");
      });
      var panel = target.parentElement;
      $$(".tab-panel", panel).forEach(function (p) { p.classList.toggle("active", p === target); });
      if (target.id.indexOf("sched-") === 0) {
        var s = $("#schedulePanels");
        $$(".tab-panel", s).forEach(function (p) { p.classList.toggle("active", p === target); });
      }
    });
  }

  function initAcc() {
    $("#faqList").addEventListener("click", function (e) {
      var q = e.target.closest(".acc-q");
      if (!q) return;
      var item = q.parentElement, panel = $(".acc-a", item);
      var open = item.classList.contains("open");
      $$(".acc-item").forEach(function (it) {
        it.classList.remove("open");
        $(".acc-q", it).setAttribute("aria-expanded", "false");
        $(".acc-a", it).style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  function initCounters() {
    var els = $$("[data-count]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || ""); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = Number(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1100, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-IN") + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: .4 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    function watch() { $$(".reveal:not(.in)").forEach(function (el) { io.observe(el); }); }
    watch();
    window.addEventListener("load", watch);
    document.addEventListener("srt:rerendered", watch);
  }

  /* ---------------- 11. enquiry ---------------- */
  function enquiryBody() {
    var get = function (id) { return ($(id).value || "").trim(); };
    var phone = get("#ePhone").replace(/\D/g, "");
    return {
      get: get,
      phone: phone,
      subject: get("#eSubjects") || "Mathematics",
      text:
        "Student: " + get("#eName") + "\n" +
        (get("#eParent") ? "Parent: " + get("#eParent") + "\n" : "") +
        "Class: " + get("#eClass") + " · " + get("#eBoard") + "\n" +
        "Mode: " + get("#eMode") + "\n" +
        "Phone: " + phone + "\n" +
        "Subject: " + (get("#eSubjects") || "Mathematics") + "\n" +
        (get("#eArea") ? "Area: " + get("#eArea") + "\n" : "") +
        (get("#eTiming") ? "Preferred timing: " + get("#eTiming") + "\n" : "") +
        (get("#eMsg") ? "Details: " + get("#eMsg") : ""),
      line:
        "Class " + get("#eClass") + " · " + get("#eBoard") + " · " + (get("#eSubjects") || "Mathematics") +
        " · " + get("#eMode") + " · " + phone
    };
  }

  function initEnquiry() {
    $("#enquiryForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      var d = enquiryBody();
      var get = d.get;
      var via = (e.submitter && e.submitter.value) || "whatsapp";

      if (!get("#eName")) { $("#eName").focus(); $("#enquiryStatus").textContent = "Please enter the student's name."; return; }
      if (d.phone.length < 10) { $("#ePhone").focus(); $("#enquiryStatus").textContent = "Please enter a valid 10-digit phone number."; return; }

      try {
        var leads = JSON.parse(localStorage.getItem(LEADS) || "[]");
        leads.push({ at: new Date().toISOString(), name: get("#eName"), parent: get("#eParent"),
          cls: get("#eClass"), board: get("#eBoard"), mode: get("#eMode"), phone: d.phone,
          subjects: d.subject, area: get("#eArea"), timing: get("#eTiming"), message: get("#eMsg"), via: via });
        localStorage.setItem(LEADS, JSON.stringify(leads));
      } catch (err) { /* storage may be blocked */ }

      var opened = [];
      if (via === "whatsapp" || via === "both") {
        window.open(waLink("New tuition enquiry\n" + d.text), "_blank", "noopener");
        opened.push("WhatsApp");
      }
      if (via === "email" || via === "both") {
        window.location.href = "mailto:" + CFG.contact.email +
          "?subject=" + encodeURIComponent("New Mathematics tuition enquiry — " + get("#eName")) +
          "&body=" + encodeURIComponent("New tuition enquiry (from the website)\n\n" + d.text);
        opened.push("email");
      }

      var status = via === "both"
        ? "Opening WhatsApp and your email app so the tutor is notified on both."
        : via === "email"
          ? "Opening your email app with the details. Press send — the slot is confirmed on WhatsApp."
          : "Opening WhatsApp with your details — press send and the slot is confirmed within a few hours.";
      $("#enquiryStatus").textContent = status;
      toast("Enquiry ready on " + opened.join(" + "));
      f.reset();
      $("#eSubjects").value = CFG.subjects[0].name;
    });
  }

  /* ---------------- 12. admin ---------------- */
  function initAdmin() {
    var modal = $("#adminModal");
    var pin = String(CFG.admin.pin);

    function open() {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      $("#adminLogin").hidden = false;
      $("#adminBody").hidden = true;
      $("#adminPin").value = "";
      $("#adminPinMsg").textContent = "";
      $("#adminPin").focus();
    }
    function close() { modal.classList.remove("open"); document.body.style.overflow = ""; }

    $$("[data-admin-open]").forEach(function (b) { b.addEventListener("click", open); });
    $("#adminClose").addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("open")) close(); });

    $("#adminUnlock").addEventListener("click", function () {
      if ($("#adminPin").value === pin) {
        $("#adminLogin").hidden = true;
        $("#adminBody").hidden = false;
        fillAdmin();
      } else {
        $("#adminPinMsg").textContent = "Incorrect PIN. Try again.";
        $("#adminPin").value = "";
      }
    });
    $("#adminPin").addEventListener("keydown", function (e) { if (e.key === "Enter") $("#adminUnlock").click(); });

    function fillAdmin() {
      $("#aPhone").value = CFG.contact.phonePrimaryDisplay;
      $("#aWa").value = CFG.contact.whatsapp;
      $("#aEmail").value = CFG.contact.email;
      $("#aArea").value = CFG.brand.areaLine;
      $("#aFounder").value = CFG.brand.founder;
      $("#aAbout").value = CFG.tutor.about;
      $("#aClassroom").value = CFG.fees.classroom.bands["10"];
      $("#aHome").value = CFG.fees.home.bands["10"];
      $("#aOnline").value = CFG.fees.online.bands["10"];
      refreshLeads();
    }

    function refreshAll() {
      bindAll();
      renderFeeCards();
      calc();
      document.dispatchEvent(new Event("srt:rerendered"));
    }

    $("#saveContact").addEventListener("click", function () {
      var p1 = ($("#aPhone").value || "").replace(/\D/g, "");
      var wa = ($("#aWa").value || "").replace(/\D/g, "");
      if (p1.length >= 10) {
        CFG.contact.phonePrimary = p1.slice(-10);
        CFG.contact.phonePrimaryDisplay = $("#aPhone").value.trim();
      }
      if (wa.length >= 10) CFG.contact.whatsapp = wa.replace(/^0+/, "");
      if ($("#aEmail").value.trim()) CFG.contact.email = $("#aEmail").value.trim();
      CFG.brand.areaLine = $("#aArea").value.trim() || CFG.brand.areaLine;
      CFG.brand.founder = $("#aFounder").value.trim() || CFG.brand.founder;
      CFG.tutor.about = $("#aAbout").value.trim() || CFG.tutor.about;
      persist();
      refreshAll();
      toast("Contact details saved in this browser");
    });

    $("#saveFees").addEventListener("click", function () {
      [["classroom", "#aClassroom"], ["home", "#aHome"], ["online", "#aOnline"]].forEach(function (pair) {
        var val = Number($(pair[1]).value);
        if (val > 0) CFG.fees[pair[0]].bands["10"] = val;
      });
      persist();
      refreshAll();
      toast("Fee rates saved — calculator updated");
    });

    $("#resetCfg").addEventListener("click", function () {
      try { localStorage.removeItem(LS); } catch (e) {}
      CFG = window.__SRT_CFG__ = JSON.parse(JSON.stringify(RAW));
      refreshAll();
      fillAdmin();
      toast("All changes reset to defaults");
    });

    $("#exportLeads").addEventListener("click", function () {
      var leads = getLeads();
      if (!leads.length) { toast("No enquiries saved yet"); return; }
      var cols = ["at", "name", "parent", "cls", "board", "mode", "phone", "subjects", "timing", "message"];
      var csv = cols.join(",") + "\n" + leads.map(function (l) {
        return cols.map(function (c) { return '"' + String(l[c] == null ? "" : l[c]).replace(/"/g, '""') + '"'; }).join(",");
      }).join("\n");
      var a = document.createElement("a");
      a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      a.download = "enquiries.csv";
      a.click();
      toast("CSV downloaded");
    });

    $("#clearLeads").addEventListener("click", function () {
      try { localStorage.removeItem(LEADS); } catch (e) {}
      refreshLeads();
      toast("Enquiry list cleared");
    });

    $("#clearSyllabus").addEventListener("click", function () {
      saveDone([]);
      $$("#syllabusPanels input[data-syll-key]").forEach(function (b) {
        b.checked = false;
        b.closest(".chap").classList.remove("done");
      });
      updateSyllabusTotals();
      toast("Syllabus ticks cleared");
    });

    function getLeads() { try { return JSON.parse(localStorage.getItem(LEADS) || "[]"); } catch (e) { return []; } }
    function refreshLeads() {
      var leads = getLeads();
      $("#leadCount").textContent = leads.length + " enquiry / enquiries saved in this browser.";
      $("#adminNote").innerHTML = leads.slice(-8).reverse().map(function (l) {
        return "<div style='border-bottom:1px solid var(--line);padding:8px 0'><b>" + esc(l.name) + "</b> · Class " +
          esc(l.cls) + " · " + esc(l.subjects) + "<br><span style='color:var(--text-mute)'>" +
          esc(l.phone) + " · " + esc(new Date(l.at).toLocaleString()) + "</span></div>";
      }).join("");
    }
  }

  /* ---------------- boot ---------------- */
  function init() {
    initTheme();
    initNav();
    bindAll();
    renderMarquee();
    renderFormulaLab();
    renderSyllabus();
    renderMethod();
    renderSchedule();
    renderTutor();
    renderResults();
    renderAreas();
    renderGallery();
    renderReviews();
    renderFaqs();
    renderFeeCards();
    initFinder();
    initCalc();
    initSam();
    initGallery();
    initReviews();
    initTabs();
    initAcc();
    initCounters();
    initReveal();
    initEnquiry();
    initAdmin();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
