export type SourceStatus =
  | "confirmed-bokadirekt"
  | "owner-confirmation-required";

export interface TreatmentCategory {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  chips: string[];
  seoTitle: string;
  seoDescription: string;
  featuredTreatments: string[];
  faq: { question: string; answer: string }[];
  published: boolean;
}

export interface PriceOption {
  label: string;
  price: string;
  duration: string;
}

export interface Treatment {
  slug: string;
  category: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  chips: string[];
  priceFrom: string;
  duration: string;
  practitioner: string;
  priceOptions: PriceOption[];
  suitableFor: string[];
  process: string[];
  beforeCare: string[];
  afterCare: string[];
  faq: { question: string; answer: string }[];
  related: string[];
  seoTitle: string;
  seoDescription: string;
  sourceStatus: SourceStatus;
  published: boolean;
}

const consultationFaq = [
  {
    question: "Behöver jag konsultation före behandling?",
    answer:
      "Inför injektionsbehandlingar görs rådgivning så att indikation, förväntningar och medicinska frågor kan gås igenom."
  },
  {
    question: "Kan jag boka behandling direkt?",
    answer:
      "Ja, om behandlingen passar dig kan du ofta boka nästa lediga tid efter konsultationen."
  }
];

const injectionBeforeCare = [
  "Kom utan aktiv hudinfektion i området.",
  "Undvik alkohol samma dag och berätta om läkemedel eller graviditet.",
  "Planera inte behandlingen precis före större event."
];

const injectionAfterCare = [
  "Undvik träning, bastu och alkohol första dygnet.",
  "Massera inte området om behandlaren inte har sagt annat.",
  "Kontakta kliniken vid oväntad smärta, svullnad eller oro."
];

const skinBeforeCare = [
  "Pausa starka syror och retinoider några dagar före behandling.",
  "Kom utan irriterad eller solbränd hud.",
  "Berätta om hudmediciner och tidigare reaktioner."
];

const skinAfterCare = [
  "Använd mild rengöring och rikligt med fukt.",
  "Skydda huden med SPF och undvik stark sol.",
  "Vänta med aktiva produkter tills huden känns lugn."
];

const basicFaq = [
  {
    question: "Hur bokar jag?",
    answer:
      "Du bokar enklast via Bokadirekt eller kontaktar PNK Beauty Klinik för rådgivning."
  },
  {
    question: "Vem passar behandlingen för?",
    answer:
      "Behandlaren gör alltid en individuell bedömning utifrån hud, mål och eventuella kontraindikationer."
  }
];

export const categories: TreatmentCategory[] = [
  {
    slug: "injektioner-boras",
    title: "Injektioner i Borås",
    eyebrow: "Medicinsk estetik",
    summary: "Botox, fillers, Prophilo och konsultation med fokus på balans.",
    description:
      "Injektionsbehandlingar hos PNK Beauty Klinik utförs med tydlig rådgivning, medicinsk noggrannhet och målet att skapa naturliga resultat.",
    image: "/images/pnk/services/injections.webp",
    chips: ["Botox", "Fillers", "Prophilo", "Konsultation"],
    seoTitle: "Injektioner Borås - Botox, fillers och Prophilo",
    seoDescription:
      "Boka injektionsbehandling i Borås hos PNK Beauty Klinik. Botox, fillers, läppfillers, Prophilo och konsultation.",
    featuredTreatments: ["botox-boras", "fillers-boras", "prophilo-boras"],
    faq: consultationFaq,
    published: true
  },
  {
    slug: "hudvard-boras",
    title: "Hudvård i Borås",
    eyebrow: "Aktiv hudförbättring",
    summary: "Microneedling, BB Glow, kemisk peeling och BioRepeel.",
    description:
      "Hudvårdsbehandlingar för dig som vill arbeta med struktur, lyster, pigmentering, fukt och jämnare hudton.",
    image: "/images/pnk/services/microneedling.webp",
    chips: ["Microneedling", "BB Glow", "BioRepeel", "Peeling"],
    seoTitle: "Hudvård Borås - Microneedling och kemisk peeling",
    seoDescription:
      "Hudvård i Borås med microneedling, BB Glow, BioRepeel och kemisk peeling hos auktoriserad hudterapeut.",
    featuredTreatments: [
      "microneedling-boras",
      "kemisk-peeling-boras",
      "biorepeel-boras"
    ],
    faq: basicFaq,
    published: true
  },
  {
    slug: "ansiktsbehandlingar-boras",
    title: "Ansiktsbehandlingar i Borås",
    eyebrow: "Hudterapeut",
    summary: "Klassiska och avancerade ansiktsbehandlingar anpassade efter hud.",
    description:
      "Ansiktsbehandlingar med rengöring, fukt, lyster och hudförbättrande moment efter din huds behov.",
    image: "/images/pnk/services/facial.webp",
    chips: ["Klassisk", "Marina Miracles", "Pure Cell", "Microdermabrasion"],
    seoTitle: "Ansiktsbehandling Borås - Hudterapeut PNK Beauty",
    seoDescription:
      "Boka ansiktsbehandling i Borås hos PNK Beauty Klinik. Klassisk ansiktsbehandling, Marina Miracles, Pure Cell och microdermabrasion.",
    featuredTreatments: [
      "klassisk-ansiktsbehandling-boras",
      "marina-miracles-boras",
      "pure-cell-treatment-boras"
    ],
    faq: basicFaq,
    published: true
  },
  {
    slug: "plasma-pen-boras",
    title: "Plasma Pen i Borås",
    eyebrow: "Precision",
    summary: "Riktade Plasma Pen-behandlingar för hudåtstramning och små områden.",
    description:
      "Plasma Pen används på avgränsade områden som ögonlock, linjer, pigment, hudflikar och bristningar efter individuell bedömning.",
    image: "/images/pnk/services/plasma-pen.webp",
    chips: ["Ögonlock", "Kråksparkar", "Pigment", "Hudflikar"],
    seoTitle: "Plasma Pen Borås - PNK Beauty Klinik",
    seoDescription:
      "Plasma Pen i Borås för ögonlock, under ögonen, kråksparkar, pigment, hudflikar och hudbristningar.",
    featuredTreatments: [
      "plasma-pen-ogonlockslyft-boras",
      "plasma-pen-under-ogonen-boras",
      "plasma-pen-kraksparkar-boras"
    ],
    faq: basicFaq,
    published: true
  },
  {
    slug: "fransar-bryn-boras",
    title: "Fransar och bryn i Borås",
    eyebrow: "Detaljer",
    summary: "Lashlift och brynbehandlingar för ett piggare uttryck.",
    description:
      "Behandlingar för fransar och bryn som ger definition utan att känslan blir överarbetad.",
    image: "/images/pnk/services/lashes-brows.webp",
    chips: ["Lashlift", "Keratin", "Bryn", "Färg"],
    seoTitle: "Lashlift Borås - Fransar och bryn",
    seoDescription:
      "Boka lashlift och behandlingar för fransar och bryn i Borås hos PNK Beauty Klinik.",
    featuredTreatments: ["lashlift-boras"],
    faq: basicFaq,
    published: true
  },
  {
    slug: "naglar-fotter-boras",
    title: "Naglar och fötter i Borås",
    eyebrow: "Vårdande detaljer",
    summary: "Manikyr och pedikyr med noggrann behandling.",
    description:
      "Nagel- och fotbehandlingar för välvårdade händer och fötter i klinikmiljö.",
    image: "/images/pnk/services/nails-feet.webp",
    chips: ["Manikyr", "Pedikyr", "Nagelvård"],
    seoTitle: "Manikyr och pedikyr Borås - PNK Beauty",
    seoDescription:
      "Boka manikyr och pedikyr i Borås hos PNK Beauty Klinik.",
    featuredTreatments: ["manikyr-boras", "pedikyr-boras"],
    faq: basicFaq,
    published: true
  },
  {
    slug: "makeup-boras",
    title: "Makeup i Borås",
    eyebrow: "Vardag och fest",
    summary: "Professionell makeup för vardag, kväll, fest och event.",
    description:
      "Makeupbehandlingar för dig som vill ha ett hållbart, personligt och professionellt resultat.",
    image: "/images/pnk/services/makeup-event.webp",
    chips: ["Vardag", "Fest", "Event"],
    seoTitle: "Makeup Borås - Vardag och fest",
    seoDescription:
      "Professionell makeup i Borås för vardag, fest och event hos PNK Beauty Klinik.",
    featuredTreatments: ["makeup-vardag-boras", "makeup-fest-boras"],
    faq: basicFaq,
    published: true
  },
  {
    slug: "massage-boras",
    title: "Massage i Borås",
    eyebrow: "Avslappning",
    summary: "Indian Head Massage för återhämtning och lugn.",
    description:
      "En avslappnande behandling för huvud, nacke och axlar med fokus på återhämtning.",
    image: "/images/pnk/services/massage-wellness.webp",
    chips: ["Indian Head Massage", "Avslappning", "Nacke"],
    seoTitle: "Massage Borås - Indian Head Massage",
    seoDescription:
      "Boka Indian Head Massage i Borås hos PNK Beauty Klinik.",
    featuredTreatments: ["indian-head-massage-boras"],
    faq: basicFaq,
    published: true
  },
  {
    slug: "piercing-boras",
    title: "Piercing i Borås",
    eyebrow: "Öronpiercing",
    summary: "Öronpiercing i öronsnibb och öronbrosk.",
    description:
      "Öronpiercing utförs med tydlig rådgivning om placering, läkning och eftervård.",
    image: "/images/pnk/consulting.jpg",
    chips: ["Öronsnibb", "Öronbrosk", "Eftervård"],
    seoTitle: "Öronpiercing Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka öronpiercing i Borås för öronsnibb eller öronbrosk hos PNK Beauty Klinik.",
    featuredTreatments: ["oronpiercing-boras"],
    faq: basicFaq,
    published: true
  }
];

type TreatmentInput = Omit<
  Treatment,
  | "sourceStatus"
  | "published"
  | "beforeCare"
  | "afterCare"
  | "faq"
  | "process"
  | "suitableFor"
>;

function treatment(input: TreatmentInput & Partial<Treatment>): Treatment {
  return {
    suitableFor: [
      "Dig som vill ha en individuell bedömning.",
      "Dig som vill ha ett naturligt och välplanerat resultat."
    ],
    process: [
      "Kort genomgång av mål och förutsättningar.",
      "Behandlingen utförs stegvis och anpassas efter området.",
      "Du får råd om eftervård och när resultat kan följas upp."
    ],
    beforeCare: basicBeforeCare(input.category),
    afterCare: basicAfterCare(input.category),
    faq: basicFaq,
    sourceStatus: "confirmed-bokadirekt",
    published: true,
    ...input
  };
}

function basicBeforeCare(category: string) {
  if (category === "injektioner-boras") return injectionBeforeCare;
  if (category === "hudvard-boras" || category === "ansiktsbehandlingar-boras") {
    return skinBeforeCare;
  }
  return ["Kom gärna några minuter före din bokade tid.", "Berätta om allergier eller känslig hud."];
}

function basicAfterCare(category: string) {
  if (category === "injektioner-boras") return injectionAfterCare;
  if (category === "hudvard-boras" || category === "ansiktsbehandlingar-boras") {
    return skinAfterCare;
  }
  return ["Följ behandlarens råd för hållbart resultat.", "Kontakta kliniken vid frågor om eftervården."];
}

const fillerSuitableFor = [
  "Dig som vill återställa eller skapa diskret volym.",
  "Dig som vill förbättra proportioner med individuell planering."
];

const plasmaProcess = [
  "Området bedövas vid behov och markeras noggrant.",
  "Plasma Pen används punktvis på det valda området.",
  "Eftervård och läkningstid gås igenom innan du lämnar kliniken."
];

export const treatments: Treatment[] = [
  treatment({
    slug: "konsultation",
    category: "injektioner-boras",
    title: "Konsultation",
    eyebrow: "Rådgivning",
    summary: "Personlig konsultation inför injektionsbehandling.",
    description:
      "Konsultationen ger utrymme för medicinska frågor, förväntningar och rekommendation om lämplig behandling.",
    image: "/images/pnk/consulting.jpg",
    chips: ["Rådgivning", "Plan", "Trygghet"],
    priceFrom: "395 kr",
    duration: "20 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Konsultation", price: "395 kr", duration: "20 min" }],
    faq: consultationFaq,
    related: ["botox-boras", "fillers-boras", "prophilo-boras"],
    seoTitle: "Konsultation Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka konsultation hos PNK Beauty Klinik i Borås inför Botox, fillers eller annan estetisk behandling."
  }),
  treatment({
    slug: "botox-boras",
    category: "injektioner-boras",
    title: "Botox i Borås",
    eyebrow: "Rynkbehandling",
    summary: "Botox för ett, två eller tre områden med naturligt uttryck.",
    description:
      "Botox används för att mjuka upp dynamiska linjer och planeras efter ansiktets mimik och önskat resultat.",
    image: "/images/pnk/services/botox.webp",
    chips: ["1 område", "2 områden", "3 områden"],
    priceFrom: "Från 2 500 kr",
    duration: "15-45 min",
    practitioner: "Siamak Ghazanfari",
    priceOptions: [
      { label: "Botox 1 område", price: "Från 2 500 kr", duration: "15 min" },
      { label: "Botox 2 områden", price: "3 200 kr", duration: "30 min" },
      { label: "Botox 3 områden", price: "3 700 kr", duration: "45 min" }
    ],
    related: ["konsultation", "fillers-boras", "prophilo-boras"],
    seoTitle: "Botox Borås - PNK Beauty Klinik",
    seoDescription:
      "Botox i Borås för ett, två eller tre områden hos PNK Beauty Klinik. Behandling utförd av Siamak Ghazanfari."
  }),
  treatment({
    slug: "fillers-boras",
    category: "injektioner-boras",
    title: "Fillers i Borås",
    eyebrow: "Volym och form",
    summary: "Fillers för läppar, kinder, haka, käklinje och nasolabiala veck.",
    description:
      "Fillers används för att forma, balansera och återställa volym med en behandlingsplan anpassad efter ansiktet.",
    image: "/images/pnk/services/fillers.webp",
    chips: ["Läppar", "Kinder", "Haka", "Käklinje"],
    priceFrom: "Från 2 500 kr",
    duration: "30-60 min",
    practitioner: "Siamak Ghazanfari",
    priceOptions: [{ label: "Fillers", price: "Från 2 500 kr", duration: "30-60 min" }],
    suitableFor: fillerSuitableFor,
    related: ["lappfillers-boras", "fillers-kinder-boras", "fillers-haka-boras"],
    seoTitle: "Fillers Borås - Läppar, kinder och käklinje",
    seoDescription:
      "Fillers i Borås hos PNK Beauty Klinik för läppar, kinder, haka, käklinje och nasolabiala veck."
  }),
  treatment({
    slug: "lappfillers-boras",
    category: "injektioner-boras",
    title: "Läppfillers i Borås",
    eyebrow: "Läppar",
    summary: "Läppfillers och Hyaluron Pen för form, fukt och volym.",
    description:
      "Läppbehandlingar planeras efter dina proportioner, tidigare behandlingar och önskad definition.",
    image: "/images/pnk/lip-filler.jpg",
    chips: ["Läppar", "Hyaluron Pen", "1 ml"],
    priceFrom: "Från 2 195 kr",
    duration: "30 min",
    practitioner: "Siamak Ghazanfari",
    priceOptions: [
      { label: "Hyaluron Pen", price: "Från 2 195 kr", duration: "30 min" },
      { label: "Läppar 1 ml", price: "Från 2 500 kr", duration: "30 min" }
    ],
    suitableFor: fillerSuitableFor,
    related: ["fillers-boras", "fillers-kinder-boras", "botox-boras"],
    seoTitle: "Läppfillers Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka läppfillers i Borås. Läppar 1 ml och Hyaluron Pen hos PNK Beauty Klinik."
  }),
  ...[
    ["fillers-kinder-boras", "Fillers kinder i Borås", "Kinder", "Fillers för kindvolym och ansiktsbalans.", "Fillers i kinder kan ge stöd, kontur och en piggare helhet när behandlingen passar ansiktets proportioner."],
    ["fillers-haka-boras", "Fillers haka i Borås", "Haka", "Fillers för hakprofil och balans.", "Fillers i haka används för att stärka profil, proportion och ansiktets nedre balans."],
    ["fillers-kaklinje-boras", "Fillers käklinje i Borås", "Käklinje", "Fillers för tydligare käklinje.", "Fillers längs käklinjen kan skapa mer definition och struktur med en individuell dosering."],
    ["fillers-nasolabial-boras", "Fillers nasolabial i Borås", "Nasolabial", "Fillers för nasolabiala veck.", "Fillers i nasolabiala veck kan mjuka upp linjer från näsa till mungipa efter bedömning."]
  ].map(([slug, title, chip, summary, description]) =>
    treatment({
      slug,
      category: "injektioner-boras",
      title,
      eyebrow: "Fillers",
      summary,
      description,
      image: "/images/pnk/services/fillers.webp",
      chips: [chip, "Fillers", "Balans"],
      priceFrom: "Från 2 500 kr",
      duration: "30 min",
      practitioner: "Siamak Ghazanfari",
      priceOptions: [{ label: title.replace(" i Borås", ""), price: "Från 2 500 kr", duration: "30 min" }],
      suitableFor: fillerSuitableFor,
      related: ["fillers-boras", "lappfillers-boras", "konsultation"],
      seoTitle: `${title} - PNK Beauty Klinik`,
      seoDescription: `${title} hos PNK Beauty Klinik med individuell konsultation och naturlig behandlingsplan.`
    })
  ),
  treatment({
    slug: "prophilo-boras",
    category: "injektioner-boras",
    title: "Prophilo i Borås",
    eyebrow: "Hudkvalitet",
    summary: "Fuktgivande injektionsbehandling för hudkvalitet och spänst.",
    description:
      "Prophilo är en behandling för dig som vill förbättra hudens fukt, elasticitet och lyster utan klassisk volymbyggnad.",
    image: "/images/pnk/services/injections.webp",
    chips: ["Fukt", "Spänst", "Hudkvalitet"],
    priceFrom: "3 800 kr",
    duration: "30 min",
    practitioner: "Siamak Ghazanfari",
    priceOptions: [{ label: "Prophilo", price: "3 800 kr", duration: "30 min" }],
    related: ["botox-boras", "fillers-boras", "microneedling-boras"],
    seoTitle: "Prophilo Borås - Hudkvalitet och lyster",
    seoDescription:
      "Prophilo i Borås hos PNK Beauty Klinik för fukt, spänst och förbättrad hudkvalitet."
  }),
  treatment({
    slug: "microneedling-boras",
    category: "hudvard-boras",
    title: "Microneedling i Borås",
    eyebrow: "Hudstruktur",
    summary: "Microneedling för lyster, struktur och jämnare hudton.",
    description:
      "Microneedling stimulerar huden kontrollerat och passar dig som vill arbeta med porer, struktur, ärr och glow.",
    image: "/images/pnk/services/microneedling.webp",
    chips: ["DermaPen", "Glow", "Struktur"],
    priceFrom: "2 995 kr",
    duration: "80 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Microneedling", price: "2 995 kr", duration: "80 min" }],
    related: ["bb-glow-boras", "kemisk-peeling-boras", "biorepeel-boras"],
    seoTitle: "Microneedling Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka microneedling i Borås för lyster, struktur och jämnare hudton hos PNK Beauty Klinik."
  }),
  treatment({
    slug: "bb-glow-boras",
    category: "hudvard-boras",
    title: "BB Glow i Borås",
    eyebrow: "Glow",
    summary: "BB Glow för jämnare ton och fräschare hudintryck.",
    description:
      "BB Glow är en hudbehandling för dig som vill jobba med lyster, ton och ett mer utvilat hudintryck.",
    image: "/images/pnk/services/microneedling.webp",
    chips: ["Glow", "Hudton", "Lyster"],
    priceFrom: "Från 1 500 kr",
    duration: "70 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "BB Glow", price: "Från 1 500 kr", duration: "70 min" }],
    related: ["microneedling-boras", "kemisk-peeling-boras", "klassisk-ansiktsbehandling-boras"],
    seoTitle: "BB Glow Borås - PNK Beauty Klinik",
    seoDescription:
      "BB Glow i Borås för lyster och jämnare hudton hos PNK Beauty Klinik."
  }),
  treatment({
    slug: "kemisk-peeling-boras",
    category: "hudvard-boras",
    title: "Kemisk peeling i Borås",
    eyebrow: "Hudförnyelse",
    summary: "Kemisk peeling, kit och ekologisk peeling efter hudens behov.",
    description:
      "Kemisk peeling exfolierar huden kontrollerat och kan anpassas med olika varianter, inklusive BioRepeel som relaterad behandling.",
    image: "/images/pnk/services/peeling.webp",
    chips: ["Kemisk peeling", "Ekologisk", "Kit"],
    priceFrom: "Från 1 500 kr",
    duration: "45-80 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [
      { label: "Kemisk peeling", price: "Från 1 500 kr", duration: "45 min" },
      { label: "Kemisk peeling med kit", price: "Från 1 500 kr", duration: "80 min" },
      { label: "Ekologisk peeling", price: "Från 1 500 kr", duration: "45 min" }
    ],
    related: ["biorepeel-boras", "microneedling-boras", "klassisk-ansiktsbehandling-boras"],
    seoTitle: "Kemisk peeling Borås - PNK Beauty Klinik",
    seoDescription:
      "Kemisk peeling i Borås med olika varianter, inklusive ekologisk peeling och relaterad BioRepeel-behandling."
  }),
  treatment({
    slug: "biorepeel-boras",
    category: "hudvard-boras",
    title: "BioRepeel i Borås",
    eyebrow: "Peeling",
    summary: "BioRepeel för lyster, klarhet och hudförnyelse.",
    description:
      "BioRepeel är en aktiv peelingbehandling för dig som vill fräscha upp hudens yta och arbeta med klarhet.",
    image: "/images/pnk/services/peeling.webp",
    chips: ["BioRepeel", "Lyster", "Klarhet"],
    priceFrom: "Från 1 595 kr",
    duration: "50 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "BioRepeel", price: "Från 1 595 kr", duration: "50 min" }],
    related: ["kemisk-peeling-boras", "microneedling-boras", "bb-glow-boras"],
    seoTitle: "BioRepeel Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka BioRepeel i Borås hos PNK Beauty Klinik för lyster, klarhet och hudförnyelse."
  }),
  treatment({
    slug: "dubai-lips-boras",
    category: "hudvard-boras",
    title: "Dubai Lips i Borås",
    eyebrow: "Läppvård",
    summary: "Läppbehandling för mjukare känsla och fräschare finish.",
    description:
      "Dubai Lips är en vårdande behandling för läpparna med fokus på fukt, mjukhet och finish.",
    image: "/images/pnk/lip-filler.jpg",
    chips: ["Läppvård", "Fukt", "Finish"],
    priceFrom: "Från 500 kr",
    duration: "30 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Dubai Lips", price: "Från 500 kr", duration: "30 min" }],
    related: ["lappfillers-boras", "klassisk-ansiktsbehandling-boras", "bb-glow-boras"],
    seoTitle: "Dubai Lips Borås - PNK Beauty Klinik",
    seoDescription:
      "Dubai Lips i Borås för vårdade, återfuktade läppar hos PNK Beauty Klinik."
  }),
  ...[
    ["plasma-pen-ogonlockslyft-boras", "Plasma Pen ögonlockslyft i Borås", "Ögonlockslyft", "Från 3 000 kr", "80 min"],
    ["plasma-pen-under-ogonen-boras", "Plasma Pen under ögonen i Borås", "Under ögonen", "Från 3 000 kr", "80 min"],
    ["plasma-pen-kraksparkar-boras", "Plasma Pen kråksparkar i Borås", "Kråksparkar", "Från 2 000 kr", "50 min"],
    ["plasma-pen-hudbristningar-boras", "Plasma Pen hudbristningar i Borås", "Hudbristningar", "Från 5 000 kr", "100 min"],
    ["plasma-pen-hudflikar-pigment-boras", "Plasma Pen hudflikar och pigment i Borås", "Hudflikar och pigment", "Från 1 000 kr", "30 min"],
    ["plasma-pen-panna-arga-rynkan-boras", "Plasma Pen panna och arga rynkan i Borås", "Panna och arga rynkan", "3 000 kr", "80 min"]
  ].map(([slug, title, chip, price, duration]) =>
    treatment({
      slug,
      category: "plasma-pen-boras",
      title,
      eyebrow: "Plasma Pen",
      summary: `${chip} behandlas med riktad Plasma Pen-teknik.`,
      description: `${title} är en precisionsbehandling där området bedöms och behandlas punktvis för ett kontrollerat resultat.`,
      image: "/images/pnk/services/plasma-pen.webp",
      chips: [chip, "Plasma Pen", "Precision"],
      priceFrom: price,
      duration,
      practitioner: "PNK Beauty Klinik",
      priceOptions: [{ label: chip, price, duration }],
      process: plasmaProcess,
      related: [
        "plasma-pen-ogonlockslyft-boras",
        "plasma-pen-under-ogonen-boras",
        "plasma-pen-kraksparkar-boras",
        "plasma-pen-hudflikar-pigment-boras"
      ].filter(
        (relatedSlug) => relatedSlug !== slug
      ),
      seoTitle: `${title} - PNK Beauty Klinik`,
      seoDescription: `${title} hos PNK Beauty Klinik. Pris ${price}, behandlingstid ${duration}.`
    })
  ),
  treatment({
    slug: "klassisk-ansiktsbehandling-boras",
    category: "ansiktsbehandlingar-boras",
    title: "Klassisk ansiktsbehandling i Borås",
    eyebrow: "Hudterapeut",
    summary: "Klassisk ansiktsbehandling med rengöring, vård och lyster.",
    description:
      "En klassisk ansiktsbehandling anpassad efter hudens dagsform med rengöring, exfoliering och vårdande moment.",
    image: "/images/pnk/services/facial.webp",
    chips: ["Rengöring", "Fukt", "Lyster"],
    priceFrom: "1 595 kr",
    duration: "70 min",
    practitioner: "Shadi Dadfar",
    priceOptions: [{ label: "Klassisk ansiktsbehandling", price: "1 595 kr", duration: "70 min" }],
    related: ["marina-miracles-boras", "pure-cell-treatment-boras", "microdermabrasion-boras"],
    seoTitle: "Klassisk ansiktsbehandling Borås - Shadi Dadfar",
    seoDescription:
      "Boka klassisk ansiktsbehandling i Borås hos Shadi Dadfar på PNK Beauty Klinik."
  }),
  treatment({
    slug: "marina-miracles-boras",
    category: "ansiktsbehandlingar-boras",
    title: "Marina Miracles i Borås",
    eyebrow: "Ansiktsbehandling",
    summary: "Marina Miracles Express eller Full Cover för hudens behov.",
    description:
      "Marina Miracles är vårdande ansiktsbehandlingar med ekologisk känsla och fokus på fukt, lyster och balans.",
    image: "/images/pnk/services/facial.webp",
    chips: ["Express", "Full Cover", "Hudvård"],
    priceFrom: "995 kr",
    duration: "45-70 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [
      { label: "Marina Miracles Express", price: "995 kr", duration: "45 min" },
      { label: "Marina Miracles Full cover", price: "1 695 kr", duration: "70 min" }
    ],
    related: ["klassisk-ansiktsbehandling-boras", "pure-cell-treatment-boras", "kemisk-peeling-boras"],
    seoTitle: "Marina Miracles Borås - PNK Beauty Klinik",
    seoDescription:
      "Marina Miracles ansiktsbehandling i Borås. Välj Express eller Full Cover hos PNK Beauty Klinik."
  }),
  treatment({
    slug: "pure-cell-treatment-boras",
    category: "ansiktsbehandlingar-boras",
    title: "Pure Cell Treatment i Borås",
    eyebrow: "Hudvård",
    summary: "Pure Cell Treatment för vårdad hud och ny lyster.",
    description:
      "Pure Cell Treatment är en ansiktsbehandling med fokus på återfuktning, fräschör och hudens balans.",
    image: "/images/pnk/services/facial.webp",
    chips: ["Pure Cell", "Fukt", "Lyster"],
    priceFrom: "1 695 kr",
    duration: "60 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Pure Cell Treatment", price: "1 695 kr", duration: "60 min" }],
    related: ["klassisk-ansiktsbehandling-boras", "marina-miracles-boras", "microdermabrasion-boras"],
    seoTitle: "Pure Cell Treatment Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka Pure Cell Treatment i Borås hos PNK Beauty Klinik för fukt, lyster och hudbalans."
  }),
  treatment({
    slug: "microdermabrasion-boras",
    category: "ansiktsbehandlingar-boras",
    title: "Microdermabrasion i Borås",
    eyebrow: "Exfoliering",
    summary: "Microdermabrasion för jämnare hudstruktur och fräsch yta.",
    description:
      "Microdermabrasion är en mekanisk exfoliering som hjälper huden att kännas slätare och klarare.",
    image: "/images/pnk/services/facial.webp",
    chips: ["Exfoliering", "Struktur", "Klarhet"],
    priceFrom: "1 695 kr",
    duration: "75 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Microdermabrasion", price: "1 695 kr", duration: "75 min" }],
    related: ["klassisk-ansiktsbehandling-boras", "microneedling-boras", "kemisk-peeling-boras"],
    seoTitle: "Microdermabrasion Borås - PNK Beauty Klinik",
    seoDescription:
      "Microdermabrasion i Borås för exfoliering, klarhet och jämnare hudstruktur hos PNK Beauty Klinik."
  }),
  treatment({
    slug: "lashlift-boras",
    category: "fransar-bryn-boras",
    title: "Lashlift i Borås",
    eyebrow: "Fransar",
    summary: "Lashlift för böjda fransar och piggare blick.",
    description:
      "Lashlift lyfter de egna fransarna och ger ett öppnare uttryck utan fransförlängning.",
    image: "/images/pnk/services/lashes-brows.webp",
    chips: ["Lashlift", "Keratin", "Fransar"],
    priceFrom: "995 kr",
    duration: "60 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Lashlift", price: "995 kr", duration: "60 min" }],
    related: ["klassisk-ansiktsbehandling-boras", "makeup-vardag-boras", "makeup-fest-boras"],
    seoTitle: "Lashlift Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka lashlift i Borås hos PNK Beauty Klinik för lyfta fransar och piggare blick."
  }),
  treatment({
    slug: "manikyr-boras",
    category: "naglar-fotter-boras",
    title: "Manikyr i Borås",
    eyebrow: "Naglar",
    summary: "Manikyr för välvårdade händer och naglar.",
    description:
      "Manikyr med fokus på form, nagelband och en ren, välvårdad finish.",
    image: "/images/pnk/services/nails-feet.webp",
    chips: ["Manikyr", "Nagelvård", "Händer"],
    priceFrom: "795 kr",
    duration: "60 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Manikyr", price: "795 kr", duration: "60 min" }],
    related: ["pedikyr-boras", "klassisk-ansiktsbehandling-boras", "makeup-vardag-boras"],
    seoTitle: "Manikyr Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka manikyr i Borås hos PNK Beauty Klinik för välvårdade händer och naglar."
  }),
  treatment({
    slug: "pedikyr-boras",
    category: "naglar-fotter-boras",
    title: "Pedikyr i Borås",
    eyebrow: "Fötter",
    summary: "Pedikyr för mjukare och mer välvårdade fötter.",
    description:
      "Pedikyr med fokus på fotvård, naglar och en fräsch känsla i klinikmiljö.",
    image: "/images/pnk/services/nails-feet.webp",
    chips: ["Pedikyr", "Fotvård", "Fötter"],
    priceFrom: "1 095 kr",
    duration: "60 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Pedikyr", price: "1 095 kr", duration: "60 min" }],
    related: ["manikyr-boras", "indian-head-massage-boras", "klassisk-ansiktsbehandling-boras"],
    seoTitle: "Pedikyr Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka pedikyr i Borås hos PNK Beauty Klinik för välvårdade fötter och naglar."
  }),
  treatment({
    slug: "makeup-vardag-boras",
    category: "makeup-boras",
    title: "Makeup vardag i Borås",
    eyebrow: "Makeup",
    summary: "Vardagsmakeup för ett fräscht och naturligt resultat.",
    description:
      "Vardagsmakeup anpassas efter stil, hud och tillfälle med fokus på ett hållbart men naturligt uttryck.",
    image: "/images/pnk/services/makeup-event.webp",
    chips: ["Vardag", "Naturligt", "Makeup"],
    priceFrom: "700 kr",
    duration: "50 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Makeup vardag", price: "700 kr", duration: "50 min" }],
    related: ["makeup-fest-boras", "lashlift-boras", "klassisk-ansiktsbehandling-boras"],
    seoTitle: "Makeup vardag Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka vardagsmakeup i Borås hos PNK Beauty Klinik för ett fräscht och naturligt resultat."
  }),
  treatment({
    slug: "makeup-fest-boras",
    category: "makeup-boras",
    title: "Makeup fest i Borås",
    eyebrow: "Event",
    summary: "Festmakeup för kväll, event och särskilda tillfällen.",
    description:
      "Festmakeup planeras efter kläder, tillfälle och önskad känsla med fokus på hållbar finish.",
    image: "/images/pnk/services/makeup-event.webp",
    chips: ["Fest", "Event", "Kväll"],
    priceFrom: "1 290 kr",
    duration: "60 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Makeup fest", price: "1 290 kr", duration: "60 min" }],
    related: ["makeup-vardag-boras", "lashlift-boras", "marina-miracles-boras"],
    seoTitle: "Makeup fest Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka festmakeup i Borås för kväll, event och särskilda tillfällen hos PNK Beauty Klinik."
  }),
  treatment({
    slug: "indian-head-massage-boras",
    category: "massage-boras",
    title: "Indian Head Massage i Borås",
    eyebrow: "Massage",
    summary: "Avslappnande massage för huvud, nacke och axlar.",
    description:
      "Indian Head Massage är en lugn behandling för återhämtning med fokus på huvud, nacke och axlar.",
    image: "/images/pnk/services/massage-wellness.webp",
    chips: ["Huvud", "Nacke", "Avslappning"],
    priceFrom: "995 kr",
    duration: "35 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [{ label: "Indian Head Massage", price: "995 kr", duration: "35 min" }],
    related: ["pedikyr-boras", "klassisk-ansiktsbehandling-boras", "marina-miracles-boras"],
    seoTitle: "Indian Head Massage Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka Indian Head Massage i Borås hos PNK Beauty Klinik för avslappning och återhämtning."
  }),
  treatment({
    slug: "oronpiercing-boras",
    category: "piercing-boras",
    title: "Öronpiercing i Borås",
    eyebrow: "Piercing",
    summary: "Öronpiercing i öronsnibb, båda öronsnibbar eller öronbrosk.",
    description:
      "Öronpiercing utförs med rådgivning om placering och tydliga råd för läkning och eftervård.",
    image: "/images/pnk/consulting.jpg",
    chips: ["Öronsnibb", "Öronbrosk", "Eftervård"],
    priceFrom: "300 kr",
    duration: "20-30 min",
    practitioner: "PNK Beauty Klinik",
    priceOptions: [
      { label: "Öronsnibb", price: "300 kr", duration: "20 min" },
      { label: "Öronsnibbar", price: "500 kr", duration: "30 min" },
      { label: "Öronbrosk", price: "500 kr", duration: "20 min" }
    ],
    related: ["lashlift-boras", "makeup-vardag-boras", "klassisk-ansiktsbehandling-boras"],
    seoTitle: "Öronpiercing Borås - PNK Beauty Klinik",
    seoDescription:
      "Boka öronpiercing i Borås. Öronsnibb, båda öronsnibbar eller öronbrosk hos PNK Beauty Klinik."
  }),
  ...[
    ["tradlyft-boras", "Trådlyft i Borås", "injektioner-boras"],
    ["prp-boras", "PRP i Borås", "injektioner-boras"],
    ["fettreducering-boras", "Fettreducering i Borås", "injektioner-boras"],
    ["gelnaglar-boras", "Gelnaglar i Borås", "naglar-fotter-boras"],
    ["spraytan-boras", "Spraytan i Borås", "makeup-boras"],
    ["bryn-boras", "Bryn i Borås", "fransar-bryn-boras"]
  ].map(([slug, title, category]) =>
    treatment({
      slug,
      category,
      title,
      eyebrow: "Ägarbekräftelse krävs",
      summary: "Kandidatbehandling som behöver bekräftas innan publicering.",
      description:
        "Den här behandlingen finns som innehållskandidat och ska verifieras av ägare innan den visas publikt.",
      image: "/images/pnk/consulting.jpg",
      chips: ["Ej publicerad", "Bekräftelse krävs"],
      priceFrom: "Pris bekräftas",
      duration: "Tid bekräftas",
      practitioner: "PNK Beauty Klinik",
      priceOptions: [{ label: title, price: "Pris bekräftas", duration: "Tid bekräftas" }],
      related: [],
      seoTitle: `${title} - PNK Beauty Klinik`,
      seoDescription: `${title} är en kandidatbehandling som behöver ägarbekräftas innan publicering.`,
      sourceStatus: "owner-confirmation-required",
      published: false
    })
  )
];

export const publishedCategories = categories.filter((category) => category.published);
export const publishedTreatments = treatments.filter((treatment) => treatment.published);

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getTreatmentBySlug(slug: string) {
  return treatments.find((treatment) => treatment.slug === slug);
}

export function getTreatmentsByCategory(categorySlug: string) {
  return publishedTreatments.filter((treatment) => treatment.category === categorySlug);
}

export function getRelatedTreatments(treatment: Treatment, limit = 3) {
  const related = treatment.related
    .map((slug) => getTreatmentBySlug(slug))
    .filter((item): item is Treatment => Boolean(item?.published));

  if (related.length >= limit) return related.slice(0, limit);

  const fallback = publishedTreatments.filter(
    (item) =>
      item.slug !== treatment.slug &&
      item.category === treatment.category &&
      !related.some((relatedItem) => relatedItem.slug === item.slug)
  );

  return [...related, ...fallback].slice(0, limit);
}

export const allTreatmentRoutes = Array.from(new Set([
  ...publishedCategories.map((category) => `/behandlingar/${category.slug}/`),
  ...publishedTreatments.map((treatment) => `/behandlingar/${treatment.slug}/`)
]));
