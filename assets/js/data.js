/* ============================================================
   Rajashekar Tuitions — site content
   ------------------------------------------------------------
   EDIT THIS FILE to change anything permanently for all visitors.
   Anything you save from the on-page Admin panel is stored in the
   visitor's own browser only.
   ============================================================ */

window.SRT = {
  brand: {
    name: "Rajashekar Tuitions",
    tagline: "Classes 6–10 · CBSE · ICSE · State Board",
    city: "Hyderabad",
    areaLine: "Hyderabad · Home tuition across all localities",
    established: "2016",
    founder: "Nagula Rajashekar"
  },

  tutor: {
    name: "Nagula Rajashekar",
    role: "Founder & Principal Tutor",
    experience: "10+",
    students: "600+",
    boards: "3",
    qualification: "M.Sc. Mathematics, B.Ed.",
    about:
      "Nagula Rajashekar has spent more than a decade teaching Mathematics and Physics to Classes 6–10. His method is simple and deliberately unhidden: every chapter is taught from the first line of logic, every formula is derived instead of memorised, and every doubt is answered until the student can explain it back in their own words.",
    points: [
      "Mathematics & Physics are his specialities — taught concept-first, never by formula memorisation",
      "Classroom batches capped at 12 students so nobody is left behind",
      "Home tuition and live online classes for students who cannot travel",
      "Weekly tests, monthly parent reports and a clear weak-topic plan",
      "CBSE, ICSE and Telangana State Board syllabus handled separately",
      "Doubts answered on WhatsApp between classes — students never wait for the next class"
    ]
  },

  contact: {
    phonePrimary: "8790693366",
    phoneAlt: "9705785897",
    phonePrimaryDisplay: "+91 87906 93366",
    phoneAltDisplay: "+91 97057 85897",
    email: "shekar2806@gmail.com",
    emailBusiness: "admissions@rajashekartuitions.in",
    whatsapp: "9197060785897",
    hours: [
      { d: "Monday – Saturday", t: "4:00 PM – 8:30 PM" },
      { d: "Sunday", t: "9:00 AM – 12:00 PM (doubt-clearing only)" },
      { d: "Home tuition slots", t: "Flexible — morning, evening or weekend" }
    ]
  },

  /* ---------------- classes & boards ---------------- */
  classes: ["6", "7", "8", "9", "10"],
  boards: ["CBSE", "ICSE", "State Board"],

  /* ---------------- subjects ---------------- */
  subjects: [
    {
      id: "maths", name: "Mathematics", icon: "sigma", tone: "brand", star: true,
      classes: "Classes 6 – 10", board: "CBSE · ICSE · State",
      blurb: "The signature subject. Concepts built from the base up, complete NCERT mastery, board-pattern drilling and a formula lab students can revise from.",
      topics: ["Number systems", "Algebra & quadratics", "Geometry", "Trigonometry", "Statistics", "Mensuration"]
    },
    {
      id: "physics", name: "Physics", icon: "atom", tone: "sky", star: true,
      classes: "Classes 9 – 10", board: "CBSE · ICSE · State",
      blurb: "Diagrams first, formulas second, numericals last. Every force, circuit and ray is explained with a picture so the reasoning is never a black box.",
      topics: ["Motion & forces", "Work, energy, power", "Light & reflection", "Electricity & circuits", "Sound waves", "Magnetism"]
    },
    {
      id: "science", name: "Science", icon: "flask", tone: "mint",
      classes: "Classes 6 – 9", board: "CBSE · ICSE · State",
      blurb: "Chapters taught as experiments the student can watch, repeat and explain — from living tissues to acids, bases and electricity.",
      topics: ["Living organisms", "Motion & force", "Acids & bases", "Human body", "Electricity", "Natural resources"]
    },
    {
      id: "chemistry", name: "Chemistry", icon: "drop", tone: "gold",
      classes: "Classes 8 – 10", board: "CBSE · ICSE",
      blurb: "Reaction logic, balancing and numerical practice with periodic-table habits built in early so Class 10 feels easy.",
      topics: ["Matter & atoms", "Acids, bases, salts", "Periodic table", "Chemical reactions", "Carbon compounds"]
    },
    {
      id: "biology", name: "Biology", icon: "leaf", tone: "mint",
      classes: "Classes 9 – 10", board: "CBSE · State",
      blurb: "Diagrams labelled, NCERT line-by-line, and a comparison-sheet habit that turns long chapters into short marks.",
      topics: ["Cell structure", "Tissues & systems", "Diversity of life", "Heredity", "Environment"]
    },
    {
      id: "english", name: "English", icon: "book", tone: "brand",
      classes: "Classes 6 – 10", board: "CBSE · ICSE · State",
      blurb: "Grammar plus writing plus literature together — reading practice, formats, letter & report writing and exam-time answer structure.",
      topics: ["Grammar", "Vocabulary", "Format & letter writing", "Comprehension", "Literature"]
    },
    {
      id: "telugu", name: "Telugu", icon: "pen", tone: "gold",
      classes: "Classes 6 – 10", board: "State Board",
      blurb: "Apavitrayam, rasalu, rachana and bhasha parichayalu with padyam, prayogam and rachana question practice.",
      topics: ["Apavitrayam", "Rasalu & rachana", "Vyakaranam", "Padyam & prayogam", "Bhasha parichayalu"]
    },
    {
      id: "hindi", name: "Hindi", icon: "pen", tone: "gold",
      classes: "Classes 6 – 10", board: "CBSE",
      blurb: "Vyakaran, rachnatmak lekhan, pathya sahityam and apathit bhasha abhyas with exam-format writing practice.",
      topics: ["Vyakaran", "Rachnatmak lekhan", "Apathit bhasha", "Pathya sahitya"]
    },
    {
      id: "social", name: "Social Science", icon: "globe", tone: "sky",
      classes: "Classes 6 – 10", board: "CBSE · ICSE · State",
      blurb: "History, Geography, Civics and Economics mapped chapter-wise with map work, timeline sheets and answer formats.",
      topics: ["History", "Geography & maps", "Civics", "Economics", "Map work"]
    },
    {
      id: "computer", name: "Computer & AI", icon: "chip", tone: "brand",
      classes: "Classes 6 – 10", board: "All boards",
      blurb: "Basics to board-level: MS Office, Python basics, spreadsheets, cyber safety and an introduction to how AI tools are used responsibly.",
      topics: ["MS Office", "Python basics", "Spreadsheets", "Cyber safety", "AI tools"]
    }
  ],

  /* ---------------- the special Maths & Physics formula lab ---------------- */
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
    },
    physics: {
      title: "Physics Formula Lab",
      note: "Each formula is written on the board with its diagram and units during class, so students remember the situation it belongs to.",
      items: [
        { n: "Speed", f: "v = s / t", w: "SI unit m/s. Always convert km/h to m/s by multiplying by 5/18 before substituting." },
        { n: "Second law", f: "F = m × a", w: "Force in N. If acceleration is given in g, multiply by 9.8 first." },
        { n: "Work, energy, power", f: "W = F·s | E = ½mv² | P = W/t", w: "1 kWh = 3.6 × 10⁶ J — the number Class 9–10 energy questions love." },
        { n: "Density & pressure", f: "ρ = m/V | P = F/A", w: "ρ in kg/m³, P in Pa. Liquid pressure rises by hρg for every metre of depth." },
        { n: "Ohm's law", f: "V = I × R", w: "P = VI = I²R = V²/R. Series R adds; parallel 1/R adds." },
        { n: "Reflection & refraction", f: "∠i = ∠r | n₁ sin r = n₂ sin t", w: "Mirror: m = −v/u; lens power P = 1/f with f in metres gives dioptres." },
        { n: "Buoyancy", f: "F_b = ρ_fluid × V × g", w: "Object floats when F_b equals weight; apparent weight = real weight − F_b." },
        { n: "Heat & temperature", f: "Q = mcΔT | C = Q/(mΔT)", w: "C is specific heat capacity in J kg⁻¹ K⁻¹. Water's C = 4200 J kg⁻¹ K⁻¹." }
      ]
    }
  },

  /* ---------------- how classes run ---------------- */
  modes: [
    {
      id: "classroom", name: "Classroom Tuition", icon: "board", tone: "brand", img: "classroom.svg",
      blurb: "Learn at the centre with a small batch, a whiteboard, and classmates who keep you accountable.",
      points: ["Batch size maximum 12 students", "Weekly printed worksheets and tests", "Fixed weekly timetable slot", "Doubt session every Sunday morning"],
      best: "Students who like a routine, a peer group and being called out to answer at the board."
    },
    {
      id: "home", name: "Home Tuition", icon: "home", tone: "mint", img: "home.svg",
      blurb: "One-to-one at your home or ours. The lesson is built around the student's own school syllabus and current test marks.",
      points: ["1-to-1 or 1-to-2 only", "Timings that suit school hours", "School-exam paper practice", "Parents get a monthly written report"],
      best: "Students who need individual attention, have school-missed concepts, or need to catch up before exams."
    },
    {
      id: "online", name: "Live Online Class", icon: "laptop", tone: "sky", img: "online.svg",
      blurb: "Live video teaching with a shared digital board. Doubts are answered on screen, and every class is recorded for revision.",
      points: ["Live, not pre-recorded", "Digital board with saved notes", "Class recordings shared after class", "Doubt clearing on WhatsApp"],
      best: "Students far from the centre, or who need an extra revision class between two classroom batches."
    }
  ],

  /* ---------------- batch timetable ---------------- */
  schedule: [
    {
      tab: "Class 6 – 7 · Foundation",
      rows: [
        ["Mon – Fri", "4:00 – 5:00 PM", "Mathematics", "Classroom · 12 seats"],
        ["Mon – Fri", "5:15 – 6:15 PM", "Science", "Classroom · 12 seats"],
        ["Sat", "9:00 – 10:00 AM", "English", "Classroom"],
        ["Sat", "10:15 – 11:15 AM", "Telugu / Hindi", "Classroom"],
        ["Sun", "9:00 – 10:30 AM", "Doubt-clearing + weekly test", "Free for all batches"]
      ]
    },
    {
      tab: "Class 8 · Bridge",
      rows: [
        ["Mon – Fri", "4:00 – 5:15 PM", "Mathematics", "Classroom · 10 seats"],
        ["Mon – Fri", "5:30 – 6:45 PM", "Science (Physics + Chemistry)", "Classroom"],
        ["Sat", "9:00 – 10:15 AM", "Social Science", "Classroom"],
        ["Sat", "10:30 – 11:45 AM", "English + Computer", "Classroom"],
        ["Daily", "Flexible", "Home tuition slot", "1-to-1 / 1-to-2"]
      ]
    },
    {
      tab: "Class 9 – 10 · Board prep",
      rows: [
        ["Mon – Wed", "4:00 – 5:30 PM", "Mathematics", "Board-pattern drilling"],
        ["Mon – Wed", "5:45 – 7:00 PM", "Physics", "Diagrams + numericals"],
        ["Thu – Fri", "4:00 – 5:15 PM", "Chemistry / Biology", "NCERT line-by-line"],
        ["Thu – Fri", "5:30 – 6:45 PM", "Social Science / English", "Answer-format practice"],
        ["Sat", "9:00 – 12:00 PM", "Full-length mock test + revision", "Every second Saturday"],
        ["Online", "7:15 – 8:15 PM", "Extra Maths revision", "Live online · recorded"]
      ]
    }
  ],

  /* ---------------- fee structure (edit these) ---------------- */
  fees: {
    classroom: { label: "Classroom (small batch)", note: "Up to 12 students · 4 classes/week · 1 hour", bands: { "6": 900, "7": 900, "8": 1000, "9": 1100, "10": 1100 }, allSubjectDiscount: 12 },
    home: { label: "Home tuition (1-to-1)", note: "4 classes/week · 1 hour · flexible timing", bands: { "6": 1400, "7": 1400, "8": 1600, "9": 1800, "10": 1800 }, allSubjectDiscount: 15 },
    online: { label: "Live online (1-to-1)", note: "4 classes/week · recorded · doubt chat", bands: { "6": 1200, "7": 1200, "8": 1300, "9": 1400, "10": 1400 }, allSubjectDiscount: 15 }
  },

  /* ---------------- teaching method ---------------- */
  method: [
    { t: "Free demo class", d: "30 minutes with the actual subject and chapter your child is studying. No payment, no obligation." },
    { t: "Diagnostic test", d: "A 20-mark paper per subject to find the real gap — not the chapter the child thinks is weak." },
    { t: "Concept teaching", d: "Logic first, formula second, board pattern last. Nothing is written without being explained." },
    { t: "Weekly test", d: "Short weekly test on the chapters covered, corrected in class with the child present." },
    { t: "Parent report", d: "Monthly report card: marks trend, weak topics, attendance and the plan for next month." },
    { t: "Exam strategy", d: "Answer formats, time per question, mark allocation and previous-year question drilling." }
  ],

  /* ---------------- gallery (replace with real classroom photos) ---------------- */
  gallery: [
    { img: "classroom.svg", cap: "Small-batch classroom session" },
    { img: "maths.svg", cap: "Mathematics — quadratic equations on the board" },
    { img: "home.svg", cap: "Home tuition, one-to-one" },
    { img: "physics.svg", cap: "Physics — inclined plane and force diagrams" },
    { img: "sam.svg", cap: "SAM study assistant for instant revision" },
    { img: "report.svg", cap: "Weekly test and parent report" },
    { img: "online.svg", cap: "Live online class with digital board" },
    { img: "hero.svg", cap: "Teaching maths and physics since 2016" }
  ],

  /* ---------------- areas served ---------------- */
  areas: ["Kukatpally", "Kalyan Nagar", "Ameerpet", "Miyapur", "Gachibowli", "JNTU", "Uppal", "Dilsukhnagar", "Chaitanyapuri", "Nizampet", "Balkampet", "Vanasthali Nagar", "Balanagar", "Alwal", "Shamshabad"],

  /* ---------------- student results (placeholder values — replace with real results) ---------------- */
  results: [
    { cls: "Class 10", sub: "Mathematics", board: "CBSE", score: "98%", delta: "+34" },
    { cls: "Class 10", sub: "Physics", board: "CBSE", score: "96%", delta: "+29" },
    { cls: "Class 10", sub: "Mathematics", board: "ICSE", score: "95%", delta: "+31" },
    { cls: "Class 10", sub: "Combined Maths + Physics", board: "State", score: "94%", delta: "+38" },
    { cls: "Class 9", sub: "Science", board: "CBSE", score: "92%", delta: "+26" },
    { cls: "Class 9", sub: "Mathematics", board: "ICSE", score: "93%", delta: "+28" }
  ],

  /* ---------------- testimonials (placeholder names — replace with real feedback) ---------------- */
  testimonials: [
    { text: "My daughter was weak in maths and used to cry before tests. After joining the Class 10 batch she now solves board papers herself and scored well. The Sunday doubt session makes a real difference.", name: "Parent · Class 10 student", tag: "Kukatpally" },
    { text: "Home tuition twice a week was the only thing that worked for us with our shift timings. Sir teaches physics with diagrams first — my son finally understands why the formula is used.", name: "Parent · Class 9 student", tag: "Gachibowli" },
    { text: "I joined for Maths in Class 9 and it turned into my strongest subject. Weekly tests and a monthly report for parents keep everyone on the same page. No false promises.", name: "Student · Class 10, CBSE", tag: "Ameerpet" },
    { text: "The online class saved me an hour of travel every day. Recordings mean I can revise the same evening again. Worth the fee.", name: "Student · Class 8", tag: "Miyapur" },
    { text: "Talugu and Social Science needed a lot of work. Chapter-wise practice sheets and answer formats made a huge difference in the board exam.", name: "Parent · Class 10, State Board", tag: "Uppal" },
    { text: "What I appreciated most: my doubts were answered on WhatsApp the same day, and I was never asked to feel behind in class.", name: "Student · Class 7", tag: "Kalyan Nagar" }
  ],

  /* ---------------- FAQ ---------------- */
  faqs: [
    { q: "Which classes and boards do you teach?", a: "Classes 6 to 10, across CBSE, ICSE and the Telangana State Board. Mathematics and Physics are the specialities, but English, Telugu, Hindi, Science, Chemistry, Biology, Social Science and Computer are all available." },
    { q: "Is there a free demo class before I pay?", a: "Yes. Every new student gets one free 30-minute demo class on a real chapter from their syllabus. There is no payment and no obligation — if the child is not comfortable, we say so honestly." },
    { q: "What is the difference between classroom and home tuition?", a: "Classroom tuition runs in a fixed slot at the centre with a batch of up to 12 students and a shared weekly test. Home tuition is one-to-one (or one-to-two) at the child's home or ours, with timings built around school hours, and includes a written monthly report for parents." },
    { q: "How are fees calculated and when are they due?", a: "Fees are per subject, per month, based on the class and the mode you choose. The calculator on this page shows the exact monthly and total amount. Fees are due by the 10th of each month; one month's notice is needed to discontinue." },
    { q: "How many students are in a classroom batch?", a: "Maximum 12 for Classes 6–7 and 10 for Classes 8–10. If a batch fills up, the student is offered the next slot or home tuition — we never add a 20th student to a full batch." },
    { q: "Do you take a single subject or the full syllabus?", a: "Both. Many parents take only Mathematics or only Physics, which is usually where the marks are lost. Some take Maths + Physics together, which is cheaper because of the combined discount." },
    { q: "What happens if my child misses a class?", a: "Tell us before the class and we share the class notes with a short recorded revision where applicable. Two makeup classes per month are allowed for classroom students." },
    { q: "Will you help with board preparation and previous-year papers?", a: "Yes. The Class 9–10 batch is built around the board pattern: NCERT line-by-line, previous-year questions, full-length mock tests every second Saturday and answer-format practice for both theory and numericals." },
    { q: "How can parents track progress?", a: "You get a written monthly report — marks trend per subject, weak topics identified, attendance and the plan for the coming month — plus an informal WhatsApp update whenever something changes." },
    { q: "Do you teach online, and is the class recorded?", a: "Yes, live online one-to-one classes are available. Classes are recorded and shared with the student for revision, and doubts can be asked on WhatsApp between sessions." },
    { q: "Which Hyderabad areas do you cover for home tuition?", a: "Most of Hyderabad, including Kukatpally, Kalyan Nagar, Gachibowli, Miyapur, Ameerpet, Uppal, JNTU, Nizampet, Balanagar, Alwal and Shamshabad. Areas just outside the list can usually be arranged too." },
    { q: "How do I start? What is the admission process?", a: "Send a WhatsApp message or fill the enquiry form with the student's class, board and subjects. You will get a call within a few hours, then a free demo class, then a slot and fee details." }
  ],

  /* ---------------- SAM — the on-page study assistant ---------------- */
  sam: {
    name: "SAM",
    full: "Study Assistant for Mathematics & Physics",
    greeting:
      "Hi! I am <b>SAM</b>, the study assistant for Rajashekar Tuitions. Ask me about fees, timings, subjects, demo class or how Maths and Physics are taught — or pick a quick question below.",
    quick: ["Fee for Class 10", "Class timings", "Which subjects?", "Is demo class free?", "Home tuition", "Maths formula", "Physics formula", "Talk to the tutor"],
    answers: {
      fee: "Fees are per subject per month. For <b>Class 10</b>: classroom ₹1,100, home tuition ₹1,800, live online ₹1,400 per subject per month. Taking Maths + Physics together gives a discount, and the <b>Fee Calculator</b> above shows your exact total.",
      time: "Classroom batches run <b>Monday to Saturday, 4:00 PM – 7:00 PM</b>, with slot timings per batch on the Timetable above. <b>Sunday 9:00 – 10:30 AM</b> is doubt-clearing plus the weekly test, free for all batches. Home tuition slots are flexible.",
      subjects: "Classes 6–10 across CBSE, ICSE and State Board. Mathematics and Physics are the specialities — those get a dedicated formula lab and deeper problem sets. Also Science, Chemistry, Biology, English, Telugu, Hindi, Social Science and Computer.",
      demo: "<b>Yes, the demo class is free.</b> 30 minutes on a real chapter from your child's syllabus, with the actual subject. No payment, no obligation — and if the child is not comfortable, we will say so honestly.",
      home: "Home tuition is <b>one-to-one or one-to-two</b>, at your home or ours. Four classes a week of one hour, timings built around school hours, practice on school exam papers, and a written monthly report for parents.",
      maths: "Open the <b>Formula Lab</b> above — it lists the eight most useful Class 9–10 Mathematics formulas with a note on when to use each one. Every formula is derived in class, so revision is quick.",
      physics: "In the <b>Physics Formula Lab</b> you will find speed, F = ma, work-energy-power, density & pressure, Ohm's law, reflection & refraction, buoyancy and heat — each with the situation it belongs to and its SI units.",
      talk: "The quickest way to reach the tutor is WhatsApp or a call — both numbers are in the top bar and the contact section. You can also use the enquiry form below and you will get a call back within a few hours.",
      boards: "CBSE, ICSE and the Telangana State Board are all handled, with separate chapter sequences. Tell us the board in the enquiry form so the right sequence is planned from day one.",
      results: "Weekly tests, a monthly written parent report and a clear weak-topic plan are part of every batch. Scores usually move fastest in Mathematics and Physics because those are taught with continuous practice from week one.",
      default: "I did not catch that one. I can help with <b>fees, timings, subjects, boards, demo class, home tuition, results</b> and the Maths & Physics formula lab. For anything else, WhatsApp or call the tutor directly — both numbers are in the top bar."
    }
  },

  /* ---------------- admin ---------------- */
  admin: { pin: "7095" }
};
