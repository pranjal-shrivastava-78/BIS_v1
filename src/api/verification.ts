import { apiClient } from './client';
import { VerificationResponse } from '../types/api';

export const verificationApi = {
  verifyHUID: async (huid: string): Promise<VerificationResponse> => {
    return apiClient.post<VerificationResponse>('/verification/huid', { huid });
  },

  verifyLicence: async (licenceNumber: string): Promise<VerificationResponse> => {
    return apiClient.post<VerificationResponse>('/verification/licence', {
      licence_number: licenceNumber,
    });
  },

  verifyRNumber: async (rNumber: string): Promise<VerificationResponse> => {
    return apiClient.post<VerificationResponse>('/verification/r-number', {
      r_number: rNumber,
    });
  },
};
