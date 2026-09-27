import { api } from './apiClient';
import { HallmarkingCentre } from '../types';
import { MINIMAL_AHC_SEED, USE_FALLBACK_SEEDS } from '../data/demo/minimalPlaceholders';

export interface AhcQueryParams {
  state?: string;
  query?: string;
}

export const hallmarkingService = {
  getAhcCentres: async (params?: AhcQueryParams): Promise<HallmarkingCentre[]> => {
    const res = await api.get<HallmarkingCentre[]>('/hallmarking-centres', params);
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      let filtered = [...MINIMAL_AHC_SEED];
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (a) => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q)
        );
      }
      if (params?.state && params.state !== 'ALL') {
        filtered = filtered.filter((a) => a.state === params.state);
      }
      return filtered;
    }
    return [];
  },
};
