import { api } from './apiClient';
import { LicensedJeweller } from '../types';
import { MINIMAL_JEWELLERS_SEED, USE_FALLBACK_SEEDS } from '../data/demo/minimalPlaceholders';

export interface JewellerQueryParams {
  query?: string;
  state?: string;
  metal?: string;
}

export const jewellersService = {
  getJewellers: async (params?: JewellerQueryParams): Promise<LicensedJeweller[]> => {
    const res = await api.get<LicensedJeweller[]>('/jewellers', params);
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      let filtered = [...MINIMAL_JEWELLERS_SEED];
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (j) =>
            j.jewellerName.toLowerCase().includes(q) ||
            j.licenceNo.toLowerCase().includes(q) ||
            j.city.toLowerCase().includes(q)
        );
      }
      if (params?.state && params.state !== 'ALL') {
        filtered = filtered.filter((j) => j.state === params.state);
      }
      if (params?.metal && params.metal !== 'ALL') {
        filtered = filtered.filter((j) => j.metalCategory === params.metal);
      }
      return filtered;
    }
    return [];
  },
};
