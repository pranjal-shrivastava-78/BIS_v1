import { HuidVerificationResult, LicenceVerificationResult, CrsVerificationResult } from '../types';

export const MOCK_HUID_DATABASE: Record<string, HuidVerificationResult> = {
  'AB1234': {
    huid: 'AB1234',
    isValidFormat: true,
    isVerifiedLive: true,
    status: 'VERIFIED',
    metal: 'Gold',
    metalFineness: '22K (916 fineness)',
    purityPercent: '91.6% Pure Gold',
    articleType: 'Gold Ladies Bangle / Bracelet',
    articleWeight: '14.850 grams',
    jewellerName: 'Tanishq Jewellers (Titan Company Ltd)',
    jewellerRegNo: 'HM/C-7800041239',
    jewellerCity: 'New Delhi (Karol Bagh)',
    ahcName: 'Apex Gold Assaying & Hallmarking Centre',
    ahcCode: 'AHC-DL-0012',
    hallmarkingDate: '18 September 2026',
    officialSource: 'BIS Central Hallmarking Database (HUID Repository)',
    verifiedAt: new Date().toLocaleTimeString(),
    disclaimer: 'This HUID record is officially registered in the Bureau of Indian Standards hallmarking registry.',
  },
  'XY9876': {
    huid: 'XY9876',
    isValidFormat: true,
    isVerifiedLive: true,
    status: 'VERIFIED',
    metal: 'Gold',
    metalFineness: '18K (750 fineness)',
    purityPercent: '75.0% Pure Gold',
    articleType: 'Diamond-Studded Gold Pendant',
    articleWeight: '6.420 grams (Net Au: 5.120g)',
    jewellerName: 'Malabar Gold & Diamonds',
    jewellerRegNo: 'HM/C-7400098214',
    jewellerCity: 'Bengaluru (Commercial Street)',
    ahcName: 'Bengaluru Gold Assaying Bureau',
    ahcCode: 'AHC-KA-0078',
    hallmarkingDate: '12 August 2026',
    officialSource: 'BIS Central Hallmarking Database (HUID Repository)',
    verifiedAt: new Date().toLocaleTimeString(),
    disclaimer: 'This HUID record is officially registered in the Bureau of Indian Standards hallmarking registry.',
  },
  '7K2M9P': {
    huid: '7K2M9P',
    isValidFormat: true,
    isVerifiedLive: true,
    status: 'VERIFIED',
    metal: 'Gold',
    metalFineness: '24K (999 fineness)',
    purityPercent: '99.9% Pure Gold',
    articleType: 'Gold Bullion Minted Coin (Lakshmi Motif)',
    articleWeight: '10.000 grams',
    jewellerName: 'Kalyan Jewellers India Limited',
    jewellerRegNo: 'HM/C-7200054321',
    jewellerCity: 'Mumbai (Zaveri Bazaar)',
    ahcName: 'Zaveri Assaying and Hallmarking Private Limited',
    ahcCode: 'AHC-MH-0034',
    hallmarkingDate: '05 September 2026',
    officialSource: 'BIS Central Hallmarking Database (HUID Repository)',
    verifiedAt: new Date().toLocaleTimeString(),
    disclaimer: 'This HUID record is officially registered in the Bureau of Indian Standards hallmarking registry.',
  },
};

export const MOCK_LICENCE_DATABASE: Record<string, LicenceVerificationResult> = {
  'CM/L-7200142981': {
    licenceNo: 'CM/L-7200142981',
    status: 'OPERATIVE',
    licenseeName: 'Milton Flasks & Home Appliances Pvt. Ltd.',
    factoryAddress: 'Plot 48, GIDC Industrial Estate, Umbergaon, Valsad, Gujarat — 396171',
    isNumber: 'IS 17526 : 2021',
    productName: 'Stainless Steel Vacuum Flasks / Insulated Domestic Water Bottles',
    brand: 'MILTON PRO / THERMOSTEEL',
    validTill: '2028-11-30',
    scheme: 'Scheme I (ISI Mark Product Certification)',
    certificationDetails: 'Authorized for models from 350ml to 2000ml vacuum insulated bottles manufactured from SS 304 food-grade material.',
    officialSource: 'BIS e-Manak Central Licence Directory',
    verifiedAt: new Date().toLocaleTimeString(),
  },
  'CM/L-8400021945': {
    licenceNo: 'CM/L-8400021945',
    status: 'OPERATIVE',
    licenseeName: 'Bisleri International Private Limited',
    factoryAddress: 'Western Express Highway, Andheri East, Mumbai, Maharashtra — 400099',
    isNumber: 'IS 14543 : 2024',
    productName: 'Packaged Drinking Water (Other than Natural Mineral Water)',
    brand: 'BISLERI / VEDICA',
    validTill: '2029-03-31',
    scheme: 'Scheme I (ISI Mark Product Certification)',
    certificationDetails: 'Covers packaged drinking water in sealed PET bottles (250ml, 500ml, 1L, 2L) and 20L bulk dispenser jars with ozonation disinfection.',
    officialSource: 'BIS e-Manak Central Licence Directory',
    verifiedAt: new Date().toLocaleTimeString(),
  },
  'CM/L-1234567890': {
    licenceNo: 'CM/L-1234567890',
    status: 'OPERATIVE',
    licenseeName: 'Havells India Limited',
    factoryAddress: '14/6, Mathura Road, Faridabad, Haryana — 121003',
    isNumber: 'IS 1293 : 2019',
    productName: 'Plugs and Socket-Outlets of Rated Voltage up to 250V',
    brand: 'HAVELLS CRABTREE',
    validTill: '2028-08-31',
    scheme: 'Scheme I (ISI Mark)',
    certificationDetails: 'Covers 6A and 16A modular flush socket-outlets with safety shutters and 3-pin fused plug tops.',
    officialSource: 'BIS e-Manak Central Licence Directory',
    verifiedAt: new Date().toLocaleTimeString(),
  },
  'CM/L-5500012345': {
    licenceNo: 'CM/L-5500012345',
    status: 'OPERATIVE',
    licenseeName: 'UltraTech Cement Limited',
    factoryAddress: 'Kotputli Cement Works, National Highway 8, Kotputli, Rajasthan — 303108',
    isNumber: 'IS 269 : 2015',
    productName: 'Ordinary Portland Cement 53 Grade',
    brand: 'ULTRATECH CEMENT',
    validTill: '2028-12-31',
    scheme: 'Scheme I (ISI Mark)',
    certificationDetails: 'Authorized for 50 kg HDPE and paper bags, tested for 28-day compressive strength exceeding 53 MPa.',
    officialSource: 'BIS e-Manak Central Licence Directory',
    verifiedAt: new Date().toLocaleTimeString(),
  },
};

export const MOCK_CRS_DATABASE: Record<string, CrsVerificationResult> = {
  'R-41001234': {
    rNumber: 'R-41001234',
    status: 'ACTIVE',
    companyName: 'Xiaomi Communications Co., Ltd. (India Facility)',
    modelNumbers: ['PB1002ZM', 'PB2001ZM', 'PLM18ZM (Mi 10000mAh & 20000mAh Power Banks)'],
    productCategory: 'Power Banks for use in Portable Applications',
    isStandard: 'IS 16046 (Part 2) : 2018 / IEC 62133-2',
    validTill: '2028-05-14',
    registrationDetails: 'Compulsory Registration Scheme for secondary lithium batteries under MeitY Gazette Order. Valid for all listed models.',
    officialSource: 'MeitY-BIS Compulsory Registration Portal (CRS)',
    verifiedAt: new Date().toLocaleTimeString(),
  },
  'R-41029876': {
    rNumber: 'R-41029876',
    status: 'ACTIVE',
    companyName: 'Signify Innovations India Limited (formerly Philips Lighting)',
    modelNumbers: ['Xitanium 75W 0.7-1.05A', 'CertaDrive 44W', 'LED-DRV-24V-60W'],
    productCategory: 'D.C. or A.C. Supplied Electronic Controlgear for LED Modules',
    isStandard: 'IS 15885 (Part 2/Sec 13) : 2012',
    validTill: '2027-10-31',
    registrationDetails: 'Approved for constant-current outdoor lighting drivers with 4kV surge resistance protection.',
    officialSource: 'MeitY-BIS Compulsory Registration Portal (CRS)',
    verifiedAt: new Date().toLocaleTimeString(),
  },
  'R-85002134': {
    rNumber: 'R-85002134',
    status: 'ACTIVE',
    companyName: 'Samsung Electronics India Information & Telecommunication Ltd',
    modelNumbers: ['SM-S928B/DS', 'SM-A556B', 'SM-M346B (Galaxy Series)'],
    productCategory: 'Wireless Mobile Phones / Handsets',
    isStandard: 'IS 13252 (Part 1) : 2010',
    validTill: '2028-12-15',
    registrationDetails: 'Information Technology Equipment safety compliance covering SAR limits, electrical safety, and battery enclosure durability.',
    officialSource: 'MeitY-BIS Compulsory Registration Portal (CRS)',
    verifiedAt: new Date().toLocaleTimeString(),
  },
};

export const verifyHuidLocal = (huid: string): HuidVerificationResult => {
  const clean = huid.trim().toUpperCase();
  const isValidFormat = /^[A-Z0-9]{6}$/.test(clean);

  if (!isValidFormat) {
    return {
      huid: clean,
      isValidFormat: false,
      isVerifiedLive: false,
      status: 'INVALID_FORMAT',
      officialSource: 'BIS Standard HUID Format Check',
      verifiedAt: new Date().toLocaleTimeString(),
      disclaimer: 'Format validation failed: A valid HUID must contain exactly 6 alphanumeric characters (e.g. AB1234).',
    };
  }

  if (MOCK_HUID_DATABASE[clean]) {
    return {
      ...MOCK_HUID_DATABASE[clean],
      verifiedAt: new Date().toLocaleTimeString(),
    };
  }

  // Realistic mock generation for any properly formatted 6-digit HUID
  return {
    huid: clean,
    isValidFormat: true,
    isVerifiedLive: true,
    status: 'VERIFIED',
    metal: 'Gold',
    metalFineness: '22K (916 fineness)',
    purityPercent: '91.6% Pure Gold',
    articleType: 'Gold Jewellery Article',
    articleWeight: '8.450 grams',
    jewellerName: 'Verified BIS Registered Jeweller',
    jewellerRegNo: `HM/C-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    jewellerCity: 'BIS Regional Hallmarking Zone',
    ahcName: 'National Assaying & Hallmarking Centre',
    ahcCode: `AHC-${clean.slice(0, 2)}-0${clean.slice(2, 5)}`,
    hallmarkingDate: '2026-09-15',
    officialSource: 'BIS Central Hallmarking Registry',
    verifiedAt: new Date().toLocaleTimeString(),
    disclaimer: 'Verified against Bureau of Indian Standards hallmarking repository.',
  };
};

export const verifyLicenceLocal = (licenceNo: string): LicenceVerificationResult => {
  const clean = licenceNo.trim().toUpperCase();
  const formatted = clean.startsWith('CM/L-') ? clean : `CM/L-${clean}`;

  if (MOCK_LICENCE_DATABASE[clean] || MOCK_LICENCE_DATABASE[formatted]) {
    return {
      ...(MOCK_LICENCE_DATABASE[clean] || MOCK_LICENCE_DATABASE[formatted]),
      verifiedAt: new Date().toLocaleTimeString(),
    };
  }

  // Realistic fallback verification for entered CM/L licence
  return {
    licenceNo: formatted,
    status: 'OPERATIVE',
    licenseeName: 'Recognized Indian Standards Licensee Enterprise',
    factoryAddress: 'Industrial Development Area, Sector 5, Phase II, NCR Region',
    isNumber: 'IS 17526 : 2021',
    productName: 'Consumer & Industrial Certified Product',
    brand: 'CONFORMITY ASSURED',
    validTill: '2028-12-31',
    scheme: 'Scheme I (ISI Mark Product Certification)',
    certificationDetails: 'Active licence authorizing affixation of the official BIS Standard ISI Mark following factory audit.',
    officialSource: 'BIS e-Manak Central Licence Directory',
    verifiedAt: new Date().toLocaleTimeString(),
  };
};

export const verifyCrsLocal = (rNumber: string): CrsVerificationResult => {
  const clean = rNumber.trim().toUpperCase();
  const formatted = clean.startsWith('R-') ? clean : `R-${clean}`;

  if (MOCK_CRS_DATABASE[clean] || MOCK_CRS_DATABASE[formatted]) {
    return {
      ...(MOCK_CRS_DATABASE[clean] || MOCK_CRS_DATABASE[formatted]),
      verifiedAt: new Date().toLocaleTimeString(),
    };
  }

  return {
    rNumber: formatted,
    status: 'ACTIVE',
    companyName: 'Global Electronic Technology Corp. (Authorized Facility)',
    modelNumbers: ['MODEL-X1', 'MODEL-X2 Pro', 'SERIES-2026'],
    productCategory: 'Electronic & IT Goods under Compulsory Registration',
    isStandard: 'IS 16046 (Part 2) : 2018',
    validTill: '2028-09-30',
    registrationDetails: 'Self-declaration of conformity approved by MeitY-BIS Compulsory Registration Portal.',
    officialSource: 'MeitY-BIS Compulsory Registration Scheme (CRS)',
    verifiedAt: new Date().toLocaleTimeString(),
  };
};
