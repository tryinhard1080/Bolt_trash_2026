/**
 * The Trash Hub — content model.
 *
 * Everything the site renders comes from this file so that the editorial
 * record (guides, claims, sources, suppliers) stays reviewable in one place.
 *
 * National figures are real and attributed (EPA, Advancing Sustainable
 * Materials Management: 2018 Data Tables). Supplier records are illustrative
 * public-fact placeholders: they carry no ranking, endorsement or contact data.
 */

export type Lifecycle = 'Access' | 'Materials' | 'Site Walk' | 'Transfer' | 'Markets';

export const LIFECYCLES: Lifecycle[] = ['Access', 'Materials', 'Site Walk', 'Transfer', 'Markets'];

export type DiagramKey = 'chute' | 'flow' | 'walk' | 'scale' | 'market' | 'recognition';

export interface FieldCheck {
  label: string;
  cue: string;
}

export interface Guide {
  code: string;
  title: string;
  kicker: string;
  summary: string;
  lifecycle: Lifecycle;
  depth: 'Orientation' | 'Field' | 'Detailed';
  minutes: number;
  updated: string;
  plates: string[];
  diagram: DiagramKey;
  lookFor: string[];
  checks: { zone: string; items: FieldCheck[] }[];
  pitfalls: string[];
  sources: string[];
}

export const GUIDES: Guide[] = [
  {
    code: 'GD-101',
    title: 'Multifamily Collection Access',
    kicker: 'Property type · 5–50 units',
    summary:
      'How to read bin placement, aisle clearance and hauler access at multifamily properties — before you call anyone.',
    lifecycle: 'Access',
    depth: 'Field',
    minutes: 6,
    updated: '2026-08-26',
    plates: ['A-01', 'A-02'],
    diagram: 'chute',
    lookFor: [
      'Whether the property is curbside, rear-alley or chute-fed',
      'Container count against unit count — the ratio that drives overflow',
      'Turning radius and overhead clearance at the enclosure door',
    ],
    checks: [
      {
        zone: 'Approach',
        items: [
          { label: 'Note the container type', cue: 'Cart, dumpster, or chute plus compactor' },
          { label: 'Count lids, not buildings', cue: 'One service point per 3–5 units is the common standard' },
        ],
      },
      {
        zone: 'Enclosure',
        items: [
          { label: 'Check the pad for slope', cue: 'Standing water freezes; it also means an uneven pad' },
          { label: 'Look for blocked casters', cue: 'A blocked cart is a missed cart' },
        ],
      },
      {
        zone: 'Set-out',
        items: [
          { label: 'Measure the aisle, not the gate', cue: 'Most arms need 12 ft of clear width' },
          { label: 'Confirm the lid is closed at set-out', cue: 'Open lids void collection in many districts' },
        ],
      },
    ],
    pitfalls: [
      'Reading a full enclosure as an over-served one — service frequency is usually fixed by franchise.',
      'Assuming chute-fed buildings are “self-service”; the compactor room is part of the system.',
    ],
    sources: ['SRC-EPA-SMM-2018', 'SRC-CNT-MF-STD'],
  },
  {
    code: 'GD-102',
    title: 'Single-Family Set-Out Rules',
    kicker: 'Property type · route-based',
    summary:
      'The cart-placement grammar of a suburban route: cart orientation, setback, gaps, and the exceptions that crews actually apply.',
    lifecycle: 'Access',
    depth: 'Orientation',
    minutes: 4,
    updated: '2026-07-30',
    plates: ['A-03'],
    diagram: 'flow',
    lookFor: [
      'Wheels toward the property, lid handle toward the street',
      'A 3 ft gap between carts and anything overhead',
      'Set-out timing versus the published route window',
    ],
    checks: [
      {
        zone: 'Curb line',
        items: [
          { label: 'Find the arrow on the cart', cue: 'Most fleets mark the lid-facing side' },
          { label: 'Look for the gap pattern', cue: 'Consistent gaps mean a trained route' },
        ],
      },
      {
        zone: 'Overhead',
        items: [{ label: 'Check branch and wire height', cue: 'Low branches cause the “no lift” tag' }],
      },
    ],
    pitfalls: ['Treating one crew’s judgement as the published standard.'],
    sources: ['SRC-CNT-ROUTE-STD'],
  },
  {
    code: 'GD-201',
    title: 'Material Category Recognition',
    kicker: 'Stream literacy',
    summary:
      'Visual keys for the six standard streams and where each one most often fails: films in paper, glass in containers, food in everything.',
    lifecycle: 'Materials',
    depth: 'Detailed',
    minutes: 9,
    updated: '2026-09-02',
    plates: ['B-01', 'B-02', 'B-03'],
    diagram: 'recognition',
    lookFor: [
      'The shape test: rigid versus film',
      'Colour-sorting at a single-stream bay',
      'What “recyclable” means in a market-based system',
    ],
    checks: [
      {
        zone: 'At the bin',
        items: [
          { label: 'Name the material out loud', cue: 'Rigid plastic #2 and #5 usually travel; #6 often does not' },
          { label: 'Check for food contact', cue: 'Grease saturates fiber; fiber then becomes residual' },
        ],
      },
      {
        zone: 'At the truck',
        items: [{ label: 'Watch what the loader rejects', cue: 'Rejection is the most honest local rule you will find' }],
      },
    ],
    pitfalls: [
      'Chasing the resin number instead of the shape and size.',
      'Assuming a mixed material can be separated downstream at every facility.',
    ],
    sources: ['SRC-EPA-RECYCLE', 'SRC-EPA-SMM-2018'],
  },
  {
    code: 'GD-202',
    title: 'Contamination & Tared Loads',
    kicker: 'Quality control',
    summary:
      'How contamination is observed, photographed and charged — and how a tared load turns an estimate into a number you can question.',
    lifecycle: 'Materials',
    depth: 'Field',
    minutes: 7,
    updated: '2026-08-18',
    plates: ['B-04'],
    diagram: 'scale',
    lookFor: ['Where the tare weight is taken', 'Whether the rejection photo is retained', 'The difference between “tainted” and “unsaleable”'],
    checks: [
      {
        zone: 'Scale house',
        items: [
          { label: 'Confirm gross and tare are separate tickets', cue: 'One ticket with two numbers is normal; one number is not' },
          { label: 'Note the time gap', cue: 'A short gross-to-tare gap means less staged moisture loss' },
        ],
      },
    ],
    pitfalls: ['Reading a contamination percentage as a behaviour rather than a sample.'],
    sources: ['SRC-EPA-SMM-2018'],
  },
  {
    code: 'GD-301',
    title: 'Site Walk: Enclosure Condition',
    kicker: 'Ten-minute protocol',
    summary:
      'A repeatable walking sequence for enclosure condition, signage and overflow, written so two observers get the same record.',
    lifecycle: 'Site Walk',
    depth: 'Field',
    minutes: 5,
    updated: '2026-09-06',
    plates: ['C-01', 'C-02'],
    diagram: 'walk',
    lookFor: ['Lids, pads, gates, and the three-foot perimeter'],
    checks: [
      {
        zone: 'Perimeter',
        items: [
          { label: 'Walk the outside first', cue: 'Spillage outside the enclosure tells you about the inside' },
          { label: 'Photograph from the same corner', cue: 'Comparable records require a fixed vantage' },
        ],
      },
      {
        zone: 'Interior',
        items: [
          { label: 'Check lid closure rate', cue: 'Count lids, do not estimate' },
          { label: 'Look up for clearance', cue: 'Bent arms and torn lids share one cause' },
        ],
      },
    ],
    pitfalls: ['Recording a walk-day condition as a permanent property trait.'],
    sources: ['SRC-CNT-MF-STD'],
  },
  {
    code: 'GD-302',
    title: 'Signage & Legibility',
    kicker: 'Wayfinding at the bin pad',
    summary:
      'Whether the sign at the enclosure matches the stream rules in force — and how to test legibility at dusk, at distance, in the rain.',
    lifecycle: 'Site Walk',
    depth: 'Orientation',
    minutes: 4,
    updated: '2026-06-24',
    plates: ['C-03'],
    diagram: 'recognition',
    lookFor: ['Pictograms versus text', 'Mounting height and glare', 'Sign-to-stream mismatch'],
    checks: [
      {
        zone: 'Read test',
        items: [
          { label: 'Read it from 4 m', cue: 'That is the resident distance' },
          { label: 'Read it at night', cue: 'Most set-outs happen in the dark' },
        ],
      },
    ],
    pitfalls: ['Blaming residents for a sign that is technically accurate but unreadable.'],
    sources: ['SRC-EPA-RECYCLE'],
  },
  {
    code: 'GD-401',
    title: 'Transfer Station Identification',
    kicker: 'Intermediate facilities',
    summary:
      'Recognising transfer station types, floor layouts and public drop-off patterns, and telling them apart from a processing facility.',
    lifecycle: 'Transfer',
    depth: 'Detailed',
    minutes: 8,
    updated: '2026-08-05',
    plates: ['D-01', 'D-02'],
    diagram: 'scale',
    lookFor: ['Tip floor versus screened floor', 'Public hours as a system signal', 'Compaction versus transfer'],
    checks: [
      {
        zone: 'Gate',
        items: [
          { label: 'Read the posted hours', cue: 'Public windows are where local behaviour concentrates' },
          { label: 'Count truck lanes', cue: 'Two lanes is a small station; four-plus is regional' },
        ],
      },
    ],
    pitfalls: ['Assuming a station with a screen is a materials recovery facility.'],
    sources: ['SRC-EPA-SMM-2018'],
  },
  {
    code: 'GD-402',
    title: 'Weights, Scales & Tickets',
    kicker: 'Reading the paper trail',
    summary:
      'What a weigh ticket proves, what it does not, and how tonnage in a public report relates to the truck that passed the scale.',
    lifecycle: 'Transfer',
    depth: 'Field',
    minutes: 6,
    updated: '2026-07-11',
    plates: ['D-03'],
    diagram: 'scale',
    lookFor: ['Ticket fields worth transcribing', 'Sequence gaps'],
    checks: [
      {
        zone: 'Ticket',
        items: [
          { label: 'Transcribe the load number', cue: 'Gaps in a sequence are the only visible error' },
          { label: 'Log units of measure', cue: 'Short tons, metric tonnes and yards are not interchangeable' },
        ],
      },
    ],
    pitfalls: ['Treating an annual tonnage figure as a property-level fact.'],
    sources: ['SRC-EPA-SMM-2018'],
  },
  {
    code: 'GD-501',
    title: 'Where the Bales Go',
    kicker: 'End markets',
    summary:
      'A quiet guide to markets: what a processed bale is worth, who buys it, and why a curbside bin is not the end of a material’s story.',
    lifecycle: 'Markets',
    depth: 'Detailed',
    minutes: 10,
    updated: '2026-09-10',
    plates: ['E-01', 'E-02'],
    diagram: 'market',
    lookFor: ['Commodity grade versus contamination', 'Contract length versus price', 'The difference between “accepted” and “sold”'],
    checks: [
      {
        zone: 'Report',
        items: [
          { label: 'Find the grade definitions', cue: 'A ton of OCC is not a ton of mixed paper' },
          { label: 'Check the vintage', cue: 'Market tables are seasonal documents' },
        ],
      },
    ],
    pitfalls: ['Confusing a national average with a local contract.'],
    sources: ['SRC-EPA-SMM-2018', 'SRC-EPA-RECYCLE'],
  },
];

/* ————————————————————————————————————————————————————————— *
 * Streams — recognitions keys
 * ————————————————————————————————————————————————————————— */

export interface Stream {
  id: string;
  name: string;
  tone: string; // HSL channels for the accent swatch
  share: number; // % of U.S. MSW generation, EPA 2018
  shareLabel: string;
  accepted: string[];
  rejects: string[];
  test: string;
  note: string;
}

export const STREAMS: Stream[] = [
  {
    id: 'fiber',
    name: 'Paper & fiber',
    tone: '206 52% 33%',
    share: 23.05,
    shareLabel: '23.1%',
    accepted: ['Flattened corrugated cardboard', 'Office paper, newspapers', 'Clean paper bags'],
    rejects: ['Grease-saturated containers', 'Wax- or plastic-lined cups', 'Shredded paper in bags'],
    test: 'Tear test: if it tears like paper and is dry, it is fiber.',
    note: 'Fiber is the volume backbone of most curbside programs — and the stream most easily ruined by moisture.',
  },
  {
    id: 'organics',
    name: 'Food & yard',
    tone: '148 38% 30%',
    share: 33.7,
    shareLabel: '33.7%',
    accepted: ['Food scraps', 'Yard trimmings', 'Soiled paper in some districts'],
    rejects: ['Plastic “compostable” bags without a logo', 'Pet waste', 'Coated plates'],
    test: 'If it grew or spoiled, it belongs here — not in a bag.',
    note: 'Food and yard trimmings together are the largest share of generated MSW and the least served by curbside routes.',
  },
  {
    id: 'containers',
    name: 'Container plastics',
    tone: '38 74% 46%',
    share: 12.2,
    shareLabel: '12.2%',
    accepted: ['Rigid bottles and jugs #1, #2, #5', 'Empty, rinsed, caps on'],
    rejects: ['Bags and film', 'Polystyrene foam', 'Anything with food residue'],
    test: 'Rigid versus film: if it flops, it stays out.',
    note: 'Plastics are the most frequently mis-sorted stream, because packaging keeps inventing new shapes faster than rules update.',
  },
  {
    id: 'metals',
    name: 'Metals',
    tone: '160 12% 42%',
    share: 8.76,
    shareLabel: '8.8%',
    accepted: ['Steel and aluminium cans', 'Clean foil', 'Empty steel tins'],
    rejects: ['Scrap with hinges', 'Aerosols with contents', 'Wire and cables'],
    test: 'Magnet test tells steel from aluminium; both are wanted.',
    note: 'Highest recovery value per pound of anything in the cart, which is why cans get sorted twice.',
  },
  {
    id: 'glass',
    name: 'Glass',
    tone: '172 44% 36%',
    share: 4.19,
    shareLabel: '4.2%',
    accepted: ['Bottles and jars, rinsed', 'Sorted by colour where required'],
    rejects: ['Drinking glasses', 'Mirrors and window glass', 'Pyrex and ceramics'],
    test: 'Container glass melts at a different temperature than tableware. Same look, different stream.',
    note: 'Broken glass contaminates fiber on the way to the bay, which is why some districts now route glass to a separate depot.',
  },
  {
    id: 'special',
    name: 'E-waste & textiles',
    tone: '280 32% 38%',
    share: 5.83,
    shareLabel: '5.8%',
    accepted: ['Cords and small electronics at depots', 'Dry clothing in bags'],
    rejects: ['Lithium batteries in the cart', 'Wet textiles', 'CRT televisions at curbside'],
    test: 'Anything with a plug or a fire risk never rides in a truck’s bed.',
    note: 'Battery-caused fires are the reason collection rules for small electronics tighten every year.',
  },
];

/* EPA 2018 material composition of generated MSW (used by the composition chart). */
export const COMPOSITION = [
  { material: 'Paper & paperboard', value: 23.05, stream: 'fiber' },
  { material: 'Food', value: 21.59, stream: 'organics' },
  { material: 'Yard trimmings', value: 12.11, stream: 'organics' },
  { material: 'Plastics', value: 12.2, stream: 'containers' },
  { material: 'Metals', value: 8.76, stream: 'metals' },
  { material: 'Wood', value: 6.19, stream: 'fiber' },
  { material: 'Textiles', value: 5.83, stream: 'special' },
  { material: 'Glass', value: 4.19, stream: 'glass' },
  { material: 'Rubber & leather', value: 3.13, stream: 'residual' },
  { material: 'Other', value: 2.95, stream: 'residual' },
] as const;

/* ————————————————————————————————————————————————————————— *
 * Directory, evidence, method
 * ————————————————————————————————————————————————————————— */

export interface Supplier {
  id: string;
  name: string;
  kind: 'Collection' | 'Transfer' | 'Processing' | 'Markets';
  region: 'Metro' | 'County' | 'Regional' | 'Port district';
  footprint: string;
  accepted: string[];
  operations: string;
  admitted: string;
  snapshot: string;
  note: string;
}

export const SUPPLIERS: Supplier[] = [
  {
    id: 'SP-014',
    name: 'Northridge Haulers Co-op',
    kind: 'Collection',
    region: 'Regional',
    footprint: '6 municipalities · 142k households',
    accepted: ['Fiber', 'Containers', 'Metals', 'Glass'],
    operations: 'Curbside route collection, 21 CNG trucks, one night depot',
    admitted: '2026-08-14',
    snapshot: 'SRC-CNT-ROUTE-STD',
    note: 'Route windows published by ordinance; no public price list on file.',
  },
  {
    id: 'SP-022',
    name: 'Valley Transfer Authority',
    kind: 'Transfer',
    region: 'County',
    footprint: 'County-owned, single site',
    accepted: ['Residential drop-off', 'Small quantity commercial'],
    operations: 'Tip floor, 2 public lanes, screened floor for aggregates',
    admitted: '2026-08-14',
    snapshot: 'SRC-CNT-MF-STD',
    note: 'Public hours published; weight tickets retained 18 months per policy.',
  },
  {
    id: 'SP-031',
    name: 'Riverside Materials Recovery',
    kind: 'Processing',
    region: 'Metro',
    footprint: 'Single-stream MRF, 1 line',
    accepted: ['Fiber', 'Containers', 'Metals', 'Glass'],
    operations: 'Disc screen, optical sorters, manual QC station at baler',
    admitted: '2026-08-27',
    snapshot: 'SRC-EPA-RECYCLE',
    note: 'Publishes an annual contamination figure; does not publish per-load records.',
  },
  {
    id: 'SP-044',
    name: 'Cedar Line Organics',
    kind: 'Processing',
    region: 'Regional',
    footprint: '3 windrow sites',
    accepted: ['Food & yard', 'Soiled fiber (limited)'],
    operations: 'Aerated static piles plus windrows; 12-week cure',
    admitted: '2026-07-19',
    snapshot: 'SRC-EPA-FOOD',
    note: 'Accepts bags only if they carry a certified compostable mark.',
  },
  {
    id: 'SP-051',
    name: 'Harbor Glass Mill',
    kind: 'Processing',
    region: 'Port district',
    footprint: 'Colour-sorted cullet only',
    accepted: ['Glass (flint, amber, green)'],
    operations: 'Crushes and screens to container-grade cullet',
    admitted: '2026-06-30',
    snapshot: 'SRC-EPA-SMM-2018',
    note: 'Mixed-colour loads are regraded, not rejected — a distinction worth reading on the ticket.',
  },
  {
    id: 'SP-063',
    name: 'Two Rivers Paper Broker',
    kind: 'Markets',
    region: 'Regional',
    footprint: 'No public intake',
    accepted: ['OCC', 'Mixed paper'],
    operations: 'Buys graded bales on contract; publishes a monthly grade sheet',
    admitted: '2026-09-04',
    snapshot: 'SRC-EPA-SMM-2018',
    note: 'Grade definitions, not prices, are the useful public record.',
  },
  {
    id: 'SP-077',
    name: 'Ironwood E-Waste Logistics',
    kind: 'Collection',
    region: 'County',
    footprint: '6 depot sites, 1 mobile event route',
    accepted: ['Small electronics', 'Cords', 'Batteries (separate container)'],
    operations: 'Depot collection with downstream certified processing partners',
    admitted: '2026-08-02',
    snapshot: 'SRC-EPA-RECYCLE',
    note: 'Batteries must arrive in their own bin. Every record we hold repeats this.',
  },
];

export interface SourceRecord {
  id: string;
  publisher: string;
  title: string;
  url?: string;
  approved: string;
  digest: string;
  status: 'Verified' | 'Under review';
  scope: string;
}

export const SOURCES: SourceRecord[] = [
  {
    id: 'SRC-EPA-SMM-2018',
    publisher: 'U.S. Environmental Protection Agency',
    title: 'Advancing Sustainable Materials Management — 2018 data tables',
    url: 'https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials',
    approved: '2026-09-01',
    digest: 'a9f2c1e07b4d',
    status: 'Verified',
    scope: 'National generation and composition figures. Not a property-level source.',
  },
  {
    id: 'SRC-EPA-RECYCLE',
    publisher: 'U.S. Environmental Protection Agency',
    title: 'Recycling — common questions and materials guidance',
    url: 'https://www.epa.gov/recycle',
    approved: '2026-08-12',
    digest: '71b0d4e29ac8',
    status: 'Verified',
    scope: 'Material categories and acceptance patterns. Local rules still govern.',
  },
  {
    id: 'SRC-EPA-FOOD',
    publisher: 'U.S. Environmental Protection Agency',
    title: 'From sources to solutions: national estimate of wasted food',
    url: 'https://www.epa.gov/recycling-and-materials-management-strategies',
    approved: '2026-07-28',
    digest: '5c18ff3ad062',
    status: 'Verified',
    scope: 'Food generation and diversion pathways.',
  },
  {
    id: 'SRC-CNT-MF-STD',
    publisher: 'County solid waste ordinance (excerpt)',
    title: 'Multifamily enclosure, clearance and set-out standards',
    approved: '2026-08-14',
    digest: '2e77ab9410f6',
    status: 'Under review',
    scope: 'Local standard used in the multifamily access guide.',
  },
  {
    id: 'SRC-CNT-ROUTE-STD',
    publisher: 'Municipal hauler service specification',
    title: 'Route windows, cart placement and no-lift conditions',
    approved: '2026-08-14',
    digest: 'bd35c087e194',
    status: 'Under review',
    scope: 'Collection behaviour cited in the single-family guide.',
  },
];

export interface Claim {
  claim: string;
  figure: string;
  source: string;
  usedIn: string[];
}

export const CLAIMS: Claim[] = [
  {
    claim: 'Total municipal solid waste generated in the United States, 2018',
    figure: '292.4 million tons',
    source: 'SRC-EPA-SMM-2018',
    usedIn: ['GD-201', 'GD-401'],
  },
  {
    claim: 'Recycled and composted share of generation',
    figure: '32.1%',
    source: 'SRC-EPA-SMM-2018',
    usedIn: ['GD-201', 'GD-501'],
  },
  {
    claim: 'Generation per person per day',
    figure: '4.9 lb',
    source: 'SRC-EPA-SMM-2018',
    usedIn: ['GD-102'],
  },
  {
    claim: 'Food and yard trimmings share of generated MSW',
    figure: '~34%',
    source: 'SRC-EPA-FOOD',
    usedIn: ['GD-201'],
  },
];

export interface WalkItem {
  label: string;
  note: string;
}

export const SITE_WALK: { zone: string; caption: string; items: WalkItem[] }[] = [
  {
    zone: 'Approach',
    caption: 'Before you touch the gate',
    items: [
      { label: 'Photograph from the fixed vantage', note: 'Same corner, same distance, every walk — otherwise the two records are not comparable.' },
      { label: 'Read the spillage line', note: 'Material outside the enclosure describes the inside better than any inspection form.' },
      { label: 'Record gate hardware', note: 'Chained, broken or blocked gates explain most missed services.' },
    ],
  },
  {
    zone: 'Enclosure',
    caption: 'Condition, counted',
    items: [
      { label: 'Count lids, do not estimate', note: 'Record closed over total. A percentage you cannot reproduce is an opinion.' },
      { label: 'Check the pad', note: 'Slope and standing water freeze, jam casters and stop an arm.' },
      { label: 'Look up for clearance', note: 'Torn lids and bent arms share one cause: overhead obstruction.' },
    ],
  },
  {
    zone: 'Set-out',
    caption: 'Where the route standard is visible',
    items: [
      { label: 'Note cart orientation and gap', note: 'Wheels to the property, handle to the street, roughly 3 ft between carts.' },
      { label: 'Check overhead growth', note: 'Branches are the most common reason for a no-lift tag on a residential route.' },
      { label: 'Compare the sign to the rules', note: 'Signage that is accurate and unreadable still produces contamination.' },
    ],
  },
  {
    zone: 'Record',
    caption: 'Make it citable',
    items: [
      { label: 'Log date, time and weather', note: 'Rain and heat change what a walk can honestly conclude.' },
      { label: 'One observer, one pass', note: 'Two people on the same walk produce two records unless they agree the order first.' },
      { label: 'Write the open question', note: 'End with the single question the local agency can answer in writing.' },
    ],
  },
];

export const PRINCIPLES = [
  {
    label: 'No rankings',
    body: 'We do not grade haulers, facilities or properties. A score invites a lawsuit and ends a conversation.',
  },
  {
    label: 'No lead capture',
    body: 'There is no form here, no newsletter, no CRM. Nothing you read is used to sell you a truck.',
  },
  {
    label: 'No marketplace',
    body: 'Directory records are public facts. They are not availability, price, or a recommendation.',
  },
  {
    label: 'Sources first',
    body: 'Every figure carries a source ID and an approval date. Without both, it does not enter a guide.',
  },
];

export const METHOD = [
  {
    step: '01',
    title: 'Observe',
    body: 'A field note is written from one pass, one vantage, one observer. Weather, date and time are part of the record, not footnotes.',
  },
  {
    step: '02',
    title: 'Trace',
    body: 'Each sentence that makes a claim is matched to a public source. Where a local rule is unclear, the guide says so instead of guessing.',
  },
  {
    step: '03',
    title: 'Publish',
    body: 'Guides carry a plate list and an update date. When a source changes, the guide is annotated rather than quietly rewritten.',
  },
];

/* Question builder — the only “call to action” this site makes. */
export const QB_PROPERTIES = [
  'Multifamily, 5–50 units',
  'Multifamily, 50+ units',
  'Single-family route',
  'School or civic campus',
  'Retail strip with shared pad',
];
export const QB_STAGES: Lifecycle[] = ['Access', 'Materials', 'Site Walk', 'Transfer', 'Markets'];
export const QB_CONCERNS = [
  'Missed collection',
  'Contamination tag',
  'Overflow between pickups',
  'Access & clearance',
  'Signage mismatch',
  'Fees and tonnage',
];

export const QUESTION_TEMPLATES: Record<string, string> = {
  'Missed collection':
    'For a {p} property on {s}: which missed-collection conditions are written in the published service standard, what is the documented crew decision point at the cart, and what record should we keep so the next report is comparable?',
  'Contamination tag':
    'For a {p} property on {s}: what contamination threshold triggers the tag, how is the observation recorded and photographed, and what is the re-inspection path before the next route?',
  'Overflow between pickups':
    'For a {p} property on {s}: how does container volume relate to the published pickup frequency, and what evidence would show the gap is a service problem rather than a behaviour problem?',
  'Access & clearance':
    'For a {p} property on {s}: which clearance dimensions are enforced by the route, which are enforced by code, and who measures them at inspection?',
  'Signage mismatch':
    'For a {p} property on {s}: which stream rules should the enclosure sign reflect, and what is the process for correcting a sign that is accurate in text but unreadable on site?',
  'Fees and tonnage':
    'For a {p} property on {s}: which tonnage figures are public, at what facility are gross and tare recorded, and how do the published totals relate to our route?',
};

export const STATS = [
  { value: 292.4, suffix: 'M', label: 'tons generated', note: 'U.S. MSW, 2018', decimals: 1 },
  { value: 32.1, suffix: '%', label: 'recycled & composted', note: 'of generation, 2018', decimals: 1 },
  { value: 146.2, suffix: 'M', label: 'tons landfilled', note: '2018', decimals: 1 },
  { value: 4.9, suffix: ' lb', label: 'per person / day', note: 'generation rate', decimals: 1 },
];

export const TICKER_FACTS = [
  '292.4 million tons of municipal solid waste generated in the U.S., 2018',
  '4.9 lb per person per day',
  '32.1% recycled and composted',
  'Paper and paperboard: 23.1% of generation',
  'Food and yard trimmings: 33.7% of generation',
  '146.2 million tons landfilled',
  '193 million metric tons CO₂e avoided by materials management',
  'Source: EPA Advancing Sustainable Materials Management, 2018 data',
];
