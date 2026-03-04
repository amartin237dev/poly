/* ── Shared collection data ── */

export interface Product {
  name: string;
  size: string;
  price: number;
  description?: string;
  tag?: string;
  isFlanker?: boolean;
  image?: string;
}

export interface FragranceLine {
  name: string;
  products: Product[];
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  accent: string;
  accentBg: string;
  lines: FragranceLine[];
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export const collections: Collection[] = [
  {
    id: "originals",
    name: "Originals",
    subtitle: "Polysnifferous Original Fragrances",
    description:
      "Our signature blends — bold, layered, unforgettable. All Parfum/Extrait concentration, crafted by perfumer Noah Drucker.",
    accent: "text-[#c8922a]",
    accentBg: "bg-[#c8922a]",
    lines: [
      {
        name: "Aventish",
        products: [
          { name: "Aventish", size: "50ml", price: 89, description: "The flagship — pineapple-forward, bold ambroxan base. Parfumo 9.3/10.", image: "/img/Aventish.jpg" },
          { name: "Aventish Red", size: "50ml", price: 89, description: "Darker, juicier — grapefruit, cranberry, vanilla suede.", isFlanker: true, image: "/img/Aventish-Red.jpg" },
          { name: "Aventish Blue", size: "50ml", price: 89, description: "Fresh, aquatic, tropical — sea salt, coconut, watermelon.", isFlanker: true, image: "/img/Avenetish-Blue.webp" },
          { name: "Aventish Pink", size: "50ml", price: 89, description: "First feminine flanker — bubble gum, white florals, passion fruit.", isFlanker: true, image: "/img/AventishPink.jpg" },
          { name: "Aventish Aqua", size: "50ml", price: 89, description: "Newest flanker — refreshing aquatic interpretation.", isFlanker: true, image: "/img/AventishAqua.webp" },
          { name: "Aventish Orange Dawn", size: "50ml", price: 128, description: "Limited edition citrus dawn.", tag: "Limited", isFlanker: true, image: "/img/AventishOrangeDawnIntense.webp" },
          { name: "Aventish Orange Dusk", size: "50ml", price: 128, description: "Warm fall fragrance — blood orange, pumpkin cream, maple, cinnamon.", tag: "Limited", isFlanker: true, image: "/img/AventishOrangeNight.webp" },
        ],
      },
      {
        name: "Brackish",
        products: [
          { name: "Brackish Man", size: "50ml", price: 89, description: "Spicy fougere — clove, cinnamon, nutmeg, dark amber, aromatic tobacco. Parfumo 9.4/10.", image: "/img/Brackish-Man.jpg" },
          { name: "Brackish Man Intense", size: "50ml", price: 87, description: "Intensified formulation — deeper, richer.", isFlanker: true, image: "/img/Brackish-Man-Intense.jpg" },
          { name: "Old Man Brackish", size: "50ml", price: 89, description: "75% Brackish + 25% vintage Old Spice. Crisp, soapy, fresh.", isFlanker: true, image: "/img/OldManBrackish.webp" },
        ],
      },
      {
        name: "Amberish",
        products: [
          { name: "Amberish Absolute Intense", size: "50ml", price: 99, description: "Rich amber, oud, frankincense, labdanum, sandalwood, vanilla. Parfumo 10/10.", image: "/img/Amberish-Absolute-Intense.jpg" },
          { name: "Amberish Uber Intense", size: "50ml", price: 105, description: "Even more intensified — maximum amber richness.", isFlanker: true, image: "/img/AmberishUber.webp" },
        ],
      },
      {
        name: "Cherry Smoke",
        products: [
          { name: "Cherry Smoke Intense", size: "50ml", price: 87, description: "Double oud (>10%), birch tar, cade oil, coffee. Dark and masculine.", image: "/img/Cherry-Smoke-Intense.jpg" },
          { name: "Cherry Smoke Leather", size: "50ml", price: 87, description: "Leather-forward variation — smoky, animalic edge.", isFlanker: true, image: "/img/cherrysmokeleather.webp" },
        ],
      },
      {
        name: "Standalone Originals",
        products: [
          { name: "The Queen", size: "50ml", price: 110, description: "Noah's debut original — damask & Bulgarian roses, custom amber-resin base, green kinam oud.", image: "/img/TheQueen.webp" },
          { name: "Plummy J. Intense", size: "50ml", price: 89, description: "Vintage TF Plum Japonais reimagined — darker, deeper, animalic.", image: "/img/PlummishIntense.webp" },
          { name: "Polish Green Intense", size: "30ml", price: 79, description: "Vintage Polo Green with oud, castoreum, ambergris. Micro-batch.", tag: "Coming Soon", image: "/img/PolishGreenIntense.webp" },
          { name: "Gentlemen", size: "50ml", price: 130, description: "Collab with Artisan Dixit — tobacco, leather, Russian leather, beeswax.", image: "/img/Gentlemen.webp" },
        ],
      },
    ],
  },
  {
    id: "perito-moreno",
    name: "Perito Moreno",
    subtitle: "Perito Moreno Luxury Perfumes",
    description:
      "Artisanal fragrances by perfumer Nitish Dixit. Polysnifferous is the official US distributor. Full bottles available at peritomoreno.us.",
    accent: "text-[#2a5060]",
    accentBg: "bg-[#2a5060]",
    lines: [
      {
        name: "Perito Moreno Collection",
        products: [
          { name: "Citrus and Yuzu", size: "11ml", price: 25, description: "Bright citrus with Japanese yuzu — crisp and invigorating." },
          { name: "King's Empire", size: "28ml", price: 28, description: "Regal, commanding fragrance — imperial luxury." },
          { name: "Meditation Mist", size: "28ml", price: 28, description: "Calm, meditative aromatics — inner peace in a bottle." },
          { name: "Not Dark Yet", size: "28ml", price: 28, description: "Twilight sophistication — between light and dark." },
          { name: "Coffee Date with Civet Cat", size: "60ml", price: 60, description: "Rich coffee, animalic musk — warm and inviting." },
          { name: "American Leather", size: "11ml", price: 60, description: "Premium leather composition — rugged elegance." },
          { name: "Culture", size: "28ml", price: 28, description: "Complex, refined — a celebration of depth and tradition." },
          { name: "Elite", size: "42ml", price: 42, description: "Top-tier sophistication — polished and commanding." },
          { name: "Thumri", size: "28ml", price: 28, description: "Named after the Hindustani vocal form — melodic and expressive." },
          { name: "Regal Assam", size: "42ml", price: 42, description: "Tea-inspired luxury — warm, aromatic Assam notes." },
          { name: "Shrungar Extrait", size: "88ml", price: 88, description: "Ornamental beauty — rich, decorative, ceremonial." },
          { name: "Vetiver Mystique", size: "42ml", price: 42, description: "Earthy vetiver with mysterious depth." },
          { name: "Regal Silhouette", size: "49ml", price: 49, description: "Elegant contours — subtle power and grace." },
        ],
      },
      {
        name: "Artisan Dixit Collection",
        products: [
          { name: "Octopus", size: "50ml", price: 135, description: "Avant-garde artisan creation by Nitish Dixit." },
          { name: "Amber Eternal", size: "50ml", price: 135, description: "Timeless amber — rich, enveloping warmth." },
          { name: "The Last Rose of the West", size: "50ml", price: 135, description: "Poetic rose composition — melancholic beauty." },
        ],
      },
    ],
  },
  {
    id: "dark-tales",
    name: "Dark Tales",
    subtitle: "Dark Tales Artisan Perfumery",
    description:
      "Independent artisan perfumery by Arina P. Franzen, inspired by dark history, Gothic literature, and mystical places. EDPs, 30ml.",
    accent: "text-[#b04a30]",
    accentBg: "bg-[#b04a30]",
    lines: [
      {
        name: "Core Collection",
        products: [
          { name: "Old Library", size: "30ml", price: 185, description: "Leather-bound books, powdery papers, ancient wooden bookshelves, medieval monastery." },
          { name: "Obsidian Apple", size: "30ml", price: 185, description: "Crisp apple with green notes and amber — forbidden fruit." },
          { name: "Floating Candles", size: "30ml", price: 185, description: "Waxy, velvety base with soft greenery and smoky resin." },
          { name: "Aurora Borealis", size: "30ml", price: 185, description: "Radiant and floral — capturing the eternal beauty of the Northern Lights." },
          { name: "Witching Hour", size: "30ml", price: 185, description: "Earthy dark chocolate, autumn leaves, mushroom, velvety wood." },
          { name: "Purple Veil", size: "30ml", price: 185, description: "Soft powdery florals with smoky resin, white musk, incense." },
          { name: "King's Jester", size: "30ml", price: 185, description: "Leather, rum, and royal-inspired composition." },
          { name: "Bloody Mary", size: "30ml", price: 185, description: "Metallic pomegranate, warm leather undertone, floral bouquet." },
          { name: "Yaga", size: "30ml", price: 185, description: "Pine and currant — a shadowed forest walk." },
          { name: "Rosen", size: "30ml", price: 185, description: "Dried florals, white musk, chocolate, amber, sweet woods." },
          { name: "Black Pearl", size: "30ml", price: 187, description: "Dark wood, worn leather, sea breeze, coconut, sweet rum." },
          { name: "NSFRTÅ", size: "30ml", price: 185, description: "Dark and ethereal — evoking a forgotten abbey." },
        ],
      },
      {
        name: "Limited Editions",
        products: [
          { name: "999 Ghosts", size: "30ml", price: 195, description: "Spectral and haunting — limited seasonal release.", tag: "Limited" },
          { name: "Graveyard Silk", size: "30ml", price: 195, description: "Delicate yet dark — silk among the tombstones.", tag: "Limited" },
          { name: "All Hallows' Eve", size: "30ml", price: 195, description: "The quintessential Halloween fragrance.", tag: "Limited" },
        ],
      },
      {
        name: "Discovery Only",
        products: [
          { name: "Fern Valley", size: "1ml sample", price: 0, description: "Deep green, rain-soaked forest with petrichor.", tag: "Sample Set Only" },
          { name: "Gothika", size: "1ml sample", price: 0, description: "Gothic cathedral — incense, candle wax, polished wood, leather-bound books.", tag: "Sample Set Only" },
          { name: "Haunted Circus", size: "1ml sample", price: 0, description: "Avant-garde gourmand — popcorn, caramel, autumn leaves.", tag: "Sample Set Only" },
          { name: "Powdered Peruke", size: "1ml sample", price: 0, description: "Sweet vanilla, brown sugar, powder, warm hay.", tag: "Sample Set Only" },
        ],
      },
    ],
  },
  {
    id: "aromas-de-salazar",
    name: "Aromas De Salazar",
    subtitle: "Aromas De Salazar Vintage Collection",
    description:
      "Small-batch fragrances by self-taught perfumer Michael Salazar. High natural ingredient content. Authorized 2mL samples from the Vintage Collection.",
    accent: "text-[#a89880]",
    accentBg: "bg-[#a89880]",
    lines: [
      {
        name: "Vintage Collection",
        products: [
          { name: "1912", size: "2ml sample", price: 8, description: "Vintage amber florals — Italian lemon, jasmine, orange blossom, iris, benzoin, labdanum, sandalwood." },
          { name: "1882", size: "2ml sample", price: 8, description: "Aromatic fougere — bergamot, clary sage, lavender, heliotrope, tonka bean, oakmoss." },
          { name: "1872", size: "2ml sample", price: 8, description: "Leather homage — neroli, iris, leather, birch tar, castoreum, vetiver, tobacco." },
          { name: "1990", size: "2ml sample", price: 8, description: "'90s elegance — orange blossom, coconut, jasmine sambac, gardenia, vanilla, civet." },
          { name: "1953", size: "2ml sample", price: 8, description: "Spicy oriental — saffron, plum, black pepper, cinnamon, patchouli, vanilla, myrrh." },
        ],
      },
    ],
  },
];

export const accentHex: Record<string, string> = {
  originals: "#c8922a",
  "perito-moreno": "#2a5060",
  "dark-tales": "#b04a30",
  "aromas-de-salazar": "#a89880",
};
