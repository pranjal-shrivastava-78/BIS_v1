import { HuidVerificationResult, LicenceVerificationResult, CrsVerificationResult } from '../types';
import { verificationApi } from '../api/verification';
import { VerificationResponse } from '../types/api';

export function mapVerificationResponseToHuidResult(res: VerificationResponse): HuidVerificationResult {
  const d = res.data || {};
  const isVerified = res.status === 'VERIFIED';

  const fineness = d.fineness || undefined;
  let metal: 'Gold' | 'Silver' | undefined = undefined;
  if (fineness) {
    metal = fineness.toLowerCase().includes('silver') ? 'Silver' : 'Gold';
  }

  let purityPercent: string | undefined = undefined;
  if (fineness) {
    if (fineness.includes('750')) purityPercent = '75.0%';
    else if (fineness.includes('925')) purityPercent = '92.5%';
    else if (fineness.includes('585')) purityPercent = '58.5%';
    else if (fineness.includes('916')) purityPercent = '91.6%';
    else purityPercent = fineness;
  }

  return {
    huid: res.normalized_identifier,
    isValidFormat: true,
    isVerifiedLive: isVerified,
    status: isVerified ? 'VERIFIED' : res.status === 'NOT_FOUND' ? 'NOT_FOUND' : 'UNAVAILABLE',
    jewellerRegNo: d.jeweller_registration || undefined,
    jewellerName: d.jeweller_name || undefined,
    jewellerCity: d.city || undefined,
    ahcCode: d.ahc_recognition || undefined,
    ahcName: d.ahc_name || undefined,
    metalFineness: fineness,
    metal,
    purityPercent,
    hallmarkingDate: d.hallmarking_date || undefined,
    articleType: d.article_type || undefined,
    articleWeight: d.gross_weight || undefined,
    officialSource: res.source_name || 'BIS CARE Portal / Manakonline HUID System',
    verifiedAt: res.retrieved_at ? new Date(res.retrieved_at).toLocaleString() : new Date().toLocaleString(),
    disclaimer: res.notes || undefined,
  };
}

export function mapVerificationResponseToLicenceResult(res: VerificationResponse): LicenceVerificationResult {
  const d = res.data || {};
  const statusFormatted: 'OPERATIVE' | 'EXPIRED' | 'SUSPENDED' | 'NOT_FOUND' =
    res.status === 'VERIFIED'
      ? 'OPERATIVE'
      : res.status === 'EXPIRED'
      ? 'EXPIRED'
      : res.status === 'SUSPENDED'
      ? 'SUSPENDED'
      : 'NOT_FOUND';

  return {
    licenceNo: res.normalized_identifier,
    status: statusFormatted,
    licenseeName: d.grantee_name || d.licensee_name || undefined,
    factoryAddress: d.factory_address || undefined,
    isNumber: d.is_number || undefined,
    productName: d.product_name || undefined,
    brand: d.brand || undefined,
    validTill: d.validity || undefined,
    scheme: 'Scheme-I (Standard Mark / ISI)',
    certificationDetails: res.notes || undefined,
    officialSource: res.source_name || 'BIS Manakonline Licence Register',
    verifiedAt: res.retrieved_at ? new Date(res.retrieved_at).toLocaleString() : new Date().toLocaleString(),
  };
}

export function mapVerificationResponseToCrsResult(res: VerificationResponse): CrsVerificationResult {
  const d = res.data || {};
  const statusFormatted: 'ACTIVE' | 'EXPIRED' | 'INVALID' | 'SUSPENDED' =
    res.status === 'VERIFIED'
      ? 'ACTIVE'
      : res.status === 'EXPIRED'
      ? 'EXPIRED'
      : res.status === 'SUSPENDED'
      ? 'SUSPENDED'
      : 'INVALID';

  let models: string[] | undefined = undefined;
  if (Array.isArray(d.models)) {
    models = d.models;
  } else if (typeof d.models === 'string') {
    models = [d.models];
  } else if (d.model_numbers && Array.isArray(d.model_numbers)) {
    models = d.model_numbers;
  }

  return {
    rNumber: res.normalized_identifier,
    status: statusFormatted,
    companyName: d.brand || d.grantee_name || undefined,
    modelNumbers: models,
    productCategory: d.product || undefined,
    isStandard: d.is_number || undefined,
    validTill: d.validity || undefined,
    registrationDetails: res.notes || undefined,
    officialSource: res.source_name || 'BIS CRS Official Registration Portal',
    verifiedAt: res.retrieved_at ? new Date(res.retrieved_at).toLocaleString() : new Date().toLocaleString(),
  };
}

export const verificationService = {
  /**
   * Verify HUID directly via Parakh backend endpoint POST /verification/huid
   */
  verifyHuid: async (huid: string): Promise<HuidVerificationResult> => {
    const raw = await verificationApi.verifyHUID(huid.trim());
    return mapVerificationResponseToHuidResult(raw);
  },

  /**
   * Verify BIS Licence CM/L number via backend endpoint POST /verification/licence
   */
  verifyLicence: async (licenceNo: string): Promise<LicenceVerificationResult> => {
    const raw = await verificationApi.verifyLicence(licenceNo.trim());
    return mapVerificationResponseToLicenceResult(raw);
  },

  /**
   * Verify CRS R-Number via backend endpoint POST /verification/r-number
   */
  verifyCrs: async (rNumber: string): Promise<CrsVerificationResult> => {
    const raw = await verificationApi.verifyRNumber(rNumber.trim());
    return mapVerificationResponseToCrsResult(raw);
  },
};
