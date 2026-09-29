import { apiClient } from './client';
import { AssayReportData, JewelleryScanDetection } from '../types/api';

export const jewelleryApi = {
  scanJewelleryMarks: async (file: File): Promise<JewelleryScanDetection> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<JewelleryScanDetection>('/jewellery/scan', formData, true);
  },

  parseAssayReport: async (file: File): Promise<AssayReportData> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<AssayReportData>('/jewellery/assay-report', formData, true);
  },
};
