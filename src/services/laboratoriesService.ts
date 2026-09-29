import { TestingLab } from '../types';
import { laboratoriesApi, LaboratoriesFilterParams } from '../api/laboratories';
import { LaboratoryOut } from '../types/api';

export interface LabQueryParams {
  query?: string;
  state?: string;
  city?: string;
  capability?: string;
  standard?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedLaboratoriesResult {
  items: TestingLab[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function mapLaboratoryOutToTestingLab(lab: LaboratoryOut): TestingLab {
  const labStatus = (lab.status === 'RECOGNIZED' || lab.status === 'AUDIT_PENDING' || lab.status === 'SUSPENDED')
    ? lab.status
    : 'RECOGNIZED';

  return {
    id: lab.id,
    name: lab.name,
    code: lab.recognition_code,
    state: lab.state,
    district: lab.district || undefined,
    city: lab.city,
    address: lab.address || `${lab.city}, ${lab.state}${lab.pincode ? ` - ${lab.pincode}` : ''}`,
    status: labStatus,
    validity: lab.valid_until ? `Valid until ${String(lab.valid_until)}` : lab.valid_from ? `Valid from ${String(lab.valid_from)}` : undefined,
  };
}

export const laboratoriesService = {
  getPaginatedLaboratories: async (params?: LabQueryParams): Promise<PaginatedLaboratoriesResult> => {
    const apiParams: LaboratoriesFilterParams = {
      state: params?.state && params.state !== 'ALL' ? params.state : undefined,
      city: params?.city && params.city !== 'ALL' ? params.city : undefined,
      is_number: params?.standard && params.standard !== 'ALL' ? params.standard : undefined,
      page: params?.page || 1,
      page_size: params?.pageSize || 20,
    };

    const res = await laboratoriesApi.listLaboratories(apiParams);
    let items = res.items.map(mapLaboratoryOutToTestingLab);

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      items = items.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.code.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.state.toLowerCase().includes(q) ||
          Boolean(l.address?.toLowerCase().includes(q))
      );
    }

    if (params?.capability && params.capability !== 'ALL') {
      items = items.filter((l) => l.capabilities && l.capabilities.includes(params.capability!));
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

  getLaboratories: async (params?: LabQueryParams): Promise<TestingLab[]> => {
    const res = await laboratoriesService.getPaginatedLaboratories(params);
    return res.items;
  },

  getLaboratoryById: async (recognitionCode: string): Promise<TestingLab> => {
    const lab = await laboratoriesApi.getLaboratoryByCode(recognitionCode);
    return mapLaboratoryOutToTestingLab(lab);
  },
};
