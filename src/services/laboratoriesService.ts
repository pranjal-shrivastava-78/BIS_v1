import { api } from './apiClient';
import { TestingLab } from '../types';
import { MINIMAL_LABS_SEED, USE_FALLBACK_SEEDS } from '../data/demo/minimalPlaceholders';

export interface LabQueryParams {
  query?: string;
  state?: string;
  capability?: string;
  standard?: string;
}

export const laboratoriesService = {
  getLaboratories: async (params?: LabQueryParams): Promise<TestingLab[]> => {
    const res = await api.get<TestingLab[]>('/laboratories', params);
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      let filtered = [...MINIMAL_LABS_SEED];
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.name.toLowerCase().includes(q) ||
            l.code.toLowerCase().includes(q) ||
            l.city.toLowerCase().includes(q) ||
            l.accreditedStandards.some((s) => s.toLowerCase().includes(q))
        );
      }
      if (params?.state && params.state !== 'ALL') {
        filtered = filtered.filter((l) => l.state === params.state);
      }
      if (params?.capability && params.capability !== 'ALL') {
        filtered = filtered.filter((l) => l.capabilities.includes(params.capability!));
      }
      return filtered;
    }
    return [];
  },

  getLaboratoryById: async (id: string): Promise<TestingLab | null> => {
    const res = await api.get<TestingLab>(`/laboratories/${id}`);
    if (res.data) return res.data;

    if (USE_FALLBACK_SEEDS) {
      return MINIMAL_LABS_SEED.find((l) => l.id === id) || null;
    }
    return null;
  },
};
