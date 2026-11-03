import { Article } from '../types/blog';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'the-architecture-of-silence',
    title: 'The Architecture of Silence: On Monoliths and Spatial Stillness',
    subtitle: 'How contemporary museum design rejects frantic consumerism in favor of unadorned concrete volumes and measured natural daylight.',
    category: 'Architecture',
    date: 'Nov 02, 2026',
    readTime: '6 min read',
    featured: true,
    coverImage: '/src/assets/images/lead_hero_architecture_1793667651926.jpg',
    imageCaption: 'Fig. 01 — Diagonal zenithal illumination intersecting monolithic board-formed concrete in the central atrium.',
    claps: 342,
    bookmarksCount: 128,
    author: {
      name: 'Julian Vance',
      role: 'Senior Architectural Critic',
      initials: 'JV',
      bio: 'Julian Vance writes on structural phenomenology, brutalist heritage, and daylight modulation. Formerly at the Royal Institute of Architects.'
    },
    sections: [
      {
        id: 'the-weight-of-light',
        title: 'I. The Weight of Unadorned Space',
        body: [
          'In an era dominated by relentless sensory overstimulation, architecture possesses a singular counter-cultural prerogative: the capacity to enforce stillness. When stepping into a monumental chamber formed from raw unpigmented concrete, the acoustic profile of the world drops instantly. The eye, fatigued by fluorescent flicker and hyperactive interfaces, recalibrates to subtle gradients of overcast gray.',
          'Great architecture does not shout; it establishes a perimeter of silence. The tectonic relationship between mass and void ceases to be merely an engineering calculation and instead becomes an emotional threshold. As Tadao Ando once observed, the walls do not enclose space to confine human movement, but rather to distill the essence of the atmosphere.'
        ],
        pullQuote: 'Space is not the absence of matter; space is the presence of quiet tension waiting to be measured by the sun.',
        quoteAuthor: 'Julian Vance'
      },
      {
        id: 'fenestration-and-shadow',
        title: 'II. Fenestration as a Temporal Instrument',
        body: [
          'Consider the skylight cut into the ceiling at a precise thirty-five degree inclination. Throughout the winter solstice, shadows sweep across the textured aggregate with mathematical deliberateness. Visitors do not look at clocks; they perceive the progression of the afternoon through the creeping transition of penumbra across the floor.',
          'This intentional rejection of decorative ornamentation forces every structural detail to justify its existence. Handrails are recessed into monolithic reveals; expansion joints align with acoustic reveals; the floor plane reflects ambient light without specular glare. Materiality speaks with austere clarity.'
        ],
        captionedImage: {
          src: '/src/assets/images/feature_interior_space_1793667652768.jpg',
          caption: 'Fig. 02 — Gallery gallery wing showing linear timber louvers balancing natural exposure with textural limestone surfaces.',
          figureNo: '02'
        }
      },
      {
        id: 'contemporary-monasticism',
        title: 'III. Secular Monasticism for the Urban Mind',
        body: [
          'Why are contemporary audiences flocking toward galleries devoid of digital screens? The answer lies in an instinctual hunger for permanence. When physical structures refuse to cater to ephemeral trends, they offer a psychological anchor.',
          'To design in neutral materials—stone, lime plaster, blackened steel, and untreated timber—is an act of profound confidence. It trusts that the user will find meaning not in applied motifs, but in proportional balance, tactile friction, and the quiet dignity of space.'
        ],
        keyTakeaway: 'The highest luxury in the modern environment is uninterrupted spatial contemplation.'
      }
    ],
    footnotes: [
      '1. Ando, Tadao. "Conversations on Concrete and Void." Architectural Review, Vol. 182, 1994.',
      '2. Pallasmaa, Juhani. "The Eyes of the Skin: Architecture and the Senses." John Wiley & Sons, 2005.'
    ],
    relatedIds: ['art-3', 'art-5']
  },
  {
    id: 'art-2',
    slug: 'the-lost-cadence-of-lead-type',
    title: 'The Lost Cadence of Lead Type: Tactility in an Ephemeral Age',
    subtitle: 'Reflections on the physical resistance of cast-metal typesetting, cotton rag paper, and the tactile morality of slow printing.',
    category: 'Design & Craft',
    date: 'Oct 28, 2026',
    readTime: '5 min read',
    coverImage: '/src/assets/images/feature_industrial_design_1793667653327.jpg',
    imageCaption: 'Fig. 03 — Solid lead type compartments arranged in the California Job Case alongside brass vernier gauges.',
    claps: 218,
    bookmarksCount: 89,
    author: {
      name: 'Elena Rostova',
      role: 'Master Typographer & Archivist',
      initials: 'ER',
      bio: 'Elena directs the St. Jude Private Press in Basel, researching historical printing mechanisms and substrate interactions.'
    },
    sections: [
      {
        id: 'mechanical-resistance',
        title: 'I. The Physical Resistance of the Letter',
        body: [
          'When setting type by hand, a word is not an incorporeal sequence of digital glyphs; it is a physical weight. Each character—cast in an alloy of lead, tin, and antimony—demands manual extraction from a compartment, placement into the composing stick, and alignment against brass thin-spaces.',
          'You feel the sharpness of the serif against your thumb. If a line is too loose, the entire block will collapse upon removal from the galley. In this physical resistance lies a forgotten editorial discipline: one does not write carelessly when every clause must be cast in metal.'
        ],
        pullQuote: 'To touch the cold corner of a lowercase "g" is to understand that typography was born of blacksmiths, not pixels.',
        quoteAuthor: 'Elena Rostova'
      },
      {
        id: 'ink-and-fiber',
        title: 'II. The Microscopic Alchemy of Fiber',
        body: [
          'On a modern 4K monitor, letterforms float behind chemically strengthened glass. In letterpress printing, however, the platen exerts eight tons of pressure onto handmade cotton paper, embossing the contour of the glyph into the fiber itself.',
          'Under raking light, the impression creates a miniature relief landscape. The oil-based pigment settles into the microscopic grooves of the linen pulp. Decades later, running one’s fingertips across the page still conveys the tremor of the Heidelberg cylinder.'
        ]
      }
    ],
    footnotes: [
      '1. Tschichold, Jan. "The New Typography." University of California Press, translated 1995.',
      '2. Bringhurst, Robert. "The Elements of Typographic Style." Hartley & Marks, 4th ed., 2012.'
    ],
    relatedIds: ['art-1', 'art-4']
  },
  {
    id: 'art-3',
    slug: 'quiet-interiors-and-monochrome-light',
    title: 'The Poetics of the Quiet Interior: Living Without Excess',
    subtitle: 'An exploration of limestone corridors, natural linen louvers, and why intentional restraint remains the highest expression of domestic ease.',
    category: 'Philosophy',
    date: 'Oct 22, 2026',
    readTime: '8 min read',
    coverImage: '/src/assets/images/feature_interior_space_1793667652768.jpg',
    imageCaption: 'Fig. 04 — Gallery residential axis illuminated by filtered morning daylight and rustic limestone masonry.',
    claps: 412,
    bookmarksCount: 204,
    author: {
      name: 'Marcus Kroll',
      role: 'Essayist & Spatial Designer',
      initials: 'MK',
      bio: 'Marcus is an author and interior theorist based in Copenhagen. His writings examine sensory ecology and minimalist habitats.'
    },
    sections: [
      {
        id: 'domestic-subtraction',
        title: 'I. The Ethics of Subtraction',
        body: [
          'Most interiors fail not from what is lacking, but from what has been allowed to accumulate without intention. We surround ourselves with objects that demand maintenance, visual processing, and emotional accounting.',
          'By contrast, a room reduced to its foundational essentials—a single oak bench, raw lime plaster, and generous natural airflow—liberates cognitive bandwidth. The mind ceases to evaluate visual clutter and begins, instead, to inhabit its own thoughts.'
        ],
        pullQuote: 'Simplicity is not a stylistic exercise; it is an uncompromising clarification of life.',
        quoteAuthor: 'Marcus Kroll'
      },
      {
        id: 'tactile-honesty',
        title: 'II. Materials That Welcome the Passage of Time',
        body: [
          'Synthetic materials degrade into ugliness; organic materials age into character. A waxed timber surface records the cups placed upon it; limestone treads soften where feet have walked for fifty years.',
          'When we strip away decorative veneers, we permit the house to tell the truth about time. A home ceases to be a showroom and transforms into a vessel for quiet living.'
        ]
      }
    ],
    footnotes: [
      '1. Tanizaki, Jun’ichiro. "In Praise of Shadows." Leete\'s Island Books, 1977.'
    ],
    relatedIds: ['art-1', 'art-5']
  },
  {
    id: 'art-4',
    slug: 'the-geometry-of-silicon-monoliths',
    title: 'Obsidian Vaults: The Hidden Brutalism of Modern Compute',
    subtitle: 'Behind virtual networks stands an imposing physical architecture of steel monoliths, cooling channels, and silent electromagnetic precision.',
    category: 'Technology',
    date: 'Oct 15, 2026',
    readTime: '7 min read',
    coverImage: '/src/assets/images/feature_cybernetics_monochrome_1793667653437.jpg',
    imageCaption: 'Fig. 05 — High-density compute array featuring cryogenic cooling columns and matte anodized aluminium chassis.',
    claps: 185,
    bookmarksCount: 76,
    author: {
      name: 'Dr. Aris Thorne',
      role: 'Hardware Historian & Systems Architect',
      initials: 'AT',
      bio: 'Dr. Thorne investigates the spatial and energetic topologies of deep computing infrastructure across Scandinavia.'
    },
    sections: [
      {
        id: 'the-physicality-of-cloud',
        title: 'I. The Mirage of Weightlessness',
        body: [
          'We speak of "the cloud" as though our thoughts, transactions, and algorithms float suspended in the troposphere. In reality, modern computing is the heaviest, most concrete-intensive industrial endeavor of the twenty-first century.',
          'Walking through a hyperscale facility in the subarctic tundra reveals rows of dark obsidian cabinets stretching beyond optical perspective. There are no flashing rainbow LEDs here; only the uniform drone of axial fans and the chill of liquid cooling circuits circulating through copper heat sinks.'
        ],
        pullQuote: 'The cloud is not ethereal vapor; it is millions of tons of hardened steel, crushed granite, and copper veins humming in unison.',
        quoteAuthor: 'Dr. Aris Thorne'
      },
      {
        id: 'computational-monumentalism',
        title: 'II. Monumentalism for the Post-Human Era',
        body: [
          'These facilities represent the cathedrals of the digital age, yet they are constructed entirely without human accommodation in mind. The ceiling heights, acoustic insulation, and thermal gradients are optimized purely for thermodynamic equilibrium.',
          'There is a severe, monastic beauty in this functional purity. When an engineer steps down the central corridor, they are not visiting a workspace; they are inspecting a colossal kinetic sculpture that processes the collective subconscious of humanity.'
        ]
      }
    ],
    footnotes: [
      '1. Bridle, James. "New Dark Age: Technology and the End of the Future." Verso, 2018.',
      '2. Hu, Tung-Hui. "A Prehistory of the Cloud." MIT Press, 2015.'
    ],
    relatedIds: ['art-1', 'art-2']
  },
  {
    id: 'art-5',
    slug: 'the-dignity-of-earth-and-fire',
    title: 'The Dignity of Earth and Fire: Form in Imperfect Ceramics',
    subtitle: 'Why the Japanese philosophy of unglazed stoneware and natural kiln variance speaks to our search for authentic materiality.',
    category: 'Culture',
    date: 'Oct 09, 2026',
    readTime: '6 min read',
    coverImage: '/src/assets/images/feature_ceramic_craft_1793667653665.jpg',
    imageCaption: 'Fig. 06 — Three unglazed wood-fired stoneware vessels exhibiting natural wood-ash slag and volcanic fissure texture.',
    claps: 298,
    bookmarksCount: 142,
    author: {
      name: 'Sora Takahashi',
      role: 'Curator of Ceramic Arts',
      initials: 'ST',
      bio: 'Sora Takahashi curates historic and contemporary wood-fired vessels at the Kyoto Institute of Traditional Craft.'
    },
    sections: [
      {
        id: 'uncontrolled-beauty',
        title: 'I. Surrendering to the Kiln Flame',
        body: [
          'In mass industrial manufacturing, any fissure, color divergence, or surface irregularity is branded a defect and cast into landfill. In traditional wood-firing pottery, however, these uncontrolled events are celebrated as the highest artistic achievement.',
          'When clay sits inside an anagama kiln for seven continuous days at thirteen hundred degrees Celsius, drifting pine ash melts upon the shoulders of the pot, creating an organic glaze that no human brush could simulate. The potter merely shapes the seed; the fire authors the destiny.'
        ],
        pullQuote: 'Perfection is cold and sterile; life breathes through the fracture and the scorch mark.',
        quoteAuthor: 'Sora Takahashi'
      },
      {
        id: 'the-weight-in-hand',
        title: 'II. The Tactile Encounter',
        body: [
          'Lift an unglazed vessel in both palms. The exterior is coarse, recalling riverbed pebbles and volcanic scree. The rim meets the lips with honest density.',
          'In holding such an object, one is reconnected with geological time. It reminds us that humanity has engaged in this exact dialogue with mud and heat for twelve millennia—a continuity that outlasts any passing technological whim.'
        ]
      }
    ],
    footnotes: [
      '1. Yanagi, Soetsu. "The Unknown Craftsman: A Japanese Insight into Beauty." Kodansha International, 1989.'
    ],
    relatedIds: ['art-2', 'art-3']
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'c-1',
    articleId: 'art-1',
    authorName: 'Alistair Sterling',
    date: '2 hours ago',
    content: 'The observation about Tadao Ando and daylight as a structural material resonates deeply. Too many new buildings treat daylight as an afterthought rather than the primary volume.',
    likes: 14
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    authorName: 'Claire Beaumont',
    date: '5 hours ago',
    content: 'Such a refreshing counter-narrative to maximalist interiors. Reading this felt like stepping into an art museum in the early morning.',
    likes: 8
  },
  {
    id: 'c-3',
    articleId: 'art-2',
    authorName: 'Hermann Weber',
    date: 'Yesterday',
    content: 'As someone who apprenticed at a letterpress foundry in Leipzig during the 1970s, you captured the physical weight of setting type with extraordinary precision.',
    likes: 29
  }
];
