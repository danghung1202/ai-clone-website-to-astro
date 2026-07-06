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
    image: "/images/pnk/services/menu-medical.webp",
    links: [
      { label: "Konsultation", href: "/behandlingar/konsultation/" },
      { label: "Botox i Borås", href: "/behandlingar/botox-boras/" },
      { label: "Fillers", href: "/behandlingar/fillers-boras/" },
      { label: "Läppfillers", href: "/behandlingar/lappfillers-boras/" },
      { label: "Fillers kinder", href: "/behandlingar/fillers-kinder-boras/" },
      { label: "Fillers haka", href: "/behandlingar/fillers-haka-boras/" },
      { label: "Fillers käklinje", href: "/behandlingar/fillers-kaklinje-boras/" },
      { label: "Nasolabial", href: "/behandlingar/fillers-nasolabial-boras/" },
      { label: "Prophilo", href: "/behandlingar/prophilo-boras/" }
    ]
  },
  {
    eyebrow: "Hudterapeut",
    title: "Hudvård & ansikte",
    href: "/behandlingar/hudvard-boras/",
    description: "Aktiv hudförbättring, ansiktsbehandlingar och peeling efter hudens behov.",
    image: "/images/pnk/services/menu-skin.webp",
    links: [
      { label: "Ansiktsbehandlingar", href: "/behandlingar/ansiktsbehandlingar-boras/" },
      { label: "Klassisk ansiktsbehandling", href: "/behandlingar/klassisk-ansiktsbehandling-boras/" },
      { label: "Marina Miracles", href: "/behandlingar/marina-miracles-boras/" },
      { label: "Pure Cell Treatment", href: "/behandlingar/pure-cell-treatment-boras/" },
      { label: "Microdermabrasion", href: "/behandlingar/microdermabrasion-boras/" },
      { label: "Microneedling", href: "/behandlingar/microneedling-boras/" },
      { label: "BB Glow", href: "/behandlingar/bb-glow-boras/" },
      { label: "Kemisk peeling", href: "/behandlingar/kemisk-peeling-boras/" },
      { label: "BioRepeel", href: "/behandlingar/biorepeel-boras/" },
      { label: "Dubai Lips", href: "/behandlingar/dubai-lips-boras/" }
    ]
  },
  {
    eyebrow: "Precision",
    title: "Plasma Pen",
    href: "/behandlingar/plasma-pen-boras/",
    description: "Riktade behandlingar för små områden, linjer, pigment och hudstruktur.",
    image: "/images/pnk/services/menu-plasma.webp",
    links: [
      { label: "Ögonlockslyft", href: "/behandlingar/plasma-pen-ogonlockslyft-boras/" },
      { label: "Under ögonen", href: "/behandlingar/plasma-pen-under-ogonen-boras/" },
      { label: "Kråksparkar", href: "/behandlingar/plasma-pen-kraksparkar-boras/" },
      { label: "Hudbristningar", href: "/behandlingar/plasma-pen-hudbristningar-boras/" },
      { label: "Hudflikar & pigment", href: "/behandlingar/plasma-pen-hudflikar-pigment-boras/" },
      { label: "Panna & arga rynkan", href: "/behandlingar/plasma-pen-panna-arga-rynkan-boras/" }
    ]
  },
  {
    eyebrow: "Detaljer",
    title: "Skönhet & wellness",
    href: "/behandlingar/",
    description: "Fransar, bryn, naglar, makeup, massage och piercing.",
    image: "/images/pnk/services/menu-wellness.webp",
    links: [
      { label: "Fransar & bryn", href: "/behandlingar/fransar-bryn-boras/" },
      { label: "Lashlift", href: "/behandlingar/lashlift-boras/" },
      { label: "Naglar & fötter", href: "/behandlingar/naglar-fotter-boras/" },
      { label: "Manikyr", href: "/behandlingar/manikyr-boras/" },
      { label: "Pedikyr", href: "/behandlingar/pedikyr-boras/" },
      { label: "Makeup", href: "/behandlingar/makeup-boras/" },
      { label: "Makeup vardag", href: "/behandlingar/makeup-vardag-boras/" },
      { label: "Makeup fest", href: "/behandlingar/makeup-fest-boras/" },
      { label: "Massage", href: "/behandlingar/massage-boras/" },
      { label: "Indian Head Massage", href: "/behandlingar/indian-head-massage-boras/" },
      { label: "Piercing", href: "/behandlingar/piercing-boras/" },
      { label: "Öronpiercing", href: "/behandlingar/oronpiercing-boras/" }
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
