import { api } from './apiClient';
import { QcoRecord } from '../types';
import { MINIMAL_QCO_SEED, USE_FALLBACK_SEEDS } from '../data/demo/minimalPlaceholders';

export interface QcoQueryParams {
  query?: string;
  ministry?: string;
  status?: string;
}

export const qcoService = {
  getQcoRecords: async (params?: QcoQueryParams): Promise<QcoRecord[]> => {
    const res = await api.get<QcoRecord[]>('/qco', params);
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      let filtered = [...MINIMAL_QCO_SEED];
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.product.toLowerCase().includes(q) ||
            item.isNumber.toLowerCase().includes(q) ||
            item.notificationNo.toLowerCase().includes(q)
        );
      }
      if (params?.ministry && params.ministry !== 'ALL') {
        filtered = filtered.filter((item) => item.ministry === params.ministry);
      }
      if (params?.status && params.status !== 'ALL') {
        filtered = filtered.filter((item) => item.status === params.status);
      }
      return filtered;
    }
    return [];
  },
};
