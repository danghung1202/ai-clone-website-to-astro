import { navItems } from "./navigation";
import { site } from "./site";

const pnkImages = "/images/pnk";

export const bookingUrl = site.bookingUrl;
export { navItems };

export const assets = {
  logoWhite: `${pnkImages}/logo-transparent-header.png`,
  logoDark: `${pnkImages}/logo-transparent-header.png`,
  heroVideo: "https://venetianspa.ca/wp-content/uploads/2026/04/aea5496227e84dd317a0bf9396ae97ed.mov",
  heroImage: `${pnkImages}/hero.jpeg`,
  openBg: `${pnkImages}/clinic-reception.jpg`,
  openIcon: `${pnkImages}/kry-sigill.png`,
  aboutImage: `${pnkImages}/consulting.jpg`,
  stripeIcons: `${pnkImages}/kry-sigill.png`,
  verticalIcons: `${pnkImages}/kry-sigill.png`,
  largeIcon: `${pnkImages}/treatment-room.jpg`,
  ctaImage: `${pnkImages}/clinic-reception.jpg`,
  siamak: `${pnkImages}/siamak.jpeg`,
  shadi: `${pnkImages}/shadi.jpeg`
};

export const services = [
  {
    title: "INJEKTIONER",
    titleLines: ["INJEKTIONER", "BOTOX", "FILLERS"],
    eyebrow: "Medicinsk estetik",
    backgroundPosition: "50% 30%",
    backgroundSize: "cover",
    href: "/behandlingar/injektioner-boras/",
    image: `${pnkImages}/services/injections.webp`,
    copy: "Botox, fillers, trådlyft, PRP, Prophilo och fettreducering utförs med tydlig konsultation och fokus på naturliga resultat.",
    chips: ["Botox", "Fillers", "Trådlyft", "PRP", "Fettreducering"]
  },
  {
    title: "BOTOX BORÅS",
    titleLines: ["BOTOX", "BORÅS"],
    eyebrow: "Rynkbehandling",
    backgroundPosition: "48% 35%",
    backgroundSize: "cover",
    href: "/behandlingar/botox-boras/",
    image: `${pnkImages}/services/botox.webp`,
    copy: "Behandling för utvalda områden med målet att mjuka upp linjer och behålla ett levande uttryck.",
    chips: ["1 område", "2 områden", "3 områden", "Konsultation"]
  },
  {
    title: "FILLERS",
    titleLines: ["FILLERS", "LÄPPAR", "ANSIKTE"],
    eyebrow: "Form och volym",
    backgroundPosition: "50% 45%",
    backgroundSize: "cover",
    href: "/behandlingar/fillers-boras/",
    image: `${pnkImages}/services/fillers.webp`,
    copy: "Läppar, kinder, haka, käklinje och nasolabiala veck behandlas med balans, proportion och tydlig rådgivning.",
    chips: ["Läppar", "Kinder", "Haka", "Käklinje", "Nasolabial"]
  },
  {
    title: "HUD & ANSIKTE",
    titleLines: ["HUD", "& ANSIKTE"],
    eyebrow: "Hudterapeut i Borås",
    backgroundPosition: "50% 48%",
    backgroundSize: "cover",
    href: "/behandlingar/ansiktsbehandling-boras/",
    image: `${pnkImages}/services/facial.webp`,
    copy: "Klassiska och avancerade ansiktsbehandlingar för hud som behöver lyster, återfuktning, rengöring eller struktur.",
    chips: ["Ansiktsbehandling", "Marina Miracles", "Pure Cell", "Microdermabrasion"]
  },
  {
    title: "MICRONEEDLING",
    titleLines: ["MICRO-", "NEEDLING"],
    eyebrow: "Hudstruktur och lyster",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    href: "/behandlingar/microneedling-boras/",
    image: `${pnkImages}/services/microneedling.webp`,
    copy: "Microneedling, DermaPen och BB Glow för dig som vill arbeta med hudkvalitet, jämnare ton och mer glow.",
    chips: ["DermaPen", "BB Glow", "Hudkvalitet", "Lyster"]
  },
  {
    title: "KEMISK PEELING",
    titleLines: ["KEMISK", "PEELING"],
    eyebrow: "Aktiv hudförnyelse",
    backgroundPosition: "50% 45%",
    backgroundSize: "cover",
    href: "/behandlingar/kemisk-peeling-boras/",
    image: `${pnkImages}/services/peeling.webp`,
    copy: "BioRepeel, ekologisk peeling och behandlingsupplägg med eftervård för hud som behöver ny klarhet.",
    chips: ["BioRepeel", "Ekologisk peeling", "Eftervård", "Hudförnyelse"]
  },
  {
    title: "PLASMA PEN",
    titleLines: ["PLASMA", "PEN"],
    eyebrow: "Precisionsbehandling",
    backgroundPosition: "50% 35%",
    backgroundSize: "cover",
    href: "/behandlingar/plasma-pen-boras/",
    image: `${pnkImages}/services/plasma-pen.webp`,
    copy: "Riktade behandlingar för exempelvis ögonlock, kråksparkar, pigmentfläckar, milier och hudflikar.",
    chips: ["Ögonlock", "Kråksparkar", "Pigment", "Milier"]
  },
  {
    title: "NAGLAR & FÖTTER",
    titleLines: ["NAGLAR", "& FÖTTER"],
    eyebrow: "Manikyr och pedikyr",
    backgroundPosition: "50% 45%",
    backgroundSize: "cover",
    href: "/behandlingar/pedikyr-manikyr-boras/",
    image: `${pnkImages}/services/nails-feet.webp`,
    copy: "Manikyr, pedikyr och nagelvård med samma noggranna känsla som resten av klinikens behandlingar.",
    chips: ["Manikyr", "Pedikyr", "Gelnaglar", "Nagellack"]
  },
  {
    title: "FRANSAR & BRYN",
    titleLines: ["FRANSAR", "& BRYN"],
    eyebrow: "Detaljer som lyfter",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    href: "/behandlingar/lashlift-boras/",
    image: `${pnkImages}/services/lashes-brows.webp`,
    copy: "Lashlift, fransar och bryn för ett piggare intryck utan att känslan blir överarbetad.",
    chips: ["Lashlift", "Fransar", "Bryn", "Keratin"]
  },
  {
    title: "MAKEUP & EVENT",
    titleLines: ["MAKEUP", "& EVENT"],
    eyebrow: "Professionell makeup",
    backgroundPosition: "50% 45%",
    backgroundSize: "cover",
    href: "/behandlingar/makeup-boras/",
    image: `${pnkImages}/services/makeup-event.webp`,
    copy: "Makeup för vardag, kväll och fest utförd av professionell makeupartist med känsla för helheten.",
    chips: ["Vardag", "Kväll", "Fest", "Event"]
  },
  {
    title: "MASSAGE & WELLNESS",
    titleLines: ["MASSAGE", "& WELLNESS"],
    eyebrow: "Avslappning",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    href: "/behandlingar/indian-head-massage-boras/",
    image: `${pnkImages}/services/massage-wellness.webp`,
    copy: "Indian Head Massage och lugnare behandlingar för dig som vill kombinera skönhetsvård med återhämtning.",
    chips: ["Indian Head Massage", "Avslappning", "Cirkulation"]
  },
  {
    title: "PRESENTKORT",
    titleLines: ["PRESENT-", "KORT"],
    eyebrow: "Ge bort egen tid",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    href: "/presentkort/",
    image: `${pnkImages}/services/gift-card.webp`,
    copy: "En personlig gåva för behandlingar, hudvård eller en konsultation hos PNK Beauty Klinik i Borås.",
    chips: ["Gåva", "Egentid", "Behandlingar"]
  }
];

export const atmosphereImages = [
  `${pnkImages}/siamak.jpeg`,
  `${pnkImages}/shadi.jpeg`,
  `${pnkImages}/botox-treatment.jpg`,
  `${pnkImages}/lip-filler.jpg`
];

export const galleryImages = [
  `${pnkImages}/hero.jpeg`,
  `${pnkImages}/clinic-reception.jpg`,
  `${pnkImages}/treatment-room.jpg`,
  `${pnkImages}/consulting.jpg`,
  `${pnkImages}/lip-filler.jpg`
];

export const testimonials = [
  {
    name: "Rosmarie O.",
    quote:
      "Jättebra bemötande och professionella i det dom gör. Supernöjd."
  },
  {
    name: "Marie G.",
    quote:
      "Alltid lika nöjd med resultatet som blir efter behandlingen."
  },
  {
    name: "Ulla-Britt O.",
    quote:
      "Väl omhändertagen, fick bra förklaring vad som utfördes samt fin lokal."
  },
  {
    name: "Hussein E.",
    quote:
      "Underbar personal, jätteduktig samt har lång erfarenhet. Tack snälla."
  }
];
