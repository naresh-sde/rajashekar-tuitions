# Rajashekar Tuitions — website

Static, fast, mobile-first website for a **Mathematics-only** tuition in
Pragathinagar, Hyderabad (Classes 6–10, **CBSE & ICSE**) run by
**Nagula Rajashekar**.

- Live URL: **https://naresh-sde.github.io/rajashekar-tuitions/**
- Repository: <https://github.com/naresh-sde/rajashekar-tuitions>
- No build step, no framework, no dependencies — plain HTML, CSS and JavaScript.
- Published with GitHub Pages from the `gh-pages` branch.

## Sections on the page

| # | Section | What it does |
|---|---------|--------------|
| 1 | Hero + **batch finder** | Pick class / board / mode, get the fee and slot instantly |
| 2 | Stats | Students, years, batch size, boards covered (count-up animation) |
| 3 | Mathematics | Why Maths-only, what the classes cover, who it suits |
| 4 | **Class-wise syllabus checker** | CBSE + ICSE chapter lists for Classes 6–10, tick what is finished, live % progress, search, reset (saved in that browser) |
| 5 | **Formula lab** | 8 Mathematics formula cards with the situation each belongs to |
| 6 | Modes | In-class · Home tuition · Live online 1-to-1 |
| 7 | Method | 6-step process from demo class to board exam |
| 8 | Tutor | Nagula Rajashekar profile, experience and teaching principles |
| 9 | Timetable | 3 tabbed batch schedules (Classes 6–7, 8, 9–10) |
| 10 | Fees + **calculator** | ₹2,000 in-class / ₹5,000 home & online, live monthly / total / per-class calculator |
| 11 | Areas | 20 Pragathinagar + nearby localities with a search box |
| 12 | Progress | Maths results table + graph + what parents receive monthly |
| 13 | Reviews | Auto-playing slider with dots and arrows |
| 14 | Gallery | Lightbox viewer (swap in real photos) |
| 15 | **SAM chat** | On-page study assistant answering fees, timings, syllabus, areas, formulas |
| 16 | FAQ | 12 accordion questions |
| 17 | Admission | Enquiry form that can notify **WhatsApp, email or both**, plus direct call details |

Also: dark/light theme toggle, mobile drawer, floating WhatsApp / call / SAM
buttons, PWA manifest, custom 404, print stylesheet, JSON-LD schema.

## Editing content (permanent, for every visitor)

Everything editable lives in **`assets/js/data.js`**:

```js
brand:    { name, tagline, city, baseArea, areaLine, established, founder }
contact:  { phonePrimary, phonePrimaryDisplay, email, emailBusiness, whatsapp, hours }
tutor:    { name, role, experience, students, qualification, about, points[] }
classes / boards / subjects / syllabus / formulaLab / modes / schedule / fees
method / gallery / areas / results / testimonials / faqs / sam.answers
```

`syllabus.classes[]` holds `{ cls, cbse: [...chapters], icse: [...chapters] }` —
add, remove or rename chapters there and the tracker UI updates itself.

After editing, push the change and the site updates:

```bash
git add -A && git commit -m "update fees and timings" && git push origin main && git push origin main:gh-pages --force
```

## Owner admin panel (this browser only)

Footer → **Owner admin** → PIN `7095`. Edit phone, WhatsApp number, email,
area line, tutor name/about, and the classroom + home/online fee rates. Also
exports saved enquiries as CSV and clears saved syllabus ticks.

These edits are stored in `localStorage` for that one browser/device only —
they are **not** published to other visitors. Use `data.js` for permanent changes.

> Note: the config key is `srt_cfg_v1`. If a browser already saved the old
> multi-subject/old-fee config, clear site data once (or bump the key in
> `app.js`) so the new Mathematics-only defaults load.

## Things to replace before/after launch

These are realistic placeholders — swap in the real values:

- `results[]` in `data.js` — currently sample Maths improvement rows.
- `testimonials[]` — currently sample quotes with generic names.
- `gallery[]` + `assets/img/` — currently SVG illustrations. Real photos of the
  classroom, whiteboard and students will rank better and build trust.
- `syllabus.classes[]` — confirm chapter names/order against the board and
  textbook the student actually uses (NCERT for CBSE, Concise/Selina for ICSE).
- Fees in `fees.bands` — verify ₹2,000 in-class and ₹5,000 home/online, and
  confirm whether those are monthly charges.
- `tutor.experience`, `tutor.students`, `tutor.qualification` and
  `brand.established` — confirm these numbers.
- `contact.emailBusiness` — `admissions@rajashekartuitions.in` is a placeholder
  until a domain/mailbox exists. Only `shekar2806@gmail.com` is live now.
- Area list — confirm the spelling of **Vovlvo** (added from a note) and add or
  remove localities to match the real travel radius.
- Address: only **Pragathinagar, Hyderabad** is published (no invented street
  address). Add your real address and Google Maps link in `contact` when you have it.

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
   "<name> Hyderabad" searches. Category: *Tution centre* / *Educational
   institution*. Use **Pragathinagar, Hyderabad** as the service area, add your
   hours, one phone number and 5–10 real photos.
3. Ask every current parent for a Google review. Reviews move map ranking far
   more than anything on the website.
4. Update the `sameAs` links in the JSON-LD (`index.html`) once you have
   Instagram / Facebook / YouTube pages — this links all profiles to one entity.
5. Add real student photos with proper `alt` text; image search is a real source
   of parents.

### Suggested business email

`admissions@rajashekartuitions.in` is reserved in `data.js`
(`contact.emailBusiness`). To use it: buy the domain, create the mailbox on
Google Workspace (or Zoho Mail free tier), then change `contact.email` and
the `mailto:` links — everything else updates automatically. Keep the Gmail
address as a second option in the footer for the first few months.

## Local preview

Any static server works, for example:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

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
- Classes 6–10 · CBSE & ICSE · Mathematics only
- Mon–Fri 6:00 PM–10:00 PM · Sat–Sun 10:00 AM–10:00 PM
- In-class tuition from ₹2,000/month · home & live online 1-to-1 from ₹5,000/month
