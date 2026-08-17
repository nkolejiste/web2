/*
 * EDITACE LOKOMOTIV:
 * Tohle je jediné místo, kde se běžně mění seznam lokomotiv.
 * Obrázky ukládej do assets/images/lokomotivy/...
 * Níže jsou zatím ukázkové položky pro vzhled stránky.
 */
export const locomotives = [
  {
    id: "loco-01",
    name: "740",
    title: "Řada 740",
    type: "dieselova",
    typeLabel: "Motorová lokomotiva",
    image: "assets/images/lokomotivy/753-7/753_741.jpg",
    shortDescription: "Ukázková lokomotiva pro posun a obsluhu jednotlivých částí železárenského areálu.",
    description: "Tento text je zatím pouze výplň. Později sem stačí doplnit konkrétní číslo lokomotivy, její úkoly, pracoviště a další informace o nasazení v Železárnách.",
    stats: {
      "Druh pohonu": "Dieselelektrický",
      "Provozovatel": "Železárny",
      "Určení": "Posun",
      "Stav": "Doplnit"
    }
  },
  {
    id: "loco-02",
    name: "731",
    title: "Řada 731",
    type: "dieselova",
    typeLabel: "Motorová lokomotiva",
    image: "assets/images/lokomotivy/750/750_163.jpg",
    shortDescription: "Ukázkový stroj pro vlečkový provoz a rozřazování vozů v areálu.",
    description: "Tento text je zatím pouze výplň. Obsah lokomotivy upravíš přímo v assets/js/data.js.",
    stats: {
      "Druh pohonu": "Dieselelektrický",
      "Provozovatel": "Železárny",
      "Určení": "Posun",
      "Stav": "Doplnit"
    }
  },
  {
    id: "loco-03",
    name: "729",
    title: "Řada 729",
    type: "dieselova",
    typeLabel: "Motorová lokomotiva",
    image: "assets/images/lokomotivy/750/750_333.jpg",
    shortDescription: "Ukázkový stroj pro těžší posun a přetahy mezi provozy.",
    description: "Tento text je zatím pouze výplň. Obsah lokomotivy upravíš přímo v assets/js/data.js.",
    stats: {
      "Druh pohonu": "Dieselelektrický",
      "Provozovatel": "Železárny",
      "Určení": "Těžký posun",
      "Stav": "Doplnit"
    }
  },
  {
    id: "loco-04",
    name: "L04",
    title: "Lokomotiva 04",
    type: "dieselova",
    typeLabel: "Motorová lokomotiva",
    image: "assets/images/lokomotivy/753-7/753_776.jpg",
    shortDescription: "Místo připravené pro další lokomotivu železárenského vozového parku.",
    description: "Doplň konkrétní stroj a jeho údaje.",
    stats: {
      "Druh pohonu": "Doplnit",
      "Provozovatel": "Železárny",
      "Určení": "Doplnit",
      "Stav": "Doplnit"
    }
  },
  {
    id: "loco-05",
    name: "L05",
    title: "Lokomotiva 05",
    type: "dieselova",
    typeLabel: "Motorová lokomotiva",
    image: "assets/images/lokomotivy/363-5/363_526.jpg",
    shortDescription: "Místo připravené pro pátou lokomotivu železárenského vozového parku.",
    description: "Doplň konkrétní stroj a jeho údaje.",
    stats: {
      "Druh pohonu": "Doplnit",
      "Provozovatel": "Železárny",
      "Určení": "Doplnit",
      "Stav": "Doplnit"
    }
  }
];
