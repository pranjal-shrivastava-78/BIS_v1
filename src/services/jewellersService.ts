import { LicensedJeweller } from '../types';
import { MOCK_JEWELLERS } from '../data/jewellers';

export interface JewellerQueryParams {
  query?: string;
  state?: string;
  city?: string;
  metal?: string;
}

export const jewellersService = {
  getJewellers: async (params?: JewellerQueryParams): Promise<LicensedJeweller[]> => {
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...MOCK_JEWELLERS];

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (j) =>
          j.jewellerName.toLowerCase().includes(q) ||
          j.licenceNo.toLowerCase().includes(q) ||
          j.city.toLowerCase().includes(q) ||
          j.address.toLowerCase().includes(q)
      );
    }

    if (params?.state && params.state !== 'ALL') {
      filtered = filtered.filter((j) => j.state === params.state);
    }

    if (params?.city && params.city !== 'ALL') {
      filtered = filtered.filter((j) => j.city.toLowerCase().includes(params.city!.toLowerCase()));
    }

    if (params?.metal && params.metal !== 'ALL') {
      filtered = filtered.filter((j) => j.metalCategory === params.metal || j.metalCategory === 'Both');
    }

    return filtered;
  },
};
