import { api } from './apiClient';
import { HuidVerificationResult, LicenceVerificationResult, CrsVerificationResult } from '../types';

export const verificationService = {
  /**
   * Verify HUID against official backend service: POST /api/verification/huid
   */
  verifyHuid: async (huid: string): Promise<HuidVerificationResult> => {
    const rawHuid = huid.trim().toUpperCase();
    const isValidFormat = /^[A-Z0-9]{6}$/.test(rawHuid);

    if (!isValidFormat) {
      return {
        huid: rawHuid,
        isValidFormat: false,
        isVerifiedLive: false,
        status: 'INVALID_FORMAT',
        officialSource: 'BIS Standard Format Rule',
        verifiedAt: new Date().toLocaleTimeString(),
        disclaimer: 'Format validation failed. A valid HUID must consist of exactly 6 alphanumeric characters.',
      };
    }

    // Call backend endpoint
    const res = await api.post<HuidVerificationResult>('/verification/huid', { huid: rawHuid });
    if (res.data) return res.data;

    // If backend is not yet connected: Return transparent unverified state
    return {
      huid: rawHuid,
      isValidFormat: true,
      isVerifiedLive: false,
      status: 'UNAVAILABLE',
      officialSource: 'POST /api/verification/huid (Endpoint Pending)',
      verifiedAt: new Date().toLocaleTimeString(),
      disclaimer:
        'Official live verification service is currently not connected to the central BIS database. Valid format does NOT prove authenticity.',
    };
  },

  /**
   * Verify BIS Licence CM/L number: POST /api/verification/licence
   */
  verifyLicence: async (licenceNo: string): Promise<LicenceVerificationResult> => {
    const raw = licenceNo.trim().toUpperCase();
    const res = await api.post<LicenceVerificationResult>('/verification/licence', { licenceNo: raw });
    if (res.data) return res.data;

    return {
      licenceNo: raw,
      status: 'NOT_FOUND',
      officialSource: 'POST /api/verification/licence (Endpoint Pending)',
      verifiedAt: new Date().toLocaleTimeString(),
    };
  },

  /**
   * Verify CRS R-Number: POST /api/verification/crs
   */
  verifyCrs: async (rNumber: string): Promise<CrsVerificationResult> => {
    const raw = rNumber.trim().toUpperCase();
    const res = await api.post<CrsVerificationResult>('/verification/crs', { rNumber: raw });
    if (res.data) return res.data;

    return {
      rNumber: raw,
      status: 'INVALID',
      officialSource: 'POST /api/verification/crs (Endpoint Pending)',
      verifiedAt: new Date().toLocaleTimeString(),
    };
  },
};
