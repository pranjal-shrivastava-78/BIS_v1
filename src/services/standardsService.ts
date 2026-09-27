import { api } from './apiClient';
import { IndianStandard, ComplianceGapItem } from '../types';
import {
  MINIMAL_STANDARDS_SEED,
  MINIMAL_COMPLIANCE_GAP_SEED,
  USE_FALLBACK_SEEDS,
} from '../data/demo/minimalPlaceholders';

export interface StandardsQueryParams {
  query?: string;
  department?: string;
  qcoOnly?: boolean;
  page?: number;
  limit?: number;
}

export const standardsService = {
  getStandards: async (params?: StandardsQueryParams): Promise<IndianStandard[]> => {
    const res = await api.get<IndianStandard[]>('/standards', params);
    if (res.data) return res.data;

    // Graceful fallback to minimal seed for frontend preview if backend endpoint is not yet connected
    if (USE_FALLBACK_SEEDS) {
      let filtered = [...MINIMAL_STANDARDS_SEED];
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.isNumber.toLowerCase().includes(q) ||
            s.title.toLowerCase().includes(q) ||
            s.scope.toLowerCase().includes(q)
        );
      }
      if (params?.department && params.department !== 'ALL') {
        filtered = filtered.filter((s) => s.department === params.department);
      }
      if (params?.qcoOnly) {
        filtered = filtered.filter((s) => s.qcoMandatory);
      }
      return filtered;
    }

    return [];
  },

  getStandardById: async (id: string): Promise<IndianStandard | null> => {
    const res = await api.get<IndianStandard>(`/standards/${id}`);
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      const found = MINIMAL_STANDARDS_SEED.find((s) => s.id === id || s.isNumber.includes(id));
      return found || null;
    }
    return null;
  },

  matchProductToStandards: async (description: string, attributes?: Record<string, string>) => {
    const res = await api.post<any>('/standards/match-product', { description, attributes });
    if (res.data) return res.data;

    // Minimal placeholder match response for UI preview
    if (USE_FALLBACK_SEEDS) {
      return [
        {
          isNumber: 'IS 17526 : 2021',
          title: 'Stainless Steel Vacuum Flasks / Insulated Domestic Water Bottles',
          confidence: 94,
          matchReason: 'Potentially applicable based on extracted product attributes for insulated domestic containers.',
          evidenceClause: 'Clause 4.1 & Clause 5.2',
          qcoMandatory: true,
          sourceUrl: 'https://www.services.bis.gov.in',
        },
      ];
    }
    return [];
  },

  getComplianceGapItems: async (standardId?: string): Promise<ComplianceGapItem[]> => {
    const res = await api.get<ComplianceGapItem[]>('/compliance/gap-analysis', { standardId });
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      return MINIMAL_COMPLIANCE_GAP_SEED;
    }
    return [];
  },
};
