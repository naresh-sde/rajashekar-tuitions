# MathSaathi — website

Static, fast, mobile-first website for an **MPC tuition** (Mathematics, Physics
and Chemistry) in Pragathinagar, Hyderabad (Classes 6–10, **CBSE & ICSE**) run by
**Nagula Rajashekar**. The on-page study assistant is called **Saathi**.

- Live URL: **https://naresh-sde.github.io/rajashekar-tuitions/**
- Repository: <https://github.com/naresh-sde/rajashekar-tuitions>
- No build step, no framework, no dependencies — plain HTML, CSS and JavaScript.
- Published with GitHub Pages from the `gh-pages` branch.

## Sections on the page

| # | Section | What it does |
|---|---------|--------------|
| 1 | Hero + **batch finder** | Pick class / board / mode, get the fee and slot instantly |
| 2 | Stats | Students, years, batch size, boards covered (count-up animation) |
| 3 | Subjects | Mathematics, Physics, Chemistry — what each covers and who it suits |
| 4 | **Class-wise syllabus tracker** | 302 chapters · CBSE + ICSE for Classes 6–10 × 3 subjects, four-stage progress (Not started → Learning → Revised → Mastered), live bars, chapter search, reset (saved in that browser) |
| 5 | **Practice engine** | 54 sample questions tagged to real chapters, filter by class / subject / board / chapter / count, optional timer, hints, worked solutions, flagging, grading, weak-chapter report and a score trend |
| 6 | **Formula Lab** | Maths, Physics and Chemistry formula cards, each with the situation it belongs to |
| 7 | Modes | In-class · Home tuition · Live online 1-to-1 |
| 8 | Method | 6-step process from demo class to board exam |
| 9 | Tutor | Nagula Rajashekar profile, experience and 6 teaching principles |
| 10 | Timetable | 3 tabbed batch schedules (Classes 6–7, 8, 9–10) |
| 11 | Fees + **calculator** | ₹2,000 in-class / ₹5,000 home & online, live monthly / total / per-class calculator |
| 12 | Areas | 20 Pragathinagar + nearby localities with a search box |
| 13 | Results | MPC progress table + graph + what parents receive monthly |
| 14 | Reviews | 6-quote slider with dots and arrows |
| 15 | Gallery | 7-image lightbox viewer (swap in real photos) |
| 16 | **Saathi chat** | Always-visible on-page assistant answering fees, timings, syllabus, areas, formulas — 31 intents, remembers the class and subject in play |
| 17 | FAQ | 14 accordion questions |
| 18 | Admission | Enquiry form that can notify **WhatsApp, email or both**, plus direct call details |

Also: dark/light theme toggle, mobile drawer, jump navigation, floating
WhatsApp / call / back-to-top buttons, PWA manifest, custom 404, print
stylesheet and JSON-LD schema.

## Editing content (permanent, for every visitor)

Everything editable lives in **`assets/js/data.js`**:

```js
brand:     { name, wordmark, tagline, promise, city, baseArea, areaLine, established, founder }
contact:   { phonePrimary, phonePrimaryDisplay, email, emailBusiness, whatsapp, hours[] }
timings:   { weekday, weekend, note }
tutor:     { name, short, role, experience, students, boards, qualification, about, points[] }
classes / boards / stream / subjects
syllabus:  { note, footnote, statuses[], classes[] }
formulaLab:{ note, maths, physics, chemistry }   // each { title, items: [{ n, f, w }] }
testBank:  [{ id, cls, subject, board, chapter, type: mcq|num|short, q, options, answer, hint, solution }]
modes / schedule / fees / method / gallery / areas / results / testimonials / faqs
sam:       { name, full, greeting, quick[], intents[], fallback[], fallbackLinks[], outOfScope }
admin:     { pin }
```

`syllabus.classes[]` holds one row per class:

```js
{ cls: 9, maths: { cbse: [...chapters], icse: [...chapters] },
           physics: { cbse: [...], icse: [...] },
           chemistry: { cbse: [...], icse: [...] } }
```

Add, remove or rename chapters there and the tracker, chapter counts and the
practice-engine chapter filter all update themselves.

Every `{{token}}` used in a `sam.intents[].answer` must be provided by
`samTokens()` in `app.js` — unknown tokens are silently dropped, so add new
tokens there too.

After editing, push the change and the site updates:

```bash
git add -A && git commit -m "update fees and timings" && git push origin main && git push origin main:gh-pages --force
```

## Owner admin panel (this browser only)

Footer → **Owner admin** → PIN `7095`. Edit phone, WhatsApp number, email, area
line and tutor name/about. Fees are **locked** by design (`fees.locked: true`) —
change them in `data.js`. The panel also exports saved enquiries as CSV, clears
saved syllabus progress and clears the saved test history.

These edits are stored in `localStorage` for that one browser/device only —
they are **not** published to other visitors. Use `data.js` for permanent changes.

> Storage keys are versioned: `srt_cfg_v2`, `srt_leads_v2`,
> `srt_syllabus_state_v2`, `srt_test_history_v2`, `srt_sam_ctx_v2`, `srt_theme`.
> If a browser still holds an older config, clear site data once (or bump the key
> in `app.js`).

## Things to replace before/after launch

These are realistic placeholders — swap in the real values:

- `results[]` in `data.js` — currently sample MPC improvement rows.
- `testimonials[]` — currently sample quotes with generic names.
- `gallery[]` + `assets/img/` — currently SVG illustrations. Real photos of the
  classroom, whiteboard and students will rank better and build trust.
- `syllabus.classes[]` — confirm chapter names/order against the board and
  textbook the student actually uses (NCERT for CBSE, Concise/Selina for ICSE).
  Physics and Chemistry chapter lists for Classes 6–8 are approximate.
- `testBank[]` — currently 54 questions (18 per subject); add more to widen the
  class/chapter filters, especially short-answer questions (only 2 today).
- Fees in `fees` — verify ₹2,000 in-class and ₹5,000 home/online starting
  prices are the intended committed prices.
- `tutor.experience`, `tutor.students`, `tutor.qualification` and
  `brand.established` — confirm these numbers.
- `contact.emailBusiness` — `admissions@mathsaathi.in` is a placeholder until a
  domain/mailbox exists. Only `shekar2806@gmail.com` is live now.
- Area list — confirm the spelling of **Vovlvo** (added from a note) and add or
  remove localities to match the real travel radius.
- Address: only **Pragathinagar, Hyderabad** is published (no invented street
  address). Add your real address and Google Maps link in `contact` when you have it.
- `<meta name="google-site-verification">` in `index.html` — replace
  `PASTE_GOOGLE_CODE_HERE` with the real Search Console code.

## How notifications work

The admission form has three buttons: **WhatsApp**, **Email**, **WhatsApp + email**.

- WhatsApp opens `wa.me` with the enquiry pre-typed.
- Email opens the visitor's mail app with the enquiry pre-filled in the body.

Because this is a static site with no server, the visitor still taps *send* in
WhatsApp / their mail app — nothing is delivered automatically. If you want
true one-tap delivery, connect the form to a free backend later (Formspree,
Web3Forms, Google Apps Script) and point the submit handler at it.

## Google ranking checklist

1. **Google Search Console** → add the property with the URL-prefix, paste the
   verification code into `index.html` (a commented slot is already there),
   then submit `sitemap.xml` and use **URL Inspection → Request indexing**.
2. **Google Business Profile** — this is what wins "tuition near me" and
   "MathSaathi Hyderabad" searches. Category: *Tution centre* / *Educational
   institution*. Use **Pragathinagar, Hyderabad** as the service area, add your
   hours, one phone number and 5–10 real photos.
3. Ask every current parent for a Google review. Reviews move map ranking far
   more than anything on the website.
4. Update the `sameAs` links in the JSON-LD (`index.html`) once you have
   Instagram / Facebook / YouTube pages — this links all profiles to one entity.
5. Add real student photos with proper `alt` text; image search is a real source
   of parents.

### Suggested business email

`admissions@mathsaathi.in` is reserved in `data.js` (`contact.emailBusiness`).
To use it: buy the domain, create the mailbox on Google Workspace (or Zoho Mail
free tier), then change `contact.email` and the `mailto:` links — everything else
updates automatically. Keep the Gmail address as a second option in the footer
for the first few months.

## Local preview

Any static server works, for example:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

There is no test framework in the repo. A jsdom smoke suite that boots the page,
drives the finder, syllabus tracker, practice engine, Saathi, calculator and the
admin panel lives outside the repo in the working temp folder; run it with
`node <path>/mpc_smoke.js` after `npm i jsdom` in a scratch directory.

## Deploying an update

```bash
git add -A
git commit -m "your message"
git push origin main
git push origin main:gh-pages --force
```

GitHub Pages builds from `gh-pages` and goes live in about a minute.

## Contact details shown on the site

- Phone / WhatsApp: **8790693366** (single number)
- Email: **shekar2806@gmail.com**
- Base area: **Pragathinagar, Hyderabad** · home tuition within 10–15 km
- Classes 6–10 · CBSE & ICSE · Mathematics, Physics, Chemistry
- Mon–Fri 6:00 PM–10:00 PM · Sat–Sun 10:00 AM–10:00 PM
- In-class tuition from ₹2,000/month · home & live online 1-to-1 from ₹5,000/month
