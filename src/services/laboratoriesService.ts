import { TestingLab } from '../types';
import { MOCK_LABORATORIES } from '../data/laboratories';

export interface LabQueryParams {
  query?: string;
  state?: string;
  city?: string;
  capability?: string;
  standard?: string;
}

export const laboratoriesService = {
  getLaboratories: async (params?: LabQueryParams): Promise<TestingLab[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...MOCK_LABORATORIES];

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.code.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.state.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q) ||
          l.accreditedStandards.some((s) => s.toLowerCase().includes(q)) ||
          l.capabilities.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (params?.state && params.state !== 'ALL') {
      filtered = filtered.filter((l) => l.state === params.state);
    }

    if (params?.city && params.city !== 'ALL') {
      filtered = filtered.filter((l) => l.city.toLowerCase().includes(params.city!.toLowerCase()));
    }

    if (params?.capability && params.capability !== 'ALL') {
      filtered = filtered.filter((l) => l.capabilities.includes(params.capability!));
    }

    if (params?.standard && params.standard !== 'ALL') {
      const s = params.standard.toLowerCase();
      filtered = filtered.filter((l) =>
        l.accreditedStandards.some((st) => st.toLowerCase().includes(s))
      );
    }

    return filtered;
  },

  getLaboratoryById: async (id: string): Promise<TestingLab | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_LABORATORIES.find((l) => l.id === id) || MOCK_LABORATORIES[0];
  },
};
