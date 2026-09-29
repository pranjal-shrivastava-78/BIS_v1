import { HuidVerificationResult, LicenceVerificationResult, CrsVerificationResult } from '../types';
import { verifyHuidLocal, verifyLicenceLocal, verifyCrsLocal } from '../data/verification';

export const verificationService = {
  /**
   * Verify HUID using local verification dataset
   */
  verifyHuid: async (huid: string): Promise<HuidVerificationResult> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return verifyHuidLocal(huid);
  },

  /**
   * Verify BIS Licence CM/L number using local verification dataset
   */
  verifyLicence: async (licenceNo: string): Promise<LicenceVerificationResult> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return verifyLicenceLocal(licenceNo);
  },

  /**
   * Verify CRS R-Number using local verification dataset
   */
  verifyCrs: async (rNumber: string): Promise<CrsVerificationResult> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return verifyCrsLocal(rNumber);
  },
};
