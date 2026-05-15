/**
 * Seeds authors, categories, cities, site settings, and three long-form articles.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (optional),
 * and SANITY_API_WRITE_TOKEN (Editor token from sanity.io/manage → API → Tokens).
 *
 * Run: npm run seed
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const key = () => crypto.randomUUID();

function p(text: string) {
  return {
    _type: "block" as const,
    _key: key(),
    style: "normal" as const,
    markDefs: [] as const,
    children: [{ _type: "span" as const, _key: key(), marks: [] as const, text }],
  };
}

function h2(text: string) {
  return {
    _type: "block" as const,
    _key: key(),
    style: "h2" as const,
    markDefs: [] as const,
    children: [{ _type: "span" as const, _key: key(), marks: [] as const, text }],
  };
}

function h3(text: string) {
  return {
    _type: "block" as const,
    _key: key(),
    style: "h3" as const,
    markDefs: [] as const,
    children: [{ _type: "span" as const, _key: key(), marks: [] as const, text }],
  };
}

function quote(text: string) {
  return {
    _type: "block" as const,
    _key: key(),
    style: "blockquote" as const,
    markDefs: [] as const,
    children: [{ _type: "span" as const, _key: key(), marks: [] as const, text }],
  };
}

function extLink(text: string, href: string) {
  const mk = key();
  return {
    _type: "block" as const,
    _key: key(),
    style: "normal" as const,
    markDefs: [{ _key: mk, _type: "link" as const, href, openInNewTab: true }],
    children: [{ _type: "span" as const, _key: key(), marks: [mk], text }],
  };
}

function intLink(before: string, linkText: string, path: string, after: string) {
  const mk = key();
  return {
    _type: "block" as const,
    _key: key(),
    style: "normal" as const,
    markDefs: [{ _key: mk, _type: "link" as const, href: path, openInNewTab: false }],
    children: [
      { _type: "span" as const, _key: key(), marks: [] as const, text: before },
      { _type: "span" as const, _key: key(), marks: [mk], text: linkText },
      { _type: "span" as const, _key: key(), marks: [] as const, text: after },
    ],
  };
}

function callout(tone: "note" | "tip" | "warning", title: string, body: string) {
  return {
    _type: "callout" as const,
    _key: key(),
    tone,
    title,
    body,
  };
}

function filler(topic: string, n: number) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(
      p(
        `Deep-dive segment ${i + 1} on ${topic}: Poland’s cities reward planners. Compare short-term Airbnb costs with 6–12 month leases, confirm heating bills in winter, and read municipal waste-sorting rules—small frictions add up when you are new. Always cross-check visa guidance with ${i % 2 === 0 ? "your consulate" : "official government PDFs"} rather than forum posts alone.`,
      ),
    );
  }
  return out;
}

async function uploadImage(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename });
}

async function main() {
  const heroKrakow = await uploadImage(
    "https://images.unsplash.com/photo-1549144511-f096e2c288c3?auto=format&fit=crop&w=1600&q=80",
    "krakow-hero.jpg",
  );
  const heroBudget = await uploadImage(
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    "budget-hero.jpg",
  );
  const heroVisa = await uploadImage(
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    "visa-hero.jpg",
  );

  const categories = [
    {
      _id: "cat-city-guides",
      _type: "category" as const,
      title: "City guides",
      slug: { current: "city-guides" },
      description: "Neighborhoods, commutes, and quality of life in Polish cities.",
    },
    {
      _id: "cat-money",
      _type: "category" as const,
      title: "Money & budgets",
      slug: { current: "money-and-budgets" },
      description: "Rent, food, transport, and realistic monthly burn rates.",
    },
    {
      _id: "cat-visas",
      _type: "category" as const,
      title: "Visas & residence",
      slug: { current: "visas-and-residence" },
      description: "National visas, residence cards, and compliance basics.",
    },
    {
      _id: "cat-work",
      _type: "category" as const,
      title: "Remote work",
      slug: { current: "remote-work" },
      description: "Coworking, internet, taxes at a high level, and productivity.",
    },
    {
      _id: "cat-health",
      _type: "category" as const,
      title: "Health & daily life",
      slug: { current: "health-and-daily-life" },
      description: "Healthcare access, insurance, and everyday logistics.",
    },
  ];

  const cities = [
    { _id: "city-krakow", _type: "city" as const, name: "Kraków", slug: { current: "krakow" }, country: "Poland" },
    { _id: "city-warsaw", _type: "city" as const, name: "Warsaw", slug: { current: "warsaw" }, country: "Poland" },
    { _id: "city-wroclaw", _type: "city" as const, name: "Wrocław", slug: { current: "wroclaw" }, country: "Poland" },
  ];

  const authors = [
    {
      _id: "author-anna-nowak",
      _type: "author" as const,
      name: "Anna Nowak",
      slug: { current: "anna-nowak" },
      role: "Kraków-based relocation editor",
      bio: "Anna writes on housing markets and neighborhood fit for remote workers. She interviews landlords, reviews public transport corridors, and stress-tests budgets against real invoices.",
      photo: {
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: heroKrakow._id },
        alt: "Portrait placeholder using Kraków skyline texture",
      },
      credentials: ["MA Urban Studies (Jagiellonian University)", "8+ years editing city guides"],
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com",
    },
    {
      _id: "author-jan-krol",
      _type: "author" as const,
      name: "Jan Król",
      slug: { current: "jan-krol" },
      role: "Guest contributor — immigration research",
      bio: "Jan summarizes official guidance for long-stay visas. He is not a lawyer; articles link primary sources so you can verify timelines and document lists with consulates.",
      photo: {
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: heroVisa._id },
        alt: "Portrait placeholder using professional workspace photo",
      },
      credentials: ["Former NGO legal coordinator (EU mobility programmes)"],
      linkedin: "https://www.linkedin.com",
    },
  ];

  for (const doc of [...categories, ...cities, ...authors]) {
    await client.createOrReplace(doc as never);
  }

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Poland Nomad",
    description: "Practical guides for remote workers living in Poland.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://polandnomad.com",
    ogImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroBudget._id },
      alt: "Open graph placeholder for Poland Nomad",
    },
    twitterHandle: "polandnomad",
  };
  await client.createOrReplace(siteSettings);

  const krakowBody = [
    h2("Why Kraków is a magnet for remote workers"),
    p(
      "Kraków combines a walkable historic core, fast fiber in most districts, and direct rail links to Warsaw, Berlin, and Prague. For nomads who want EU timezone overlap with US East Coast mornings, the city is unusually forgiving on jet lag while still feeling unmistakably Central European.",
    ),
    quote(
      "The best Kraków months are the ones where you plan heating, not just cafés. Winter is beautiful; budget for it.",
    ),
    ...filler("Kraków lifestyle planning", 8),
    h2("Neighborhoods that balance rent, noise, and tram access"),
    p(
      "Kazimierz buzzes with restaurants and tourists; it is brilliant for short stays but can be loud on summer weekends. Podgórze and Stare Podgórze offer quieter streets with tram connections toward the center. If you need airport runs or frequent trains, consider areas near Dworzec Główny with earplugs for occasional late-night noise.",
    ),
    h3("Coworking and cafés with reliable power"),
    p(
      "Test upload speeds at peak hours before committing to a monthly cowork pass. Many spaces publish desk photos but not acoustics—bring open-back headphones for calls if you hot-desk.",
    ),
    extLink("Official city transport planner (jakdojade)", "https://jakdojade.pl"),
    intLink(
      "Once your base is set, compare monthly burn rates in our ",
      "Poland cost-of-living breakdown",
      "/blog/cost-of-living-poland-nomad-budget",
      " so you can align rent with savings goals.",
    ),
    callout(
      "tip",
      "Lease paperwork",
      "Ask whether administrative rent (czynsz) includes cold water, hot water, heating, and rubbish. Get winter estimates in writing when possible.",
    ),
    ...filler("Kraków housing diligence", 8),
    h2("Seasonal rhythm and when to apartment hunt"),
    p(
      "September student intake tightens inventory; spring after semester exams can free nicer units. For short stays, regulated platforms help, but long-term deals still flow through Facebook groups and local agents—stay alert for scams and never wire deposits without a signed contract review.",
    ),
    ...filler("Kraków timing and inventory", 6),
  ];

  const budgetBody = [
    h2("What a realistic monthly budget looks like"),
    p(
      "Poland is often marketed as ultra-cheap; parts of it are—but Warsaw premium neighborhoods and short-term furnished flats can approach Western EU rents. This guide anchors numbers to mid-2020s inflation and everyday spending for a single remote worker who cooks most meals and uses trams or bikes.",
    ),
    extLink("Eurostat comparative price levels", "https://ec.europa.eu/eurostat"),
    ...filler("monthly budget calibration", 8),
    h2("Rent, utilities, and the winter heating line item"),
    p(
      "Older buildings can have radiant heating included in administrative fees; newer builds may meter separately. Always ask for last winter’s bills or a landlord estimate. Internet is typically inexpensive and fast—fiber competition is strong in major cities.",
    ),
    intLink(
      "If you are still choosing a base, pair this chapter with our ",
      "Kraków digital nomad guide",
      "/blog/krakow-digital-nomad-guide",
      " for neighborhood trade-offs.",
    ),
    callout(
      "warning",
      "FX and invoicing",
      "If you invoice clients in USD or EUR but spend in PLN, track spreads and bank fees. Nominal rent in złoty can swing in purchasing-power terms when FX moves.",
    ),
    ...filler("utilities and FX", 8),
    h2("Food, transport, and social life without lifestyle creep"),
    p(
      "Groceries at Auchan, Lidl, and Biedronka keep weekday costs predictable. Ride-hailing is affordable but adds up; a monthly city pass often beats per-ride pricing if you leave the neighborhood daily.",
    ),
    intLink(
      "Visa-related costs (legalization, insurance) belong in a separate plan—see ",
      "Poland national visa (Type D) checklist",
      "/blog/poland-national-visa-d-nomad-checklist",
      " for document-driven expenses.",
    ),
    ...filler("daily spend patterns", 6),
  ];

  const visaBody = [
    h2("National visa Type D: what it is (and what it is not)"),
    p(
      "This article explains a common path for stays longer than Schengen short visits: the national long-stay visa (often labeled Type D) that can lead to a temporary residence permit. Policies change; treat the linked government portals as the source of truth.",
    ),
    extLink("Polish Office for Foreigners (UdSC)", "https://www.gov.pl/web/udsc"),
    extLink("EU immigration portal overview", "https://immigration-portal.ec.europa.eu"),
    ...filler("visa definitions and caveats", 8),
    h2("Documents people forget until the last week"),
    p(
      "Apostilles, translations, insurance letters, and appointment slots can dominate timelines. Start a single checklist document with submission dates, consulate holidays, and courier tracking numbers.",
    ),
    callout(
      "note",
      "Not legal advice",
      "Editors summarize public guidance. For complex cases (family reunification, self-employment bases), consult a licensed attorney in Poland or your consular district.",
    ),
    intLink(
      "After approval, budget your first 90 days using our ",
      "cost-of-living breakdown",
      "/blog/cost-of-living-poland-nomad-budget",
      " so cash flow matches deposit and insurance rhythms.",
    ),
    ...filler("document preparation", 8),
    h2("After arrival: residence card cadence"),
    p(
      "Voivodeship offices handle residence permits. Expect queues, multilingual forms, and biometric appointments. Keep copies of every stamped document; you will need them for bank KYC and mobile contracts.",
    ),
    intLink(
      "City logistics (housing search, transport) pair well with our ",
      "Kraków guide",
      "/blog/krakow-digital-nomad-guide",
      " while you settle administrative tasks.",
    ),
    ...filler("post-arrival administration", 6),
  ];

  const articles = [
    {
      _id: "article-krakow-guide",
      _type: "article" as const,
      title: "Kraków Digital Nomad Guide: Neighborhoods, Wi‑Fi, and Winter Survival",
      slug: { current: "krakow-digital-nomad-guide" },
      excerpt:
        "Pick a Kraków district that matches your noise tolerance, commute style, and winter heating budget—then build a remote-work routine that survives peak tourist season.",
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: heroKrakow._id },
        alt: "Evening view of historic rooftops in Kraków, Poland",
      },
      author: { _type: "reference", _ref: "author-anna-nowak" },
      categories: [{ _type: "reference", _ref: "cat-city-guides" }, { _type: "reference", _ref: "cat-work" }],
      city: { _type: "reference", _ref: "city-krakow" },
      tags: ["Kraków", "housing", "coworking"],
      publishedAt: new Date("2025-11-02T09:00:00.000Z").toISOString(),
      updatedAt: new Date("2026-01-10T12:00:00.000Z").toISOString(),
      faqs: [
        {
          _type: "faqItem",
          _key: key(),
          question: "Is Kraków walkable year-round?",
          answer:
            "The compact center is walkable, but icy sidewalks happen. Pack traction aids and plan tram backups for early meetings.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "Do I need Polish to rent long-term?",
          answer:
            "Many agents speak English in Kraków, but contracts are often Polish. Budget for a translator review before signing.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "How noisy is Kazimierz on weekends?",
          answer:
            "Expect elevated noise until late night in summer. If you need quiet calls, prioritize inner courtyards or districts south of the river.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "What internet speeds are realistic?",
          answer:
            "Fiber plans commonly advertise 300–1000 Mbps in newer buildings. Always run a speed test on site before signing a lease.",
        },
      ],
      body: krakowBody,
      seoTitle: "Kraków Digital Nomad Guide — neighborhoods & winter tips",
      seoDescription:
        "Choose a Kraków district, plan heating costs, and build a remote-work routine with trams, coworking, and realistic budgets.",
      keywords: ["Kraków", "digital nomad Poland", "remote work", "Kraków neighborhoods"],
      canonicalPath: "/blog/krakow-digital-nomad-guide",
    },
    {
      _id: "article-budget",
      _type: "article" as const,
      title: "Cost of Living in Poland for Nomads: A Practical Monthly Breakdown",
      slug: { current: "cost-of-living-poland-nomad-budget" },
      excerpt:
        "Translate złoty prices into a sustainable monthly plan—rent bands, utilities in winter, groceries, transport, and the sneaky FX effects on foreign income.",
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: heroBudget._id },
        alt: "Calculator and receipts flat lay representing budgeting",
      },
      author: { _type: "reference", _ref: "author-anna-nowak" },
      categories: [{ _type: "reference", _ref: "cat-money" }, { _type: "reference", _ref: "cat-health" }],
      city: { _type: "reference", _ref: "city-warsaw" },
      tags: ["budget", "złoty", "FX"],
      publishedAt: new Date("2025-11-18T09:00:00.000Z").toISOString(),
      faqs: [
        {
          _type: "faqItem",
          _key: key(),
          question: "Is Poland still cheap for Western earners?",
          answer:
            "It can be, especially outside premium districts, but short-term furnished rents and FX moves can erode the discount. Model your own scenario.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "Should I pay rent in PLN or EUR?",
          answer:
            "Landlords usually prefer PLN. Paying EUR may add conversion clauses—read contracts carefully.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "What about private healthcare?",
          answer:
            "Many nomads buy private plans for faster access. Compare network clinics in your city before you need urgent care.",
        },
      ],
      body: budgetBody,
      seoTitle: "Poland cost of living for digital nomads",
      seoDescription:
        "Monthly budget ranges for rent, utilities, groceries, and transport—plus FX cautions for remote workers paid in USD or EUR.",
      keywords: ["cost of living Poland", "digital nomad budget", "PLN"],
    },
    {
      _id: "article-visa",
      _type: "article" as const,
      title: "Poland National Visa (Type D) for Remote Workers: Checklist Without the Hype",
      slug: { current: "poland-national-visa-d-nomad-checklist" },
      excerpt:
        "A sober, document-first walkthrough of the Type D national visa path: what to verify with consulates, which papers get scrutinized, and how to stay organized.",
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: heroVisa._id },
        alt: "Desk with passport, pen, and application paperwork",
      },
      author: { _type: "reference", _ref: "author-jan-krol" },
      categories: [{ _type: "reference", _ref: "cat-visas" }],
      city: { _type: "reference", _ref: "city-wroclaw" },
      tags: ["visa", "Type D", "UdSC"],
      publishedAt: new Date("2025-12-05T09:00:00.000Z").toISOString(),
      faqs: [
        {
          _type: "faqItem",
          _key: key(),
          question: "Is Type D the same as a Schengen visa?",
          answer:
            "They serve different purposes. A national Type D visa is for longer stays tied to Polish law; verify allowed movement in other Schengen states during processing.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "Can I work for a Polish company on this visa?",
          answer:
            "Work rights depend on the basis of your stay. This guide targets remote workers with foreign employers—confirm your category with counsel.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "How far ahead should I book a consulate appointment?",
          answer:
            "Slots vary wildly by embassy district. Monitor appointment releases and keep documents ready so you can book immediately.",
        },
        {
          _type: "faqItem",
          _key: key(),
          question: "Where do I track policy updates?",
          answer:
            "Bookmark the Office for Foreigners and your consulate’s news pages rather than relying on social threads alone.",
        },
      ],
      body: visaBody,
      seoTitle: "Poland Type D visa checklist for remote workers",
      seoDescription:
        "Document-first checklist for Poland’s national visa path with official links and realistic timelines for remote workers.",
      keywords: ["Poland visa", "Type D", "digital nomad visa Poland"],
    },
  ];

  for (const doc of articles) {
    await client.createOrReplace(doc as never);
  }

  await client
    .patch("article-krakow-guide")
    .set({
      relatedArticles: [
        { _type: "reference", _ref: "article-budget" },
        { _type: "reference", _ref: "article-visa" },
      ],
    })
    .commit();
  await client
    .patch("article-budget")
    .set({
      relatedArticles: [
        { _type: "reference", _ref: "article-krakow-guide" },
        { _type: "reference", _ref: "article-visa" },
      ],
    })
    .commit();
  await client
    .patch("article-visa")
    .set({
      relatedArticles: [
        { _type: "reference", _ref: "article-krakow-guide" },
        { _type: "reference", _ref: "article-budget" },
      ],
    })
    .commit();

  console.log("Seed complete: categories, cities, authors, siteSettings, 3 articles.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
