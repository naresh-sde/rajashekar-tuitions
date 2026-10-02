# Rajashekar Tuitions — website

Static, fast, mobile-first website for a Classes 6–10 tuition in Hyderabad
(CBSE / ICSE / State Board) run by **Nagula Rajashekar**.

- Live URL: **https://naresh-sde.github.io/rajashekar-tuitions/**
- Repository: <https://github.com/naresh-sde/rajashekar-tuitions>
- No build step, no framework, no dependencies — plain HTML, CSS and JavaScript.
- Published with GitHub Pages from the `gh-pages` branch.

## Sections on the page

| # | Section | What it does |
|---|---------|--------------|
| 1 | Hero + **batch finder** | Pick class / board / mode, get the fee and slot instantly |
| 2 | Stats | Students, years, batch size, boards covered (count-up animation) |
| 3 | Subjects | 10 subjects with filters; Mathematics & Physics flagged as specialities |
| 4 | **Maths & Physics Formula Lab** | 8 + 8 formula cards with the situation each one belongs to |
| 5 | Modes | Classroom · Home tuition · Live online |
| 6 | Method | 6-step process from demo class to board exam |
| 7 | Tutor | Nagula Rajashekar profile, experience and teaching principles |
| 8 | Timetable | 3 tabbed batch schedules (Classes 6–7, 8, 9–10) |
| 9 | Fees + **calculator** | Per-subject fees and a live monthly / total / per-class calculator |
| 10 | Progress | Results table + graph + what parents receive monthly |
| 11 | Reviews | Auto-playing slider with dots and arrows |
| 12 | Gallery | Lightbox viewer (swap in real photos) |
| 13 | **SAM chat** | On-page study assistant answering fees, timings, subjects, formulas |
| 14 | FAQ | 12 accordion questions |
| 15 | Admission | Enquiry form that builds a WhatsApp message, plus direct call details |

Also: dark/light theme toggle, mobile drawer, floating WhatsApp / call / SAM
buttons, PWA manifest, custom 404, print stylesheet, JSON-LD schema.

## Editing content (permanent, for every visitor)

Everything editable lives in **`assets/js/data.js`**:

```js
contact: { phonePrimary, phoneAlt, phonePrimaryDisplay, phoneAltDisplay, email, whatsapp, hours }
tutor:   { name, role, experience, students, about, points[] }
subjects / formulaLab / modes / schedule / fees / method / gallery / areas
results / testimonials / faqs / sam.answers
```

After editing, push the change and the site updates:

```bash
git add -A && git commit -m "update fees and timings" && git push origin main && git push origin main:gh-pages --force
```

## Owner admin panel (this browser only)

Footer → **Owner admin** → PIN `7095`. Edit phones, WhatsApp number, email,
area line, tutor name and about, and the Class 10 fee rates. Also exports
saved enquiries as CSV.

These edits are stored in `localStorage` for that one browser/device only —
they are **not** published to other visitors. Use `data.js` for permanent changes.

## Things to replace before/after launch

These are realistic placeholders — swap in the real values:

- `results[]` in `data.js` — currently sample improvement rows.
- `testimonials[]` — currently sample quotes with generic names.
- `gallery[]` + `assets/img/` — currently SVG illustrations. Real photos of the
  classroom, whiteboard and students will rank better and build trust.
- Fees in `fees.bands` — verify against your actual charges.
- `tutor.experience`, `tutor.students` and `brand.established` — confirm these numbers.
- Address: only **Hyderabad, Telangana** is published (no invented street address).
  Add your real address and Google Maps link in `contact` when you have it.

## Google ranking checklist

1. **Google Search Console** → add the property with the URL-prefix, paste the
   verification code into `index.html` line 15 (a commented slot is already there),
   then submit `sitemap.xml` and use **URL Inspection → Request indexing**.
2. **Google Business Profile** — this is what wins "tuition near me" and
   "<name> Hyderabad" searches. Category: *Tutition centre* / *Educational
   institution*. Add 5–10 real photos, your hours and both phone numbers.
3. Ask every current parent for a Google review. Reviews move map ranking far
   more than anything on the website.
4. Update the `sameAs` links in the JSON-LD (`index.html`) once you have
   Instagram / Facebook / YouTube pages — this links all profiles to one entity.
5. Add real student photos with proper `alt` text; image search is a real source
   of parents.

### Suggested business email

`admissions@rajashekar-tuitions.in` is reserved in `data.js`
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

- Phone / WhatsApp: 8790693366, 9705785897
- Email: shekar2806@gmail.com
- Classes 6–10 · CBSE, ICSE, Telangana State Board · Hyderabad
