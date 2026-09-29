import { HallmarkingCentre } from '../types';
import { MOCK_AHC_CENTRES } from '../data/hallmarking';

export interface AhcQueryParams {
  state?: string;
  city?: string;
  query?: string;
  status?: string;
}

export const hallmarkingService = {
  getAhcCentres: async (params?: AhcQueryParams): Promise<HallmarkingCentre[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...MOCK_AHC_CENTRES];

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.code.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q) ||
          (a.services && a.services.some((s) => s.toLowerCase().includes(q)))
      );
    }

    if (params?.state && params.state !== 'ALL') {
      filtered = filtered.filter((a) => a.state === params.state);
    }

    if (params?.city && params.city !== 'ALL') {
      filtered = filtered.filter((a) => a.city.toLowerCase().includes(params.city!.toLowerCase()));
    }

    if (params?.status && params.status !== 'ALL') {
      filtered = filtered.filter((a) => a.status === params.status);
    }

    return filtered;
  },

  getAhcById: async (id: string): Promise<HallmarkingCentre | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_AHC_CENTRES.find((a) => a.id === id) || MOCK_AHC_CENTRES[0];
  },
};
