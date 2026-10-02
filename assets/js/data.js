/* ============================================================
   MathSaathi — site content
   ------------------------------------------------------------
   EDIT THIS FILE to change anything permanently for all visitors.
   Anything saved from the on-page Teacher Admin panel is stored
   in the visitor's own browser only.
   ============================================================ */

window.SRT = {
  /* ---------------- brand ---------------- */
  brand: {
    name: "MathSaathi",
    wordmark: "Math<span>Saathi</span>",
    tagline: "Maths · Physics · Chemistry · Classes 6–10 · CBSE & ICSE",
    promise: "MPC, taught properly — from Pragathinagar, Hyderabad",
    city: "Hyderabad",
    baseArea: "Pragathinagar",
    areaLine: "Pragathinagar, Hyderabad · home tuition within 10–15 km",
    established: "2016",
    founder: "Nagula Rajashekar"
  },

  /* ---------------- the teacher ---------------- */
  tutor: {
    name: "Nagula Rajashekar",
    short: "Rajashekar",
    role: "Founder & Principal Tutor · Maths, Physics, Chemistry",
    experience: "10+",
    students: "600+",
    boards: "2",
    qualification: "M.Sc. Mathematics, B.Ed.",
    about:
      "Rajashekar has taught Classes 6–10 from Pragathinagar, Hyderabad for more than a decade. He teaches the MPC trio — Mathematics, Physics and Chemistry — because these three decide a student's board result, and because a student who understands why a formula works never needs to memorise it twice. Every chapter starts from logic, ends on the board pattern, and every doubt is answered until the student can explain it back in their own words.",
    points: [
      "Only MPC — Mathematics, Physics and Chemistry — so each subject gets a real depth plan, not a part-time slot",
      "CBSE and ICSE chapters planned separately, class by class, from the current syllabus",
      "Classroom batches capped at 12 students so nobody is left behind",
      "Home tuition and live online one-to-one for students who cannot travel",
      "Weekly tests, monthly parent reports, chapter-wise syllabus tracking and sample papers",
      "Doubts answered on WhatsApp between classes — students never wait for the next class"
    ]
  },

  contact: {
    phonePrimary: "8790693366",
    phonePrimaryDisplay: "+91 87906 93366",
    email: "shekar2806@gmail.com",
    emailBusiness: "admissions@mathsaathi.in",
    whatsapp: "918790693366",
    hours: [
      { d: "Monday – Friday", t: "6:00 PM – 10:00 PM" },
      { d: "Saturday & Sunday", t: "10:00 AM – 10:00 PM" },
      { d: "Booking", t: "Any slot inside these hours — confirmed on WhatsApp and email" }
    ]
  },

  timings: {
    weekday: "Monday – Friday · 6:00 PM – 10:00 PM",
    weekend: "Saturday & Sunday · 10:00 AM – 10:00 PM",
    note:
      "Classroom batches run inside these windows. Home tuition and live online slots can be booked at any time that suits you inside the same windows — tell us the time you want in the enquiry form and it is confirmed on WhatsApp and by email."
  },

  /* ---------------- classes, boards, stream ---------------- */
  classes: ["6", "7", "8", "9", "10"],
  boards: ["CBSE", "ICSE"],
  stream: {
    code: "MPC",
    full: "Mathematics + Physics + Chemistry",
    note:
      "The MPC trio is the combination that decides a Class 10 board result, and it is also the exact combination needed for Class 11 maths, physics and chemistry. We teach all three, board-wise and class-wise, from one teacher who knows exactly where students link the three together."
  },

  /* ---------------- the three subjects ---------------- */
  subjects: [
    {
      id: "maths", name: "Mathematics", short: "Maths", icon: "sigma", tone: "brand", core: true,
      classes: "Classes 6 – 10", board: "CBSE · ICSE",
      blurb: "The anchor subject. Number systems and algebra built from the base up, geometry and trigonometry with real diagrams, then board-pattern drilling with the formula lab for revision.",
      topics: ["Number systems", "Algebra & quadratics", "Geometry & mensuration", "Trigonometry", "Statistics & probability"],
      exam: "Board weight: 80 in Class 10 CBSE / 80 in ICSE. Highest-scoring subject when the basics are clean."
    },
    {
      id: "physics", name: "Physics", short: "Physics", icon: "atom", tone: "sky",
      classes: "Classes 6 – 10", board: "CBSE · ICSE",
      blurb: "Every formula started with a real situation — a tap, a slope, a kettle — so the student can rebuild the equation instead of recalling it.",
      topics: ["Motion & graphs", "Force, work & energy", "Heat & measurement", "Light: reflection & refraction", "Electricity & magnetism"],
      exam: "Board weight: 40 in Class 10 CBSE / 40 in ICSE. Numericals are where marks are lost — we drill them."
    },
    {
      id: "chemistry", name: "Chemistry", short: "Chemistry", icon: "flask", tone: "mint",
      classes: "Classes 6 – 10", board: "CBSE · ICSE",
      blurb: "Matter, atoms, acids and salts, metals and carbon compounds — explained with reactions the student can see, then written in the exact board format.",
      topics: ["Matter & mixtures", "Atoms, molecules & valency", "Acids, bases & salts", "Metals & non-metals", "Carbon & its compounds"],
      exam: "Board weight: 40 in Class 10 CBSE / 40 in ICSE. Reactions and equations carry easy marks if written correctly."
    }
  ],

  /* ---------------- class-wise syllabus, subject by subject ---------------- */
  syllabus: {
    note:
      "Chapter lists follow the current CBSE (NCERT) and ICSE (Concise / Selina) syllabus, subject by subject and class by class. Click a chapter to move it through Not started → Learning → Revised → Mastered. Your progress is saved in this browser, and the test engine uses these same chapters to point out weak areas.",
    footnote:
      "Syllabus and book sequences change occasionally. Send your school's list on WhatsApp and the exact chapter sequence will be matched to it before the batch starts.",
    statuses: [
      { id: "0", label: "Not started", short: "New" },
      { id: "1", label: "Learning", short: "Learning" },
      { id: "2", label: "Revised", short: "Revised" },
      { id: "3", label: "Mastered", short: "Mastered" }
    ],
    classes: [
      {
        cls: "6",
        maths: {
          cbse: ["Knowing our numbers", "Playing with numbers", "Whole numbers", "Operations on whole numbers", "Understanding elementary shapes", "Integers", "Fractions", "Decimals", "Data handling", "Mensuration", "Algebra", "Ratio and proportion", "Symmetry", "Visualising solid shapes"],
          icse: ["Knowing our numbers", "Playing with numbers", "Whole numbers", "Operations on whole numbers", "Understanding elementary shapes", "Integers", "Fractions", "Decimals", "The number line", "Algebra", "Ratio and proportion", "Symmetry", "Mensuration", "Data handling"]
        },
        physics: {
          cbse: ["Measurement and units", "Motion and forces", "Light and shadows", "Sound around us", "Magnetism", "Simple electric circuits"],
          icse: ["Physical quantities and measurement", "Force, work and energy", "Light: reflection and shadows", "Sound", "Magnetism", "Simple electric circuits"]
        },
        chemistry: {
          cbse: ["Food: our source of energy", "Components of food", "Physical and chemical change", "Methods of separation", "Changes around us", "Air and water"],
          icse: ["Matter and its states", "Measurement in science", "Light energy", "Simple chemical changes", "Air and water", "Sorting materials"]
        }
      },
      {
        cls: "7",
        maths: {
          cbse: ["Integers", "Fractions and decimals", "Data handling", "Simple equations", "Lines and angles", "The triangle and its properties", "Congruence of triangles", "Comparing quantities", "Rational numbers", "Practical geometry", "Perimeter and area", "Algebraic expressions", "Exponents and powers", "Symmetry", "Visualising solid shapes"],
          icse: ["Integers", "Fractions", "Decimals", "Rational numbers", "Exponents", "Algebraic expressions", "Linear equations in one variable", "Ratio and proportion", "Percentage, discount, profit and loss", "Simple interest", "Lines and angles", "Triangles", "Congruence of triangles", "Symmetry", "Perimeter and area", "Data handling", "Understanding shapes"]
        },
        physics: {
          cbse: ["Motion and time", "Force and pressure", "Light (reflection and vision)", "Heat transfer", "Electricity and circuits"],
          icse: ["Physical quantities and units", "Force and motion", "Work, energy and power", "Light energy", "Sound", "Magnetism", "Simple electric circuits"]
        },
        chemistry: {
          cbse: ["Physical and chemical changes", "Acids, bases and salts", "Weather, climate and adaptations", "Heat and its effects", "Nutrition in plants", "Water: a precious resource"],
          icse: ["Physical and chemical changes", "Acids, bases and salts", "Physical quantities and measurement", "Heat and temperature", "Classification of matter", "Nature of matter"]
        }
      },
      {
        cls: "8",
        maths: {
          cbse: ["Rational numbers", "Linear equations in one variable", "Understanding quadrilaterals", "Data handling", "Squares and square roots", "Cubes and cube roots", "Comparing quantities", "Algebraic expressions and identities", "Visualising solid shapes", "Mensuration", "Exponents and powers", "Direct and inverse proportion", "Factorisation", "Introduction to graphs", "Playing with numbers", "Introduction to Euclid's geometry", "Lines and angles", "Triangles", "Quadrilaterals", "Circles"],
          icse: ["Rational numbers", "Exponents and powers", "Squares and square roots", "Cubes and cube roots", "Playing with numbers", "Sets", "Percentage", "Profit and loss", "Compound interest", "Algebraic identities", "Factorisation", "Simple linear equations", "Linear inequalities", "Understanding quadrilaterals", "Constructions", "Circles", "Pythagoras theorem", "Area and perimeter", "Data handling"]
        },
        physics: {
          cbse: ["Force and pressure", "Friction", "Sound", "Chemical effects of electric current", "Some natural phenomena", "Light"],
          icse: ["Force and pressure", "Work, energy and power", "Light energy", "Sound", "Chemical effects of electric current", "Household electric circuits"]
        },
        chemistry: {
          cbse: ["Combustion and flame", "Effects of electric current", "Chemical reactions and equations", "Acids, bases and salts", "Periodic classification of elements", "Coal and petroleum"],
          icse: ["Matter and its composition", "Physical and chemical changes", "Language of chemistry", "Atoms and molecules", "Atomic structure", "Combination and decomposition", "Study of gases", "Acids, bases and salts"]
        }
      },
      {
        cls: "9",
        maths: {
          cbse: ["Number systems", "Polynomials", "Coordinate geometry", "Linear equations in two variables", "Introduction to Euclid's geometry", "Lines and angles", "Triangles", "Quadrilaterals", "Circles", "Heron's formula", "Surface areas and volumes", "Statistics"],
          icse: ["Pure arithmetic", "Rational and irrational numbers", "Polynomials", "Linear equations in one variable", "Simultaneous linear equations", "Quadratic equations", "Inequalities", "Constructions", "Circles", "Co-ordinate geometry", "Introduction to trigonometry", "Similarity", "Loci", "Lines and angles", "Mensuration", "Median, mode and mean", "Probability"]
        },
        physics: {
          cbse: ["Motion", "Force and laws of motion", "Gravitation", "Work and energy", "Sound", "Light: reflection and refraction", "Electricity", "Magnetic effects of electric current", "Natural resources"],
          icse: ["Measurements and experimentation", "Force and motion", "Machines", "Refraction of light at plane surfaces", "Refraction through a lens", "Spectrum", "Sound", "Current electricity", "Household circuits", "Magnetism and electromagnetic induction"]
        },
        chemistry: {
          cbse: ["Matter in our surroundings", "Is matter around us pure", "Atoms and molecules", "Structure of atom", "Fun with solutions", "Acids, bases and salts", "Periodic classification of elements", "Natural resources"],
          icse: ["The language of chemistry", "Chemical reaction and equations", "Atoms and molecules", "Atomic structure and periodic table", "Acids, bases and salts", "Water as a solvent", "Carbon", "Nitrogen and sulphur"]
        }
      },
      {
        cls: "10",
        maths: {
          cbse: ["Real numbers", "Polynomials", "Pair of linear equations in two variables", "Quadratic equations", "Arithmetic progressions", "Triangles", "Coordinate geometry", "Introduction to trigonometry", "Some applications of trigonometry", "Circles", "Areas related to circles", "Surface areas and volumes", "Statistics", "Probability"],
          icse: ["Commercial mathematics (GST)", "Banking", "Shares and dividends", "Linear equations (word problems)", "Quadratic equations", "Matrix", "Determinants", "Transformations", "Similarity", "Loci", "Trigonometry", "Circle", "Constructions", "Coordinate geometry", "Mensuration (surface area and volume)", "Mean, median, mode (grouped data and ogive)", "Probability", "Linear regression"]
        },
        physics: {
          cbse: ["Effects of electric current", "Magnetic effects of electric current", "Light: reflection and refraction", "Metals and non-metals", "Periodic classification of elements", "Carbon and its compounds", "Sources of energy", "Our environment"],
          icse: ["Refraction through a lens", "Spectrum", "Sound", "Current electricity", "Magnetism", "Electromagnetic induction", "Heat and thermometry", "Radioactivity", "Modern physics"]
        },
        chemistry: {
          cbse: ["Chemical reactions and equations", "Acids, bases and salts", "Metals and non-metals", "Carbon and its compounds", "Periodic classification of elements", "Sustainability of natural resources"],
          icse: ["Periodic properties of elements", "Chemical bonding", "Study of acids, bases and salts", "Electrolysis", "Metallurgy", "Study of compounds: hydrochloric acid, ammonia, nitric acid, sulphuric acid", "Organic chemistry", "Introduction to organic compounds", "Fuels", "Radioactivity"]
        }
      }
    ]
  },

  /* ---------------- formula lab, subject by subject ---------------- */
  formulaLab: {
    note: "Every formula below is derived in class — these cards are for revision, never for memorising without understanding.",
    maths: {
      title: "Mathematics Formula Lab",
      items: [
        { n: "Quadratic roots", f: "x = (−b ± √(b² − 4ac)) / 2a", w: "Discriminant D decides: D > 0 two real roots, D = 0 equal roots, D < 0 no real roots." },
        { n: "Arithmetic progression", f: "Sₙ = n/2 · [2a + (n−1)d]", w: "Also aₙ = a + (n−1)d. Use the sum form whenever the question says 'sum of n terms'." },
        { n: "Pythagoras & distance", f: "c² = a² + b²  |  d = √[(x₂−x₁)² + (y₂−y₁)²]", w: "Distance between two points and the length of a perpendicular from a point to a line use the same pattern." },
        { n: "Trigonometry ratios", f: "sin θ = O/H , cos θ = A/H , tan θ = O/A", w: "Plus sin²θ + cos²θ = 1 — the identity that unlocks most value-based questions." },
        { n: "Mensuration", f: "Circle: πr² | Cylinder: 2πrh | Cone: (1/3)πr²h", w: "Total surface area adds 2πr² for cylinder and πrl for cone; be careful with 'curved' vs 'total'." },
        { n: "Heron's triangle", f: "A = √[s(s−a)(s−b)(s−c)],  s = (a+b+c)/2", w: "Compute s first, then substitute. Class 10 area questions are almost always Heron's." },
        { n: "Mean, median, mode", f: "Mean = Σx / n  |  Median = middle value", w: "For grouped data use Σfx/n with the class-mark x. An ogive gives the median directly." },
        { n: "Linear inequalities", f: "ax + b < 0  (a > 0)", w: "Divide by a, and flip the sign only when a is negative." }
      ]
    },
    physics: {
      title: "Physics Formula Lab",
      items: [
        { n: "Speed, distance, time", f: "v = d/t  |  d = v·t  |  t = d/v", w: "Use average speed for the whole journey, not for each segment — add distances, add times." },
        { n: "Newton's second law", f: "F = m·a  ⇒  a = F/m", w: "In the working, keep the unit consistent: 1 N = 1 kg·m/s²." },
        { n: "Work, energy, power", f: "W = F·s  |  E = mgh  |  P = W/t", w: "Gravitational potential energy uses h in metres and g = 9.8 m/s²." },
        { n: "Density and pressure", f: "ρ = m/V  |  P = F/A = hρg", w: "1 kg/m³ = 1 g/cm³. Liquid pressure depends only on depth, not on the shape of the vessel." },
        { n: "Ohm's law and power", f: "V = IR  |  P = VI = I²R = V²/R", w: "With resistors in series R adds; in parallel 1/R adds. Choose the P formula that matches what the question gives." },
        { n: "Wave and optics basics", f: "v = f·λ  |  1/f = 1/v − 1/u  |  n = 1/v sin r / (1/u sin i)", w: "Sign convention for the lens formula: u is negative for a real object with the usual NCERT rule." }
      ]
    },
    chemistry: {
      title: "Chemistry Formula Lab",
      items: [
        { n: "Number of moles", f: "n = given mass / molar mass", w: "Also n = (given mass / atomic mass) × valency for compounds built from valency." },
        { n: "Concentration", f: "Mass % = (solute mass / solution mass) × 100", w: "Solution mass = solute + solvent. Always check which one the question gives." },
        { n: "pH", f: "pH = −log[H⁺]  |  acidic: pH < 7  |  neutral: pH = 7  |  basic: pH > 7", w: "Diluting an acid raises the pH (moves towards 7); diluting a base lowers it." },
        { n: "Relative atomic mass", f: "RAM = (sum of atomic masses × number of atoms) / total number of atoms", w: "Remember the two oxygen atoms in H₂O and the two in SO₂ — students forget this most often." },
        { n: "Reaction types", f: "Combination A + B → AB | Decomposition AB → A + B | Displacement A + BC → AC + B | Double displacement AB + CD → AD + CB", w: "Identify the type first, then predict the product using valency." },
        { n: "Oxidation numbers", f: "Sum of oxidation numbers = charge on the species", w: "Hydrogen is always +1 with non-metals, oxygen −2 in oxides; get the rest by balance." }
      ]
    }
  },

  /* ---------------- sample question bank for the practice test engine ---------------- */
  /* cls: class · subject: maths|physics|chemistry · chapter: must match a syllabus chapter
     type: mcq (options + answer index) | num (numeric answer) | short (written answer)
     level: easy|medium|tough · marks: 1 by default */
  testBank: [
    /* ---------- Mathematics ---------- */
    { id: "m1", cls: "6", subject: "maths", chapter: "Fractions", type: "mcq", level: "easy", q: "Which fraction is equal to 0.5?", options: ["1/4", "1/2", "3/4", "1/5"], answer: 1, hint: "Write 0.5 as 5/10 and then simplify the fraction.", solution: "0.5 = 5/10. Dividing numerator and denominator by 5 gives 1/2. So the answer is 1/2." },
    { id: "m2", cls: "6", subject: "maths", chapter: "Integers", type: "num", level: "easy", q: "The temperature at 5 AM in Hyderabad was −4 °C. By noon it had risen by 9 °C. What was the noon temperature in °C?", answer: 5, unit: "°C", hint: "A rise of 9 °C means adding 9 to −4.", solution: "−4 + 9 = 5. The noon temperature was 5 °C." },
    { id: "m3", cls: "6", subject: "maths", chapter: "Mensuration", type: "num", level: "easy", q: "A rectangular field is 12 m long and 5 m wide. Find its area in m².", answer: 60, unit: "m²", hint: "Area of a rectangle = length × width.", solution: "Area = 12 × 5 = 60 m²." },
    { id: "m4", cls: "7", subject: "maths", chapter: "Ratio and proportion", type: "num", level: "easy", q: "8 identical pens cost ₹120. What is the cost of 5 pens in rupees?", answer: 75, unit: "₹", hint: "Use the unitary method: find the cost of one pen first.", solution: "Cost of one pen = 120 ÷ 8 = ₹15. Cost of 5 pens = 5 × 15 = ₹75." },
    { id: "m5", cls: "7", subject: "maths", chapter: "Comparing quantities", type: "num", level: "medium", q: "A jacket marked ₹1,500 is given a 20% discount. What is the selling price in rupees?", answer: 1200, unit: "₹", hint: "Discount amount = 20% of 1,500.", solution: "Discount = 0.20 × 1500 = ₹300. Selling price = 1500 − 300 = ₹1,200." },
    { id: "m6", cls: "7", subject: "maths", chapter: "Algebraic expressions", type: "mcq", level: "medium", q: "Simplify: 3a + 2b − (a − b)", options: ["2a + 3b", "4a + b", "2a + b", "3a − b"], answer: 0, hint: "Distribute the minus sign: −(a − b) = −a + b.", solution: "3a + 2b − a + b = 2a + 3b." },
    { id: "m7", cls: "8", subject: "maths", chapter: "Linear equations in one variable", type: "num", level: "easy", q: "If 3x − 7 = 14, what is the value of x?", answer: 7, hint: "Add 7 to both sides to get 3x = 21.", solution: "3x = 21 ⇒ x = 21 ÷ 3 = 7." },
    { id: "m8", cls: "8", subject: "maths", chapter: "Mensuration", type: "num", level: "medium", q: "The area of a square is 144 cm². What is the length of its side in cm?", answer: 12, unit: "cm", hint: "Side = √(area).", solution: "√144 = 12, so each side is 12 cm." },
    { id: "m9", cls: "8", subject: "maths", chapter: "Exponents and powers", type: "mcq", level: "easy", q: "Simplify 2³ × 2⁴.", options: ["2⁷", "2¹²", "2¹", "2¹⁴"], answer: 0, hint: "Same base — add the exponents.", solution: "2^(3+4) = 2⁷ = 128." },
    { id: "m10", cls: "9", subject: "maths", chapter: "Number systems", type: "mcq", level: "medium", q: "Which of these numbers is rational?", options: ["√2", "π", "0.5", "√5"], answer: 2, hint: "A rational number can be written exactly as p/q with integers p and q.", solution: "0.5 = 5/10 is rational. √2, √5 and π are irrational." },
    { id: "m11", cls: "9", subject: "maths", chapter: "Polynomials", type: "mcq", level: "easy", q: "What is the degree of the polynomial 3x⁴ − 5x² + 7?", options: ["2", "3", "4", "1"], answer: 2, hint: "The degree is the highest exponent of the variable with a non-zero coefficient.", solution: "The highest power is x⁴, so the degree is 4." },
    { id: "m12", cls: "9", subject: "maths", chapter: "Heron's formula", type: "num", level: "medium", q: "A triangle has sides 6 cm, 8 cm and 10 cm. Find its area in cm².", answer: 24, unit: "cm²", hint: "First find s = (a+b+c)/2, then use A = √[s(s−a)(s−b)(s−c)].", solution: "s = (6+8+10)/2 = 12. Area = √[12 × 6 × 4 × 2] = √576 = 24 cm²." },
    { id: "m13", cls: "10", subject: "maths", chapter: "Polynomials", type: "num", level: "medium", q: "If α and β are the roots of x² − 5x + 6 = 0, what is the value of α + β?", answer: 5, hint: "Sum of roots = −(coefficient of x) ÷ (coefficient of x²).", solution: "α + β = −(−5)/1 = 5." },
    { id: "m14", cls: "10", subject: "maths", chapter: "Introduction to trigonometry", type: "mcq", level: "easy", q: "Which identity is true for every angle θ?", options: ["sin²θ + cos²θ = 1", "sin θ · cos θ = 1", "tan θ = sin θ", "cot θ = cos θ"], answer: 0, hint: "This is the Pythagorean identity from a right-angled triangle.", solution: "sin²θ + cos²θ = 1 for all θ. (Dividing by cos²θ also gives 1 + tan²θ = sec²θ.)" },
    { id: "m15", cls: "10", subject: "maths", chapter: "Coordinate geometry", type: "mcq", level: "easy", q: "The point (3, −2) lies in which quadrant?", options: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], answer: 2, hint: "Check the signs of x and y first.", solution: "x = 3 is positive and y = −2 is negative, so the point lies in Quadrant III." },
    { id: "m16", cls: "10", subject: "maths", chapter: "Surface areas and volumes", type: "num", level: "tough", q: "A cone has radius 7 cm and height 24 cm. Find its curved surface area in cm² (take π = 22/7).", answer: 528, unit: "cm²", hint: "Curved surface area of a cone = πrl — height is not used.", solution: "πrl = (22/7) × 7 × 24 = 22 × 24 = 528 cm²." },
    { id: "m17", cls: "9", subject: "maths", chapter: "Statistics", type: "num", level: "easy", q: "The marks of 5 students are 60, 72, 84, 90 and 94. What is the mean mark?", answer: 80, hint: "Mean = sum of marks ÷ number of students.", solution: "Sum = 60+72+84+90+94 = 400. Mean = 400 ÷ 5 = 80." },
    { id: "m18", cls: "8", subject: "maths", chapter: "Squares and square roots", type: "num", level: "easy", q: "Find the square root of 1764.", answer: 42, hint: "Pair the digits from the right: 17 | 64.", solution: "The largest number whose square is 1764 is 42, since 42 × 42 = 1764." },

    /* ---------- Physics ---------- */
    { id: "p1", cls: "6", subject: "physics", chapter: "Measurement and units", type: "mcq", level: "easy", q: "Which is the SI unit of length?", options: ["metre", "foot", "inch", "yard"], answer: 0, hint: "SI units come from the international system of measurement.", solution: "The SI unit of length is the metre (m)." },
    { id: "p2", cls: "6", subject: "physics", chapter: "Motion and forces", type: "num", level: "medium", q: "A force of 20 N acts on a body of mass 4 kg. Find the acceleration produced in m/s².", answer: 5, unit: "m/s²", hint: "Use F = m·a and rearrange for a.", solution: "a = F/m = 20/4 = 5 m/s²." },
    { id: "p3", cls: "6", subject: "physics", chapter: "Light and shadows", type: "mcq", level: "easy", q: "The image formed by a plane mirror is:", options: ["real and inverted", "virtual and erect", "real and erect", "virtual and inverted"], answer: 1, hint: "A plane mirror always forms an image behind the mirror.", solution: "A plane mirror forms a virtual, erect and laterally inverted image of the same size." },
    { id: "p4", cls: "7", subject: "physics", chapter: "Sound", type: "mcq", level: "easy", q: "Sound cannot travel through:", options: ["air", "water", "steel", "a vacuum"], answer: 3, hint: "Sound needs a material medium to carry vibrations.", solution: "Sound needs particles to travel, so it cannot pass through a vacuum — that is why space is silent." },
    { id: "p5", cls: "7", subject: "physics", chapter: "Force and pressure", type: "num", level: "medium", q: "A 20 N force acts normally on an area of 4 m². Find the pressure in pascals.", answer: 5, unit: "Pa", hint: "Pressure = force ÷ area, and 1 N/m² = 1 Pa.", solution: "P = F/A = 20 ÷ 4 = 5 Pa." },
    { id: "p6", cls: "8", subject: "physics", chapter: "Sound", type: "num", level: "easy", q: "The frequency of a sound wave is 50 Hz and its wavelength is 6 m. Find its speed in m/s.", answer: 300, unit: "m/s", hint: "Use v = f · λ.", solution: "v = 50 × 6 = 300 m/s." },
    { id: "p7", cls: "8", subject: "physics", chapter: "Chemical effects of electric current", type: "mcq", level: "medium", q: "In electroplating, the object to be plated is connected to which terminal of the cell?", options: ["the positive terminal (anode)", "the negative terminal (cathode)", "either terminal", "it is not connected"], answer: 1, hint: "The coating metal should dissolve into the solution, so it must be the anode.", solution: "The object to be plated is made the cathode (negative terminal) so that the coating metal deposits on it; the coating metal itself is the anode." },
    { id: "p8", cls: "8", subject: "physics", chapter: "Force and pressure", type: "num", level: "easy", q: "A block of mass 5 kg is placed on a surface. Taking g = 10 m/s², what is its weight in newtons?", answer: 50, unit: "N", hint: "Weight = mass × g.", solution: "W = mg = 5 × 10 = 50 N." },
    { id: "p9", cls: "9", subject: "physics", chapter: "Motion", type: "num", level: "easy", q: "A car covers 120 km in 3 hours. What is its average speed in km/h?", answer: 40, unit: "km/h", hint: "Average speed = total distance ÷ total time.", solution: "Speed = 120 ÷ 3 = 40 km/h." },
    { id: "p10", cls: "9", subject: "physics", chapter: "Force and laws of motion", type: "mcq", level: "easy", q: "The SI unit of force is:", options: ["joule", "newton", "pascal", "watt"], answer: 1, hint: "Force is measured by how much it changes the motion of a body.", solution: "Force is measured in newtons (N); 1 N = 1 kg·m/s²." },
    { id: "p11", cls: "9", subject: "physics", chapter: "Work and energy", type: "num", level: "medium", q: "A 4 kg body is lifted to a height of 3 m. Taking g = 10 m/s², what is the work done in joules?", answer: 120, unit: "J", hint: "W = mgh, with h in metres.", solution: "W = 4 × 10 × 3 = 120 J." },
    { id: "p12", cls: "9", subject: "physics", chapter: "Gravitation", type: "mcq", level: "easy", q: "The value of g near the Earth's surface is about:", options: ["9.8 m/s²", "98 m/s²", "0.98 m/s²", "9.8 km/s²"], answer: 0, hint: "g is the acceleration due to gravity on the Earth's surface.", solution: "g ≈ 9.8 m/s² at the Earth's surface, and it decreases as you go higher." },
    { id: "p13", cls: "10", subject: "physics", chapter: "Light: reflection and refraction", type: "mcq", level: "medium", q: "A concave mirror forms a real, inverted image when the object is placed:", options: ["beyond the focus", "at the focus", "between the focus and the pole", "at the pole"], answer: 0, hint: "Draw the ray diagram for a concave mirror in each case.", solution: "Beyond the focus, the reflected rays meet in front of the mirror, giving a real, inverted image." },
    { id: "p14", cls: "10", subject: "physics", chapter: "Effects of electric current", type: "mcq", level: "easy", q: "The SI unit of electric current is:", options: ["volt", "ampere", "ohm", "watt"], answer: 1, hint: "The unit is named after a physicist and is written with the symbol A.", solution: "Electric current is measured in amperes (A). Voltage is in volts, resistance in ohms, power in watts." },
    { id: "p15", cls: "10", subject: "physics", chapter: "Sources of energy", type: "mcq", level: "easy", q: "Solar energy is classified as a:", options: ["conventional source", "non-conventional source", "exhaustible fossil fuel", "thermal source"], answer: 1, hint: "Conventional sources are coal, petroleum, natural gas and electricity.", solution: "Solar energy is renewable and hence a non-conventional (alternative) source of energy." },
    { id: "p16", cls: "10", subject: "physics", chapter: "Magnetic effects of electric current", type: "mcq", level: "medium", q: "Which device works on the principle of electromagnetic induction?", options: ["electric motor", "electric bell", "dynamo", "telescope"], answer: 2, hint: "Induction means a current is produced without a battery.", solution: "A dynamo generates current from a rotating coil in a magnetic field — electromagnetic induction." },
    { id: "p17", cls: "9", subject: "physics", chapter: "Electricity", type: "num", level: "medium", q: "A 12 V battery is connected to a 4 Ω resistor. What is the current in amperes?", answer: 3, unit: "A", hint: "Ohm's law: V = IR.", solution: "I = V/R = 12 ÷ 4 = 3 A." },
    { id: "p18", cls: "9", subject: "physics", chapter: "Motion", type: "short", level: "medium", marks: 2, q: "A ball is dropped from rest and falls for 4 seconds under gravity. Name the type of motion and state one reason it is accelerated motion.", answer: "Uniformly accelerated straight-line (free-fall) motion, because the velocity increases by 9.8 m/s every second due to gravity.", hint: "Think about what happens to the velocity as the ball falls.", solution: "The ball moves in a straight line and its speed keeps increasing at a constant rate (g = 9.8 m/s²), so it is uniformly accelerated motion." },

    /* ---------- Chemistry ---------- */
    { id: "c1", cls: "6", subject: "chemistry", chapter: "Components of food", type: "mcq", level: "easy", q: "Which nutrient is needed for growth and repair of the body?", options: ["carbohydrates", "proteins", "sugars", "oils"], answer: 1, hint: "Think of dal, milk and eggs.", solution: "Proteins build and repair the body. Carbohydrates and fats mainly give energy." },
    { id: "c2", cls: "6", subject: "chemistry", chapter: "Matter and its states", type: "mcq", level: "easy", q: "Which state of matter has a fixed volume but no fixed shape?", options: ["solid", "liquid", "gas", "plasma"], answer: 1, hint: "Pour it into a glass and look at the shape.", solution: "A liquid has a fixed volume but takes the shape of the container." },
    { id: "c3", cls: "7", subject: "chemistry", chapter: "Acids, bases and salts", type: "mcq", level: "easy", q: "A solution with pH 3 is:", options: ["acidic", "neutral", "basic", "alkaline"], answer: 0, hint: "Remember the pH scale: below 7 is acid.", solution: "pH 3 is below 7, so the solution is acidic." },
    { id: "c4", cls: "7", subject: "chemistry", chapter: "Acids, bases and salts", type: "mcq", level: "easy", q: "Litmus turns red in:", options: ["an acid", "a base", "pure water", "a neutral salt solution"], answer: 0, hint: "Blue litmus in acid, red litmus in base.", solution: "Acids turn blue litmus red and bases turn red litmus blue." },
    { id: "c5", cls: "8", subject: "chemistry", chapter: "Atomic structure", type: "mcq", level: "easy", q: "The number of protons in an atom is called its:", options: ["atomic number", "mass number", "neutron number", "valency"], answer: 0, hint: "It is the identity of the element.", solution: "Atomic number = number of protons. Mass number = protons + neutrons." },
    { id: "c6", cls: "8", subject: "chemistry", chapter: "Atomic structure", type: "num", level: "medium", q: "An atom has 2 electrons in its first shell. What is the maximum number of electrons that can go in its second shell?", answer: 8, hint: "The second shell holds 2n² electrons where n = 2.", solution: "2n² = 2 × 2² = 8, so the second shell can hold 8 electrons." },
    { id: "c7", cls: "8", subject: "chemistry", chapter: "Atoms and molecules", type: "mcq", level: "medium", q: "A mixture of sulphur powder and iron filings can be separated by:", options: ["filtration", "evaporation", "a magnet", "chromatography"], answer: 2, hint: "Iron is magnetic; sulphur is not.", solution: "A magnet attracts the iron filings and leaves sulphur behind." },
    { id: "c8", cls: "8", subject: "chemistry", chapter: "Atoms and molecules", type: "num", level: "easy", q: "What is the relative molecular mass of water, H₂O? (H = 1, O = 16)", answer: 18, hint: "Add the atomic masses of all the atoms and divide by the number of atoms.", solution: "RAM = (2 × 1 + 1 × 16) ÷ 3 = 18 ÷ 3 = 18." },
    { id: "c9", cls: "9", subject: "chemistry", chapter: "Is matter around us pure", type: "num", level: "medium", q: "How many types of elements are present in water (H₂O)?", answer: 2, hint: "Count the different kinds of atoms, not the total atoms.", solution: "Water has hydrogen and oxygen — 2 elements (3 atoms)." },
    { id: "c10", cls: "9", subject: "chemistry", chapter: "Matter in our surroundings", type: "mcq", level: "easy", q: "Which change is a physical change?", options: ["burning of paper", "melting of ice", "rusting of iron", "curdling of milk"], answer: 1, hint: "Ask: has a new substance been formed?", solution: "Melting ice changes only the state; no new substance is formed, so it is a physical change." },
    { id: "c11", cls: "9", subject: "chemistry", chapter: "Structure of atom", type: "num", level: "easy", q: "An element has atomic number 17. How many neutrons does it have if its mass number is 35?", answer: 18, hint: "Mass number = protons + neutrons.", solution: "Neutrons = 35 − 17 = 18." },
    { id: "c12", cls: "9", subject: "chemistry", chapter: "Fun with solutions", type: "num", level: "medium", q: "How many grams of salt dissolve in 200 g of water to give a 20% by mass solution?", answer: 50, unit: "g", hint: "If the salt is x grams, then the solution is x + 200 grams.", solution: "x/(x+200) × 100 = 20 ⇒ x = 50 g. (Solution mass = 250 g, salt = 50 g.)" },
    { id: "c13", cls: "10", subject: "chemistry", chapter: "Chemical reactions and equations", type: "short", level: "medium", marks: 2, q: "Balance the equation: Fe + ___ → Fe₂O₃. Write the balanced reaction of iron with oxygen (rusting) and name the type of reaction.", answer: "4Fe + 3O₂ → 2Fe₂O₃ — it is a combination reaction and also shows oxidation.", hint: "Iron forms Fe₂O₃, so you need 2 Fe and 3 O on the right.", solution: "4Fe + 3O₂ → 2Fe₂O₃. Two elements join to form one compound, so it is a combination reaction (iron is oxidised)." },
    { id: "c14", cls: "10", subject: "chemistry", chapter: "Acids, bases and salts", type: "mcq", level: "medium", q: "Which metal does not release hydrogen with dilute acid?", options: ["magnesium", "zinc", "iron", "copper"], answer: 3, hint: "Copper is below hydrogen in the reactivity series.", solution: "Copper is less reactive than hydrogen, so it does not displace hydrogen from dilute acid." },
    { id: "c15", cls: "10", subject: "chemistry", chapter: "Metals and non-metals", type: "mcq", level: "medium", q: "Which non-metal is a good conductor of electricity?", options: ["sulphur", "graphite", "plastic", "glass"], answer: 1, hint: "Most non-metals are insulators — find the exception used in pencil leads.", solution: "Graphite is a non-metal with free electrons, so it conducts electricity (that is why pencil lead works)." },
    { id: "c16", cls: "10", subject: "chemistry", chapter: "Carbon and its compounds", type: "mcq", level: "easy", q: "The bond between the two carbon atoms in ethane (C₂H₆) is a:", options: ["single bond", "double bond", "triple bond", "coordinate bond"], answer: 0, hint: "Each carbon forms four bonds in total.", solution: "In ethane, C₂H₆, the two carbons share one pair of electrons — a single covalent bond." },
    { id: "c17", cls: "10", subject: "chemistry", chapter: "Periodic classification of elements", type: "mcq", level: "easy", q: "An element has atomic number 2. What is the name of this element?", options: ["hydrogen", "helium", "lithium", "oxygen"], answer: 1, hint: "Atomic number 1 is hydrogen, so the next element is helium.", solution: "Atomic number 2 is helium (He) — a noble gas, and the element after hydrogen." },
    { id: "c18", cls: "10", subject: "chemistry", chapter: "Chemical reactions and equations", type: "mcq", level: "easy", q: "Which of these is a chemical change?", options: ["ice melting", "rusting of iron", "breaking glass", "salt dissolving in water"], answer: 1, hint: "Look for a change that produces a new substance.", solution: "Rusting forms iron oxide, a new substance, so it is a chemical change." }
  ],

  /* ---------------- how classes run ---------------- */
  modes: [
    {
      id: "classroom", name: "In-Class Tuition", icon: "board", tone: "brand", img: "classroom.svg",
      from: "from ₹2,000 / month",
      blurb: "Learn at the centre with a small batch, a whiteboard, and classmates who keep you accountable.",
      points: ["Batch size maximum 12 students", "Weekly printed worksheets and tests", "Fixed slot from 6 PM to 10 PM", "Sunday revision and doubt clearing"],
      best: "Students who like a routine, a peer group and being called out to answer at the board."
    },
    {
      id: "home", name: "Home Tuition", icon: "home", tone: "mint", img: "home.svg",
      from: "from ₹5,000 / month",
      blurb: "One-to-one at your home or ours. The lesson is built around the student's own school syllabus and current test marks.",
      points: ["1-to-1 or 1-to-2 only", "Any slot inside 6 PM – 10 PM", "Saturday & Sunday 10 AM – 10 PM", "Parents get a monthly written report"],
      best: "Students who need individual attention, have school-missed concepts, or need to catch up before exams."
    },
    {
      id: "online", name: "Live Online Class", icon: "laptop", tone: "sky", img: "online.svg",
      from: "from ₹5,000 / month",
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
        ["Mon – Fri", "7:15 – 8:15 PM", "Physics & Chemistry concept base", "Classroom"],
        ["Sat", "10:00 – 11:00 AM", "Mathematics", "Classroom"],
        ["Sun", "10:00 – 11:30 AM", "Weekly test + chapter revision", "Free for all batches"],
        ["Home / online", "6 PM – 10 PM (any day)", "1-to-1 MPC slot", "Flexible booking"]
      ]
    },
    {
      tab: "Class 8 · Bridge",
      rows: [
        ["Mon – Fri", "6:00 – 7:15 PM", "Mathematics — algebra & geometry", "Classroom · 10 seats"],
        ["Mon – Fri", "7:30 – 8:30 PM", "Physics & Chemistry foundation gaps", "Classroom"],
        ["Sat", "10:00 – 11:15 AM", "Mathematics", "Classroom"],
        ["Sun", "10:00 – 11:30 AM", "Weekly test + revision", "Free for all batches"],
        ["Home / online", "6 PM – 10 PM (any day)", "1-to-1 MPC slot", "Flexible booking"]
      ]
    },
    {
      tab: "Class 9 – 10 · Board prep",
      rows: [
        ["Mon – Wed", "6:00 – 7:30 PM", "Mathematics — NCERT line by line", "Classroom"],
        ["Thu – Fri", "6:00 – 7:30 PM", "Physics & Chemistry board pattern", "Classroom"],
        ["Sat", "10:00 AM – 1:00 PM", "Full-length MPC mock test", "Every second Saturday"],
        ["Sun", "10:00 AM – 1:00 PM", "Revision + doubt clearing", "Classroom"],
        ["Online", "8:30 – 9:30 PM", "Live online revision slot", "Recorded"]
      ]
    }
  ],

  /* ---------------- fees (fixed starting prices — not editable on the page) ---------------- */
  fees: {
    locked: true,
    headline: "In-class tuition starts from ₹2,000 a month · Home tuition and live online one-to-one start from ₹5,000 a month",
    note: "These are starting prices, committed for every class from 6 to 10 and both boards. The calculator below turns the starting price into your exact monthly and total fee for the class, months and mode you choose.",
    classroom: { label: "In-class tuition (small batch)", from: 2000, note: "Up to 12 students · 4 classes/week · 1 hour" },
    home: { label: "Home tuition (1-to-1)", from: 5000, note: "4 classes/week · 1 hour · any slot from 6 PM to 10 PM" },
    online: { label: "Live online (1-to-1)", from: 5000, note: "4 classes/week · recorded · 10 AM to 10 PM window" }
  },

  /* ---------------- teaching method ---------------- */
  method: [
    { t: "Free demo class", d: "30 minutes of real MPC teaching, from the chapter your child is studying. No payment, no obligation." },
    { t: "Diagnostic test", d: "A 20-mark paper per subject to find the real gap — not the chapter the child thinks is weak." },
    { t: "Concept teaching", d: "Logic first, formula second, board pattern last. Nothing is written without being explained." },
    { t: "Weekly test", d: "Short weekly test on the chapters covered, corrected in class with the child present." },
    { t: "Parent report", d: "Monthly report card: marks trend, weak chapters, attendance and the plan for next month." },
    { t: "Exam strategy", d: "Answer formats, time per question, mark allocation and previous-year question drilling." }
  ],

  /* ---------------- gallery (replace with real classroom photos) ---------------- */
  gallery: [
    { img: "classroom.svg", cap: "Small-batch in-class MPC session in Pragathinagar" },
    { img: "maths.svg", cap: "Mathematics — quadratic equations on the board" },
    { img: "home.svg", cap: "Home tuition, one-to-one" },
    { img: "sam.svg", cap: "Practice engine with hints and worked solutions" },
    { img: "report.svg", cap: "Weekly test and parent report" },
    { img: "online.svg", cap: "Live online class with digital board" },
    { img: "hero.svg", cap: "Teaching in Pragathinagar since 2016" }
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
    { cls: "Class 10", sub: "Physics", board: "CBSE", score: "92%", delta: "+28" },
    { cls: "Class 10", sub: "Chemistry", board: "CBSE", score: "94%", delta: "+30" },
    { cls: "Class 9", sub: "Mathematics", board: "ICSE", score: "91%", delta: "+26" },
    { cls: "Class 9", sub: "Physics", board: "CBSE", score: "88%", delta: "+23" },
    { cls: "Class 9", sub: "Chemistry", board: "CBSE", score: "93%", delta: "+29" },
    { cls: "Class 8", sub: "Mathematics", board: "CBSE", score: "90%", delta: "+24" }
  ],

  /* ---------------- testimonials (placeholder names — replace with real feedback) ---------------- */
  testimonials: [
    { text: "My daughter was weak in maths and used to cry before tests. After joining the Class 10 batch she now solves board papers on her own. The Sunday revision session makes a real difference.", name: "Parent · Class 10 student", tag: "Pragathinagar" },
    { text: "Home tuition after 7 PM was the only slot that worked with our shift timings. Sir starts every chapter from the logic, and the monthly report tells us exactly where she stands.", name: "Parent · Class 9 student", tag: "Bachupally" },
    { text: "I joined for Maths in Class 9 and Physics in Class 10 — both are now my strongest subjects. Weekly tests, chapter-wise worksheets and no false promises.", name: "Student · Class 10, CBSE", tag: "Kukatpally / JNTU" },
    { text: "The practice tests on this site are genuinely useful. I take a test on a chapter, read the hint, and then the worked solution — that is how I fixed my board marks.", name: "Student · Class 10, ICSE", tag: "Miyapur" },
    { text: "The live online class saved me an hour of travel every day. Recordings mean I can revise the same evening again. Worth the fee.", name: "Student · Class 8", tag: "Nizampet" },
    { text: "The class-wise syllabus tracker was useful — we could see exactly which chapters were covered before the unit test and tick them off together at home.", name: "Parent · Class 10, ICSE", tag: "Gajularamaram" }
  ],

  /* ---------------- FAQ ---------------- */
  faqs: [
    { q: "Which subjects do you teach?", a: "Exactly three — Mathematics, Physics and Chemistry (the MPC trio) — for Classes 6 to 10, in both CBSE and ICSE. Three subjects taught by one teacher who knows how they connect is far more useful than ten subjects taught in rotation." },
    { q: "Which classes and boards do you handle?", a: "Classes 6 to 10, CBSE and ICSE. The chapter sequence is planned board-wise and class-wise from the current syllabus, so a CBSE student and an ICSE student never get mixed up in the same plan." },
    { q: "What are the fees?", a: "In-class tuition starts from ₹2,000 per month. Home tuition and live online one-to-one classes start from ₹5,000 per month. These starting prices are the same for every class from 6 to 10 and both boards — use the calculator above for your exact monthly and total fee." },
    { q: "What are your class timings?", a: "Monday to Friday from 6:00 PM to 10:00 PM, and Saturday & Sunday from 10:00 AM to 10:00 PM. Home tuition and online slots can be booked at any time inside these windows — mention the time you want and it is confirmed." },
    { q: "Is there a free demo class before I pay?", a: "Yes. Every new student gets one free 30-minute demo class on a real chapter from their syllabus. There is no payment and no obligation — if the child is not comfortable, we say so honestly." },
    { q: "What is the difference between in-class and home tuition?", a: "In-class tuition runs in a fixed slot at Pragathinagar with a batch of up to 12 students and a shared weekly test. Home tuition is one-to-one (or one-to-two) at the child's home or ours, with timings built around school hours, and includes a written monthly report for parents." },
    { q: "Do you show the class-wise syllabus?", a: "Yes — for every subject, every class from 6 to 10 and both boards, each chapter can be marked Not started, Learning, Revised or Mastered. Your progress is saved in this browser, so a student or parent can always see exactly how much of the syllabus is done." },
    { q: "What is the sample test section?", a: "It is a practice engine built from the same chapter list. Pick class, subject, board, chapter and the number of questions, take a timed test, then use the Hint and Solution tabs on every question to see the working and correct yourself. Your score and weak chapters are saved in this browser." },
    { q: "How many students are in a classroom batch?", a: "Maximum 12 for Classes 6–7 and 10 for Classes 8–10. If a batch fills up, the student is offered the next slot or home tuition — we never add a 20th student to a full batch." },
    { q: "What happens if my child misses a class?", a: "Tell us before the class and we share the class notes with a short recorded revision where applicable. Two makeup classes per month are allowed for in-class students." },
    { q: "Will you help with board preparation and previous-year papers?", a: "Yes. The Class 9–10 batches are built around the board pattern for all three subjects: NCERT line-by-line, previous-year questions, a full-length MPC mock test every second Saturday and answer-format practice for both theory and numericals." },
    { q: "How can parents track progress?", a: "You get a written monthly report — marks trend, weak chapters, attendance and the plan for the coming month — plus the chapter tracker and practice tests on this page, and an informal WhatsApp update whenever something changes." },
    { q: "Which areas do you cover for home tuition?", a: "Home tuition is based in Pragathinagar, Hyderabad, and covers every area within roughly 10–15 km — Nizampet, Bachupally, Miyapur, Kukatpally / JNTU, KPHB, Gajularamaram, Bollaram, Vovlvo, Gandimammagari, Bahadurpally, Balanagar, Alwal and more. Areas outside the list can usually be arranged too." },
    { q: "How do I book, and how will I be notified?", a: "Send the enquiry form, WhatsApp message or call. Choose to notify by WhatsApp, by email or both — your details reach the tutor, and the slot is confirmed on WhatsApp within a few hours — then a free demo class, then fee details." }
  ],

  /* ---------------- Saathi — the always-on on-page guide ----------------
     Keywords are matched by app.js (longer phrase = stronger match).
     Answer templates use {{tokens}} that are filled from this file.       */
  sam: {
    name: "Saathi",
    full: "Your guide for Maths, Physics and Chemistry",
    greeting:
      "Hi! I am <b>Saathi</b>, the guide for MathSaathi in Pragathinagar, Hyderabad. Ask me anything about <b>fees, timings, the class-wise syllabus, a sample test, the free demo class or a chapter revision</b> — I answer in plain words and take you straight to the right section.",
    quick: [
      "What are the fees?", "Class timings", "Show the syllabus", "Which subjects do you teach?",
      "Take a sample test", "Is the demo class free?", "Where are you located?", "How do I book?"
    ],
    intents: [
      {
        id: "greet", kw: ["hi", "hello", "hey", "namaste", "good morning", "good afternoon", "good evening", "hii", "yo"],
        answer: "Hi! I am <b>Saathi</b>, your guide for Maths, Physics and Chemistry at MathSaathi, Pragathinagar. Ask me about fees, timings, the syllabus, a sample test or how to book a free demo — I will show you exactly where to go.",
        links: [{ l: "See fees", h: "#fees" }, { l: "Sample test", h: "#practice" }, { l: "Book a demo", h: "#admission" }],
        chips: ["What are the fees?", "Show the syllabus", "Take a sample test"]
      },
      {
        id: "thanks", kw: ["thanks", "thank you", "thx", "thanks a lot", "thankyou", "great", "awesome", "nice", "perfect", "cool", "helpful", "good"],
        answer: "Happy to help! Anything else about fees, timings, the syllabus or a practice test, just ask. If you want to talk to {{teacher}} directly, the enquiry form or WhatsApp is always open.",
        links: [{ l: "Ask another question", h: "#saathi" }, { l: "WhatsApp the tutor", h: "#admission" }],
        chips: ["What are the timings?", "Show the syllabus", "How do I book?"]
      },
      {
        id: "who", kw: ["who are you", "what are you", "your name", "who r u", "what is this", "what can you do", "how can you help", "what do you do", "help"],
        answer: "I am <b>Saathi</b>, the on-page guide for <b>MathSaathi</b> — MPC tuition for Classes 6 to 10 in Pragathinagar, Hyderabad. I can answer questions about fees, timings, boards, the class-wise syllabus, chapter revision and practice tests, and I will always point you to the exact place on this page. I run inside the page, so nothing you type is sent anywhere.",
        links: [{ l: "Open the syllabus tracker", h: "#syllabus" }, { l: "Open the practice engine", h: "#practice" }],
        chips: ["What are the fees?", "Which subjects do you teach?", "Take a sample test"]
      },
      {
        id: "teacher", kw: ["teacher name", "who teaches", "your teacher", "who is rajashekar", "who is shekar", "teacher", "faculty", "sir name", "about the teacher", "experience of the teacher", "qualification", "who is the founder"],
        answer: "He has {{exp}} years of teaching experience and has guided {{students}} students. {{about}}",
        links: [{ l: "Read the full profile", h: "#tutor" }, { l: "Book a free demo", h: "#admission" }],
        chips: ["Which subjects do you teach?", "What are the fees?", "Is the demo class free?"]
      },
      {
        id: "fees", kw: ["fee", "fees", "charges", "price", "cost", "how much", "budget", "monthly fee", "tuition fee", "charges per month", "rate", "kitty", "package"],
        answer: "Fees start from <b>{{feeClassroom}} a month</b> for in-class tuition and <b>{{feeHome}} a month</b> for home tuition or live online one-to-one. The same starting price holds for Classes 6 to 10 and for both CBSE and ICSE. {{feeNote}}",
        links: [{ l: "Use the fee calculator", h: "#fees" }, { l: "See all plans", h: "#modes" }],
        chips: ["Home tuition fees", "Is there a discount?", "What is included?"]
      },
      {
        id: "fee_class", kw: ["fee for class", "fees for class", "class 9 fee", "class 10 fee", "class 8 fee", "class 7 fee", "class 6 fee", "charges for class"],
        answer: "For <b>Class {{class}}</b> the starting price is <b>{{feeClassroom}} a month</b> in-class and <b>{{feeHome}} a month</b> for home or online one-to-one. Put the class in the calculator and it will show the exact monthly and total fee.",
        links: [{ l: "Open the calculator", h: "#fees" }, { l: "See the batch timings", h: "#schedule" }],
        chips: ["What are the timings?", "Is the demo class free?", "How do I book?"]
      },
      {
        id: "home_fee", kw: ["home tuition", "home tuition fees", "at home", "home classes", "one to one fee", "1 to 1 fee", "personal tuition", "private tuition"],
        answer: "Home tuition is one-to-one (or one-to-two) and starts from <b>{{feeHome}} a month</b>. Any slot between 6 PM and 10 PM on weekdays, or 10 AM to 10 PM at weekends, plus a written monthly report for parents.",
        links: [{ l: "See home tuition plan", h: "#modes" }, { l: "Book a free demo", h: "#admission" }],
        chips: ["What are the timings?", "Which areas do you cover?", "Is the demo class free?"]
      },
      {
        id: "discount", kw: ["discount", "discounts", "offer", "off", "concession", "free month", "scholarship", "emi", "instalment", "installment", "payment", "pay", "fees discount"],
        answer: "There is no hidden discount scheme — the starting prices are already the committed ones: <b>{{feeClassroom}}</b> in-class and <b>{{feeHome}}</b> home or online. Fees can be paid monthly or for a term, and the exact plan is fixed in writing before the first class. Ask on WhatsApp if a term plan suits you better.",
        links: [{ l: "See the fee plans", h: "#fees" }, { l: "Ask on WhatsApp", h: "#admission" }],
        chips: ["What are the fees?", "Is the demo class free?", "How do I book?"]
      },
      {
        id: "timing", kw: ["timing", "timings", "time", "schedule", "slot", "when", "morning", "evening", "night", "weekday", "weekend", "sunday", "saturday", "holiday", "open", "available", "batch time"],
        answer: "<b>{{timingWeekday}}</b> and <b>{{timingWeekend}}</b>. Home tuition and live online slots can be booked at any time inside those windows — tell us the time you want and it is confirmed. {{timingNote}}",
        links: [{ l: "See the batch timetable", h: "#schedule" }, { l: "Ask for a slot", h: "#admission" }],
        chips: ["Can I come on Sunday?", "What about online classes?", "Book a slot"]
      },
      {
        id: "sunday", kw: ["sunday", "on sunday", "sundays", "sun"],
        answer: "Yes — Sunday <b>10:00 AM to {{endTime}}</b> is a full working day, and the 10:00 AM batch is kept free for weekly tests and revision for every batch. {{timingNote}}",
        links: [{ l: "See the timetable", h: "#schedule" }, { l: "Book a Sunday slot", h: "#admission" }],
        chips: ["What are the timings?", "How do I book?"]
      },
      {
        id: "subjects", kw: ["subject", "subjects", "which subject", "subjects do you teach", "all subject", "syllabus subjects", "mpc", "stream", "m p c", "science", "what do you teach", " teach"],
        answer: "Exactly three subjects — <b>Mathematics, Physics and Chemistry</b> (the MPC trio) — for Classes 6 to 10 in CBSE and ICSE. {{streamNote}}",
        links: [{ l: "See the three subjects", h: "#subjects" }, { l: "Open the syllabus", h: "#syllabus" }],
        chips: ["Show the syllabus", "What are the fees?", "Take a sample test"]
      },
      {
        id: "boards", kw: ["board", "boards", "cbse", "icse", "state board", "which board", "issc", "ism", "icse or cbse", "syllabus board"],
        answer: "Both <b>CBSE and ICSE</b>, with a separate chapter sequence for every class and subject — {{syllabusCount}} chapters in total. Tell us the board in the enquiry form so the right sequence is planned from day one.",
        links: [{ l: "Open the syllabus tracker", h: "#syllabus" }, { l: "Ask which board fits", h: "#admission" }],
        chips: ["Show the syllabus", "Which class do you start with?", "What are the fees?"]
      },
      {
        id: "syllabus", kw: ["syllabus", "chapter", "chapters", "chapter list", "topics", "syllabus list", "what chapters", "which chapter", "curriculum", "book", "ncert", "concise", "selina", "contents"],
        answer: "Every subject, every class from 6 to 10 and both boards has its own chapter list here — <b>{{syllabusCount}} chapters</b> in total. Mark each chapter Not started, Learning, Revised or Mastered, search a chapter, and your progress is saved in this browser.",
        links: [{ l: "Open the syllabus tracker", h: "#syllabus" }, { l: "Test yourself on a chapter", h: "#practice" }],
        chips: ["Test me on a chapter", "What are the fees?", "What are the timings?"]
      },
      {
        id: "syllabus_class", kw: ["syllabus for class", "chapters of class", "class 9 syllabus", "class 10 syllabus", "class 8 syllabus", "class 7 syllabus", "class 6 syllabus", "class 9 chapters", "class 10 chapters"],
        answer: "<b>Class {{class}}</b> — pick the subject tab in the syllabus tracker and you will see the full Class {{class}} chapter list for CBSE and ICSE, with a progress marker on each chapter. {{syllabusNote}}",
        links: [{ l: "Open Class {{class}} syllabus", h: "#syllabus" }, { l: "Take a Class {{class}} test", h: "#practice" }],
        chips: ["Test me on a chapter", "What are the fees?", "How do I book?"]
      },
      {
        id: "practice", kw: ["test", "tests", "sample test", "sample paper", "practice", "practice test", "mock", "mock test", "question paper", "questions", "question bank", "quiz", "attempt", "paper", "revision test", "self test", "self test"],
        answer: "The <b>practice engine</b> has {{testCount}} sample questions across Maths, Physics and Chemistry for Classes 6 to 10, tagged to the same chapters as the syllabus. Choose class, subject, board, chapter and how many questions, take it timed, then open the <b>Hint</b> or <b>Solution</b> tab on any question. Your score and weak chapters are saved in this browser.",
        links: [{ l: "Start a sample test", h: "#practice" }, { l: "Open the syllabus first", h: "#syllabus" }],
        chips: ["Give me a maths test", "Physics class 10 test", "How does the scoring work?"]
      },
      {
        id: "chapter_practice", kw: ["give me questions on", "questions on", "practice questions", "test me on", "questions from", "solve", "solve this", "explain", "how do i solve", "help me with a chapter", "revision of"],
        answer: "Let us do it properly: open the <b>practice engine</b>, set the subject, the chapter and the number of questions, then attempt it timed. Each question has a <b>Hint</b> tab and a <b>Solution</b> tab, so you can compare your method with the working step by step.",
        links: [{ l: "Open the practice engine", h: "#practice" }, { l: "See the chapter list", h: "#syllabus" }],
        chips: ["Start a sample test", "Show the syllabus", "What are the fees?"]
      },
      {
        id: "formula", kw: ["formula", "formulas", "formulae", "identity", "identities", "theorem", "law", "remember", "revision formula", "formula sheet", "shortcut"],
        answer: "The <b>Formula Lab</b> has revision cards for Mathematics, Physics and Chemistry — each card shows the formula and the exact situation it belongs to. Every formula is derived in class first, so revision takes minutes.",
        links: [{ l: "Open the Formula Lab", h: "#formula" }, { l: "Take a revision test", h: "#practice" }],
        chips: ["Take a sample test", "Show the syllabus", "What are the fees?"]
      },
      {
        id: "demo", kw: ["demo", "demo class", "free class", "trial", "trial class", "sample class", "try out", "first class free", "free demo"],
        answer: "<b>Yes, the demo class is free.</b> 30 minutes of real MPC teaching from a chapter your child is currently studying. No payment, no obligation — and if the child is not comfortable, we say so honestly.",
        links: [{ l: "Book the free demo", h: "#admission" }, { l: "See the teaching method", h: "#method" }],
        chips: ["How do I book?", "What are the fees?", "What are the timings?"]
      },
      {
        id: "book", kw: ["book", "booking", "enquire", "enquiry", "how to join", "how to start", "admission", "apply", "signup", "sign up", "register", "contact", "reach you", "call you", "phone number", "number", "whatsapp", "email", "message", "how can i contact"],
        answer: "Three ways, all open right now: <br>1. Fill the enquiry form — choose <b>WhatsApp, email or both</b> and your details reach {{teacher}}. <br>2. WhatsApp or call <b>{{phone}}</b>. <br>3. Tell me your class and subject here and I will tell you the exact slot to ask for.",
        links: [{ l: "Open the enquiry form", h: "#admission" }, { l: "See batch timings", h: "#schedule" }],
        chips: ["Is the demo class free?", "What are the fees?", "What are the timings?"]
      },
      {
        id: "areas", kw: ["area", "areas", "location", "located", "address", "near", "nearby", "close to", "distance", "travel", "come to", "pick me up", "home tuition area", "where are you", "where is", "pragathinagar", "miyapur", "bachupally", "nizampet", "kukatpally", "kphb", "gajularamaram", "charminar", "moosarambagh", "balkampet"],
        answer: "The centre is at <b>{{base}}, Hyderabad</b>, and home tuition covers {{areaCount}} localities within about <b>10–15 km</b> — Nizampet, Bachupally, Miyapur, Kukatpally / JNTU, KPHB, Gajularamaram, Bollaram, Gandimammagari, Bahadurpally, Balanagar and more. Search your area in the list; if it is not there, ask — it is usually still possible.",
        links: [{ l: "See the area list", h: "#areas" }, { l: "Ask about your area", h: "#admission" }],
        chips: ["What are the timings?", "Home tuition fees", "How do I book?"]
      },
      {
        id: "online", kw: ["online class", "online classes", "online tuition", "zoom", "video class", "live online", "virtual", "work from home", "remote class"],
        answer: "Live online one-to-one classes start from <b>{{feeHome}} a month</b>. You get a live one-to-one session with a shared digital board, saved notes and a class recording for revision — and doubts can be sent on WhatsApp between classes.",
        links: [{ l: "See the online plan", h: "#modes" }, { l: "Book a free demo", h: "#admission" }],
        chips: ["What are the timings?", "Home tuition fees", "Is the demo class free?"]
      },
      {
        id: "batch_size", kw: ["batch size", "batch", "how many students", "how many students in a batch", "class size", "strength", "seats", "one to one", "one to two", "individual attention", "seats available"],
        answer: "Classroom batches are capped at <b>12 students</b> for Classes 6–7 and <b>10</b> for Classes 8–10. Home tuition and online are one-to-one, or one-to-two when a sibling or friend is joining. If a batch fills up you get the next slot or home tuition — we never add a 20th student.",
        links: [{ l: "See how classes run", h: "#modes" }, { l: "Book a free demo", h: "#admission" }],
        chips: ["What are the fees?", "What are the timings?", "How do I book?"]
      },
      {
        id: "results", kw: ["result", "results", "progress", "marks", "improvement", "report", "parent report", "track", "tracking", "how will i know", "assessment", "tests given", "weekly test"],
        answer: "Three layers: a <b>weekly test</b> corrected in class, a <b>written monthly report</b> for parents (marks trend, weak chapters, attendance, next month's plan), and the <b>chapter tracker plus practice tests</b> on this page so the student can see their own progress between reports.",
        links: [{ l: "See sample progress", h: "#results" }, { l: "Track your chapters", h: "#syllabus" }],
        chips: ["Show the syllabus", "Take a sample test", "Is the demo class free?"]
      },
      {
        id: "miss", kw: ["miss", "missed", "absent", "skip", "skipped", "makeup", "make up", "reschedule", "reschedule class", "holiday class", "transfer", "change slot", "shift slot"],
        answer: "Tell us before the class and we share the notes, with a recorded revision where it applies. In-class students get <b>two makeup classes per month</b>. Slots can also be shifted by arrangement — WhatsApp is the fastest way to fix a new time.",
        links: [{ l: "Ask on WhatsApp", h: "#admission" }, { l: "See batch timings", h: "#schedule" }],
        chips: ["What are the timings?", "How do I book?", "What are the fees?"]
      },
      {
        id: "class_start", kw: ["new batch", "new admission", "join mid", "join now", "when can i start", "start class", "next batch", "admission open", "still possible", "space"],
        answer: "Admissions are open for Classes 6–10 all year — you do not have to wait for a new batch. The free demo class comes first, then your slot is fixed. Tell us the class and subject and we will confirm the earliest slot.",
        links: [{ l: "Book the free demo", h: "#admission" }, { l: "See current timings", h: "#schedule" }],
        chips: ["Is the demo class free?", "What are the fees?", "How do I book?"]
      },
      {
        id: "doubt", kw: ["doubt", "doubts", "help me", "i am stuck", "stuck", "don't understand", "not understanding", "confused", "explain this", "clear my doubt", "solve my doubt"],
        answer: "Send the doubt in the enquiry box — it reaches {{teacher}} on WhatsApp and by email, and is normally answered the same day. In class, every doubt is cleared at the board until the student can repeat the logic back.",
        links: [{ l: "Send your doubt", h: "#admission" }, { l: "See the teaching method", h: "#method" }],
        chips: ["What are the timings?", "Is the demo class free?", "How do I book?"]
      },
      {
        id: "materials", kw: ["material", "materials", "notes", "workbook", "worksheet", "pdf", "book", "study material", "reference book", "practice book", "download"],
        answer: "Classroom students get printed chapter worksheets and revision notes every week. Online students get the digital board notes and the class recording after every session. Ask on WhatsApp for the current chapter's practice sheet.",
        links: [{ l: "Ask for the practice sheet", h: "#admission" }, { l: "See the teaching method", h: "#method" }],
        chips: ["Take a sample test", "What are the fees?", "What are the timings?"]
      },
      {
        id: "safety", kw: ["girl", "girls", "boy", "boys", "safe", "safety", "trust", "genuine", "verified", "genuine teacher", "female teacher", "woman teacher"],
        answer: "Classes run from the centre at {{base}}, parents are welcome to sit in for the demo class, and home tuition is one-to-one with a fixed slot — you always know exactly who is teaching your child and when. For any specific safety requirement, mention it in the enquiry form.",
        links: [{ l: "Ask your question", h: "#admission" }, { l: "See the centre details", h: "#areas" }],
        chips: ["How do I book?", "What are the timings?", "Is the demo class free?"]
      },
      {
        id: "which_class", kw: ["i am in class", "my class", "my child is in", "class 9 student", "class 10 student", "he is in class", "she is in class", "i study in", "we are in class"],
        answer: "Noted — <b>Class {{class}}</b>. The syllabus tracker and the practice engine both have a Class {{class}} tab, so you can see the exact chapter list and test yourself on it. {{teacherShort}} plans the sequence board-wise from day one.",
        links: [{ l: "Open Class {{class}} syllabus", h: "#syllabus" }, { l: "Take a Class {{class}} test", h: "#practice" }],
        chips: ["What are the fees?", "What are the timings?", "Book a free demo"]
      },
      {
        id: "subject_q", kw: ["tell me about", "difference between", "why is", "why do", "why does", "how does", "define", "when to use", "meaning of"],
        answer: "I can explain the plan and the syllabus, and the practice engine shows worked solutions — but the teaching itself happens in the free demo class, from logic, not formulas. Tell me the subject and chapter and I will point you to the right practice set.",
        links: [{ l: "Take a sample test", h: "#practice" }, { l: "Book a free demo", h: "#admission" }],
        chips: ["Show the syllabus", "What are the fees?", "Is the demo class free?"]
      },
      {
        id: "yesno", kw: ["yes", "no", "ok", "okay", "sure", "right", "correct", "wrong", "hmm", "idk", "not sure"],
        answer: "Tell me a little more and I will point you to the right place — for example <b>“fees for class 9”</b>, <b>“physics chapter list”</b>, or <b>“book a demo”</b>.",
        links: [{ l: "See fees", h: "#fees" }, { l: "Open the syllabus", h: "#syllabus" }, { l: "Book a demo", h: "#admission" }],
        chips: ["What are the fees?", "Show the syllabus", "Take a sample test"]
      }
    ],
    fallback: [
      "I did not quite catch that one. I am best with <b>fees, timings, boards, the class-wise syllabus, a sample test, the demo class and how to book</b>.",
      "Try one of these and you will get a straight answer, plus the exact place on this page to read more."
    ],
    fallbackLinks: [{ l: "See fees", h: "#fees" }, { l: "Sample test", h: "#practice" }, { l: "Book a demo", h: "#admission" }],
    outOfScope:
      "I do not have that information, and I would rather say so than guess. For anything about fees, timings, the syllabus, a practice test or booking, I can answer exactly right now — and for the rest, WhatsApp or a call on <b>{{phone}}</b> reaches {{teacher}} directly."
  },

  /* ---------------- teacher admin ---------------- */
  admin: { pin: "7095" }
};
