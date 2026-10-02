/* ============================================================
   Rajashekar Tuitions — site content
   ------------------------------------------------------------
   EDIT THIS FILE to change anything permanently for all visitors.
   Anything saved from the on-page Admin panel is stored in the
   visitor's own browser only.
   ============================================================ */

window.SRT = {
  brand: {
    name: "Rajashekar Tuitions",
    tagline: "Mathematics · Classes 6–10 · CBSE & ICSE",
    city: "Hyderabad",
    baseArea: "Pragathinagar",
    areaLine: "Pragathinagar, Hyderabad · home tuition within 10–15 km",
    established: "2016",
    founder: "Nagula Rajashekar"
  },

  tutor: {
    name: "Nagula Rajashekar",
    role: "Founder & Principal Tutor",
    experience: "10+",
    students: "600+",
    boards: "2",
    qualification: "M.Sc. Mathematics, B.Ed.",
    about:
      "Nagula Rajashekar has spent more than a decade teaching Mathematics to Classes 6–10 from Pragathinagar, Hyderabad. He teaches one subject on purpose: logic first, formula second, board pattern last — every chapter derived on the board, every doubt answered until the student can explain it back in their own words.",
    points: [
      "Mathematics is the only subject taught, so every batch gets the full attention",
      "CBSE and ICSE chapters planned separately, class by class, from the current syllabus",
      "Classroom batches capped at 12 students so nobody is left behind",
      "Home tuition and live online one-to-one classes for students who cannot travel",
      "Weekly tests, monthly parent reports and a clear weak-topic plan",
      "Doubts answered on WhatsApp between classes — students never wait for the next class"
    ]
  },

  contact: {
    phonePrimary: "8790693366",
    phonePrimaryDisplay: "+91 87906 93366",
    email: "shekar2806@gmail.com",
    emailBusiness: "admissions@rajashekartuitions.in",
    whatsapp: "918790693366",
    hours: [
      { d: "Monday – Friday", t: "6:00 PM – 10:00 PM" },
      { d: "Saturday & Sunday", t: "10:00 AM – 10:00 PM" },
      { d: "Booking", t: "Any slot inside these hours — confirmed on WhatsApp and email" }
    ]
  },

  /* ---------------- timings ---------------- */
  timings: {
    weekday: "Monday – Friday · 6:00 PM – 10:00 PM",
    weekend: "Saturday & Sunday · 10:00 AM – 10:00 PM",
    note:
      "Classroom batches run inside these windows. Home tuition and live online slots can be booked at any time that suits you inside the same windows — tell us the time you want in the enquiry form and it is confirmed on WhatsApp and by email."
  },

  /* ---------------- classes & boards ---------------- */
  classes: ["6", "7", "8", "9", "10"],
  boards: ["CBSE", "ICSE"],

  /* ---------------- the one subject we teach ---------------- */
  subjects: [
    {
      id: "maths", name: "Mathematics", icon: "sigma", tone: "brand", star: true,
      classes: "Classes 6 – 10", board: "CBSE · ICSE",
      blurb: "The signature subject. Number systems and algebra built from the base up, geometry and trigonometry with real diagrams, then board-pattern drilling with the formula lab for revision.",
      topics: ["Number systems", "Algebra & quadratics", "Geometry & mensuration", "Trigonometry", "Statistics & probability"]
    }
  ],

  /* ---------------- class-wise Mathematics syllabus ---------------- */
  syllabus: {
    note:
      "Chapter lists follow the current CBSE (NCERT) and ICSE (Concise / Selina) Mathematics syllabus, class by class. Tick a chapter once it is finished — the tick is saved in this browser and the progress bar shows how much of the syllabus is covered.",
    footnote:
      "Syllabus changes occasionally. Send your school's list on WhatsApp and the exact chapter sequence will be matched to it before the batch starts.",
    classes: [
      {
        cls: "6",
        cbse: ["Knowing our numbers", "Playing with numbers", "Whole numbers", "Operations on whole numbers", "Understanding elementary shapes", "Integers", "Fractions", "Decimals", "Data handling", "Mensuration", "Algebra", "Ratio and proportion", "Symmetry", "Visualising solid shapes"],
        icse: ["Knowing our numbers", "Playing with numbers", "Whole numbers", "Operations on whole numbers", "Understanding elementary shapes", "Integers", "Fractions", "Decimals", "The number line", "Algebra", "Ratio and proportion", "Symmetry", "Mensuration", "Data handling"]
      },
      {
        cls: "7",
        cbse: ["Integers", "Fractions and decimals", "Data handling", "Simple equations", "Lines and angles", "The triangle and its properties", "Congruence of triangles", "Comparing quantities", "Rational numbers", "Practical geometry", "Perimeter and area", "Algebraic expressions", "Exponents and powers", "Symmetry", "Visualising solid shapes"],
        icse: ["Integers", "Fractions", "Decimals", "Rational numbers", "Exponents", "Algebraic expressions", "Linear equations in one variable", "Ratio and proportion", "Percentage, discount, profit and loss", "Simple interest", "Lines and angles", "Triangles", "Congruence of triangles", "Symmetry", "Perimeter and area", "Data handling", "Understanding shapes"]
      },
      {
        cls: "8",
        cbse: ["Rational numbers", "Linear equations in one variable", "Understanding quadrilaterals", "Data handling", "Squares and square roots", "Cubes and cube roots", "Comparing quantities", "Algebraic expressions and identities", "Visualising solid shapes", "Mensuration", "Exponents and powers", "Direct and inverse proportion", "Factorisation", "Introduction to graphs", "Playing with numbers", "Introduction to Euclid's geometry", "Lines and angles", "Triangles", "Quadrilaterals", "Circles"],
        icse: ["Rational numbers", "Exponents and powers", "Squares and square roots", "Cubes and cube roots", "Playing with numbers", "Sets", "Percentage", "Profit and loss", "Compound interest", "Algebraic identities", "Factorisation", "Simple linear equations", "Linear inequalities", "Understanding quadrilaterals", "Constructions", "Circles", "Pythagoras theorem", "Area and perimeter", "Data handling"]
      },
      {
        cls: "9",
        cbse: ["Number systems", "Polynomials", "Coordinate geometry", "Linear equations in two variables", "Introduction to Euclid's geometry", "Lines and angles", "Triangles", "Quadrilaterals", "Circles", "Heron's formula", "Surface areas and volumes", "Statistics"],
        icse: ["Pure arithmetic", "Rational and irrational numbers", "Polynomials", "Linear equations in one variable", "Simultaneous linear equations", "Quadratic equations", "Inequalities", "Constructions", "Circles", "Co-ordinate geometry", "Introduction to trigonometry", "Similarity", "Loci", "Lines and angles", "Mensuration", "Median, mode and mean", "Probability"]
      },
      {
        cls: "10",
        cbse: ["Real numbers", "Polynomials", "Pair of linear equations in two variables", "Quadratic equations", "Arithmetic progressions", "Triangles", "Coordinate geometry", "Introduction to trigonometry", "Some applications of trigonometry", "Circles", "Areas related to circles", "Surface areas and volumes", "Statistics", "Probability"],
        icse: ["Commercial mathematics (GST)", "Banking", "Shares and dividends", "Linear equations (word problems)", "Quadratic equations", "Matrix", "Determinants", "Transformations", "Similarity", "Loci", "Trigonometry", "Circle", "Constructions", "Coordinate geometry", "Mensuration (surface area and volume)", "Mean, median, mode (grouped data and ogive)", "Probability", "Linear regression"]
      }
    ]
  },

  /* ---------------- the Mathematics formula lab ---------------- */
  formulaLab: {
    maths: {
      title: "Mathematics Formula Lab",
      note: "Every formula below is derived in class — these cards are only for revision, never for memorising without understanding.",
      items: [
        { n: "Quadratic roots", f: "x = (−b ± √(b² − 4ac)) / 2a", w: "Discriminant D decides: D > 0 two real roots, D = 0 equal roots, D < 0 no real roots." },
        { n: "Arithmetic progression", f: "Sₙ = n/2 · [2a + (n−1)d]", w: "Also aₙ = a + (n−1)d. Use the sum form whenever the question says 'sum of n terms'." },
        { n: "Pythagoras & distance", f: "c² = a² + b²  |  d = √[(x₂−x₁)² + (y₂−y₁)²]", w: "Distance between two points and length of the perpendicular from a point to a line use the same pattern." },
        { n: "Trigonometry ratios", f: "sin θ = O/H , cos θ = A/H , tan θ = O/A", w: "Plus sin²θ + cos²θ = 1 — the identity that unlocks most value-based questions." },
        { n: "Mensuration", f: "Circle: πr² | Cylinder: 2πrh | Cone: (1/3)πr²h", w: "Total surface area adds 2πr² for cylinder and πrl for cone; be careful with 'curved' vs 'total'." },
        { n: "Heron's triangle", f: "A = √[s(s−a)(s−b)(s−c)],  s = (a+b+c)/2", w: "Compute s first, then substitute. Class 10 area questions are almost always Heron's." },
        { n: "Mean, median, mode", f: "Mean = Σx / n  |  Median = middle value", w: "For grouped data, Σfx/n with the class-mark x. Ogive gives median directly." },
        { n: "Linear inequalities", f: "ax + b < 0  (a > 0)", w: "Divide by a and flip the sign only when a is negative." }
      ]
    }
  },

  /* ---------------- how classes run ---------------- */
  modes: [
    {
      id: "classroom", name: "In-Class Tuition", icon: "board", tone: "brand", img: "classroom.svg",
      from: "₹2,000 / month",
      blurb: "Learn at the centre with a small batch, a whiteboard, and classmates who keep you accountable.",
      points: ["Batch size maximum 12 students", "Weekly printed worksheets and tests", "Fixed slot from 6 PM to 10 PM", "Sunday revision and doubt clearing"],
      best: "Students who like a routine, a peer group and being called out to answer at the board."
    },
    {
      id: "home", name: "Home Tuition", icon: "home", tone: "mint", img: "home.svg",
      from: "₹5,000 / month",
      blurb: "One-to-one at your home or ours. The lesson is built around the student's own school syllabus and current test marks.",
      points: ["1-to-1 or 1-to-2 only", "Any slot inside 6 PM – 10 PM", "Saturday & Sunday 10 AM – 10 PM", "Parents get a monthly written report"],
      best: "Students who need individual attention, have school-missed concepts, or need to catch up before exams."
    },
    {
      id: "online", name: "Live Online Class", icon: "laptop", tone: "sky", img: "online.svg",
      from: "₹5,000 / month",
      blurb: "Live video teaching with a shared digital board. Doubts are answered on screen, and every class is recorded for revision.",
      points: ["Live one-to-one, not pre-recorded", "Digital board with saved notes", "Class recordings shared after class", "Doubt clearing on WhatsApp"],
      best: "Students far from Pragathinagar, or who need an extra revision class between two classroom batches."
    }
  ],

  /* ---------------- batch timetable ---------------- */
  schedule: [
    {
      tab: "Class 6 – 7 · Foundation",
      rows: [
        ["Mon – Fri", "6:00 – 7:00 PM", "Mathematics — concept build", "Classroom · 12 seats"],
        ["Mon – Fri", "7:15 – 8:15 PM", "Practice problems + doubt clearing", "Classroom"],
        ["Sat", "10:00 – 11:00 AM", "Mathematics", "Classroom"],
        ["Sun", "10:00 – 11:30 AM", "Weekly test + chapter revision", "Free for all batches"],
        ["Home / online", "6 PM – 10 PM (any day)", "1-to-1 Mathematics", "Flexible booking"]
      ]
    },
    {
      tab: "Class 8 · Bridge",
      rows: [
        ["Mon – Fri", "6:00 – 7:15 PM", "Mathematics — algebra & geometry", "Classroom · 10 seats"],
        ["Mon – Fri", "7:30 – 8:30 PM", "Foundation gaps + mental maths", "Classroom"],
        ["Sat", "10:00 – 11:15 AM", "Mathematics", "Classroom"],
        ["Sun", "10:00 – 11:30 AM", "Weekly test + revision", "Free for all batches"],
        ["Home / online", "6 PM – 10 PM (any day)", "1-to-1 Mathematics", "Flexible booking"]
      ]
    },
    {
      tab: "Class 9 – 10 · Board prep",
      rows: [
        ["Mon – Wed", "6:00 – 7:30 PM", "Mathematics — NCERT line by line", "Classroom"],
        ["Thu – Fri", "6:00 – 7:30 PM", "Numericals + previous-year questions", "Classroom"],
        ["Sat", "10:00 AM – 1:00 PM", "Full-length maths mock test", "Every second Saturday"],
        ["Sun", "10:00 AM – 1:00 PM", "Revision + doubt clearing", "Classroom"],
        ["Online", "8:30 – 9:30 PM", "Live online maths revision", "Recorded"]
      ]
    }
  ],

  /* ---------------- fee structure (edit these) ---------------- */
  fees: {
    headline: "Classroom from ₹2,000 / month · Home tuition and live online one-to-one from ₹5,000 / month",
    classroom: { label: "In-class tuition (small batch)", note: "Up to 12 students · 4 classes/week · 1 hour", bands: { "6": 2000, "7": 2000, "8": 2000, "9": 2000, "10": 2000 } },
    home: { label: "Home tuition (1-to-1)", note: "4 classes/week · 1 hour · any slot from 6 PM to 10 PM", bands: { "6": 5000, "7": 5000, "8": 5000, "9": 5000, "10": 5000 } },
    online: { label: "Live online (1-to-1)", note: "4 classes/week · recorded · 10 AM to 10 PM window", bands: { "6": 5000, "7": 5000, "8": 5000, "9": 5000, "10": 5000 } }
  },

  /* ---------------- teaching method ---------------- */
  method: [
    { t: "Free demo class", d: "30 minutes of real Mathematics, from the chapter your child is studying. No payment, no obligation." },
    { t: "Diagnostic test", d: "A 20-mark maths paper to find the real gap — not the chapter the child thinks is weak." },
    { t: "Concept teaching", d: "Logic first, formula second, board pattern last. Nothing is written without being explained." },
    { t: "Weekly test", d: "Short weekly test on the chapters covered, corrected in class with the child present." },
    { t: "Parent report", d: "Monthly report card: marks trend, weak chapters, attendance and the plan for next month." },
    { t: "Exam strategy", d: "Answer formats, time per question, mark allocation and previous-year question drilling." }
  ],

  /* ---------------- gallery (replace with real classroom photos) ---------------- */
  gallery: [
    { img: "classroom.svg", cap: "Small-batch in-class session in Pragathinagar" },
    { img: "maths.svg", cap: "Mathematics — quadratic equations on the board" },
    { img: "home.svg", cap: "Home tuition, one-to-one" },
    { img: "sam.svg", cap: "SAM study assistant for instant revision" },
    { img: "report.svg", cap: "Weekly test and parent report" },
    { img: "online.svg", cap: "Live online class with digital board" },
    { img: "hero.svg", cap: "Teaching Mathematics since 2016" }
  ],

  /* ---------------- areas served (mostly within 10–15 km of Pragathinagar) ---------------- */
  areas: [
    "Pragathinagar", "Nizampet", "Bachupally", "Miyapur", "Kukatpally / JNTU", "KPHB",
    "Gajularamaram", "Bollaram", "Vovlvo", "Gandimammagari", "Bahadurpally", "Balanagar",
    "Chaitanyapuri", "Alwal", "Kalyan Nagar", "Borabanda", "Erragadda", "Sanjeevaiah Park",
    "Moosarambagh", "Gachibowli"
  ],

  /* ---------------- student results (placeholder values — replace with real results) ---------------- */
  results: [
    { cls: "Class 10", sub: "Mathematics", board: "CBSE", score: "98%", delta: "+34" },
    { cls: "Class 10", sub: "Mathematics", board: "ICSE", score: "95%", delta: "+31" },
    { cls: "Class 10", sub: "Mathematics", board: "CBSE", score: "92%", delta: "+27" },
    { cls: "Class 9", sub: "Mathematics", board: "CBSE", score: "94%", delta: "+29" },
    { cls: "Class 9", sub: "Mathematics", board: "ICSE", score: "91%", delta: "+26" },
    { cls: "Class 8", sub: "Mathematics", board: "CBSE", score: "90%", delta: "+24" }
  ],

  /* ---------------- testimonials (placeholder names — replace with real feedback) ---------------- */
  testimonials: [
    { text: "My daughter was weak in maths and used to cry before tests. After joining the Class 10 batch she now solves board papers on her own. The Sunday revision session makes a real difference.", name: "Parent · Class 10 student", tag: "Pragathinagar" },
    { text: "Home tuition after 7 PM was the only slot that worked with our shift timings. Sir starts every chapter from the logic, and the monthly report tells us exactly where she stands.", name: "Parent · Class 9 student", tag: "Bachupally" },
    { text: "I joined for Maths in Class 9 and it turned into my strongest subject. Weekly tests, chapter-wise worksheets and no false promises — that is the whole difference.", name: "Student · Class 10, CBSE", tag: "Kukatpally / JNTU" },
    { text: "The live online class saved me an hour of travel every day. Recordings mean I can revise the same evening again. Worth the fee.", name: "Student · Class 8", tag: "Miyapur" },
    { text: "The class-wise syllabus page was useful — we could see exactly which chapters were covered before the unit test and tick them off at home.", name: "Parent · Class 10, ICSE", tag: "Gajularamaram" },
    { text: "What I appreciated most: my doubts were answered on WhatsApp the same day, and I was never asked to feel behind in class.", name: "Student · Class 7", tag: "Nizampet" }
  ],

  /* ---------------- FAQ ---------------- */
  faqs: [
    { q: "Which classes and boards do you teach?", a: "Mathematics only, for Classes 6 to 10, in both CBSE and ICSE. The chapter sequence is planned board-wise and class-wise from the current syllabus, so a CBSE student and an ICSE student never get mixed up in the same plan." },
    { q: "What are the fees?", a: "In-class tuition starts from ₹2,000 per month. Home tuition and live online one-to-one classes start from ₹5,000 per month. Mathematics is the only subject, so there is no per-subject calculation — use the calculator above for your exact monthly and total fee." },
    { q: "What are your class timings?", a: "Monday to Friday from 6:00 PM to 10:00 PM, and Saturday & Sunday from 10:00 AM to 10:00 PM. Home tuition and online slots can be booked at any time inside these windows — mention the time you want and it is confirmed." },
    { q: "Is there a free demo class before I pay?", a: "Yes. Every new student gets one free 30-minute demo class on a real chapter from their syllabus. There is no payment and no obligation — if the child is not comfortable, we say so honestly." },
    { q: "What is the difference between in-class and home tuition?", a: "In-class tuition runs in a fixed slot at Pragathinagar with a batch of up to 12 students and a shared weekly test. Home tuition is one-to-one (or one-to-two) at the child's home or ours, with timings built around school hours, and includes a written monthly report for parents." },
    { q: "Do you show the class-wise syllabus?", a: "Yes — every class from 6 to 10 has its own chapter list for both CBSE and ICSE on this page. Chapters are ticked off as they are covered, so a student or parent can always see exactly how much of the syllabus is done." },
    { q: "How many students are in a classroom batch?", a: "Maximum 12 for Classes 6–7 and 10 for Classes 8–10. If a batch fills up, the student is offered the next slot or home tuition — we never add a 20th student to a full batch." },
    { q: "What happens if my child misses a class?", a: "Tell us before the class and we share the class notes with a short recorded revision where applicable. Two makeup classes per month are allowed for in-class students." },
    { q: "Will you help with board preparation and previous-year papers?", a: "Yes. The Class 9–10 batch is built around the board pattern: NCERT line-by-line, previous-year questions, a full-length maths mock test every second Saturday and answer-format practice for both theory and numericals." },
    { q: "How can parents track progress?", a: "You get a written monthly report — marks trend, weak chapters, attendance and the plan for the coming month — plus an informal WhatsApp update whenever something changes." },
    { q: "Which areas do you cover for home tuition?", a: "Home tuition is based in Pragathinagar, Hyderabad, and covers every area within roughly 10–15 km — Nizampet, Bachupally, Miyapur, Kukatpally / JNTU, KPHB, Gajularamaram, Bollaram, Vovlvo, Gandimammagari, Bahadurpally, Balanagar, Chaitanyapuri, Alwal, Kalyan Nagar, Borabanda, Erragadda, Sanjeevaiah Park, Moosarambagh and Gachibowli. Areas outside the list can usually be arranged too." },
    { q: "How do I book, and how will I be notified?", a: "Send the enquiry form, WhatsApp message or call. Your details reach the tutor on WhatsApp and by email at the same time, and the slot is confirmed on WhatsApp within a few hours — then a free demo class, then fee details." }
  ],

  /* ---------------- SAM — the on-page study assistant ---------------- */
  sam: {
    name: "SAM",
    full: "Study Assistant for Mathematics",
    greeting:
      "Hi! I am <b>SAM</b>, the study assistant for Rajashekar Tuitions in Pragathinagar, Hyderabad. Ask me about fees, timings, the class-wise syllabus, the free demo class or Mathematics revision — or pick a quick question below.",
    quick: ["Fee for Class 10", "Class timings", "Class-wise syllabus", "Is demo class free?", "Home tuition fees", "Maths formula", "Where are you located?", "Talk to the tutor"],
    answers: {
      fee: "In-class tuition starts from <b>₹2,000 per month</b>. Home tuition and live online one-to-one classes start from <b>₹5,000 per month</b>. Mathematics is the only subject, so there is no per-subject calculation — the <b>Fee Calculator</b> above shows your exact monthly and total fee.",
      time: "Classroom batches run <b>Monday to Friday, 6:00 PM – 10:00 PM</b> and <b>Saturday & Sunday, 10:00 AM – 10:00 PM</b>. Home tuition and online slots can be booked at any time inside those windows — tell us the time you want and it is confirmed. Full batch timings are in the Timetable above.",
      subjects: "We teach <b>Mathematics only</b>, for Classes 6 to 10, in <b>CBSE and ICSE</b>. One subject means one method, practised daily, with a chapter-wise plan and a formula lab built for revision.",
      syllabus: "Every class from <b>6 to 10</b> has its own chapter list for <b>CBSE and ICSE</b> in the <b>Class-wise syllabus</b> section above. Search for a chapter, and tick chapters as they are covered — the progress bar shows how much of the syllabus is done.",
      demo: "<b>Yes, the demo class is free.</b> 30 minutes of real Mathematics from a chapter your child is currently studying. No payment, no obligation — and if the child is not comfortable, we will say so honestly.",
      home: "Home tuition is <b>one-to-one or one-to-two</b>, at your home or ours, from <b>₹5,000 per month</b>. Four classes a week of one hour, any slot between 6 PM and 10 PM on weekdays or 10 AM to 10 PM at weekends, school exam paper practice, and a written monthly report for parents.",
      maths: "Open the <b>Mathematics Formula Lab</b> above — it lists the eight most useful Class 9–10 formulas with a note on when to use each one. Every formula is derived in class, so revision is quick.",
      talk: "The quickest way to reach the tutor is WhatsApp or a call on <b>+91 87906 93366</b>. You can also send the enquiry form below — your details reach the tutor on <b>WhatsApp and by email</b> at the same time.",
      boards: "<b>CBSE and ICSE</b> are both handled, with separate chapter sequences for every class. Tell us the board in the enquiry form so the right sequence is planned from day one.",
      results: "Weekly tests, a monthly written parent report and a clear weak-chapter plan are part of every batch. Chapter-wise ticks on the syllabus page show exactly how much of the Mathematics syllabus is covered.",
      area: "The centre is at <b>Pragathinagar, Hyderabad</b>. Home tuition covers every area within about <b>10–15 km</b> — Nizampet, Bachupally, Miyapur, Kukatpally / JNTU, KPHB, Gajularamaram, Bollaram, Vovlvo, Gandimammagari, Bahadurpally, Balanagar, Alwal and more. Search your area in the areas list above.",
      default: "I did not catch that one. I can help with <b>fees, timings, the class-wise syllabus, boards, the demo class, home tuition, areas we cover and the Mathematics formula lab</b>. For anything else, WhatsApp or call the tutor directly on +91 87906 93366."
    }
  },

  /* ---------------- admin ---------------- */
  admin: { pin: "7095" }
};
