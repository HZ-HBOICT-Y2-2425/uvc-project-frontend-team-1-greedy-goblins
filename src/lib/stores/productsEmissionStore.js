import { writable } from "svelte/store";

export const productEmissionStore = writable({
  productEmissionStore: [
    {
      productID: 1,
      name: "Goudse Kaas",
      productEmission: 5.3, // Add the emission value based on your existing logic
    },
    {
      productID: 2,
      name: "Parmezaanse Kaas",
      productEmission: 6.5,
    },
    {
      productID: 3,
      name: "Brie",
      productEmission: 4.0,
    },
    {
      productID: 4,
      name: "Geitenkaas",
      productEmission: 4.5,
    },
    {
      productID: 5,
      name: "Cheddar",
      productEmission: 4.2,
    },
    {
      productID: 6,
      name: "Halfvolle Melk",
      productEmission: 1.8,
    },
    {
      productID: 7,
      name: "Volle Melk",
      productEmission: 2.0,
    },
    {
      productID: 8,
      name: "Karnemelk",
      productEmission: 1.9,
    },
    {
      productID: 9,
      name: "Lactosevrije Melk",
      productEmission: 2.2,
    },
    {
      productID: 10,
      name: "Chocolademelk",
      productEmission: 3.0,
    },
    {
      productID: 11,
      name: "Vrije Uitloop Eieren",
      productEmission: 2.0,
    },
    {
      productID: 12,
      name: "Biologische Eieren",
      productEmission: 1.8,
    },
    {
      productID: 13,
      name: "Scharreleieren",
      productEmission: 1.9,
    },
    {
      productID: 14,
      name: "Omega-3 Eieren",
      productEmission: 2.1,
    },
    {
      productID: 15,
      name: "Kwarkei",
      productEmission: 2.3,
    },
    {
      productID: 16,
      name: "IJsbergsla",
      productEmission: 0.5,
    },
    {
      productID: 17,
      name: "Komkommer",
      productEmission: 0.9,
    },
    {
      productID: 18,
      name: "Bloemkool",
      productEmission: 1.2,
    },
    {
      productID: 19,
      name: "Broccoli",
      productEmission: 1.3,
    },
    {
      productID: 20,
      name: "Spinazie",
      productEmission: 1.1,
    },
    {
      productID: 21,
      name: "Appel",
      productEmission: 0.8,
    },
    {
      productID: 22,
      name: "Peer",
      productEmission: 0.7,
    },
    {
      productID: 23,
      name: "Aardbeien",
      productEmission: 1.0,
    },
    {
      productID: 24,
      name: "Frambozen",
      productEmission: 1.5,
    },
    {
      productID: 25,
      name: "Kers",
      productEmission: 1.4,
    },
    {
      productID: 26,
      name: "Kipfilet",
      productEmission: 5.0,
    },
    {
      productID: 27,
      name: "SpareRibs",
      productEmission: 6.0,
    },
    {
      productID: 28,
      name: "Verse Worst",
      productEmission: 5.5,
    },
    {
      productID: 29,
      name: "Gehakt",
      productEmission: 5.3,
    },
    {
      productID: 30,
      name: "Hamburgers",
      productEmission: 5.7,
    },
    {
      productID: 31,
      name: "Basilicum",
      productEmission: 0.2,
    },
    {
      productID: 32,
      name: "Peterselie",
      productEmission: 0.3,
    },
    {
      productID: 33,
      name: "Rozemarijn",
      productEmission: 0.4,
    },
    {
      productID: 34,
      name: "Tijm",
      productEmission: 0.4,
    },
    {
      productID: 35,
      name: "Koriander",
      productEmission: 0.4,
    },
    {
      productID: 36,
      name: "Zalm",
      productEmission: 8.0,
    },
    {
      productID: 37,
      name: "Tonijn",
      productEmission: 7.5,
    },
    {
      productID: 38,
      name: "Makreel",
      productEmission: 6.8,
    },
    {
      productID: 39,
      name: "Haring",
      productEmission: 6.0,
    },
    {
      productID: 40,
      name: "Kabeljauw",
      productEmission: 6.2,
    },
    {
      productID: 41,
      name: "Bruin Brood",
      productEmission: 2.1,
    },
    {
      productID: 42,
      name: "Wit Brood",
      productEmission: 2.0,
    },
    {
      productID: 43,
      name: "Volkoren Brood",
      productEmission: 2.2,
    },
    {
      productID: 44,
      name: "Meergranen Brood",
      productEmission: 2.3,
    },
    {
      productID: 45,
      name: "Rozijnenbrood",
      productEmission: 2.4,
    },
    {
      productID: 46,
      name: "Friese Aardappelen",
      productEmission: 1.0,
    },
    {
      productID: 47,
      name: "Jonge Aardappelen",
      productEmission: 1.1,
    },
    {
      productID: 48,
      name: "Krieltjes",
      productEmission: 1.2,
    },
    {
      productID: 49,
      name: "Zoete Aardappelen",
      productEmission: 1.3,
    },
    {
      productID: 50,
      name: "Rode Aardappelen",
      productEmission: 1.4,
    },
    {
      productID: 51,
      name: "Amandelen",
      productEmission: 2.2,
    },
    {
      productID: 52,
      name: "Hazelnoten",
      productEmission: 2.3,
    },
    {
      productID: 53,
      name: "Zonnebloempitten",
      productEmission: 1.8,
    },
    {
      productID: 54,
      name: "Chiazaad",
      productEmission: 2.1,
    },
    {
      productID: 55,
      name: "Cashewnoten",
      productEmission: 2.4,
    },
    {
      productID: 56,
      name: "Melkchocolade",
      productEmission: 4.2,
    },
    {
      productID: 57,
      name: "Pure Chocolade",
      productEmission: 4.5,
    },
    {
      productID: 58,
      name: "Witte Chocolade",
      productEmission: 4.0,
    },
    {
      productID: 59,
      name: "Chocoladerepen",
      productEmission: 4.3,
    },
    {
      productID: 60,
      name: "Chocoladetruffels",
      productEmission: 4.8,
    },
  ],
});
