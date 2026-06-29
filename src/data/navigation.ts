import { site } from "./site";

export const navItems = [
  { label: "Behandlingar", href: "/behandlingar/" },
  { label: "Priser", href: "/priser/" },
  { label: "Om kliniken", href: "/om-kliniken/" },
  { label: "Artiklar", href: "/artiklar/" },
  { label: "Kontakt", href: "/kontakt/" }
] as const;

export const footerGroups = [
  {
    title: "Populära behandlingar",
    links: [
      { label: "Botox", href: "/behandlingar/botox-boras/" },
      { label: "Fillers", href: "/behandlingar/fillers-boras/" },
      { label: "Microneedling", href: "/behandlingar/microneedling-boras/" },
      { label: "Kemisk peeling", href: "/behandlingar/kemisk-peeling-boras/" }
    ]
  },
  {
    title: "Kliniken",
    links: [
      { label: "Om kliniken", href: "/om-kliniken/" },
      { label: "Personal", href: "/personal/" },
      { label: "Recensioner", href: "/recensioner/" },
      { label: "Kontakt", href: "/kontakt/" }
    ]
  },
  {
    title: "Boka",
    links: [
      { label: "Boka via Bokadirekt", href: site.bookingUrl, external: true },
      { label: "Priser", href: "/priser/" },
      { label: "Presentkort", href: "/presentkort/" }
    ]
  }
] as const;
