import { ChatMessage } from '../types';

export interface AssistantFAQResponse {
  keywords: string[];
  response: Partial<ChatMessage>;
}

export const SUGGESTED_ASSISTANT_QUESTIONS = [
  'Which BIS standard applies to this product?',
  'Explain this standard in simple language.',
  'How do I verify a HUID?',
  'What is a QCO?',
  'Find testing laboratories for this standard.',
  'Explain this BIS certification process.',
];

export const MOCK_ASSISTANT_RESPONSES: AssistantFAQResponse[] = [
  {
    keywords: ['which bis standard applies', 'which standard', 'standard applies to this product', 'applies to my product'],
    response: {
      text: `### Applicable Indian Standard Identification

To identify the exact Indian Standard for your product, BIS evaluates three primary criteria:
1. **Material Construction & Composition** (e.g., Stainless Steel SS 304, Virgin Polymer, Mild Steel)
2. **Intended Functional Use** (Domestic, Commercial, Industrial, Food Contact)
3. **Safety & Environmental Regulations** (Electrical voltage, thermal hazard, child safety)

**Common Examples:**
- **Insulated Flasks / Bottles:** [IS 17526 : 2021](file:///standards/is-17526) (Mandatory under DPIIT QCO)
- **Children Toys:** [IS 9873 (Part 1) : 2019](file:///standards/is-9873-1)
- **Packaged Drinking Water:** [IS 14543 : 2024](file:///standards/is-14543)
- **Electrical Plugs & Sockets:** [IS 1293 : 2019](file:///standards/is-1293)
- **Lithium Battery Packs:** [IS 16046 (Part 2) : 2018](file:///standards/is-16046-2)

You can use the dedicated **Product → Standard Discovery** tool to enter your specific product parameters and get an instant matching evaluation.`,
      standard: {
        isNumber: 'IS 17526 : 2021',
        title: 'Stainless Steel Vacuum Flasks / Insulated Domestic Water Bottles',
      },
      citations: [
        {
          id: 'cit-01',
          documentTitle: 'Indian Standard IS 17526:2021',
          isNumber: 'IS 17526',
          versionYear: '2021',
          clause: 'Clause 1 Scope & Clause 4 Material',
          sourceName: 'Bureau of Indian Standards',
          sourceUrl: 'https://www.services.bis.gov.in',
          retrievedDate: '2026-09-28',
          confidence: 0.96,
        },
      ],
      actions: [
        { label: 'Open Product → Standard Discovery', route: '/product-to-standard' },
        { label: 'Explore Standards Catalogue', route: '/standards' },
      ],
    },
  },
  {
    keywords: ['explain this standard', 'simple language', 'explain standard in simple'],
    response: {
      text: `### Simplified Standard Explanation: IS 17526 : 2021 (Insulated Flasks)

In simple terms, **IS 17526 : 2021** ensures that insulated domestic bottles and vacuum flasks:
1. **Are Safe for Health:** The inner liner that touches your beverage must be made of high-quality, rust-proof **SS 304 food-grade stainless steel** (not cheap, toxic industrial metal). Plastic lids and silicone rings must not leach harmful chemicals into hot drinks.
2. **Keep Drinks Truly Hot or Cold:** When boiling water (95°C) is poured inside, it must still be **at least 60°C after 6 full hours** at normal room temperature.
3. **Do Not Break Easily:** Even if dropped 3 times from a height of 1.2 metres (about waist height) onto solid concrete, the flask must not crack or lose its vacuum insulation.
4. **Carry Authentic Markings:** Every genuine bottle must have the **ISI triangle mark** and the manufacturer's licence number (CM/L) laser-etched on its bottom.`,
      standard: {
        isNumber: 'IS 17526 : 2021',
        title: 'Insulated Domestic Water Bottles',
      },
      citations: [
        {
          id: 'cit-02',
          documentTitle: 'IS 17526 : 2021 Citizen Summary',
          isNumber: 'IS 17526',
          versionYear: '2021',
          clause: 'Clause 4 & Clause 5',
          sourceName: 'BIS Consumer Awareness Division',
          sourceUrl: 'https://www.services.bis.gov.in',
          retrievedDate: '2026-09-28',
          confidence: 0.98,
        },
      ],
      actions: [
        { label: 'View Full Standard Details', route: '/standards' },
        { label: 'Check Applicable QCO Order', route: '/qco-regulations' },
      ],
    },
  },
  {
    keywords: ['verify a huid', 'how do i verify a huid', 'huid verification', 'hallmark unique identification', 'verify gold'],
    response: {
      text: `### How to Verify a Gold HUID (Hallmark Unique Identification)

Every hallmarked gold jewellery article sold in India must carry a **6-digit alphanumeric HUID** engraved alongside the triangular BIS mark and purity fineness.

**How to verify:**
1. Look for the 6-character code laser engraved on your jewellery piece (e.g., \`AB1234\`, \`XY9876\`).
2. Go to the **Unified Verification Hub** or open the official **BIS CARE** mobile app.
3. Enter the 6-digit HUID in the verification box.
4. The system immediately retrieves:
   - **Jewellery Type** (e.g. Ring, Bangle, Chain)
   - **Fineness Grade** (e.g., 22K916, 18K750, 14K585)
   - **Assaying & Hallmarking Centre (AHC)** that tested the gold
   - **Registered Jeweller** who submitted the article
   - **Date of Hallmarking**

*Note: If the HUID does not appear in the registry, the piece may be uncertified or counterfeit.*`,
      citations: [
        {
          id: 'cit-03',
          documentTitle: 'BIS Hallmarking Regulations, 2018 (as amended)',
          isNumber: 'IS 1417',
          versionYear: '2016',
          clause: 'Clause 6 Marking Guidelines',
          sourceName: 'Central BIS Hallmarking Directorate',
          sourceUrl: 'https://hallmarking.bis.gov.in',
          retrievedDate: '2026-09-28',
          confidence: 0.99,
        },
      ],
      actions: [
        { label: 'Open Unified Verification Hub', route: '/verify/huid' },
        { label: 'Open Purity Calculator', route: '/hallmarking/purity' },
      ],
    },
  },
  {
    keywords: ['what is a qco', 'what is qco', 'quality control order', 'mandatory qco'],
    response: {
      text: `### What is a Quality Control Order (QCO)?

A **Quality Control Order (QCO)** is a statutory regulation issued by the Government of India (under ministries like DPIIT, Ministry of Steel, MeitY, and Ministry of Consumer Affairs) under the powers of the **BIS Act, 2016**.

**Key Implications of a QCO:**
- **Mandatory Certification:** Once a product is notified under a QCO, it **cannot** be manufactured, imported, distributed, stocked, or sold in India without conforming to the relevant Indian Standard and bearing the **Standard Mark (ISI Mark or CRS Mark)**.
- **Consumer Protection:** Ensures public safety, human health, environmental protection, and prevention of deceptive practices.
- **Penal Consequences:** Non-compliance invites penal action including seizure of non-standard goods, fines, and prosecution under Section 29 of the BIS Act, 2016.
- **Phased Enforcement:** QCOs typically give a 6-month to 1-year transition window, with additional extensions often provided for micro and small enterprises.`,
      citations: [
        {
          id: 'cit-04',
          documentTitle: 'Bureau of Indian Standards Act, 2016 (Section 16 & Section 29)',
          isNumber: 'BIS Act 2016',
          versionYear: '2016',
          clause: 'Section 16 Mandatory Conformity Assessment',
          sourceName: 'The Gazette of India',
          sourceUrl: 'https://www.services.bis.gov.in',
          retrievedDate: '2026-09-28',
          confidence: 0.99,
        },
      ],
      actions: [
        { label: 'Explore All QCO Orders', route: '/qco-regulations' },
        { label: 'Check Standards Catalogue', route: '/standards' },
      ],
    },
  },
  {
    keywords: ['find testing laboratories', 'testing labs', 'laboratories for this standard', 'lab for is'],
    response: {
      text: `### Finding BIS Recognized Testing Laboratories

BIS maintains a national network of central, regional, and recognized private/public NABL-accredited testing laboratories across India under the **Laboratory Information Management System (LIMS)**.

**Key Testing Centers by Standard:**
- **IS 17526 (Vacuum Flasks):** BIS Central Laboratory (Sahibabad), Shriram Institute for Industrial Research (Delhi), National Test House (Ghaziabad).
- **IS 9873 (Toy Safety):** Intertek India (Gurugram), TÜV Rheinland (Bengaluru), BIS Central Lab (Sahibabad).
- **IS 14543 (Packaged Water):** SIIR Delhi, Vimta Labs (Hyderabad), SGS India (Chennai).
- **IS 16046 (Lithium Batteries):** UL India (Bengaluru), TÜV Rheinland (Bengaluru).
- **IS 1293 (Plugs & Sockets):** ERDA (Vadodara), Central Power Research Institute (CPRI).

You can search and filter all recognized laboratories by state, city, testing capability, and supported standards in the **Testing Laboratories** directory.`,
      citations: [
        {
          id: 'cit-05',
          documentTitle: 'BIS LIMS Laboratory Directory & Accreditation Register',
          isNumber: 'LIMS-DIR-2026',
          versionYear: '2026',
          sourceName: 'BIS LIMS Portal',
          sourceUrl: 'https://lims.bis.gov.in',
          retrievedDate: '2026-09-28',
          confidence: 0.97,
        },
      ],
      actions: [
        { label: 'Search Testing Laboratories', route: '/laboratories' },
        { label: 'View Standards Explorer', route: '/standards' },
      ],
    },
  },
  {
    keywords: ['explain this bis certification process', 'certification process', 'how to get isi mark', 'how to get bis licence'],
    response: {
      text: `### The 5-Stage BIS Certification Process (Scheme I - ISI Mark)

To obtain an official BIS licence (CM/L) to use the ISI Mark, follow this structured roadmap:

1. **Step 1: Standard Identification & STI Compliance**
   Verify the applicable Indian Standard and download the **Scheme of Testing and Inspection (STI)** from the BIS portal to understand mandatory in-house testing equipment.
2. **Step 2: In-House Testing Setup & Quality Manual**
   Setup factory testing equipment (calibrated by NABL lab) and employ a qualified chemist/quality engineer to conduct regular batch testing.
3. **Step 3: Online Application on Manak Online (e-BIS)**
   Submit Form-V online with factory registration, machinery list, test equipment list, process flow chart, and application fee.
4. **Step 4: Factory Audit & Sample Drawing**
   A BIS technical auditing officer conducts an on-site audit of your plant, checks production processes, verifies in-house testing, and draws official verification samples.
5. **Step 5: Grant of Licence (CM/L)**
   Upon passing laboratory tests and audit verification, BIS issues the **Certification Licence (CM/L)**, granting the right to print the ISI mark with your licence number.`,
      citations: [
        {
          id: 'cit-06',
          documentTitle: 'BIS Conformity Assessment Regulations, 2018 (Scheme I)',
          isNumber: 'Scheme I STI',
          versionYear: '2018',
          clause: 'Regulation 4 Grant of Licence',
          sourceName: 'Bureau of Indian Standards',
          sourceUrl: 'https://www.services.bis.gov.in',
          retrievedDate: '2026-09-28',
          confidence: 0.99,
        },
      ],
      actions: [
        { label: 'Open Certification Roadmap & Checklist', route: '/certification' },
        { label: 'Check Compliance Gap Analysis', route: '/compliance-gap' },
      ],
    },
  },
];

export const getAssistantMockResponse = (query: string): ChatMessage => {
  const clean = query.trim().toLowerCase();

  for (const item of MOCK_ASSISTANT_RESPONSES) {
    if (item.keywords.some((kw) => clean.includes(kw))) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: item.response.text || '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        standard: item.response.standard,
        citations: item.response.citations,
        actions: item.response.actions,
      };
    }
  }

  // Intelligent fallback for any general query
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: `### Query Analysis for: "${query}"

Thank you for your inquiry. Based on the Bureau of Indian Standards (BIS) regulatory repository:

1. **Standard & Regulatory Scope:** If your inquiry relates to product conformity or consumer safety, check whether the item falls under a mandatory **Quality Control Order (QCO)** published by the central government.
2. **Conformity Verification:** All genuine ISI marked products must display a 7-digit to 10-digit **CM/L licence number**, and gold jewellery must carry a **6-digit alphanumeric HUID** laser-engraved by a recognized AHC.
3. **Recommended Actions:** You can look up standards in the **Standards Explorer**, verify licences or HUIDs in the **Unified Verification Hub**, or consult recognized test facilities in the **Testing Laboratories** directory.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: [
      {
        id: 'cit-gen',
        documentTitle: 'BIS Official Knowledge Portal Repository',
        isNumber: 'BIS-ACT-2016',
        versionYear: '2016',
        sourceName: 'Bureau of Indian Standards, Manak Bhavan, New Delhi',
        sourceUrl: 'https://www.services.bis.gov.in',
        retrievedDate: '2026-09-28',
        confidence: 0.95,
      },
    ],
    actions: [
      { label: 'Explore Standards Catalogue', route: '/standards' },
      { label: 'Unified Verification Hub', route: '/verify' },
      { label: 'Quality Control Orders', route: '/qco-regulations' },
    ],
  };
};
