export const renoxOneVariants = [
  {
    id: "12-256",
    name: "Renox One",
    ram: "12GB LPDDR5X",
    storage: "256GB",
    basePrice: 129999,
    bestFor: "Everyday flagship performance",
    availableColors: ["Sunset Copper"],
  },
  {
    id: "16-512",
    name: "Renox One Pro Memory",
    ram: "16GB LPDDR5X",
    storage: "512GB",
    basePrice: 149999,
    bestFor: "Creators, heavy users, and larger libraries",
    availableColors: ["Sunset Copper"],
  },
] as const;

export const renoxOneAddOns = [
  {
    id: "charger-80w",
    name: "Renox 80W Fast Charger",
    price: 6999,
    image: "/products/addons/renox-80w-charger.webp",
    description: "Fast charging accessory for Renox One.",
  },
  {
    id: "case",
    name: "Renox Protective Case",
    price: 2999,
    image: "/products/addons/renox-protective-case.webp",
    description: "Designed to protect Renox One without hiding its form.",
  },
  {
    id: "screen-protector",
    name: "Renox Tempered Glass Protector",
    price: 1499,
    image: "/products/addons/renox-screen-protector.webp",
    description: "Extra protection for the front display.",
  },
  {
    id: "care",
    name: "Renox Care Protection Plan",
    price: 4999,
    image: "/products/addons/renox-care.webp",
    description: "Optional protection plan placeholder, subject to commercial terms.",
  },
] as const;
