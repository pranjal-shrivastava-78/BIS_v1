import { LicensedJeweller } from '../types';
import { jewellersApi, JewellersFilterParams } from '../api/jewellers';
import { JewellerOut } from '../types/api';

export interface JewellerQueryParams {
  query?: string;
  state?: string;
  city?: string;
  metal?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedJewellersResult {
  items: LicensedJeweller[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function mapJewellerOutToLicensedJeweller(j: JewellerOut): LicensedJeweller {
  const metal: 'Gold' | 'Silver' | 'Both' =
    j.metal_category === 'SILVER' ? 'Silver' : j.metal_category === 'BOTH' ? 'Both' : 'Gold';

  const statusFormatted: 'OPERATIVE' | 'SURRENDERED' | 'CANCELLED' =
    j.status === 'VALID' || j.status === 'OPERATIVE'
      ? 'OPERATIVE'
      : j.status === 'SURRENDERED'
      ? 'SURRENDERED'
      : 'CANCELLED';

  return {
    id: j.id,
    licenceNo: j.registration_number,
    jewellerName: j.name,
    address: [j.city, j.district, j.state].filter(Boolean).join(', '),
    city: j.city,
    state: j.state,
    metalCategory: metal,
    status: statusFormatted,
  };
}

export const jewellersService = {
  getPaginatedJewellers: async (params?: JewellerQueryParams): Promise<PaginatedJewellersResult> => {
    const apiParams: JewellersFilterParams = {
      state: params?.state && params.state !== 'ALL' ? params.state : undefined,
      city: params?.city && params.city !== 'ALL' ? params.city : undefined,
      page: params?.page || 1,
      page_size: params?.pageSize || 20,
    };

    const res = await jewellersApi.listJewellers(apiParams);
    let items = res.items.map(mapJewellerOutToLicensedJeweller);

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      items = items.filter(
        (j) =>
          j.jewellerName.toLowerCase().includes(q) ||
          j.licenceNo.toLowerCase().includes(q) ||
          j.city.toLowerCase().includes(q) ||
          Boolean(j.address?.toLowerCase().includes(q))
      );
    }

    if (params?.metal && params.metal !== 'ALL') {
      items = items.filter((j) => j.metalCategory === params.metal || j.metalCategory === 'Both');
    }

    return {
      items,
      page: res.pagination.page,
      pageSize: res.pagination.page_size,
      totalItems: res.pagination.total_items,
      totalPages: res.pagination.total_pages,
      hasNext: res.pagination.has_next,
      hasPrev: res.pagination.has_prev,
    };
  },

  getJewellers: async (params?: JewellerQueryParams): Promise<LicensedJeweller[]> => {
    const res = await jewellersService.getPaginatedJewellers(params);
    return res.items;
  },
};
