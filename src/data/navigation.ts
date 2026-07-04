import { site } from "./site";

export const navItems = [
  { label: "Behandlingar", href: "/behandlingar/" },
  { label: "Priser", href: "/priser/" },
  { label: "Om kliniken", href: "/om-kliniken/" },
  { label: "Artiklar", href: "/artiklar/" },
  { label: "Kontakt", href: "/kontakt/" }
] as const;

export const megaMenuGroups = [
  {
    eyebrow: "Medicinsk estetik",
    title: "Injektioner",
    href: "/behandlingar/injektioner-boras/",
    description: "Botox, fillers, Prophilo och konsultation med medicinsk precision.",
    links: [
      { label: "Botox i Borås", href: "/behandlingar/botox-boras/" },
      { label: "Fillers", href: "/behandlingar/fillers-boras/" },
      { label: "Läppfillers", href: "/behandlingar/lappfillers-boras/" },
      { label: "Prophilo", href: "/behandlingar/prophilo-boras/" }
    ]
  },
  {
    eyebrow: "Hudterapeut",
    title: "Hudvård & ansikte",
    href: "/behandlingar/hudvard-boras/",
    description: "Aktiv hudförbättring, ansiktsbehandlingar och peeling efter hudens behov.",
    links: [
      { label: "Microneedling", href: "/behandlingar/microneedling-boras/" },
      { label: "Kemisk peeling", href: "/behandlingar/kemisk-peeling-boras/" },
      { label: "BioRepeel", href: "/behandlingar/biorepeel-boras/" },
      { label: "Ansiktsbehandlingar", href: "/behandlingar/ansiktsbehandlingar-boras/" }
    ]
  },
  {
    eyebrow: "Precision",
    title: "Plasma Pen",
    href: "/behandlingar/plasma-pen-boras/",
    description: "Riktade behandlingar för små områden, linjer, pigment och hudstruktur.",
    links: [
      { label: "Ögonlockslyft", href: "/behandlingar/plasma-pen-ogonlockslyft-boras/" },
      { label: "Under ögonen", href: "/behandlingar/plasma-pen-under-ogonen-boras/" },
      { label: "Kråksparkar", href: "/behandlingar/plasma-pen-kraksparkar-boras/" },
      { label: "Hudflikar & pigment", href: "/behandlingar/plasma-pen-hudflikar-pigment-boras/" }
    ]
  },
  {
    eyebrow: "Detaljer",
    title: "Skönhet & wellness",
    href: "/behandlingar/",
    description: "Fransar, bryn, naglar, makeup, massage och piercing.",
    links: [
      { label: "Lashlift", href: "/behandlingar/lashlift-boras/" },
      { label: "Manikyr", href: "/behandlingar/manikyr-boras/" },
      { label: "Makeup", href: "/behandlingar/makeup-boras/" },
      { label: "Massage", href: "/behandlingar/massage-boras/" }
    ]
  }
] as const;

export const footerGroups = [
  {
    title: "Behandlingar",
    links: [
      { label: "Injektioner", href: "/behandlingar/injektioner-boras/" },
      { label: "Botox", href: "/behandlingar/botox-boras/" },
      { label: "Fillers", href: "/behandlingar/fillers-boras/" },
      { label: "Läppfillers", href: "/behandlingar/lappfillers-boras/" },
      { label: "Prophilo", href: "/behandlingar/prophilo-boras/" }
    ]
  },
  {
    title: "Hud & ansikte",
    links: [
      { label: "Hudvård", href: "/behandlingar/hudvard-boras/" },
      { label: "Ansiktsbehandlingar", href: "/behandlingar/ansiktsbehandlingar-boras/" },
      { label: "Microneedling", href: "/behandlingar/microneedling-boras/" },
      { label: "Kemisk peeling", href: "/behandlingar/kemisk-peeling-boras/" },
      { label: "Plasma Pen", href: "/behandlingar/plasma-pen-boras/" }
    ]
  },
  {
    title: "Kliniken",
    links: [
      { label: "Om kliniken", href: "/om-kliniken/" },
      { label: "Personal", href: "/personal/" },
      { label: "Recensioner", href: "/recensioner/" },
      { label: "Artiklar", href: "/artiklar/" },
      { label: "Kontakt", href: "/kontakt/" }
    ]
  },
  {
    title: "Boka & info",
    links: [
      { label: "Priser", href: "/priser/" },
      { label: "Boka via Bokadirekt", href: site.bookingUrl, external: true },
      { label: "Presentkort", href: "/presentkort/" },
      { label: "Allmänna villkor", href: "/allmanna-villkor/" },
      { label: "Integritetspolicy", href: "/integritetspolicy/" }
    ]
  }
] as const;

export const footerBottomLinks = [
  { label: "Allmänna villkor", href: "/allmanna-villkor/" },
  { label: "Integritetspolicy", href: "/integritetspolicy/" },
  { label: "Kontakt", href: "/kontakt/" }
] as const;
