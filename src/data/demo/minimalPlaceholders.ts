import {
  IndianStandard,
  TestingLab,
  HallmarkingCentre,
  LicensedJeweller,
  QcoRecord,
  ComplianceGapItem,
} from '../../types';

/**
 * Minimal demo placeholders for UI structure demonstration.
 * These are completely isolated in this file and can be disabled
 * or removed simply by setting USE_FALLBACK_SEEDS = false.
 */
export const USE_FALLBACK_SEEDS = true;

export const MINIMAL_STANDARDS_SEED: IndianStandard[] = [
  {
    id: 'is-17526',
    isNumber: 'IS 17526 : 2021',
    title: 'Stainless Steel Vacuum Flasks / Insulated Domestic Water Bottles',
    year: '2021',
    department: 'Mechanical Engineering (MED 33)',
    category: 'Consumer Utensils',
    status: 'ACTIVE',
    qcoMandatory: true,
    qcoDate: '15 March 2024',
    scope: 'Requirements for materials, thermal retention, and drop resistance of insulated bottles.',
    clauses: [
      {
        clauseNumber: 'Clause 4.1',
        title: 'Material Specifications',
        text: 'All metal parts in contact with beverage shall be food-grade SS 304 per IS 6911.',
        page: 'Page 4',
      },
      {
        clauseNumber: 'Clause 5.2',
        title: 'Thermal Insulation Retention Test',
        text: 'Flask filled at 95°C shall retain >= 60°C after 6 hours at 27°C ambient.',
        page: 'Page 6',
      },
    ],
    amendments: ['Amendment No. 1 (2022)'],
    certificationScheme: 'Scheme I (ISI Mark)',
    relatedStandards: ['IS 6911', 'IS 9845'],
    bisSourceUrl: 'https://www.services.bis.gov.in',
    lastUpdated: '2026-08-15',
  },
  {
    id: 'is-9873-1',
    isNumber: 'IS 9873 (Part 1) : 2019',
    title: 'Safety of Toys — Mechanical and Physical Properties',
    year: '2019',
    department: 'Consumer Products and Medical Instruments (CPMD)',
    category: 'Child Safety',
    status: 'ACTIVE',
    qcoMandatory: true,
    qcoDate: '01 January 2021',
    scope: 'Safety requirements for toys intended for children under 14 years.',
    clauses: [
      {
        clauseNumber: 'Clause 4.4',
        title: 'Small Parts Cylinder Test',
        text: 'Toys for children under 36 months must not release parts fitting the small parts cylinder.',
        page: 'Page 12',
      },
    ],
    amendments: ['Amendment 1 (2020)'],
    certificationScheme: 'Scheme I (ISI Mark)',
    relatedStandards: ['IS 9873 (Part 2)', 'IS 9873 (Part 3)'],
    bisSourceUrl: 'https://www.services.bis.gov.in',
    lastUpdated: '2026-07-20',
  },
];

export const MINIMAL_LABS_SEED: TestingLab[] = [
  {
    id: 'lab-01',
    name: 'BIS Central Laboratory (CL-Sahibabad)',
    code: 'BIS-CL-001',
    state: 'Uttar Pradesh',
    district: 'Ghaziabad',
    city: 'Sahibabad / NCR Delhi',
    address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP',
    contact: '+91-120-4177100',
    email: 'cl-bis@bis.gov.in',
    capabilities: ['Chemical', 'Mechanical', 'Electrical'],
    accreditedStandards: ['IS 17526', 'IS 9873'],
    validity: '2028-12-31',
    status: 'RECOGNIZED',
    officialSource: 'BIS LIMS Portal',
    lastVerified: '2026-09-20',
  },
];

export const MINIMAL_AHC_SEED: HallmarkingCentre[] = [
  {
    id: 'ahc-01',
    name: 'Apex Gold Assaying & Hallmarking Centre',
    code: 'AHC-DL-0012',
    state: 'Delhi',
    city: 'New Delhi (Karol Bagh)',
    address: 'Bank Street, Karol Bagh, New Delhi',
    metalCapability: 'Gold & Silver',
    status: 'OPERATIONAL',
    validity: '2027-09-30',
    officialSource: 'BIS Hallmarking Directory',
    lastVerified: '2026-09-24',
  },
];

export const MINIMAL_JEWELLERS_SEED: LicensedJeweller[] = [
  {
    id: 'jewel-01',
    licenceNo: 'HM/C-7800041239',
    jewellerName: 'Sample Licensed Jeweller Enterprise',
    address: 'Pusa Road, Karol Bagh, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    metalCategory: 'Both',
    status: 'OPERATIVE',
    validTill: '2028-10-31',
    lastSynchronized: '2026-09-26',
  },
];

export const MINIMAL_QCO_SEED: QcoRecord[] = [
  {
    id: 'qco-01',
    product: 'Stainless Steel Vacuum Flasks and Insulated Containers',
    isNumber: 'IS 17526 : 2021',
    ministry: 'Ministry of Commerce and Industry (DPIIT)',
    notificationNo: 'S.O. 4112(E)',
    notificationDate: '2023-09-15',
    effectiveDate: '2024-03-15',
    status: 'ENFORCED',
    sourceGazette: 'The Gazette of India',
    lastSynchronized: '2026-09-26',
  },
];

export const MINIMAL_COMPLIANCE_GAP_SEED: ComplianceGapItem[] = [
  {
    id: 'cg-1',
    clause: 'IS 17526 Cl 4.1',
    parameter: 'Inner Liner Stainless Steel Grade',
    bisRequirement: 'Food contact metal grade SS 304 per IS 6911 with mill test certificate',
    evidenceFound: 'Factory raw material test certificate indicates SS 304',
    gapStatus: 'COMPLIANT',
    remedialAction: 'Maintain batch mill certificate in docket',
    sourceStandard: 'IS 17526 : 2021',
  },
  {
    id: 'cg-2',
    clause: 'IS 17526 Cl 6.3 / IS 9845',
    parameter: 'Overall Migration (Lid & Seal)',
    bisRequirement: 'Overall migration <= 10 mg/dm2 per IS 9845',
    evidenceFound: 'Pending laboratory test report for silicone gasket',
    gapStatus: 'GAP_FOUND',
    remedialAction: 'Conduct migration testing at a recognized BIS laboratory',
    sourceStandard: 'IS 17526 : 2021',
  },
];
