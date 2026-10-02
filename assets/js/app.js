/* ============================================================================
   MathSaathi — MPC tuition, Classes 6-10, CBSE & ICSE
   app.js — single-file, no dependencies, no build step.

   Data contract  : window.SRT  (assets/js/data.js)
   Storage keys   : srt_cfg_v2, srt_leads_v2, srt_syllabus_state_v2,
                    srt_test_history_v2, srt_sam_ctx_v2, srt_theme
   Everything runs in the browser. No request is sent anywhere.
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.SRT || {};
  var ROOT = document.documentElement;

  /* ---------------------------------------------------------------- storage */
  var K = {
    cfg: "srt_cfg_v2",
    leads: "srt_leads_v2",
    syll: "srt_syllabus_state_v2",
    tests: "srt_test_history_v2",
    sam: "srt_sam_ctx_v2",
    theme: "srt_theme"
  };

  function lsGet(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function lsSet(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }
  function lsRaw(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsDel(key) {
    try { window.localStorage.removeItem(key); } catch (e) {}
  }

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }
  function deepMerge(base, over) {
    if (!over || typeof over !== "object") return base;
    Object.keys(over).forEach(function (k) {
      if (over[k] && typeof over[k] === "object" && !Array.isArray(over[k]) &&
          base[k] && typeof base[k] === "object" && !Array.isArray(base[k])) {
        deepMerge(base[k], over[k]);
      } else if (over[k] !== undefined) {
        base[k] = over[k];
      }
    });
    return base;
  }

  /* ------------------------------------------------------------- tiny utils */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function esc(v) {
    return String(v === undefined || v === null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function attr(v) { return esc(v).replace(/`/g, "&#96;"); }

  function icon(id, cls) {
    return '<svg class="ico ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + esc(id) + '"></use></svg>';
  }

  function money(n) {
    var v = Number(n);
    if (!isFinite(v)) return "—";
    return "₹" + Math.round(v).toLocaleString("en-IN");
  }
  function cap(s) { return String(s || "").charAt(0).toUpperCase() + String(s || "").slice(1); }

  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  function waLink(msg) {
    var base = "https://wa.me/" + CFG.contact.whatsapp + "?text=";
    return base + encodeURIComponent(msg || "Hi Sir, I would like to know about MPC tuition classes.");
  }

  function scrollToId(hash) {
    var el = hash && hash.charAt(0) === "#" ? $(hash) : null;
    if (!el) return false;
    var top = el.getBoundingClientRect().top + (window.pageYOffset || 0) - 92;
    if (window.scrollTo) window.scrollTo({ top: top, behavior: "smooth" });
    return true;
  }

  var toastTimer = null;
  function toast(msg) {
    var t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  /* ------------------------------------------------------------ config load */
  var CFG = deepMerge(clone(DATA), lsGet(K.cfg, {}));

  var CLASSES = (CFG.classes || []).map(String);
  var BOARDS = (CFG.boards || ["CBSE", "ICSE"]).map(function (b) { return String(b).toUpperCase(); });
  var SUBJECTS = CFG.subjects || [];
  var SUBJ_IDS = SUBJECTS.map(function (s) { return s.id; });
  var STATUSES = (CFG.syllabus && CFG.syllabus.statuses) || [];
  var CLASS_ROWS = (CFG.syllabus && CFG.syllabus.classes) || [];
  var TESTBANK = CFG.testBank || [];
  var MAX_STAGE = STATUSES.length ? STATUSES.length - 1 : 3;

  function subjById(id) {
    for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i];
    return { id: id, name: id, short: id };
  }
  function subjShort(id) { return subjById(id).short || subjById(id).name; }
  function subjName(id) { return subjById(id).name || id; }

  /** chapter lists for one class + subject, keyed by lower-case board */
  function chaptersFor(cls, subjectId) {
    var out = {};
    var row = null;
    for (var i = 0; i < CLASS_ROWS.length; i++) {
      if (String(CLASS_ROWS[i].cls) === String(cls)) { row = CLASS_ROWS[i]; break; }
    }
    if (!row) return out;
    var group = row[subjectId] || {};
    Object.keys(group).forEach(function (b) {
      out[String(b).toLowerCase()] = group[b] || [];
    });
    return out;
  }

  var TOTAL_CHAPTERS = 0;
  (function countChapters() {
    CLASS_ROWS.forEach(function (row) {
      SUBJ_IDS.forEach(function (sid) {
        var group = row[sid] || {};
        Object.keys(group).forEach(function (b) {
          TOTAL_CHAPTERS += (group[b] || []).length;
        });
      });
    });
  })();

  var STAGE_LABEL = STATUSES.reduce(function (m, s) { m[s.id] = s.label; return m; }, {});
  var STAGE_SHORT = STATUSES.reduce(function (m, s) { m[s.id] = s.short; return m; }, {});

  function normBoard(b) { return String(b || "").trim().toLowerCase(); }

  /* ============================================================== 1. bindings */
  function resolveBind(key) {
    var map = {
      brandName: CFG.brand.name,
      brandTagline: CFG.brand.tagline,
      phonePrimaryDisplay: CFG.contact.phonePrimaryDisplay,
      email: CFG.contact.email,
      areaLine: CFG.brand.areaLine,
      areaLineShort: CFG.brand.baseArea + ", " + CFG.brand.city,
      tutorName: CFG.brand.founder,
      tutorRole: CFG.tutor.role,
      tutorAbout: CFG.tutor.about,
      tutorExperience: CFG.tutor.experience,
      tutorStudents: CFG.tutor.students,
      tutorBoards: CFG.tutor.boards
    };
    return map[key] !== undefined ? map[key] : "";
  }

  function renderBindings() {
    $$("[data-bind]").forEach(function (el) {
      var v = resolveBind(el.getAttribute("data-bind"));
      if (v) el.textContent = v;
    });

    $$("[data-count-syllabus]").forEach(function (el) {
      el.textContent = el.textContent.replace(/[\d,]+\+?\s*chapters/i, TOTAL_CHAPTERS + " chapters");
    });

    var yr = $("#year");
    if (yr) yr.textContent = String(new Date().getFullYear());

    /* WhatsApp / tel / mailto hrefs, kept in sync with the contact block */
    $$("[data-wa]").forEach(function (a) {
      a.setAttribute("href", waLink(a.getAttribute("data-wa")));
    });
    $$('a[href^="tel:"]').forEach(function (a) {
      var digits = String(CFG.contact.phonePrimary).replace(/\D/g, "");
      if (digits) a.setAttribute("href", "tel:+91" + digits);
    });
    $$('a[href^="mailto:"]').forEach(function (a) {
      if (CFG.contact.email) a.setAttribute("href", "mailto:" + CFG.contact.email);
    });

    var hr = $("#heroResultTag");
    if (hr) {
      var tail = String(CFG.brand.areaLine).split("·").slice(1).join("·").trim();
      hr.childNodes[0].nodeValue = CFG.brand.baseArea + ", " + CFG.brand.city;
      var sm = $("small", hr);
      if (sm) sm.textContent = tail || ("Home tuition within 10–15 km");
    }
  }

  function refreshBindings() { renderBindings(); document.dispatchEvent(new Event("srt:rerendered")); }

  /* ================================================================ 2. theme */
  function applyTheme(t) {
    ROOT.setAttribute("data-theme", t === "dark" ? "dark" : "light");
  }
  function initTheme() {
    var saved = lsRaw(K.theme);
    if (saved === "dark" || saved === "light") applyTheme(saved);
    else applyTheme(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    var btn = $("#themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = ROOT.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { window.localStorage.setItem(K.theme, next); } catch (e) {}
    });
  }

  /* ========================================================= 3. nav / chrome */
  function initNav() {
    var burger = $("#burger"), drawer = $("#drawer"), overlay = $("#overlay");
    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
      if (burger) burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add("open");
      if (overlay) overlay.classList.add("open");
      if (burger) burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    if (burger) burger.addEventListener("click", openDrawer);
    var dc = $("#drawerClose");
    if (dc) dc.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);
    $$("#drawer a").forEach(function (a) { a.addEventListener("click", closeDrawer); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });

    /* smooth in-page anchors, skipping real links and the hash-only wa placeholders */
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      if (a.hasAttribute("data-wa")) return;
      var target = $(href);
      if (!target) return;
      e.preventDefault();
      closeDrawer();
      scrollToId(href);
      if (history.replaceState) history.replaceState(null, "", href);
    });

    var top = $(".to-top");
    if (top) {
      top.addEventListener("click", function () {
        if (window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    var printBtn = $("#printPage");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
  }

  function initReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
    document.addEventListener("srt:rerendered", function () {
      $$(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
    });
  }

  function initCounters() {
    var els = $$("[data-count]");
    if (!els.length) return;
    var run = function (el) {
      var target = Number(el.getAttribute("data-count")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = target + suffix;
        return;
      }
      var start = null, dur = 900;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================== 4. marquee */
  function renderMarquee() {
    var host = $("#marquee");
    if (!host) return;
    var bits = [];
    SUBJECTS.forEach(function (s) {
      bits.push(s.name + " · Classes " + CLASSES[0] + " to " + CLASSES[CLASSES.length - 1]);
    });
    bits.push("CBSE & ICSE chapter-wise");
    bits.push(TOTAL_CHAPTERS + " chapters tracked");
    bits.push(TESTBANK.length + " sample questions with solutions");
    bits.push("Mon–Fri 6–10 PM · Sat–Sun 10 AM–10 PM");
    bits.push("In-class from " + money(CFG.fees.classroom.from));
    bits.push("Home & online from " + money(CFG.fees.home.from));
    bits.push("Free demo class · batch of 12");
    var row = bits.map(function (b) {
      return "<span>" + icon("check") + esc(b) + "</span>";
    }).join("");
    host.innerHTML = row + row;
  }

  /* ============================================================== 5. subjects */
  function renderSubjects() {
    var host = $("#subjectGrid");
    if (!host) return;
    host.innerHTML = SUBJECTS.map(function (s) {
      var topics = (s.topics || []).map(function (t) {
        return '<span class="mini-chip">' + esc(t) + "</span>";
      }).join("");
      return '' +
        '<article class="subj reveal">' +
          '<div class="subj-top">' +
            '<span class="card-ico ' + attr(s.tone || "brand") + '">' + icon(s.icon || "book") + "</span>" +
            "<div><h3>" + esc(s.name) + "</h3>" +
              '<div class="subj-meta">' + esc(s.classes || "") + " · " + esc(s.board || "") + "</div>" +
            "</div>" +
          "</div>" +
          "<p>" + esc(s.blurb || "") + "</p>" +
          '<div class="chips-mini">' + topics + "</div>" +
          '<p class="subj-exam">' + esc(s.exam || "") + "</p>" +
          '<div class="subj-foot">' +
            '<button class="btn btn--ghost btn--sm" type="button" data-syll-sub="' + attr(s.id) + '">' + icon("book") + " Syllabus</button>" +
            '<button class="btn btn--primary btn--sm" type="button" data-test-sub="' + attr(s.id) + '">' + icon("file") + " Sample test</button>" +
          "</div>" +
        "</article>";
    }).join("");

    $$("[data-syll-sub]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        SYLL.subject = b.getAttribute("data-syll-sub");
        renderSyllabus();
        scrollToId("#syllabus");
      });
    });
    $$("[data-test-sub]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-test-sub");
        var sel = $("#tSubject");
        if (sel) {
          sel.value = id;
          onTestSetupChange();
        }
        TEST.active = null;
        showTestView("setup");
        scrollToId("#practice");
      });
    });
  }

  /* =============================================================== 6. finder */
  function initFinder() {
    var form = $("#finder");
    if (!form) return;

    var feeFor = function (modeId) {
      var f = CFG.fees[modeId] || {};
      return f.from;
    };
    var modeName = function (modeId) {
      for (var i = 0; i < (CFG.modes || []).length; i++) if (CFG.modes[i].id === modeId) return CFG.modes[i].name;
      return modeId;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var cls = $("#fClass").value;
      var board = normBoard($("#fBoard").value);
      var mode = $("#fMode").value;
      var out = $("#finderResult");

      var perSubject = SUBJECTS.map(function (s) {
        var list = chaptersFor(cls, s.id);
        var n = (list[board] || []).length;
        return { s: s, n: n };
      });
      var total = perSubject.reduce(function (a, b) { return a + b.n; }, 0);

      var parts = [];
      perSubject.forEach(function (p) {
        parts.push("<b>" + esc(p.s.short) + "</b> " + p.n);
      });

      var body = "For <b>Class " + esc(cls) + "</b> on <b>" + esc(board.toUpperCase()) + "</b> we follow <b>" +
        total + " chapters</b> — " + parts.join(" · ") + ". ";
      body += "In <b>" + esc(modeName(mode)) + "</b> the starting fee is <b>" + money(feeFor(mode)) +
        " a month</b> for all three subjects. ";
      body += "Open the <a class=\"inline-link\" href=\"#syllabus\">syllabus tracker</a> to see the chapters, " +
        "<a class=\"inline-link\" href=\"#practice\">take a sample test</a> from that exact chapter list, or " +
        "<a class=\"inline-link\" href=\"#admission\">book a free demo class</a>.";

      if (total === 0) {
        body = "That combination is not in the chapter list yet. <a class=\"inline-link\" href=\"#admission\">Ask the tutor on WhatsApp</a> and the exact sequence will be confirmed before the batch starts.";
      }

      out.innerHTML = icon("check") + "<span>" + body + "</span>";
      out.classList.add("show");

      /* pre-select the same class in the tracker, the test engine and the calculator */
      var sc = $("#classTabs [data-syll-cls='" + cls + "']");
      if (sc) sc.click();
      var tc = $("#tClass");
      if (tc && tc.value !== cls) { tc.value = cls; onTestSetupChange(); }
      var cc = $("#calcClass");
      if (cc) { cc.value = cls; renderCalc(); }
    });
  }

  /* ================================================= 7. class-wise syllabus */
  var SYLL = { subject: SUBJ_IDS[0] || "maths", cls: CLASSES[CLASSES.length - 1] || "10", state: null };
  SYLL.state = lsGet(K.syll, {}) || {};

  function chapterKey(cls, subjectId, board, name) {
    return [cls, subjectId, normBoard(board), name].join("|");
  }
  function stageOf(key) {
    var v = Number(SYLL.state[key]);
    return isFinite(v) && v >= 0 && v <= MAX_STAGE ? v : 0;
  }
  function setStage(key, v) {
    if (v <= 0) delete SYLL.state[key];
    else SYLL.state[key] = v;
    lsSet(K.syll, SYLL.state);
  }

  function visibleChapterKeys() {
    var out = [];
    SUBJ_IDS.forEach(function (sid) {
      CLASSES.forEach(function (cls) {
        var lists = chaptersFor(cls, sid);
        Object.keys(lists).forEach(function (b) {
          lists[b].forEach(function (name) { out.push(chapterKey(cls, sid, b, name)); });
        });
      });
    });
    return out;
  }

  function overallProgress() {
    var keys = visibleChapterKeys();
    if (!keys.length) return { pct: 0, done: 0, counts: [0, 0, 0, 0] };
    var counts = [0, 0, 0, 0], weight = 0;
    keys.forEach(function (k) {
      var s = stageOf(k);
      counts[s]++;
      weight += s;
    });
    return {
      pct: Math.round((weight / (keys.length * MAX_STAGE)) * 100),
      done: counts[MAX_STAGE],
      counts: counts
    };
  }

  function renderSyllabusTabs() {
    var sub = $("#subjTabs"), cls = $("#classTabs");
    if (sub) {
      sub.innerHTML = SUBJECTS.map(function (s) {
        return '<button class="tab' + (s.id === SYLL.subject ? " active" : "") + '" type="button" role="tab" ' +
          'aria-selected="' + (s.id === SYLL.subject) + '" data-syll-sub="' + attr(s.id) + '">' +
          esc(s.short || s.name) + "</button>";
      }).join("");
      $$("[data-syll-sub]", sub).forEach(function (b) {
        b.addEventListener("click", function () {
          SYLL.subject = b.getAttribute("data-syll-sub");
          renderSyllabus();
        });
      });
    }
    if (cls) {
      cls.innerHTML = CLASSES.map(function (c) {
        return '<button class="tab' + (String(c) === String(SYLL.cls) ? " active" : "") + '" type="button" role="tab" ' +
          'aria-selected="' + (String(c) === String(SYLL.cls)) + '" data-syll-cls="' + attr(c) + '">Class ' + esc(c) + "</button>";
      }).join("");
      $$("[data-syll-cls]", cls).forEach(function (b) {
        b.addEventListener("click", function () {
          SYLL.cls = b.getAttribute("data-syll-cls");
          renderSyllabus();
        });
      });
    }
  }

  function renderSyllabusBars() {
    var bars = $("#syllBars"), legend = $("#syllLegend");
    var p = overallProgress();

    if (bars) {
      bars.innerHTML = STATUSES.map(function (s) {
        var n = p.counts[Number(s.id)] || 0;
        var w = TOTAL_CHAPTERS ? Math.round((n / TOTAL_CHAPTERS) * 100) : 0;
        return '<div class="pbar">' +
            '<span class="pbar-l">' + esc(s.label) + "</span>" +
            '<span class="pbar-t"><span class="pbar-f st-' + esc(s.id) + '" style="width:' + w + '%"></span></span>' +
            '<span class="pbar-v">' + n + "</span>" +
          "</div>";
      }).join("");
    }
    if (legend) {
      legend.innerHTML = STATUSES.map(function (s) {
        return '<span class="lg st-' + esc(s.id) + '"><span class="lg-dot"></span>' +
          esc(s.label) + " · " + (p.counts[Number(s.id)] || 0) + "</span>";
      }).join("");
    }

    var pct = $("#syllabusPct"), cnt = $("#syllabusCount");
    if (pct) pct.textContent = p.pct + "%";
    if (cnt) {
      cnt.textContent = p.done + " of " + TOTAL_CHAPTERS + " mastered";
    }

    var foot = $("#syllabusFoot");
    if (foot && CFG.syllabus.footnote) foot.textContent = CFG.syllabus.footnote;

    var note = $("#syllabusNote");
    if (note && CFG.syllabus.note) note.textContent = CFG.syllabus.note;
  }

  function renderSyllabusPanels() {
    var host = $("#syllabusPanels");
    if (!host) return;
    var lists = chaptersFor(SYLL.cls, SYLL.subject);

    var cols = BOARDS.map(function (b) {
      var names = lists[normBoard(b)] || [];
      var rows = names.map(function (name, i) {
        var key = chapterKey(SYLL.cls, SYLL.subject, b, name);
        var st = stageOf(key);
        return '<button class="chap st-' + st + '" type="button" data-key="' + attr(key) + '" ' +
          'title="Stage ' + st + " of " + MAX_STAGE + " — click to move on\">" +
            '<span class="chap-n">' + (i + 1) + "</span>" +
            '<span class="chap-t">' + esc(name) + "</span>" +
            '<span class="chap-dot">' + esc(STAGE_SHORT[st] || "New") + "</span>" +
          "</button>";
      }).join("");
      return '<div class="syll-col">' +
          "<h3>" + esc(b) + " · Class " + esc(SYLL.cls) + " <span>(" + names.length + ")</span></h3>" +
          '<div class="syll-list" data-board="' + attr(b) + '">' +
            (rows || '<p class="calc-note">Chapter list not added for this board yet.</p>') +
          "</div>" +
        "</div>";
    }).join("");

    host.innerHTML = '<div class="split syll-cols">' + cols + "</div>";

    $$(".chap", host).forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-key");
        var next = (stageOf(key) + 1) % (MAX_STAGE + 1);
        setStage(key, next);
        b.className = b.className.replace(/\bst-\d\b/g, "").trim() + " st-" + next;
        var dot = $(".chap-dot", b);
        if (dot) dot.textContent = STAGE_SHORT[next] || "New";
        b.setAttribute("title", "Stage " + next + " of " + MAX_STAGE + " — click to move on");
        renderSyllabusBars();
        applySyllabusFilter();
      });
    });
  }

  function applySyllabusFilter() {
    var input = $("#syllabusSearch");
    var q = input ? input.value.trim().toLowerCase() : "";
    $$(".chap").forEach(function (b) {
      var t = $(".chap-t", b).textContent.toLowerCase();
      b.classList.toggle("hidden-chap", !!q && t.indexOf(q) === -1);
    });
  }

  function renderSyllabus() {
    renderSyllabusTabs();
    renderSyllabusPanels();
    renderSyllabusBars();
    applySyllabusFilter();
    document.dispatchEvent(new Event("srt:rerendered"));
  }

  function initSyllabus() {
    var search = $("#syllabusSearch");
    if (search) search.addEventListener("input", applySyllabusFilter);

    var reset = $("#syllabusReset");
    if (reset) {
      reset.addEventListener("click", function () {
        SYLL.state = {};
        lsSet(K.syll, SYLL.state);
        renderSyllabus();
        toast("Syllabus tracker cleared — every chapter is back to Not started.");
      });
    }
    renderSyllabus();
  }

  /* ==================================================== 8. practice engine */
  var TEST = { active: null, timer: null, left: 0 };

  function poolFor(opts) {
    var q = TESTBANK.filter(function (x) {
      if (String(x.cls) !== String(opts.cls)) return false;
      if (x.subject !== opts.subject) return false;
      if (opts.chapter && x.chapter !== opts.chapter) return false;
      if (opts.board && opts.board !== "all") {
        /* the bank is board-shared; chapters are filtered by board in the syllabus */
        var lists = chaptersFor(opts.cls, opts.subject);
        var names = lists[normBoard(opts.board)] || [];
        if (names.length && names.indexOf(x.chapter) === -1) return false;
      }
      return true;
    });
    return q;
  }

  function testOpts() {
    return {
      cls: $("#tClass") ? $("#tClass").value : "10",
      subject: $("#tSubject") ? $("#tSubject").value : SUBJ_IDS[0],
      board: $("#tBoard") ? $("#tBoard").value : "all",
      chapter: $("#tChapter") ? $("#tChapter").value : "",
      count: Number(($("#tCount") || {}).value || 10),
      minutes: Number(($("#tTimer") || {}).value || 0)
    };
  }

  function fillChapterOptions(opts) {
    var sel = $("#tChapter");
    if (!sel) return;
    var lists = chaptersFor(opts.cls, opts.subject);
    var names = {};
    Object.keys(lists).forEach(function (b) {
      (lists[b] || []).forEach(function (n) { names[n] = 1; });
    });
    if (opts.board && opts.board !== "all") {
      var only = lists[normBoard(opts.board)] || [];
      names = {};
      only.forEach(function (n) { names[n] = 1; });
    }
    var uniq = Object.keys(names).sort();
    sel.innerHTML = '<option value="">All chapters</option>' +
      uniq.map(function (n) { return '<option value="' + attr(n) + '">' + esc(n) + "</option>"; }).join("");
    if (opts.chapter && uniq.indexOf(opts.chapter) === -1) sel.value = "";
  }

  function renderTestPool() {
    var opts = testOpts();
    var pool = poolFor(opts);
    var el = $("#testPool");
    var boards = opts.board === "all" ? "both boards" : opts.board;
    var scope = "Class " + opts.cls + " · " + subjName(opts.subject) + " · " + boards +
      (opts.chapter ? " · " + opts.chapter : " · all chapters");
    var note = "";
    if (pool.length < opts.count) {
      note = " <b>Only " + pool.length + " questions</b> match this exact filter — the test will use all of them.";
    } else {
      note = " " + pool.length + " questions in this pool.";
    }
    if (el) {
      el.innerHTML = "Pool: " + esc(scope) + "." + note +
        (opts.board === "all"
          ? " Question bank is board-shared; the chapter list above is filtered board-wise."
          : " Chapters filtered from the " + esc(opts.board) + " list.");
    }
  }

  function onTestSetupChange() {
    var opts = testOpts();
    fillChapterOptions(opts);
    renderTestPool();
    renderTestStats();
  }

  function renderTestStats() {
    var host = $("#testStats");
    if (!host) return;
    var hist = lsGet(K.tests, []) || [];
    if (!hist.length) {
      host.innerHTML = '<p class="calc-note" style="margin-top:14px">No tests taken in this browser yet. ' +
        "Your score, accuracy and weak chapters appear here after the first attempt.</p>";
      return;
    }
    var bySubject = {};
    hist.forEach(function (h) {
      var k = h.subject || "other";
      if (!bySubject[k]) bySubject[k] = { n: 0, right: 0, total: 0 };
      bySubject[k].n++;
      bySubject[k].right += Number(h.right) || 0;
      bySubject[k].total += Number(h.total) || 0;
    });
    var acc = hist.reduce(function (a, h) {
      return { right: a.right + (Number(h.right) || 0), total: a.total + (Number(h.total) || 0) };
    }, { right: 0, total: 0 });
    var best = hist.reduce(function (m, h) { return Math.max(m, h.pct || 0); }, 0);

    var tiles = [
      { b: String(hist.length), s: "tests taken" },
      { b: best + "%", s: "best score" },
      { b: (acc.total ? Math.round((acc.right / acc.total) * 100) : 0) + "%", s: "overall accuracy" },
      { b: hist.length ? new Date(hist[hist.length - 1].at).toLocaleDateString("en-IN") : "—", s: "last attempt" }
    ];
    var bars = Object.keys(bySubject).map(function (k) {
      var b = bySubject[k];
      var p = b.total ? Math.round((b.right / b.total) * 100) : 0;
      return '<div class="pbar"><span class="pbar-l">' + esc(subjShort(k)) + "</span>" +
        '<span class="pbar-t"><span class="pbar-f st-3" style="width:' + p + '%"></span></span>' +
        '<span class="pbar-v">' + p + "%</span></div>";
    }).join("");

    host.innerHTML = '<div class="stat-strip" style="margin-top:14px">' +
      tiles.map(function (t) { return "<div><b>" + esc(t.b) + "</b><span>" + esc(t.s) + "</span></div>"; }).join("") +
      "</div>" +
      '<div class="syll-bars" style="margin-top:12px">' + bars + "</div>";
  }

  function showTestView(which) {
    var setup = $("#testSetup"), view = $("#testView"), res = $("#testResult");
    if (setup) setup.hidden = which !== "setup";
    if (view) view.hidden = which !== "test";
    if (res) res.hidden = which !== "result";
  }

  function clearTestStage() {
    ["#testQuestions", "#testPalette", "#testResult"].forEach(function (sel) {
      var el = $(sel);
      if (el) el.innerHTML = "";
    });
    var timer = $("#testTimer");
    if (timer) timer.hidden = true;
  }

  function shuffle(arr, seed) {
    var a = arr.slice();
    var rnd = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function startTest() {
    var opts = testOpts();
    var pool = poolFor(opts);
    if (!pool.length) {
      toast("No sample question matches that filter yet. Pick All chapters or another class.");
      return;
    }
    var list = shuffle(pool, opts.count * 977 + pool.length).slice(0, opts.count);

    TEST.active = {
      opts: opts, list: list, answers: {}, flags: {}, self: {},
      startedAt: Date.now(), graded: null
    };
    stopTimer();

    var title = $("#testTitle");
    if (title) title.textContent = "Class " + opts.cls + " · " + subjName(opts.subject) +
      (opts.chapter ? " · " + opts.chapter : "");

    showTestView("test");
    renderTestQuestions();
    renderTestPalette();
    if (opts.minutes > 0) startTimer(opts.minutes * 60);
    else { var box = $("#testTimer"); if (box) box.hidden = true; }

    if (window.scrollTo) window.scrollTo({ top: ($("#practice").getBoundingClientRect().top + window.pageYOffset - 90), behavior: "smooth" });
  }

  function startTimer(seconds) {
    stopTimer();
    TEST.left = seconds;
    var box = $("#testTimer");
    if (!box) return;
    box.hidden = false;
    function tick() {
      var m = Math.floor(TEST.left / 60), s = TEST.left % 60;
      var b = $("b", box);
      if (b) b.textContent = m + ":" + String(s).padStart(2, "0");
      if (TEST.left <= 0) {
        stopTimer();
        submitTest(true);
        return;
      }
      TEST.left--;
    }
    tick();
    TEST.timer = setInterval(tick, 1000);
  }
  function stopTimer() {
    if (TEST.timer) { clearInterval(TEST.timer); TEST.timer = null; }
  }

  function isAnswered(q, ans) {
    if (!q) return false;
    if (q.type === "short") return !!TEST.active.self[ans];
    return ans !== undefined && ans !== null && String(ans).length > 0;
  }

  function renderTestQuestions() {
    var host = $("#testQuestions");
    if (!host || !TEST.active) return;
    host.innerHTML = TEST.active.list.map(function (q, i) {
      return questionCard(q, i);
    }).join("");
    updateProgress();
  }

  function questionCard(q, i) {
    var head = '<div class="qhead">' +
        '<span class="qnum">' + (i + 1) + "</span>" +
        '<span class="qmeta lv-' + attr(q.level || "easy") + '">' + esc(cap(q.level || "easy")) + "</span>" +
        '<span class="qmeta">' + esc(q.chapter) + "</span>" +
        '<button class="qflag" type="button" data-flag="' + i + '" aria-pressed="false">' + icon("flag") + "Flag</button>" +
      "</div>";

    var body = "";
    if (q.type === "mcq") {
      var sel = TEST.active.answers[i];
      body = '<div class="qopts">' + (q.options || []).map(function (o, k) {
        return '<button class="opt' + (Number(sel) === k ? " sel" : "") + '" type="button" data-opt="' + k + '">' +
          '<span class="opt-k">' + "ABCD".charAt(k) + "</span><span>" + esc(o) + "</span></button>";
      }).join("") + "</div>";
    } else if (q.type === "num") {
      var val = TEST.active.answers[i] || "";
      body = '<div class="qanswer">' +
        '<label class="qalab" for="num-' + i + '">Your answer' + (q.unit ? " (" + esc(q.unit) + ")" : "") + "</label>" +
        '<div class="qinput-wrap">' +
          '<input class="qnum-in" id="num-' + i + '" type="text" inputmode="decimal" data-num="' + i + '" value="' + attr(val) + '" placeholder="Type the number">' +
          (q.unit ? '<span class="qunit">' + esc(q.unit) + "</span>" : "") +
        "</div></div>";
    } else {
      var st = TEST.active.self[i];
      body = '<div class="qanswer">' +
        '<label class="qalab" for="short-' + i + '">Write your answer, then check it yourself</label>' +
        '<textarea class="qshort" id="short-' + i + '" rows="3" data-short="' + i + '" ' +
          'placeholder="Show the full method you would write in the exam">' + esc(TEST.active.answers[i] || "") + "</textarea>" +
        '<div class="qtabs-row">' +
          '<button class="qtab' + (st === 1 ? " active" : "") + '" type="button" data-self="' + i + '" data-val="1">' + icon("check") + "I got it right</button>" +
          '<button class="qtab' + (st === 0 ? " active" : "") + '" type="button" data-self="' + i + '" data-val="0">' + icon("x") + "I got it wrong</button>" +
        "</div>" +
        '<p class="calc-note">Open the Solution tab after writing your own attempt — comparing the two is where the marks come from.</p>' +
      "</div>";
    }

    var tabs = '<div class="qtabs-row">' +
        '<button class="qtab" type="button" data-tab="qhint" data-i="' + i + '">' + icon("bulb") + "Hint</button>" +
        '<button class="qtab" type="button" data-tab="qsol" data-i="' + i + '">' + icon("file") + "Solution</button>" +
      "</div>" +
      '<div class="qextra" id="panel-qhint-' + i + '" hidden><b>Hint</b><p>' + esc(q.hint || "Think about the formula for this chapter.") + "</p></div>" +
      '<div class="qextra sol" id="panel-qsol-' + i + '" hidden><b>Worked solution</b><p>' + esc(q.solution || "Compare your steps with the chapter revision card in the Formula Lab.") + "</p></div>";

    return '<article class="qcard" id="q' + i + '">' + head +
      '<p class="qtext">' + esc(q.q) + "</p>" + body + tabs + "</article>";
  }

  function updateProgress() {
    if (!TEST.active) return;
    var total = TEST.active.list.length;
    var done = TEST.active.list.filter(function (q, i) { return isAnswered(q, TEST.active.answers[i]); }).length;
    var el = $("#testProgress");
    if (el) el.textContent = done + " of " + total + " answered";
  }

  function renderTestPalette() {
    var host = $("#testPalette");
    if (!host || !TEST.active) return;
    host.innerHTML = TEST.active.list.map(function (q, i) {
      var cls = "pal-btn";
      if (isAnswered(q, TEST.active.answers[i])) cls += " done";
      if (q.type === "short" && TEST.active.self[i] !== undefined) cls += " selfcheck";
      if (TEST.active.flags[i]) cls += " flag";
      return '<button class="' + cls + '" type="button" data-jump="' + i + '" aria-label="Go to question ' + (i + 1) + '">' + (i + 1) + "</button>";
    }).join("");
    $$("[data-jump]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        var card = $("#q" + b.getAttribute("data-jump"));
        if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function syncPalette() {
    if (!TEST.active) return;
    $$("#testPalette .pal-btn").forEach(function (b) {
      var i = Number(b.getAttribute("data-jump"));
      var q = TEST.active.list[i];
      b.className = "pal-btn" +
        (isAnswered(q, TEST.active.answers[i]) ? " done" : "") +
        (q.type === "short" && TEST.active.self[i] !== undefined ? " selfcheck" : "") +
        (TEST.active.flags[i] ? " flag" : "");
    });
  }

  function numEqual(a, b) {
    var x = parseFloat(String(a).replace(/[^\d.\-]/g, ""));
    var y = parseFloat(String(b).replace(/[^\d.\-]/g, ""));
    if (!isFinite(x) || !isFinite(y)) return false;
    if (Math.abs(x - y) < 1e-9) return true;
    /* accept a rounding difference of up to 1% for unit-converted answers */
    var bigger = Math.max(Math.abs(x), Math.abs(y));
    return bigger > 0 && Math.abs(x - y) / bigger < 0.01;
  }

  function markText(q) {
    if (q.type === "mcq") {
      var k = Number(q.answer);
      return "ABCD".charAt(k) + ") " + ((q.options || [])[k] || "");
    }
    if (q.type === "num") return String(q.answer) + (q.unit ? " " + q.unit : "");
    if (Array.isArray(q.answer)) return q.answer.join(" · ");
    return String(q.answer);
  }

  function gradeTest() {
    var T = TEST.active;
    var right = 0, wrong = 0, pending = 0;
    var weak = {};
    T.list.forEach(function (q, i) {
      var ok = false, kind = q.type;
      if (q.type === "mcq") {
        ok = Number(T.answers[i]) === Number(q.answer);
      } else if (q.type === "num") {
        ok = numEqual(T.answers[i], q.answer);
      } else {
        if (T.self[i] === undefined) pending++;
        ok = T.self[i] === 1;
      }
      T.graded = T.graded || {};
      T.graded[i] = ok ? "right" : (pending ? "self" : "wrong");
      if (ok) right++;
      else { wrong++; weak[q.chapter] = (weak[q.chapter] || 0) + 1; }
    });
    return { right: right, wrong: wrong, pending: pending, weak: weak, total: T.list.length };
  }

  function submitTest(auto) {
    if (!TEST.active) return;
    stopTimer();
    var g = gradeTest();
    var T = TEST.active;
    T.pct = g.total ? Math.round((g.right / g.total) * 100) : 0;
    T.gradedAt = Date.now();

    var hist = lsGet(K.tests, []) || [];
    hist.push({
      at: T.gradedAt, cls: T.opts.cls, subject: T.opts.subject, chapter: T.opts.chapter || "all",
      right: g.right, total: g.total, pct: T.pct, weak: g.weak
    });
    if (hist.length > 40) hist = hist.slice(-40);
    lsSet(K.tests, hist);

    /* mark each card */
    $$("#testQuestions .qcard").forEach(function (card, i) {
      var q = T.list[i];
      var state = g.total ? (T.graded[i] || "") : "";
      card.classList.remove("right", "wrong", "selfcheck");
      if (state === "right") card.classList.add("right");
      else if (state === "wrong") card.classList.add("wrong");
      else if (state === "self") card.classList.add("selfcheck");

      $$(".opt", card).forEach(function (o) {
        var k = Number(o.getAttribute("data-opt"));
        o.classList.remove("is-right", "is-wrong", "sel");
        if (k === Number(q.answer)) o.classList.add("is-right");
        else if (Number(T.answers[i]) === k) o.classList.add("is-wrong");
        o.disabled = true;
      });
      var ni = $(".qnum-in", card);
      if (ni) ni.disabled = true;
      var sh = $(".qshort", card);
      if (sh) sh.disabled = true;

      var note = document.createElement("div");
      note.className = "qmark " + (state === "right" ? "ok" : state === "wrong" ? "no" : "self");
      note.innerHTML = state === "right"
        ? "Correct."
        : "Correct answer: <b>" + esc(markText(q)) + "</b>";
      if (state === "self") note.innerHTML = "Write your answer, then compare it with the Solution tab.";
      card.appendChild(note);
    });
    $$("#testPalette .pal-btn").forEach(function (b) {
      var i = Number(b.getAttribute("data-jump"));
      b.classList.remove("done", "flag", "right", "wrong", "selfcheck");
      var st = T.graded[i];
      if (st === "right") b.classList.add("right");
      else if (st === "wrong") b.classList.add("wrong");
      else if (st === "self") b.classList.add("selfcheck");
      if (isAnswered(T.list[i], T.answers[i])) b.classList.add("done");
      if (T.flags[i]) b.classList.add("flag");
    });

    renderTestResult(T, g, auto);
    renderTestStats();
  }

  function sparkline() {
    var hist = lsGet(K.tests, []) || [];
    if (hist.length < 2) return "";
    var pts = hist.map(function (h) { return h.pct || 0; }).slice(-12);
    var w = 220, hgt = 60;
    var step = w / Math.max(1, pts.length - 1);
    var d = pts.map(function (p, i) {
      return (i ? "L" : "M") + Math.round(i * step) + " " + Math.round(hgt - (p / 100) * (hgt - 8) - 4);
    }).join(" ");
    return '<div id="resTrend" style="margin-top:14px">' +
      '<div class="lbl">Score trend · last ' + pts.length + " tests</div>" +
      '<svg viewBox="0 0 ' + w + " " + hgt + '" width="100%" height="' + hgt + '" role="img" aria-label="Score trend chart" preserveAspectRatio="none">' +
        '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg></div>";
  }

  function renderTestResult(T, g, auto) {
    var host = $("#testResult");
    if (!host) return;
    var weak = Object.keys(g.weak).map(function (k) { return { chapter: k, n: g.weak[k] }; })
      .sort(function (a, b) { return b.n - a.n; });

    var verdict = T.pct >= 90 ? "Excellent — this is board-ready."
      : T.pct >= 70 ? "Good attempt. Tighten the chapters listed below and it becomes a 90% test."
      : T.pct >= 40 ? "The concepts are there but careless mistakes are costing marks."
      : "This needs a proper revision round before the next weekly test.";

    var tiles = [
      { b: T.pct + "%", s: "score" },
      { b: g.right + " / " + g.total, s: "correct" },
      { b: String(g.wrong), s: "wrong" },
      { b: String(weak.length), s: "weak chapters" }
    ];

    var weakHtml = weak.length
      ? '<ul class="weak-list">' + weak.map(function (w) {
          return "<li><b>" + esc(w.chapter) + "</b><span>" + plural(w.n, "missed", "missed") + "</span></li>";
        }).join("") + "</ul>"
      : '<p class="calc-note">No weak chapters in this attempt — every question you attempted was right.</p>';

    var next = [];
    if (weak.length) {
      next.push("Start the next revision set from <b>" + esc(weak[0].chapter) + "</b> — open its Hint tab first, attempt it again, then compare with the Solution.");
    } else {
      next.push("Move to the next chapter in the class-wise syllabus tracker and mark it Learning.");
    }
    next.push("Re-take this exact test in 2–3 days and check that the score moved up.");
    next.push("Mark the chapters you found difficult as <b>Revised</b>, not <b>Mastered</b>, until a second clean attempt.");
    if (auto) next.unshift("<b>Time ran out</b> — this was submitted automatically, so treat the score as a floor, not a ceiling.");

    host.innerHTML =
      '<div class="res-top">' +
        '<div class="res-ring" id="resRing" style="--p:' + T.pct + '"><b>' + g.right + "/" + g.total + "</b><span>Score</span></div>" +
        "<div>" +
          "<h3>Class " + esc(T.opts.cls) + " · " + esc(subjName(T.opts.subject)) + (T.opts.chapter ? " · " + esc(T.opts.chapter) : "") + "</h3>" +
          "<p>" + esc(verdict) + (g.pending ? " <b>" + g.pending + " written answer" + (g.pending === 1 ? " is" : "s are") +
            " still waiting for your self-check</b> — open the Solution tab on those questions." : "") + "</p>" +
          '<div class="res-tiles">' + tiles.map(function (t) {
            return "<div><b>" + esc(t.b) + "</b><span>" + esc(t.s) + "</span></div>";
          }).join("") + "</div>" +
          sparkline() +
        "</div>" +
      "</div>" +
      '<div class="res-cols">' +
        "<div><h3>Weak chapters</h3>" + weakHtml + "</div>" +
        "<div><h3>What to do next</h3><ul class=\"tagline-list\">" +
          next.map(function (n) { return "<li>" + icon("check") + n + "</li>"; }).join("") +
        "</ul></div>" +
      "</div>" +
      '<div class="btn-row">' +
        '<button class="btn btn--primary" type="button" id="testSame">' + icon("refresh") + " Re-take this test</button>" +
        '<button class="btn btn--ghost" type="button" id="testNew">New test with different questions</button>' +
        '<a class="btn btn--ghost" href="#syllabus">Update the syllabus tracker</a>' +
      "</div>";

    var same = $("#testSame");
    if (same) same.addEventListener("click", function () {
      TEST.active = null;
      clearTestStage();
      showTestView("setup");
      onTestSetupChange();
      window.scrollTo({ top: ($("#practice").getBoundingClientRect().top + window.pageYOffset - 90), behavior: "smooth" });
    });
    var nw = $("#testNew");
    if (nw) nw.addEventListener("click", function () {
      TEST.active = null;
      clearTestStage();
      showTestView("test");
      startTest();
    });

    showTestView("result");
    host.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function initTest() {
    var cSel = $("#tClass"), sSel = $("#tSubject"), bSel = $("#tBoard");
    if (cSel && !cSel.options.length) {
      cSel.innerHTML = CLASSES.map(function (c) {
        return '<option value="' + attr(c) + '"' + (String(c) === String(CLASSES[CLASSES.length - 1]) ? " selected" : "") + ">Class " + esc(c) + "</option>";
      }).join("");
    }
    if (sSel && !sSel.options.length) {
      sSel.innerHTML = SUBJECTS.map(function (s) {
        return '<option value="' + attr(s.id) + '">' + esc(s.name) + "</option>";
      }).join("");
    }

    [cSel, sSel, bSel, $("#tChapter"), $("#tCount"), $("#tTimer")].forEach(function (el) {
      if (el) el.addEventListener("change", onTestSetupChange);
    });

    var start = $("#testStart");
    if (start) start.addEventListener("click", startTest);

    var quit = $("#testQuit");
    if (quit) quit.addEventListener("click", function () {
      if (!TEST.active) return;
      var total = TEST.active.list.length;
      var done = TEST.active.list.filter(function (q, i) { return isAnswered(q, TEST.active.answers[i]); }).length;
      if (done && !window.confirm("You have answered " + done + " of " + total + " questions. Give up on this test?")) return;
      stopTimer();
      TEST.active = null;
      $("#testQuestions").innerHTML = "";
      $("#testPalette").innerHTML = "";
      showTestView("setup");
      renderTestStats();
    });

    var submit = $("#testSubmit");
    if (submit) submit.addEventListener("click", function () { submitTest(false); });

    /* delegated interactions inside the question column */
    var host = $("#testQuestions");
    if (host) {
      host.addEventListener("click", function (e) {
        if (!TEST.active) return;
        var T = TEST.active;

        var opt = e.target.closest("[data-opt]");
        if (opt) {
          var card0 = opt.closest(".qcard");
          var i0 = Number(card0.id.replace("q", ""));
          T.answers[i0] = Number(opt.getAttribute("data-opt"));
          $$(".opt", card0).forEach(function (o) { o.classList.toggle("sel", o === opt); });
          updateProgress(); syncPalette();
          return;
        }

        var flag = e.target.closest("[data-flag]");
        if (flag) {
          var fi = flag.getAttribute("data-flag");
          T.flags[fi] = !T.flags[fi];
          flag.classList.toggle("on", !!T.flags[fi]);
          flag.setAttribute("aria-pressed", String(!!T.flags[fi]));
          syncPalette();
          return;
        }

        var selfBtn = e.target.closest("[data-self]");
        if (selfBtn) {
          var si = selfBtn.getAttribute("data-self");
          T.self[si] = Number(selfBtn.getAttribute("data-val"));
          $$("[data-self='" + si + "']", host).forEach(function (b) {
            b.classList.toggle("active", b === selfBtn);
          });
          updateProgress(); syncPalette();
          return;
        }

        var tab = e.target.closest("[data-tab]");
        if (tab) {
          var ti = tab.getAttribute("data-i");
          var kind = tab.getAttribute("data-tab");
          var panel = $("#panel-" + kind + "-" + ti);
          var wasOpen = panel && !panel.hidden;
          if (panel) panel.hidden = wasOpen;
          tab.classList.toggle("active", !wasOpen);
        }
      });

      host.addEventListener("input", function (e) {
        if (!TEST.active) return;
        var t = e.target;
        if (t.hasAttribute && t.hasAttribute("data-num")) {
          TEST.active.answers[t.getAttribute("data-num")] = t.value;
          updateProgress(); syncPalette();
        }
        if (t.hasAttribute && t.hasAttribute("data-short")) {
          TEST.active.answers[t.getAttribute("data-short")] = t.value;
        }
      });
    }

    onTestSetupChange();
  }

  /* ========================================================== 9. formula lab */
  function renderFormula() {
    var tabs = $("#flTabs"), panels = $("#flPanels");
    if (!tabs || !panels) return;
    var ids = SUBJ_IDS.filter(function (id) { return CFG.formulaLab[id]; });
    if (!ids.length) return;

    tabs.innerHTML = ids.map(function (id, i) {
      return '<button class="tab' + (i === 0 ? " active" : "") + '" type="button" role="tab" ' +
        'aria-selected="' + (i === 0) + '" data-formula-sub="' + attr(id) + '">' + esc(subjShort(id)) + "</button>";
    }).join("");

    panels.innerHTML = ids.map(function (id, i) {
      var g = CFG.formulaLab[id];
      var cards = (g.items || []).map(function (f) {
        return '<article class="fcard">' +
          "<h3>" + esc(f.n) + "</h3>" +
          "<code>" + esc(f.f) + "</code>" +
          "<p>" + esc(f.w) + "</p>" +
        "</article>";
      }).join("");
      return '<div class="tab-panel' + (i === 0 ? " active" : "") + '" data-formula-panel="' + attr(id) + '">' +
        '<div class="grid grid-3">' + cards + "</div></div>";
    }).join("");

    $$("[data-formula-sub]", tabs).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-formula-sub");
        $$("[data-formula-sub]", tabs).forEach(function (x) {
          var on = x === b;
          x.classList.toggle("active", on);
          x.setAttribute("aria-selected", String(on));
        });
        $$("[data-formula-panel]", panels).forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-formula-panel") === id);
        });
      });
    });
  }

  /* ================================================= 10. modes / method / tutor */
  function renderModes() {
    var host = $("#modeGrid");
    if (!host) return;
    host.innerHTML = (CFG.modes || []).map(function (m) {
      var fee = CFG.fees[m.id] || {};
      var points = (m.points || []).map(function (p) {
        return "<li>" + icon("check") + esc(p) + "</li>";
      }).join("");
      var src = m.img ? (/^(assets\/|\.\/|\/)/.test(m.img) ? m.img : "assets/img/" + m.img) : "";
      return '' +
        '<article class="card plan reveal">' +
          (m.best ? '<span class="badge">Most chosen</span>' : "") +
          (src ? '<div class="split-media" style="margin-bottom:14px"><img src="' + attr(src) + '" alt="' + attr(m.name) + '" width="720" height="460" loading="lazy"></div>' : "") +
          '<div class="subj-top">' +
            '<span class="card-ico ' + attr(m.tone || "brand") + '">' + icon(m.icon || "board") + "</span>" +
            "<div><h3>" + esc(m.name) + "</h3>" +
              '<div class="plan-price">' + esc(fee.from ? "from " + money(fee.from) + " / month" : m.from || "") + "</div>" +
            "</div>" +
          "</div>" +
          "<p>" + esc(m.blurb || "") + "</p>" +
          '<ul class="tagline-list">' + points + "</ul>" +
          (fee.note ? '<p class="subj-exam">' + esc(fee.label + " · " + fee.note) + "</p>" : "") +
          '<div class="btn-row">' +
            '<a class="btn btn--primary btn--sm" href="#fees">See fees</a>' +
            '<a class="btn btn--ghost btn--sm" href="#admission" data-wa="Hi Sir, I am interested in ' + attr(m.name) + ' for MPC.">' + icon("wa") + "Enquire</a>" +
          "</div>" +
        "</article>";
    }).join("");
    $$("[data-wa]", host).forEach(function (a) {
      a.setAttribute("href", waLink(a.getAttribute("data-wa")));
    });
  }

  function renderMethod() {
    var host = $("#methodSteps");
    if (!host) return;
    host.innerHTML = (CFG.method || []).map(function (m) {
      return '<div class="step reveal"><h3>' + esc(m.t) + "</h4><p>" + esc(m.d) + "</p></div>";
    }).join("");
  }

  function renderTutorPoints() {
    var host = $("#tutorPoints");
    if (!host) return;
    host.innerHTML = (CFG.tutor.points || []).map(function (p) {
      return "<li>" + icon("check") + esc(p) + "</li>";
    }).join("");
  }

  /* =========================================================== 11. timetable */
  function renderSchedule() {
    var tabs = $("#schedTabs"), panels = $("#schedulePanels");
    if (!tabs || !panels) return;
    var rows = CFG.schedule || [];
    if (!rows.length) return;

    tabs.innerHTML = rows.map(function (r, i) {
      return '<button class="tab' + (i === 0 ? " active" : "") + '" type="button" role="tab" ' +
        'aria-selected="' + (i === 0) + '" data-sched="' + i + '">' + esc(r.tab) + "</button>";
    }).join("");

    panels.innerHTML = rows.map(function (r, i) {
      var body = (r.rows || []).map(function (row) {
        return "<tr>" + row.map(function (cell) { return "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>";
      }).join("");
      return '<div class="tab-panel' + (i === 0 ? " active" : "") + '" data-sched-panel="' + i + '">' +
        '<div class="table-wrap"><table><caption>' + esc(r.tab) + " weekly batch timetable</caption>" +
        "<thead><tr><th>Day</th><th>Time</th><th>What happens</th><th>Batch</th></tr></thead>" +
        "<tbody>" + body + "</tbody></table></div></div>";
    }).join("");

    $$("[data-sched]", tabs).forEach(function (b) {
      b.addEventListener("click", function () {
        var i = b.getAttribute("data-sched");
        $$("[data-sched]", tabs).forEach(function (x) {
          var on = x === b;
          x.classList.toggle("active", on);
          x.setAttribute("aria-selected", String(on));
        });
        $$("[data-sched-panel]", panels).forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-sched-panel") === String(i));
        });
      });
    });
  }

  /* ====================================================== 12. fees + calculator */
  function feeFor(modeId) {
    var f = CFG.fees[modeId] || {};
    return Number(f.from) || 0;
  }

  function renderFeePlans() {
    var host = $("#feePlans");
    if (!host) return;
    var note = $("#feeNote");
    if (note) note.textContent = CFG.fees.note || "";

    host.innerHTML = (CFG.modes || []).map(function (m) {
      var f = CFG.fees[m.id] || {};
      var points = (m.points || []).slice(0, 3).map(function (p) {
        return "<li>" + icon("check") + esc(p) + "</li>";
      }).join("");
      return '' +
        '<article class="card plan' + (m.best ? " plan--best" : "") + '">' +
          (m.best ? '<span class="badge">Most chosen</span>' : "") +
          '<span class="card-ico ' + attr(m.tone || "brand") + '">' + icon(m.icon || "board") + "</span>" +
          "<h3>" + esc(f.label || m.name) + "</h3>" +
          '<div class="plan-price">' + money(f.from) + "<small> / month · all 3 subjects</small></div>" +
          '<ul class="tagline-list">' + points + "</ul>" +
          (f.note ? '<p class="subj-exam">' + esc(f.note) + "</p>" : "") +
          '<div class="btn-row">' +
            '<button class="btn btn--primary btn--sm" type="button" data-calc-mode="' + attr(m.id) + '">' + icon("chart") + "Calculate</button>" +
            '<a class="btn btn--ghost btn--sm" href="#admission" data-wa="Hi Sir, I would like to know more about ' + attr(f.label || m.name) + ' for MPC.">Enquire</a>' +
          "</div>" +
        "</article>";
    }).join("");

    $$("[data-wa]", host).forEach(function (a) {
      a.setAttribute("href", waLink(a.getAttribute("data-wa")));
    });
    $$("[data-calc-mode]", host).forEach(function (b) {
      b.addEventListener("click", function () {
        var sel = $("#calcMode");
        if (sel) { sel.value = b.getAttribute("data-calc-mode"); renderCalc(); }
        scrollToId("#fees");
      });
    });
  }

  function renderCalc() {
    var cSel = $("#calcClass");
    if (cSel && !cSel.options.length) {
      cSel.innerHTML = CLASSES.map(function (c) {
        return '<option value="' + attr(c) + '"' + (String(c) === String(CLASSES[CLASSES.length - 1]) ? " selected" : "") + ">Class " + esc(c) + "</option>";
      }).join("");
    }
    var modeEl = $("#calcMode"), mEl = $("#calcMonths");
    var mode = modeEl ? modeEl.value : "home";
    var months = mEl ? Number(mEl.value) : 1;
    var monthly = feeFor(mode);
    var total = monthly * months;
    var perSubject = Math.round(monthly / Math.max(1, SUBJ_IDS.length));

    var mOut = $("#calcMonthly"), tOut = $("#calcTotal"), pOut = $("#calcPerClass"), lOut = $("#calcMonthsLabel");
    if (mOut) mOut.textContent = money(monthly);
    if (tOut) tOut.textContent = money(total);
    if (pOut) pOut.textContent = money(perSubject);
    if (lOut) lOut.textContent = String(months);

    var cls = cSel ? cSel.value : "";
    var dn = $("#calcDiscountNote");
    if (dn) {
      dn.innerHTML = "Same starting price for Class " + esc(cls) + " and for CBSE &amp; ICSE. " +
        "Per class = the monthly MPC fee split across the 3 subjects. Fees can be paid monthly or for a term — " +
        "the exact plan is confirmed on WhatsApp after the demo class.";
    }

    var enq = $("#calcEnquire");
    if (enq) {
      var msg = "Hi Sir, here is my fee calculation from your website.\n" +
        "Class: " + cls + "\nMode: " + modeLabel(mode) + "\nMonths: " + months +
        "\nMonthly (MPC): " + money(monthly) + "\nTotal for " + months + " months: " + money(total) +
        "\nPer subject per month: " + money(perSubject) + "\n\nIs this slot available?";
      enq.setAttribute("data-wa", msg);
      enq.setAttribute("href", waLink(msg));
    }
  }

  function modeLabel(id) {
    for (var i = 0; i < (CFG.modes || []).length; i++) if (CFG.modes[i].id === id) return CFG.modes[i].name;
    var f = CFG.fees[id];
    return (f && f.label) || id;
  }

  function initFees() {
    renderFeePlans();
    renderCalc();
    ["#calcClass", "#calcMode", "#calcMonths"].forEach(function (s) {
      var el = $(s);
      if (el) el.addEventListener("change", renderCalc);
    });
    var p = $("#calcPrint");
    if (p) p.addEventListener("click", function () { window.print(); });
  }

  /* =============================================================== 13. areas */
  function renderAreas() {
    var host = $("#areaList");
    if (!host) return;
    var areas = CFG.areas || [];
    host.innerHTML = areas.map(function (a) {
      return "<li>" + icon("pin") + esc(a) + "</li>";
    }).join("");

    var search = $("#areaSearch"), note = $("#areaNote");
    if (search) {
      search.addEventListener("input", function () {
        var q = search.value.trim().toLowerCase();
        var shown = 0;
        $$("li", host).forEach(function (li) {
          var hit = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
          li.classList.toggle("hidden-area", !hit);
          if (hit) shown++;
        });
        if (note) {
          note.innerHTML = q
            ? (shown
              ? "<b>" + shown + "</b> of " + areas.length + " localities match “" + esc(search.value.trim()) + "”. Home tuition here is usually possible."
              : "Not in the list yet. Ask anyway — most localities within 10–15 km are possible, and live online works anywhere.")
            : CFG.brand.baseArea + " is our base — home tuition anywhere within roughly 10–15 km.";
        }
      });
    }
  }

  /* ============================================================= 14. results */
  function renderResults() {
    var table = $("#resultsTable");
    if (!table) return;
    var body = $("tbody", table);
    if (!body) return;
    body.innerHTML = (CFG.results || []).map(function (r) {
      var up = /^\+/.test(String(r.delta));
      return "<tr>" +
        "<td>" + esc(r.cls) + "</td>" +
        "<td><b>" + esc(r.sub) + "</b></td>" +
        "<td>" + esc(r.board) + "</td>" +
        "<td><b>" + esc(r.score) + "</b></td>" +
        '<td class="' + (up ? "up" : "flat") + '">' + esc(r.delta) + "</td>" +
      "</tr>";
    }).join("");
  }

  /* ============================================================= 15. reviews */
  var REV = { i: 0, n: 0 };
  function renderReviews() {
    var track = $("#reviewTrack"), dots = $("#revDots");
    if (!track) return;
    var list = CFG.testimonials || [];
    REV.n = list.length;
    if (!REV.n) return;

    track.innerHTML = list.map(function (r) {
      return '' +
        '<figure class="quote">' + icon("star") +
          "<blockquote>" + esc(r.text) + "</blockquote>" +
          "<figcaption><b>" + esc(r.name) + "</b><span>" + esc(r.tag) + "</span></figcaption>" +
        "</figure>";
    }).join("");

    if (dots) {
      dots.innerHTML = list.map(function (_, i) {
        return '<button class="dot' + (i === REV.i ? " active" : "") + '" type="button" data-rev="' + i + '" aria-label="Review ' + (i + 1) + '"></button>';
      }).join("");
      $$("[data-rev]", dots).forEach(function (b) {
        b.addEventListener("click", function () { goReview(Number(b.getAttribute("data-rev"))); });
      });
    }
    goReview(0);

    var prev = $("#revPrev"), next = $("#revNext");
    if (prev) prev.addEventListener("click", function () { goReview(REV.i - 1); });
    if (next) next.addEventListener("click", function () { goReview(REV.i + 1); });
  }
  function goReview(i) {
    if (!REV.n) return;
    REV.i = ((i % REV.n) + REV.n) % REV.n;
    var track = $("#reviewTrack");
    if (track) track.style.transform = "translateX(-" + REV.i * 100 + "%)";
    $$("#revDots .dot").forEach(function (d, k) { d.classList.toggle("active", k === REV.i); });
  }

  /* ============================================================= 16. gallery */
  function renderGallery() {
    var host = $("#galleryGrid");
    if (!host) return;
    host.innerHTML = (CFG.gallery || []).map(function (g, i) {
      var src = /^(assets\/|\.\/|\/)/.test(g.img) ? g.img : "assets/img/" + g.img;
      return '' +
        '<button class="gal-item" type="button" data-idx="' + i + '" aria-label="View: ' + attr(g.cap) + '">' +
          '<img src="' + attr(src) + '" alt="' + attr(g.cap) + '" width="800" height="600" loading="lazy">' +
          "<span>" + esc(g.cap) + "</span>" +
        "</button>";
    }).join("");
    initLightbox();
  }

  function initLightbox() {
    var lb = $("#lightbox");
    if (!lb) return;
    var img = $("#lbImg"), cap = $("#lbCap");
    var list = CFG.gallery || [];
    var cur = 0;

    function show(i) {
      cur = ((i % list.length) + list.length) % list.length;
      var g = list[cur];
      var src = /^(assets\/|\.\/|\/)/.test(g.img) ? g.img : "assets/img/" + g.img;
      img.setAttribute("src", src);
      img.setAttribute("alt", g.cap || "");
      if (cap) cap.textContent = g.cap || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    $$("#galleryGrid [data-idx]").forEach(function (b) {
      b.addEventListener("click", function () { show(Number(b.getAttribute("data-idx"))); });
    });
    var c = $("#lbClose"); if (c) c.addEventListener("click", close);
    var p = $("#lbPrev"); if (p) p.addEventListener("click", function (e) { e.stopPropagation(); show(cur - 1); });
    var n = $("#lbNext"); if (n) n.addEventListener("click", function (e) { e.stopPropagation(); show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* ================================================================= 17. FAQ */
  function renderFaqs() {
    var host = $("#faqList");
    if (!host) return;
    host.innerHTML = (CFG.faqs || []).map(function (f, i) {
      return '' +
        '<div class="acc-item' + (i === 0 ? " open" : "") + '">' +
          '<button class="acc-q" type="button" aria-expanded="' + (i === 0) + '">' +
            "<span>" + esc(f.q) + "</span>" + icon("chev", "chev") +
          "</button>" +
          '<div class="acc-a"' + (i === 0 ? "" : " hidden") + "><p>" + esc(f.a) + "</p></div>" +
        "</div>";
    }).join("");

    $$(".acc-q", host).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".acc-item");
        var panel = $(".acc-a", item);
        var isOpen = item.classList.contains("open");
        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
        if (panel) panel.hidden = isOpen;
      });
    });
  }

  /* ============================================================== 18. Saathi */
  var SAMCTX = lsGet(K.sam, {}) || {};
  var SAM = { last: "", log: [] };

  function samTokens() {
    var c = SAMCTX || {};
    return {
      teacher: CFG.brand.founder,
      teacherShort: CFG.tutor.short || CFG.brand.founder,
      phone: CFG.contact.phonePrimaryDisplay,
      base: CFG.brand.baseArea,
      city: CFG.brand.city,
      areaCount: String((CFG.areas || []).length),
      feeClassroom: money(CFG.fees.classroom.from) + " a month",
      feeHome: money(CFG.fees.home.from) + " a month",
      exp: String(CFG.tutor.experience || "").replace(/[^\d]/g, ""),
      students: CFG.tutor.students,
      about: CFG.tutor.qualification || "",
      qualification: CFG.tutor.qualification || "",
      expLine: CFG.tutor.experience,
      class: c.cls ? String(c.cls) : "6 to 10",
      syllabusCount: String(TOTAL_CHAPTERS),
      syllabusNote: CFG.syllabus.note,
      testCount: String(TESTBANK.length),
      streamNote: CFG.stream.note,
      streamFull: CFG.stream.full,
      timingWeekday: CFG.timings.weekday,
      timingWeekend: CFG.timings.weekend,
      timingNote: CFG.timings.note,
      feeNote: CFG.fees.note,
      endTime: "10:00 PM",
      batchSize: "12 students",
      price: money(feeFor(c.mode || "home"))
    };
  }

  function samFill(html) {
    var t = samTokens();
    return String(html || "")
      .replace(/\{\{([a-zA-Z]+)\}\}/g, function (m, key) {
        return t[key] !== undefined ? t[key] : "";
      })
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function samExtract(text) {
    var t = text.toLowerCase();
    var cls = SAMCTX.cls || "";
    var m = t.match(/\bclass\s*(6|7|8|9|10)\b/) || t.match(/\b(6|7|8|9|10)\s*(?:th|st|nd|rd)?\s*(?:class|standard|grade)?\b/);
    if (m) cls = m[1];
    var subj = SAMCTX.subject || "";
    if (/\b(physics|phys|science 1|phy)\b/.test(t)) subj = "physics";
    else if (/\b(chemistry|chem|science 2|chemi)\b/.test(t)) subj = "chemistry";
    else if (/\b(maths|math|mathematics|mathematic)\b/.test(t)) subj = "maths";
    var board = SAMCTX.board || "";
    if (/\b(cbse)\b/.test(t)) board = "CBSE";
    else if (/\b(icse|cisce)\b/.test(t)) board = "ICSE";
    var mode = SAMCTX.mode || "";
    if (/\b(in[- ]?class|classroom|batch|centre|center)\b/.test(t)) mode = "classroom";
    else if (/\bhome tuition|at home|home[- ]visit|doorstep\b/.test(t)) mode = "home";
    else if (/\bonline|remote|video call|zoom\b/.test(t)) mode = "online";

    SAMCTX = { cls: cls, subject: subj, board: board, mode: mode };
    lsSet(K.sam, SAMCTX);
    return SAMCTX;
  }

  var DOMAIN = /\b(fee|fees|price|cost|price|timing|time|slot|schedule|timetable|batch|class|syllabus|chapter|test|practice|question|book|demo|board|cbse|icse|subject|math|maths|physics|chemistry|physics|formula|revision|week|weekly|month|start|begin|doubt|home|online|admission|join|proof|student|batch|book|progress|report|parent|mark|score|certificat|material|note|stationery|uniform|distance|area|located|location|where|when|how much|how many|which|what|who|why|yes|no|help|plan|method|online|one[- ]to[- ]one)\b/;

  function samScore(intent, text) {
    var hits = 0;
    (intent.kw || []).forEach(function (k) {
      var key = String(k).toLowerCase();
      if (key.length < 2) return;
      if (text.indexOf(key) !== -1) {
        hits += key.indexOf(" ") !== -1 ? 3 : 2;
      } else {
        /* single-word keyword: allow a loose stem match */
        var stem = key.replace(/(s|es|ing)$/, "");
        if (stem.length >= 4 && new RegExp("\\b" + stem, "i").test(text)) hits += 1;
      }
    });
    return hits;
  }

  function samBest(text) {
    var best = null, bestScore = 0;
    (CFG.sam.intents || []).forEach(function (it) {
      if (it.id === "greet") return;
      var s = samScore(it, text);
      if (s > bestScore) { bestScore = s; best = it; }
    });
    return { intent: best, score: bestScore };
  }

  function samReply(text) {
    var q = text.trim();
    if (!q) return;
    samPush("me", esc(q));
    var low = q.toLowerCase();
    var ctx = samExtract(q);
    var best = samBest(low);

    /* greeting / thanks handled on the first words only */
    if (/^\s*(hi|hello|hey|namaste|good (morning|afternoon|evening)|hii|yo)\b/.test(low)) {
      return samSay(samFind("greet"), []);
    }
    if (/\b(thanks|thank you|thx|shukriya)\b/.test(low)) {
      return samSay(samFind("thanks"), []);
    }

    if (!best.intent || best.score === 0 || !DOMAIN.test(low)) {
      return samSayOutOfScope();
    }
    samSay(best.intent, best.intent.links || []);
  }

  function samFind(id) {
    var list = CFG.sam.intents || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function ctxLine() {
    var bits = [];
    if (SAMCTX.cls) bits.push("Class " + SAMCTX.cls);
    if (SAMCTX.subject) bits.push(subjShort(SAMCTX.subject));
    if (SAMCTX.board) bits.push(SAMCTX.board);
    if (!bits.length) return "";
    return '<div class="sam-ctx">' + icon("check") + "Still on: " + esc(bits.join(" · ")) + "</div>";
  }

  function samLinksHtml(links) {
    if (!links || !links.length) return "";
    return '<div class="sam-links">' + links.map(function (l) {
      return '<button class="sam-link" type="button" data-sam-go="' + attr(l.h) + '">' + esc(l.l) + "</button>";
    }).join("") + "</div>";
  }

  function samPush(who, html) {
    var log = $("#samLog");
    if (!log) return;
    var d = document.createElement("div");
    d.className = "msg msg--" + (who === "me" ? "me" : "sam");
    d.innerHTML = html;
    log.appendChild(d);
    while (log.children.length > 60) log.removeChild(log.firstChild);
    log.scrollTop = log.scrollHeight;
  }

  function samSay(intent, links) {
    if (!intent) return samSayFallback();
    var html = samFill(intent.answer);
    samPush("sam", (ctxLine() || "") + html + samLinksHtml(links));
  }

  function samSayOutOfScope() {
    samPush("sam", (ctxLine() || "") + samFill(CFG.sam.outOfScope) + samLinksHtml(CFG.sam.fallbackLinks || []));
  }

  function samSayFallback() {
    var lines = CFG.sam.fallback || [];
    var pick = lines[Math.floor(Math.random() * Math.max(1, lines.length))] || "";
    samPush("sam", (ctxLine() || "") + samFill(pick) + samLinksHtml(CFG.sam.fallbackLinks || []));
  }

  function samRenderQuick() {
    var host = $("#samQuick");
    if (!host) return;
    host.innerHTML = (CFG.sam.quick || []).slice(0, 4).map(function (q) {
      return '<button class="sam-link" type="button" data-sam-q="' + attr(q) + '">' + esc(q) + "</button>";
    }).join("");
  }

  function initSaathi() {
    var log = $("#samLog");
    if (!log) return;

    var name = $("#samName"), role = $("#samRole");
    if (name) name.textContent = CFG.sam.name || "Saathi";
    if (role) role.textContent = CFG.sam.full || "Your guide";

    samRenderQuick();
    samPush("sam", samFill(CFG.sam.greeting) + samLinksHtml(CFG.sam.fallbackLinks || []));

    var form = $("#samForm"), input = $("#samInput");
    if (form && input) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = input.value;
        if (!v.trim()) return;
        input.value = "";
        samReply(v);
      });
    }

    /* starter chips + any route button the answers print */
    document.addEventListener("click", function (e) {
      var q = e.target.closest("[data-sam-q]");
      if (q) {
        samReply(q.getAttribute("data-sam-q"));
        return;
      }
      var go = e.target.closest("[data-sam-go]");
      if (go) {
        var hash = go.getAttribute("data-sam-go");
        var el = $(hash);
        if (!el) return;
        e.preventDefault();
        scrollToId(hash);

        /* route a link into the right tool instead of only scrolling */
        if (hash === "#practice") {
          if (SAMCTX.subject && $("#tSubject")) { $("#tSubject").value = SAMCTX.subject; onTestSetupChange(); }
          if (SAMCTX.cls && $("#tClass")) { $("#tClass").value = String(SAMCTX.cls); onTestSetupChange(); }
          showTestView("setup");
        }
        if (hash === "#syllabus") {
          if (SAMCTX.subject) SYLL.subject = SAMCTX.subject;
          if (SAMCTX.cls) SYLL.cls = String(SAMCTX.cls);
          renderSyllabus();
        }
        if (hash === "#fees" && SAMCTX.mode && $("#calcMode")) {
          $("#calcMode").value = SAMCTX.mode;
          renderCalc();
        }
        if (hash === "#formula" && SAMCTX.subject) {
          var tab = $('[data-formula-sub="' + SAMCTX.subject + '"]');
          if (tab) tab.click();
        }
      }
    });
  }

  /* ============================================================ 19. enquiry */
  function initEnquiry() {
    var form = $("#enquiryForm");
    if (!form) return;
    var cSel = $("#eClass");
    if (cSel && !cSel.options.length) {
      cSel.innerHTML = CLASSES.map(function (c) {
        return '<option value="Class ' + attr(c) + '">Class ' + esc(c) + "</option>";
      }).join("");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = e.submitter;
      var via = (btn && btn.value) || "whatsapp";
      var status = $("#enquiryStatus");

      var name = ($("#eName").value || "").trim();
      var phone = ($("#ePhone").value || "").replace(/\D/g, "");
      if (name.length < 2) {
        if (status) status.textContent = "Please enter the student's name.";
        $("#eName").focus();
        return;
      }
      if (phone.length < 10) {
        if (status) status.textContent = "Please enter a 10-digit phone number so the tutor can call back.";
        $("#ePhone").focus();
        return;
      }

      var lines = [
        "New MPC tuition enquiry",
        "Student: " + name,
        "Parent: " + (($("#eParent").value || "").trim() || "—"),
        "Class: " + $("#eClass").value,
        "Board: " + $("#eBoard").value,
        "Mode: " + $("#eMode").value,
        "Subjects: " + ($("#eSubjects").value || "MPC"),
        "Phone: " + phone,
        "Area: " + (($("#eArea").value || "").trim() || "—"),
        "Timing: " + (($("#eTiming").value || "").trim() || "—"),
        "Message: " + (($("#eMsg").value || "").trim() || "—")
      ];
      var body = lines.join("\n");

      var leads = lsGet(K.leads, []) || [];
      leads.push({ at: Date.now(), via: via, name: name, phone: phone, cls: $("#eClass").value, message: $("#eMsg").value || "" });
      if (leads.length > 200) leads = leads.slice(-200);
      lsSet(K.leads, leads);

      var subject = "MPC tuition enquiry — " + $("#eClass").value + " (" + $("#eBoard").value + ") — " + name;
      if (via === "whatsapp" || via === "both") window.open(waLink(body), "_blank", "noopener");
      if (via === "email" || via === "both") {
        window.location.href = "mailto:" + CFG.contact.email +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
      }

      if (status) {
        status.innerHTML = via === "both"
          ? "Opening WhatsApp and your email app. Press <b>send</b> in each — the slot is confirmed within a few hours."
          : via === "email"
          ? "Opening your email app with the details. Press <b>send</b> to notify the tutor."
          : "Opening WhatsApp with your details — press <b>send</b> and the slot is confirmed within a few hours.";
      }
      toast("Enquiry ready. Nothing is stored on any server.");
    });
  }

  /* ============================================================== 20. admin */
  function initAdmin() {
    var modal = $("#adminModal");
    if (!modal) return;

    function open() {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      $("#adminLogin").hidden = false;
      $("#adminBody").hidden = true;
      $("#adminPin").value = "";
      $("#adminPinMsg").textContent = "";
      $("#adminPin").focus();
    }
    function close() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
    $$("[data-admin-open]").forEach(function (b) { b.addEventListener("click", open); });
    var c = $("#adminClose"); if (c) c.addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });

    function unlock() {
      var pin = ($("#adminPin").value || "").trim();
      if (pin === String(CFG.admin.pin)) {
        $("#adminLogin").hidden = true;
        $("#adminBody").hidden = false;
        fillAdmin();
        adminTabs();
        $("#leadCount").textContent = (lsGet(K.leads, []) || []).length + " enquiries saved in this browser.";
      } else {
        $("#adminPinMsg").textContent = "Incorrect PIN. Try again.";
      }
    }
    var ub = $("#adminUnlock"); if (ub) ub.addEventListener("click", unlock);
    var pinEl = $("#adminPin");
    if (pinEl) pinEl.addEventListener("keydown", function (e) { if (e.key === "Enter") unlock(); });

    function fillAdmin() {
      var map = { aPhone: CFG.contact.phonePrimaryDisplay, aWa: CFG.contact.whatsapp, aEmail: CFG.contact.email,
        aArea: CFG.brand.areaLine, aFounder: CFG.brand.founder, aAbout: CFG.tutor.about };
      Object.keys(map).forEach(function (id) { var el = $("#" + id); if (el) el.value = map[id] || ""; });
    }

    function adminTabs() {
      $$("[data-tab]").forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-tab");
          $$("[data-tab]").forEach(function (x) { x.classList.toggle("active", x === b); });
          $$(".tab-panel").forEach(function (p) { p.classList.toggle("active", p.id === id); });
        });
      });
    }

    var save = $("#saveContact");
    if (save) save.addEventListener("click", function () {
      CFG.contact.phonePrimaryDisplay = $("#aPhone").value.trim() || CFG.contact.phonePrimaryDisplay;
      var wa = ($("#aWa").value || "").replace(/\D/g, "");
      if (wa.length >= 10) CFG.contact.whatsapp = wa;
      CFG.contact.email = $("#aEmail").value.trim() || CFG.contact.email;
      CFG.brand.areaLine = $("#aArea").value.trim() || CFG.brand.areaLine;
      CFG.brand.founder = $("#aFounder").value.trim() || CFG.brand.founder;
      CFG.tutor.about = $("#aAbout").value.trim() || CFG.tutor.about;
      lsSet(K.cfg, CFG);
      note("Saved in this browser. Edit assets/js/data.js to make it permanent.");
      refreshAll();
    });

    function note(msg) {
      var n = $("#adminNote");
      if (n) n.textContent = msg;
    }

    var exp = $("#exportLeads");
    if (exp) exp.addEventListener("click", function () {
      var leads = lsGet(K.leads, []) || [];
      if (!leads.length) { note("No enquiries saved in this browser yet."); return; }
      var csv = [["date", "via", "name", "phone", "class", "message"]].concat(leads.map(function (l) {
        return [new Date(l.at).toISOString(), l.via, l.name, l.phone, l.cls, String(l.message || "").replace(/\s+/g, " ")];
      })).map(function (row) {
        return row.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(",");
      }).join("\n");
      try {
        var blob = new Blob([csv], { type: "text/csv" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "mathsaathi-enquiries.csv";
        a.click();
        if (URL.revokeObjectURL) URL.revokeObjectURL(a.href);
        note("Exported " + leads.length + " enquiries as CSV.");
      } catch (err) {
        note("Could not download the CSV in this browser.");
      }
    });

    function bindClear(sel, key, msg) {
      var b = $(sel);
      if (!b) return;
      b.addEventListener("click", function () {
        if (!window.confirm(msg)) return;
        lsDel(key);
        note(msg);
        refreshAll();
      });
    }
    bindClear("#clearLeads", K.leads, "Enquiries cleared from this browser.");
    bindClear("#clearSyllabus", K.syll, "Syllabus tracker cleared.");
    bindClear("#clearTests", K.tests, "Test history cleared.");

    var reset = $("#resetCfg");
    if (reset) reset.addEventListener("click", function () {
      if (!window.confirm("Reset every setting saved in this browser back to the data.js defaults?")) return;
      [K.cfg, K.leads, K.syll, K.tests, K.sam].forEach(lsDel);
      CFG = deepMerge(clone(DATA), {});
      note("All settings reset to the data.js defaults.");
      refreshAll();
    });
  }

  function refreshAll() {
    renderBindings();
    renderMarquee();
    renderSubjects();
    renderSyllabus();
    renderModes();
    renderMethod();
    renderTutorPoints();
    renderFeePlans();
    renderCalc();
    renderAreas();
    renderResults();
    renderFormula();
    renderSchedule();
    renderTestStats();
    onTestSetupChange();
    document.dispatchEvent(new Event("srt:rerendered"));
  }

  /* ================================================================== boot */
  function boot() {
    if (!window.SRT) return;

    initTheme();
    renderBindings();
    initNav();
    renderMarquee();
    renderSubjects();
    initFinder();
    initSyllabus();
    initTest();
    renderFormula();
    renderModes();
    renderMethod();
    renderTutorPoints();
    renderSchedule();
    initFees();
    renderAreas();
    renderResults();
    renderReviews();
    renderGallery();
    renderFaqs();
    initSaathi();
    initEnquiry();
    initAdmin();
    initCounters();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
