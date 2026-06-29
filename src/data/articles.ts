export interface Article {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  category: string;
  relatedTreatments: string[];
  seoTitle: string;
  seoDescription: string;
  publishedDate: string;
  updatedDate: string;
  sections: { heading: string; body: string }[];
  faq: { question: string; answer: string }[];
  published: boolean;
}

const baseDate = "2026-06-29";

const bookingFaq = [
  {
    question: "Behöver jag boka konsultation?",
    answer:
      "Vid injektionsbehandlingar rekommenderas konsultation så att behandlingen kan anpassas tryggt."
  },
  {
    question: "Kan jag få personliga råd?",
    answer:
      "Ja, PNK Beauty Klinik ger individuella råd utifrån hud, mål och tidigare behandlingar."
  }
];

export const articles: Article[] = [
  {
    slug: "att-tanka-pa-efter-botox",
    title: "Att tänka på efter Botox",
    eyebrow: "Eftervård",
    summary: "Råd för första dygnet efter Botox och när resultatet brukar märkas.",
    image: "/images/pnk/services/botox.webp",
    category: "Injektioner",
    relatedTreatments: ["botox-boras", "konsultation"],
    seoTitle: "Efter Botox - råd och eftervård",
    seoDescription:
      "Läs vad du bör tänka på efter Botox, från träning och massage till när resultatet brukar synas.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Första dygnet",
        body:
          "Undvik träning, bastu, alkohol och att massera området första dygnet. Låt huden vara ren och följ de råd du fått på kliniken."
      },
      {
        heading: "Resultat och uppföljning",
        body:
          "Effekten kommer gradvis och bedöms bäst efter ungefär två veckor. Kontakta kliniken om du har frågor eller oväntade reaktioner."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "botox-eller-fillers",
    title: "Botox eller fillers - vad är skillnaden?",
    eyebrow: "Guide",
    summary: "Botox och fillers används för olika mål och kan ibland kombineras.",
    image: "/images/pnk/services/injections.webp",
    category: "Injektioner",
    relatedTreatments: ["botox-boras", "fillers-boras", "konsultation"],
    seoTitle: "Botox eller fillers - skillnad och val",
    seoDescription:
      "Förstå skillnaden mellan Botox och fillers och när respektive behandling kan passa.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Olika funktioner",
        body:
          "Botox används främst för muskelaktivitet och mimiska linjer. Fillers används för volym, form och stöd i utvalda områden."
      },
      {
        heading: "Rätt val börjar med bedömning",
        body:
          "Vilken behandling som passar beror på anatomi, mål och tidigare behandlingar. En konsultation ger en säkrare plan."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "hur-lange-haller-fillers",
    title: "Hur länge håller fillers?",
    eyebrow: "Fillers",
    summary: "Hållbarheten varierar mellan område, produkt, metabolism och livsstil.",
    image: "/images/pnk/services/fillers.webp",
    category: "Injektioner",
    relatedTreatments: ["fillers-boras", "lappfillers-boras", "fillers-kinder-boras"],
    seoTitle: "Hur länge håller fillers? - PNK Beauty",
    seoDescription:
      "Läs om vad som påverkar hur länge fillers håller i läppar, kinder, haka och andra områden.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Det finns inget exakt svar",
        body:
          "Fillers bryts ned olika snabbt. Område, produkt, dos, mimik och kroppens metabolism påverkar hur länge resultatet syns."
      },
      {
        heading: "Planera underhåll varsamt",
        body:
          "Ett naturligt resultat bygger ofta på lagom intervall och tydlig uppföljning, inte på att fylla på för tidigt."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "eftervard-fillers-lappar",
    title: "Eftervård efter fillers i läppar",
    eyebrow: "Läppfillers",
    summary: "Så tar du hand om läpparna efter läppfillers.",
    image: "/images/pnk/lip-filler.jpg",
    category: "Injektioner",
    relatedTreatments: ["lappfillers-boras", "fillers-boras"],
    seoTitle: "Eftervård läppfillers - råd efter behandling",
    seoDescription:
      "Eftervård efter fillers i läppar: svullnad, aktivitet, massage och när du bör kontakta kliniken.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Svullnad är vanligt",
        body:
          "Läppar kan svullna och kännas ömma de första dagarna. Undvik värme, alkohol och hård träning första dygnet."
      },
      {
        heading: "Var uppmärksam",
        body:
          "Kontakta kliniken direkt vid stark smärta, blekhet, missfärgning eller oro. Det är bättre att fråga en gång för mycket."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "microneedling-eller-kemisk-peeling",
    title: "Microneedling eller kemisk peeling?",
    eyebrow: "Hudvård",
    summary: "Två hudförbättrande behandlingar med olika arbetssätt.",
    image: "/images/pnk/services/microneedling.webp",
    category: "Hudvård",
    relatedTreatments: ["microneedling-boras", "kemisk-peeling-boras", "biorepeel-boras"],
    seoTitle: "Microneedling eller kemisk peeling - vad passar?",
    seoDescription:
      "Jämför microneedling och kemisk peeling för lyster, struktur, hudton och hudförnyelse.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "När microneedling passar",
        body:
          "Microneedling arbetar med kontrollerad stimulans i huden och kan passa vid struktur, porer, ärr och lyster."
      },
      {
        heading: "När peeling passar",
        body:
          "Kemisk peeling arbetar mer med hudens yta, klarhet och förnyelse. Valet beror på hudstatus och återhämtningstid."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "vad-ar-biorepeel",
    title: "Vad är BioRepeel?",
    eyebrow: "Peeling",
    summary: "En aktiv peelingbehandling för lyster och hudförnyelse.",
    image: "/images/pnk/services/peeling.webp",
    category: "Hudvård",
    relatedTreatments: ["biorepeel-boras", "kemisk-peeling-boras"],
    seoTitle: "Vad är BioRepeel? - Guide från PNK Beauty",
    seoDescription:
      "Läs om BioRepeel, när behandlingen kan passa och hur du tar hand om huden efteråt.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Aktiv hudförnyelse",
        body:
          "BioRepeel är en peelingbehandling som används för att fräscha upp hudens yta och ge mer klarhet och lyster."
      },
      {
        heading: "Efter behandlingen",
        body:
          "Huden behöver mild vård, fukt och SPF. Undvik starka aktiva produkter tills huden känns lugn igen."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "plasma-pen-eftervard",
    title: "Eftervård efter Plasma Pen",
    eyebrow: "Plasma Pen",
    summary: "Läkning och hudvård efter en Plasma Pen-behandling.",
    image: "/images/pnk/services/plasma-pen.webp",
    category: "Plasma Pen",
    relatedTreatments: ["plasma-pen-boras", "plasma-pen-ogonlockslyft-boras"],
    seoTitle: "Plasma Pen eftervård - så tar du hand om huden",
    seoDescription:
      "Eftervårdsråd efter Plasma Pen: rengöring, solskydd, skorpor, läkning och när du bör kontakta kliniken.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Låt huden läka i fred",
        body:
          "Pilla inte på små skorpor och håll området rent enligt klinikens råd. Läkningen är en viktig del av resultatet."
      },
      {
        heading: "Skydda mot sol",
        body:
          "Använd SPF och undvik sol på området under läkningsperioden för att minska risken för pigmentförändringar."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "lashlift-eftervard",
    title: "Eftervård efter lashlift",
    eyebrow: "Fransar",
    summary: "Så håller du resultatet fint efter lashlift.",
    image: "/images/pnk/services/lashes-brows.webp",
    category: "Fransar och bryn",
    relatedTreatments: ["lashlift-boras"],
    seoTitle: "Lashlift eftervård - råd efter behandling",
    seoDescription:
      "Läs hur du tar hand om fransarna efter lashlift för ett fint och hållbart resultat.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Första tiden",
        body:
          "Undvik vatten, ånga och oljiga produkter direkt efter behandlingen om behandlaren rekommenderar det."
      },
      {
        heading: "Vårda fransarna",
        body:
          "Borsta försiktigt och använd skonsamma produkter. Ett bra eftervårdsrutiner hjälper resultatet att hålla sig fint."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "sa-valjer-du-ansiktsbehandling",
    title: "Så väljer du ansiktsbehandling",
    eyebrow: "Hudguide",
    summary: "Välj behandling efter hudens behov, inte bara efter namn.",
    image: "/images/pnk/services/facial.webp",
    category: "Ansiktsbehandlingar",
    relatedTreatments: [
      "klassisk-ansiktsbehandling-boras",
      "marina-miracles-boras",
      "microdermabrasion-boras"
    ],
    seoTitle: "Välj ansiktsbehandling - guide i Borås",
    seoDescription:
      "Guide till hur du väljer ansiktsbehandling utifrån fukt, lyster, struktur och hudens dagsform.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Börja med hudens mål",
        body:
          "Fundera på om du främst vill ha fukt, rengöring, lyster, exfoliering eller mer aktiv hudförbättring."
      },
      {
        heading: "Låt hudterapeuten styra detaljerna",
        body:
          "En hudterapeut kan anpassa produkter och moment efter hudens dagsform, känslighet och säsong."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "prophilo-vad-ar-det",
    title: "Prophilo - vad är det?",
    eyebrow: "Hudkvalitet",
    summary: "Prophilo är en injektionsbehandling med fokus på fukt och spänst.",
    image: "/images/pnk/services/injections.webp",
    category: "Injektioner",
    relatedTreatments: ["prophilo-boras", "botox-boras", "fillers-boras"],
    seoTitle: "Prophilo - vad är det och vem passar det för?",
    seoDescription:
      "Läs om Prophilo, skillnaden mot fillers och när behandlingen kan passa för hudkvalitet och lyster.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Inte en klassisk filler",
        body:
          "Prophilo används för hudkvalitet, fukt och elasticitet snarare än för att skapa tydlig volym eller form."
      },
      {
        heading: "Passar hud som behöver mer spänst",
        body:
          "Behandlingen kan vara aktuell när huden känns trött, torr eller mindre elastisk och målet är subtil hudförbättring."
      }
    ],
    faq: bookingFaq,
    published: true
  },
  {
    slug: "trygga-injektionsbehandlingar-boras",
    title: "Trygga injektionsbehandlingar i Borås",
    eyebrow: "Säkerhet",
    summary: "Därför är konsultation, kompetens och uppföljning viktigt.",
    image: "/images/pnk/consulting.jpg",
    category: "Injektioner",
    relatedTreatments: ["konsultation", "botox-boras", "fillers-boras"],
    seoTitle: "Trygga injektionsbehandlingar Borås - PNK Beauty",
    seoDescription:
      "Läs om trygghet vid injektionsbehandlingar i Borås: konsultation, medicinsk bedömning, eftervård och uppföljning.",
    publishedDate: baseDate,
    updatedDate: baseDate,
    sections: [
      {
        heading: "Konsultationen är central",
        body:
          "En trygg behandling börjar med frågor om hälsa, förväntningar, tidigare behandlingar och vad som faktiskt passar."
      },
      {
        heading: "Eftervård och kontakt",
        body:
          "Tydliga eftervårdsråd och möjlighet att kontakta kliniken vid frågor är en viktig del av hela behandlingsprocessen."
      }
    ],
    faq: bookingFaq,
    published: true
  }
];

export const publishedArticles = articles.filter((article) => article.published);

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return publishedArticles
    .filter(
      (candidate) =>
        candidate.slug !== article.slug &&
        candidate.relatedTreatments.some((slug) =>
          article.relatedTreatments.includes(slug)
        )
    )
    .slice(0, limit);
}

export const allArticleRoutes = publishedArticles.map(
  (article) => `/artiklar/${article.slug}/`
);
