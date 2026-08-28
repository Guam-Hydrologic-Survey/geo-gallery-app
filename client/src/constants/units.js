/* 
units.js
Description: Constants for map units 
*/

export const boundary_units = [
        {
            number: 0,
            label: "Contact",
            description: "",
            hexcode: "000"
        },
        {
            number: 1,
            label: "Approximately located",
            description: "Gradational or inferred",
            hexcode: "000"
        },
        {
            number: 2,
            label: "Coastline",
            description: "",
            hexcode: "345995"
        }
    ];

export const point_units = [
        {
            number: 0,
            label: "Within 100 ft. vacinity",
            description: "(certain)",
            hexcode: "000"
        },
        {
            number: 1,
            label: "Within general area",
            description: "(uncertain)",
            hexcode: "fff"
        },
        {
            number: 2,
            label: "Sinkhole",
            description: "",
            hexcode: "AA4A44"
        },
        {
            number: 3,
            label: "Aerial",
            description: "Photos taken from an aerial point of view",
            hexcode: "FFDE21"
        },
        {
            number: 4,
            label: "Cave",
            description: "Photos taken inside and outside of caves",
            hexcode: "50C878"
        }
    ];

export const polygon_units = [
        {
            number: 1,
            label: "Tf",
            description: "Facpi",
            hexcode: "dfc7a3",
            paragraph: "Facpi formation (Eocene) basal portion consists of high-Ca boninite pillow lavas interbedded with pillow breccias, hyaloclastites, and sandstones of the same lithology. Least differentiated lavas have olivine, augite, and chromite phenocrysts; more differentiated varieties lack chromite and have plagioclase and orthopyroxene phenocrysts. The upper portion consists of pillow lavas, breccias, bedded breccias and conglomerates of arc tholeiitic basalt with olivine, augite, and plagioclase phenocrysts. Boninitic and basaltic dikes cut this formation and are particularly abundant in the region of the Facpi peninsula. All portions of this formation have undergone zeolite facies metamorphism, and many areas also have undergone lateritic weathering. Estimated thickness of the Facpi formation ranges from 500 to 800 feet"
        },
        {
            number: 2,
            label: "Ta",
            description: "Alutom",
            hexcode: "e5e3d6",
            paragraph: "Alutom formation (Eocene and Oligocene)-bedded breccias, conglomerates, sandstones turbidites, sandy limestones, and micritic to bioclastic limestones. Clasts in the breccias and conglomerates generally are two-pyroxene andesites, although rare olivine phyric basalts and hornblende andesite clasts also are present. Estimated thickness of the Alutom formation ranges from 1850 to 2000 feet"
        },
        {
            number: 3,
            label: "Tam",
            description: "Alutom, Mahlac member",
            hexcode: "c3b8b6",
            paragraph: "Mahlac member of Alutom formation (Eocene and Oligocene)-thin-bedded to laminated friable buff to tan or yellow-tan calcareous formaminiferal shale; maximum known thickness 200 feet"
        },
        {
            number: 4,
            label: "Tt",
            description: "Talisay",
            hexcode: "bcaf9f",
            paragraph: "Talisay member (Oligocene) yellow, green, and red clay and lenticular clayey conglomerate and lignite; gray to green marl containing sticklike Porites and Acropora, and interbedded limestone lenses, 2 to 30 feet thick. Generally unconformable with the volcanics; locally overlies the Bonya limestone"
        },
        {
            number: 5,
            label: "Tug",
            description: "Geus River member",
            hexcode: "af99ca",
            paragraph: "Geus River member (Oligocene)-interbedded limestones, sandy and tuffaceous limestones, sandstones and conglomerates. Clasts in sandy units are largely fragmented and altered andesitic volcanics, but also include intraformational limestones including reef limestones not seen in southwestern Guam. Conglomerates with clasts of basalts, andesites and dacites are considered to be near the base of Tug. Estimated thickness of the Geus River member ranges from 250 to 300 feet"
        },
        {
            number: 6,
            label: "Tus",
            description: "Schroeder flow member",
            hexcode: "d2a2ca",
            paragraph: "Schroeder flow member (Miocene)-basaltic andesite pillow lava with plagioclase, augite and olvine phenocrysts. Volcanic sandstones consisting of clasts derived from the pillow lavas. Interbedded with the uppermost portion of the Schroeder flow member. Estimated thickness of the Schroeder flow member ranges from 100 to 400 feet"
        },
        {
            number: 7,
            label: "Tub",
            description: "Bolanos pyroclastic member",
            hexcode: "fde9f2",
            paragraph: "Bolanos pyroclastic member (Miocene)-breccias, conglomerates, and sandstones consisting largely of fragmented andesite. These andesites typically have prominant euhedral augite phenocrysts up to 1 centimeter in length and millimeter-scale plagioclase phenocrysts. Limestone clasts are conspicuous in some breccias and conglomerates. Estimated thickness of the Bolanos pyroclastic member ranges from 750 to 1000 feet"
        },
        {
            number: 8,
            label: "Tud",
            description: "Dandan flow member",
            hexcode: "f8adcc",
            paragraph: "Dandan flow member (Miocene)-compact medium- to coarse-grained porphyritic andesite flows separated from the underlying Bolanos pyroclastic member by a flow breccias approximately 10 feet thick; maximum thickness of member 50 feet."
        },
        {
            number: 9,
            label: "Tu",
            description: "Umatac formation undifferentiated",
            hexcode: "c77bb2",
            paragraph: "Umatac formation undifferentiated (Miocene)—unresolved stratigraphic sequences in Umatac formation that encompass sections of Tub, Tug, and/or Tus. Approximate thickness ranges from 200 to 500 feet"
        },
        {
            number: 10,
            label: "Tm",
            description: "Maemong limestone",
            hexcode: "84d6e2",
            paragraph: "Maemong limestone formation (Miocene)-reef facies in central Guam consists of compact white recrystallized limestone containing larger Foraminifera and algae, and corals in position of growth; at some places overlain by the Bolanos pyroclastic member. Outcrop distribution restricted generally to several prominent wooded knolls in the upper Talofofo River valley, many lying within the Talofofo Golfing Resort. The estimated outcrop thickness of the Maemong limestone ranges from less than 10 feet to about 150 feet, although the elevation of the base of the unit is not apparent"
        },
        {
            number: 11,
            label: "Tb",
            description: "Bonya limestone",
            hexcode: "6acdca",
            paragraph: "Bonya limestone (Miocene)—pure to argillaceous limestone. In south Guam, generally well bedded, coarse grained, and sandy; In north Guam, mainly massive, compact, white foraminiferal limestone. Scattered concentrations and grain coatings of manganese oxides. Maximum thickness about 120 feet"
        },
        {
            number: 12,
            label: "Tbl",
            description: "Barrigada limestone",
            hexcode: "c1e1bc",
            paragraph: "Barrigada limestone (Miocene and Pliocene)-massive well-lithified to friable medium- to coarse-grained white foraminiferal limestone characterized by the Foraminifera Operculina, Gypsina, and Cycloclypeus. Corals and molluscs present at the top of the formation where it locally grades upward into the Mariana limestone. Unconformable with the Mariama limestone in parts of north Guam. Maximum thickness unknown but exceeds 540 feet"
        },
        {
            number: 13,
            label: "Tj",
            description: "Janum formation",
            hexcode: "00ac9c",
            paragraph: "Janum formation (Miocene and Pliocene)-well-bedded white, pink, tan, and brown foraminiferal limestone containing abundant globigerinid Foraminifera. Overlies Bonya limestone in north Guam; generally unconformable with overlying Mariana limestone. Deposits are lenticular and tongue into Barrigada limestone; maximum thickness 70 feet"
        },
        {
            number: 14,
            label: "Tal",
            description: "Alifan limestone",
            hexcode: "89c5a3",
            paragraph: "Alifan limestone (Miocene and Pliocene)-Massive coarse-to fine-grained recrystallized limstone generally pale pink, buff, or white but locally red, yellow, or brown. Characterized by dominance of sticklike Porites and Acropora and by long calcite tubes formed by burrowing worms or gastrpods. Locally argillaceous above base. Maximum estimated thickness of the Alifan limestone is 150 feet"
        },
        {
            number: 15,
            label: "QTmp",
            description: "Mariana, Phosphorite facies",
            hexcode: "f99885",
            paragraph: "Phosphorite facies (Pliocene and Pleistocene)-light tan, pisolitic structured grainstone. Individual 0.1-0.3mm diameter pisolites enclose recrystallized coral and mollusc fragments. Restricted to a single large and prominent re-entrant in the cliffline above the Tarague embayment. Estimated thickness 5-8 feet"
        },
        {
            number: 16,
            label: "QTmh",
            description: "Mariana, Halimeda facies",
            hexcode: "00ade9",
            paragraph: "Halimeda facies (Pliocene and Pleistocene)-fine-grained, compact micritic limestone with densely packed coarse-sand size Halimeda grains and subordinate Foraminifera. Restricted to terraces above Tarague embayment"
        },
        {
            number: 17,
            label: "QTma",
            description: "Mariana, Hagåtña argillaceous member",
            hexcode: "ade9ff",
            paragraph: "Hagåtña argillaceous member (Pliocene and Pleistocene)-coarse-to fine-grained pale-yellow, tan, or brown fossiliferous detrital limestone containing 2 to 5 percent disseminated clay and as much as 20 percent clay in pockets and cavities; includes undifferentiated lenses of other Limestone facies. Formation typically unconformable upon underlying rocks. Maximum aggregate thickness of formation is as much as 500 feet in some cliffs"
        },
        {
            number: 18,
            label: "QTmf",
            description: "Mariana, Fore-reef facies",
            hexcode: "66aec5",
            paragraph: "Fore-reef facies (Pliocene and Pleistocene)-well-bedded friable to indurated white foraminiferal limestone deposited as fore-reef sand"
        },
        {
            number: 19,
            label: "QTmm",
            description: "Mariana, Molluscan facies",
            hexcode: "badaf3",
            paragraph: "Molluscan facies (Pliocene and Pleistocene)-fine-grained white to tan detrital limestone of lagoonal origin containing abundant casts and molds of molluscs, predominantly pelecypods"
        },
        {
            number: 20,
            label: "QTmd",
            description: "Mariana, Detrital facies",
            hexcode: "9ddefa", 
            paragraph: "Detrital facies (Pliocene and Pleistocene) friable to well-cemented coarse- to fine-grained generally porous and cavernous white detrital limestone, mostly of lagoonal origin"
        },
        {
            number: 21,
            label: "QTmr",
            description: "Mariana, Reef facies",
            hexcode: "8cbde5",
            paragraph: "eet facies (Pliocene and Pleistocene-massive porous, and cavernous white limestone of reef origin, especially along clift taces, made up mostly of corals in position of growth in matrix of encrusting calcareous algae"
        },
        {
            number: 22,
            label: "Qt",
            description: "Tarague limestone (Quaternary)",
            hexcode: "53a7dd",
            paragraph: "125,000-135,000 year-old coralgal reef limestone cropping out exclusively in Tarague embayment at + 15 to +25 feet elevation. Undergone only partial diagenetic alteration. Rich assemblage of reef corals. Maximum estimated thickness 25 feet"
        },
        {
            number: 23,
            label: "Qal",
            description: "Alluvium",
            hexcode: "fff9bd",
            paragraph: "alluvial clay deposits, mostly 30-100 feet thick, muck and clay in marshy estuarine deposits on the west coast, scattered sand and gravel bars within deposits near SE river mouths, and clay fill in large sinks in limestone areas"
        },
        {
            number: 24,
            label: "Qrm",
            description: "Merizo limestone (Quaternary)",
            hexcode: "00cbf6",
            paragraph: "emergent Holocene (2,500-4,800 years old) coralgal reef limestones, 2-12 feet thick, capping modern reef flats and platforms. Occurs as intertidal and low-supratidal outcrops. Extensive supratidal outcrops at Tarague (algal-rich), Ylig Point (coral-rich), and Aga Point (detrital-rich). Almost no meteoric diagenetic alteration evidenced in outcrops. Many outcrops, too small to map, occur along SW coast between Merizo and Agat"
        },
        {
            number: 25,
            label: "Qrb",
            description: "Beach deposits (Quaternary)",
            hexcode: "fec689",
            paragraph: "beach sand and gravel, beach rock in the intertidal zone, and small isolated patches of recently emerged detrital limestone. Sand generally is less than 15 feet above sea level, seldom as much as 30 feet above"
        },
        {
            number: 26,
            label: "Qaf",
            description: "Artificial fill",
            hexcode: "c38a5f",
            paragraph: "shown only where extensive"
        }
    ];
